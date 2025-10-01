import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import University from '@/models/University';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const lastSync = searchParams.get('lastSync');
    
    // Get current university count and last modified date
    const totalUniversities = await University.countDocuments();
    const lastModifiedUniversity = await University.findOne({}, {}, { sort: { updatedAt: -1 } });
    
    const syncStatus = {
      stats: {
        syncTimestamp: new Date().toISOString(),
        totalUniversities,
        universitiesToSync: 0, // For now, we'll implement this based on external data sources
        lastModified: lastModifiedUniversity?.updatedAt?.toISOString() || new Date().toISOString()
      },
      syncRequired: false // This would be true if external data is newer
    };
    
    return NextResponse.json({
      success: true,
      data: syncStatus
    });
  } catch (error) {
    console.error('Error checking university sync status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check sync status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { forceSync, source, universityIds } = body;
    
    let syncResult;
    
    if (source === 'external' || forceSync) {
      // Sync from external source (e.g., API, CSV, etc.)
      syncResult = await syncFromExternalSource();
    } else if (universityIds && universityIds.length > 0) {
      // Sync specific universities
      syncResult = await syncSpecificUniversities(universityIds);
    } else {
      // Default sync - refresh existing data
      syncResult = await refreshUniversityData();
    }
    
    return NextResponse.json({
      success: true,
      data: syncResult
    });
  } catch (error) {
    console.error('Error syncing universities:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync universities',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Sync from external data source (e.g., university APIs, CSV files, etc.)
async function syncFromExternalSource() {
  try {
    // This is where you would integrate with external university data sources
    // For now, we'll simulate adding some sample universities
    
    const sampleUniversities = [
      {
        name: "Tsinghua University",
        slug: "tsinghua-university",
        description: "Tsinghua University is one of China's most prestigious universities, located in Beijing. It's known for excellence in science, engineering, and technology.",
        shortDescription: "Top-ranked university in Beijing, China, specializing in science and engineering.",
        seo: {
          title: "Tsinghua University - Study in Beijing China",
          description: "Study at Tsinghua University, one of China's top universities in Beijing. Programs in science, engineering, and technology.",
          keywords: ["Tsinghua University", "Beijing university", "China university", "engineering programs"]
        },
        country: "China",
        destination: "china",
        city: "Beijing",
        type: "Public",
        ranking: { global: 16, national: 1 },
        isActive: true,
        isFeatured: true,
        priority: 10,
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: 4,
            tuition: { amount: 26000, currency: "CNY" }
          },
          {
            name: "Engineering",
            level: "Bachelor", 
            duration: 4,
            tuition: { amount: 26000, currency: "CNY" }
          }
        ],
        fees: [
          {
            type: "Tuition Fee",
            amount: "26000",
            currency: "CNY",
            description: "Annual tuition fee for international students"
          }
        ],
        scholarships: [
          {
            name: "Chinese Government Scholarship",
            value: { tuitionFee: "Full tuition coverage" },
            currency: "CNY",
            type: "government"
          }
        ],
        conditions: ["Outstanding academic performance", "Chinese language proficiency"],
        requirements: {
          general: ["High school diploma", "Chinese language test (HSK Level 4+)"],
          documents: ["Academic transcripts", "HSK certificate", "Passport copy"],
          languageTests: [{ test: "HSK", minScore: "Level 4" }]
        },
        faqs: [
          {
            question: "What are the language requirements?",
            answer: "Most programs require HSK Level 4 or higher for Chinese language proficiency."
          }
        ]
      },
      {
        name: "Peking University",
        slug: "peking-university",
        description: "Peking University is one of China's oldest and most prestigious universities, located in Beijing. It's renowned for its comprehensive programs in humanities, social sciences, and natural sciences.",
        shortDescription: "Historic and prestigious university in Beijing, China, offering comprehensive programs.",
        seo: {
          title: "Peking University - Study in Beijing China",
          description: "Study at Peking University, one of China's oldest and most prestigious universities in Beijing.",
          keywords: ["Peking University", "Beijing university", "China university", "humanities programs"]
        },
        country: "China",
        destination: "china", 
        city: "Beijing",
        type: "Public",
        ranking: { global: 18, national: 2 },
        isActive: true,
        isFeatured: true,
        priority: 9,
        programs: [
          {
            name: "International Relations",
            level: "Bachelor",
            duration: 4,
            tuition: { amount: 24000, currency: "CNY" }
          },
          {
            name: "Business Administration",
            level: "Bachelor",
            duration: 4,
            tuition: { amount: 24000, currency: "CNY" }
          }
        ],
        fees: [
          {
            type: "Tuition Fee",
            amount: "24000",
            currency: "CNY",
            description: "Annual tuition fee for international students"
          }
        ],
        scholarships: [
          {
            name: "Peking University Scholarship",
            value: { tuitionFee: "Partial tuition coverage" },
            currency: "CNY",
            type: "university"
          }
        ],
        conditions: ["Strong academic background", "English or Chinese proficiency"],
        requirements: {
          general: ["High school diploma", "Language proficiency test"],
          documents: ["Academic transcripts", "Language test results", "Passport copy"],
          languageTests: [
            { test: "IELTS", minScore: 6.5 },
            { test: "HSK", minScore: "Level 4" }
          ]
        },
        faqs: [
          {
            question: "What programs are available in English?",
            answer: "Several programs are offered in English, particularly in business and international relations."
          }
        ]
      }
    ];

    let syncedCount = 0;
    const syncedUniversities = [];

    for (const uniData of sampleUniversities) {
      // Check if university already exists
      const existingUniversity = await University.findOne({ slug: uniData.slug });
      
      if (existingUniversity) {
        // Update existing university
        const updatedUniversity = await University.findByIdAndUpdate(
          existingUniversity._id,
          { ...uniData, updatedAt: new Date() },
          { new: true }
        );
        syncedUniversities.push(updatedUniversity);
        syncedCount++;
      } else {
        // Create new university
        const newUniversity = await University.create(uniData);
        syncedUniversities.push(newUniversity);
        syncedCount++;
      }
    }

    return {
      universities: syncedUniversities,
      syncedCount,
      syncTimestamp: new Date().toISOString(),
      message: `Successfully synced ${syncedCount} universities from external source`
    };
  } catch (error) {
    console.error('Error syncing from external source:', error);
    throw error;
  }
}

// Sync specific universities by IDs
async function syncSpecificUniversities(universityIds: string[]) {
  try {
    const syncedUniversities = [];
    let syncedCount = 0;

    for (const id of universityIds) {
      const university = await University.findById(id);
      if (university) {
        // Here you would typically fetch updated data from external source
        // For now, we'll just update the timestamp
        const updatedUniversity = await University.findByIdAndUpdate(
          id,
          { updatedAt: new Date() },
          { new: true }
        );
        syncedUniversities.push(updatedUniversity);
        syncedCount++;
      }
    }

    return {
      universities: syncedUniversities,
      syncedCount,
      syncTimestamp: new Date().toISOString(),
      message: `Successfully synced ${syncedCount} specific universities`
    };
  } catch (error) {
    console.error('Error syncing specific universities:', error);
    throw error;
  }
}

// Refresh existing university data
async function refreshUniversityData() {
  try {
    // Get all universities and update their timestamps
    const universities = await University.find({});
    
    const updatePromises = universities.map(uni => 
      University.findByIdAndUpdate(
        uni._id,
        { updatedAt: new Date() },
        { new: true }
      )
    );

    const updatedUniversities = await Promise.all(updatePromises);

    return {
      universities: updatedUniversities,
      syncedCount: updatedUniversities.length,
      syncTimestamp: new Date().toISOString(),
      message: `Successfully refreshed ${updatedUniversities.length} universities`
    };
  } catch (error) {
    console.error('Error refreshing university data:', error);
    throw error;
  }
}
