// Database Relationships Documentation and Utilities
// This file documents the relationships between different models in the database

import mongoose from 'mongoose';

/**
 * Database Relationships Overview:
 * 
 * 1. University ↔ Destination (Many-to-One)
 *    - Universities belong to destinations (countries)
 *    - One destination can have many universities
 * 
 * 2. Lead ↔ University (Many-to-One)
 *    - Leads can be interested in specific universities
 *    - One university can have many leads
 * 
 * 3. Lead ↔ Destination (Many-to-One)
 *    - Leads can be interested in specific destinations
 *    - One destination can have many leads
 * 
 * 4. User ↔ Lead (One-to-Many)
 *    - Users (operators) can be assigned to leads
 *    - One user can manage many leads
 * 
 * 5. User ↔ B2BLead (One-to-Many)
 *    - Users can be assigned to B2B leads
 *    - One user can manage many B2B leads
 * 
 * 6. User ↔ Update (One-to-Many)
 *    - Users can create updates
 *    - One user can create many updates
 * 
 * 7. University ↔ UniversitySimplified (One-to-One)
 *    - Simplified version for client-side display
 *    - Should be kept in sync
 */

// Relationship utility functions
export class DatabaseRelationships {
  
  /**
   * Get universities by destination
   */
  static async getUniversitiesByDestination(destinationSlug: string) {
    const University = mongoose.models.University;
    return University.find({ 
      country: destinationSlug,
      isActive: true 
    }).sort({ isFeatured: -1, priority: -1 });
  }

  /**
   * Get leads by university
   */
  static async getLeadsByUniversity(universityId: string) {
    const Lead = mongoose.models.Lead;
    return Lead.find({ 
      university: universityId 
    }).sort({ createdAt: -1 });
  }

  /**
   * Get leads by destination
   */
  static async getLeadsByDestination(destination: string) {
    const Lead = mongoose.models.Lead;
    return Lead.find({ 
      destination 
    }).sort({ createdAt: -1 });
  }

  /**
   * Get leads assigned to a user
   */
  static async getLeadsByUser(userId: string) {
    const Lead = mongoose.models.Lead;
    return Lead.find({ 
      assignedTo: userId 
    }).sort({ priority: -1, lastContact: -1 });
  }

  /**
   * Get B2B leads assigned to a user
   */
  static async getB2BLeadsByUser(userId: string) {
    const B2BLead = mongoose.models.B2BLead;
    return B2BLead.find({ 
      assignedTo: userId 
    }).sort({ priority: -1, expectedValue: -1 });
  }

  /**
   * Get updates by author
   */
  static async getUpdatesByAuthor(authorId: string) {
    const Update = mongoose.models.Update;
    return Update.find({ 
      'author.id': authorId 
    }).sort({ createdAt: -1 });
  }

  /**
   * Get university statistics
   */
  static async getUniversityStats(universityId: string) {
    const Lead = mongoose.models.Lead;
    const stats = await Lead.aggregate([
      { $match: { university: universityId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    return stats;
  }

  /**
   * Get destination statistics
   */
  static async getDestinationStats(destination: string) {
    const Lead = mongoose.models.Lead;
    const University = mongoose.models.University;
    
    const [leadStats, universityCount] = await Promise.all([
      Lead.aggregate([
        { $match: { destination } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      University.countDocuments({ country: destination, isActive: true })
    ]);

    return {
      leadStats,
      universityCount
    };
  }

  /**
   * Get user performance metrics
   */
  static async getUserPerformance(userId: string) {
    const Lead = mongoose.models.Lead;
    const B2BLead = mongoose.models.B2BLead;
    
    const [leadStats, b2bStats] = await Promise.all([
      Lead.aggregate([
        { $match: { assignedTo: userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      B2BLead.aggregate([
        { $match: { assignedTo: userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalValue: { $sum: '$expectedValue' }
          }
        }
      ])
    ]);

    return {
      leadStats,
      b2bStats
    };
  }

  /**
   * Sync University with UniversitySimplified
   */
  static async syncUniversitySimplified(universityId: string) {
    const University = mongoose.models.University;
    const UniversitySimplified = mongoose.models.UniversitySimplified;
    
    const university = await University.findById(universityId);
    if (!university) {
      throw new Error('University not found');
    }

    const simplifiedData = {
      name: university.name,
      slug: university.slug,
      description: university.description,
      shortDescription: university.shortDescription,
      country: university.country,
      destination: university.country, // Assuming destination is same as country
      city: university.city,
      type: university.type,
      logoUrl: university.logoUrl || '',
      coverImageUrl: university.coverImageUrl || '',
      ranking: university.ranking || { global: 0, national: 0 },
      programs: university.programs.map((program: any) => ({
        name: program.name,
        level: program.level,
        duration: program.duration,
        tuition: {
          international: program.tuition.amount,
          currency: program.tuition.currency
        }
      })),
      scholarships: university.scholarships,
      fees: {
        tuition: {
          international: university.fees.tuition.amount,
          currency: university.fees.tuition.currency
        },
        entries: university.fees.entries
      },
      faqs: university.faqs,
      requirements: university.requirements,
      isActive: university.isActive,
      isFeatured: university.isFeatured,
      priority: university.priority
    };

    return UniversitySimplified.findOneAndUpdate(
      { slug: university.slug },
      simplifiedData,
      { upsert: true, new: true }
    );
  }

  /**
   * Get related data for a university
   */
  static async getUniversityRelatedData(universityId: string) {
    const University = mongoose.models.University;
    const Lead = mongoose.models.Lead;
    const Destination = mongoose.models.Destination;
    
    const [university, leads, destination] = await Promise.all([
      University.findById(universityId),
      Lead.find({ university: universityId }).limit(10),
      University.findById(universityId).then((uni: any) => 
        Destination.findOne({ slug: uni?.country })
      )
    ]);

    return {
      university,
      recentLeads: leads,
      destination
    };
  }
}

// Export relationship constants for reference
export const RELATIONSHIP_TYPES = {
  UNIVERSITY_TO_DESTINATION: 'many-to-one',
  LEAD_TO_UNIVERSITY: 'many-to-one',
  LEAD_TO_DESTINATION: 'many-to-one',
  USER_TO_LEAD: 'one-to-many',
  USER_TO_B2B_LEAD: 'one-to-many',
  USER_TO_UPDATE: 'one-to-many',
  UNIVERSITY_TO_SIMPLIFIED: 'one-to-one'
} as const;

export default DatabaseRelationships;
