import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import University from '@/models/University';

export async function GET(request: Request) {
  try {
    // Try to connect to database
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const admin = searchParams.get('admin') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';

    // If requesting a specific university by ID
    if (id) {
      try {
        const university = await University.findById(id).lean();
        
        if (!university) {
          return NextResponse.json({
            success: false,
            error: 'University not found'
          }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          data: university
        });
      } catch (error) {
        console.error('Error fetching university by ID:', error);
        return NextResponse.json({
          success: false,
          error: 'Failed to fetch university',
          message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    }

    // Build query for multiple universities
    const query: any = {};
    
    // Only show active universities for public access
    if (!admin) {
      query.isActive = true;
    }
    
    if (country) {
      query.country = country;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (featured) {
      query.isFeatured = true;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    try {
      // Fetch universities with pagination
      const universities = await University.find(query)
        .sort({ 
          isFeatured: -1, 
          priority: -1, 
          'ranking.global': 1,
          ...(search ? { score: { $meta: 'textScore' } } : {})
        })
        .skip(offset)
        .limit(limit)
        .lean();

      // Get total count for pagination
      const totalCount = await University.countDocuments(query);

      // Get featured universities count
      const featuredCount = await University.countDocuments({ 
        ...query, 
        isFeatured: true 
      });

      // Get country distribution
      const countryStats = await University.aggregate([
        { $match: query },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get type distribution
      const typeStats = await University.aggregate([
        { $match: query },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      const responseData = {
        universities,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount
        },
        stats: {
          total: totalCount,
          featured: featuredCount,
          countryDistribution: countryStats,
          typeDistribution: typeStats
        },
        lastUpdated: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        data: responseData
      });
    } catch (error) {
      console.error('Error fetching universities:', error);
      
      // Return fallback data if database query fails
      const fallbackData = getFallbackUniversitiesData();
      return NextResponse.json({
        success: true,
        data: fallbackData,
        warning: 'Using fallback data due to database error'
      });
    }
  } catch (error) {
    console.error('Error in universities API:', error);
    
    // Return fallback data if database connection fails
    const fallbackData = getFallbackUniversitiesData();
    return NextResponse.json({
      success: true,
      data: fallbackData,
      warning: 'Using fallback data due to connection error'
    });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'University ID is required'
      }, { status: 400 });
    }

    const body = await request.json();
    
    // Update university
    const university = await University.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!university) {
      return NextResponse.json({
        success: false,
        error: 'University not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      university: university
    });
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update university',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackUniversitiesData() {
  return {
    universities: [
      {
        _id: '1',
        name: 'University of Cambridge',
        slug: 'university-of-cambridge',
        description: 'One of the world\'s oldest and most prestigious universities, located in Cambridge, England.',
        shortDescription: 'Prestigious research university in Cambridge, England.',
        country: 'United Kingdom',
        destination: 'uk',
        city: 'Cambridge',
        type: 'Research',
        ranking: { global: 2, national: 1 },
        isActive: true,
        isFeatured: true,
        priority: 10,
        programs: [
          {
            name: 'Computer Science',
            level: 'Bachelor',
            duration: 3,
            language: 'English',
            tuition: {
              amount: 22227,
              currency: 'GBP',
              local: 9250,
              international: 22227,
              perYear: true
            }
          },
          {
            name: 'Engineering',
            level: 'Bachelor',
            duration: 4,
            language: 'English',
            tuition: {
              amount: 22227,
              currency: 'GBP',
              local: 9250,
              international: 22227,
              perYear: true
            }
          }
        ],
        fees: {
          application: 22,
          tuition: {
            amount: 22227,
            currency: 'GBP'
          },
          entries: [
            {
              type: 'Tuition Fee',
              amount: '£22,227',
              currency: 'GBP',
              description: 'Annual tuition fee for international students'
            }
          ]
        },
        scholarships: [
          {
            name: 'Cambridge Trust Scholarships',
            value: {
              percentage: 100,
              afterScholarshipFee: '£0'
            },
            currency: 'GBP',
            type: 'university',
            description: 'Full tuition fee scholarship for outstanding international students'
          }
        ],
        requirements: {
          general: [
            'High school diploma with excellent grades',
            'English proficiency test (IELTS 7.0+ or TOEFL 100+)',
            'Personal statement',
            'Letters of recommendation'
          ],
          documents: [
            'Academic transcripts',
            'English test results',
            'Personal statement',
            'Letters of recommendation',
            'Passport copy'
          ],
          languageTests: [
            { test: 'IELTS', minScore: 7.0 },
            { test: 'TOEFL', minScore: 100 }
          ]
        },
        faqs: [
          {
            question: 'What are the admission requirements?',
            answer: 'You need excellent academic grades, English proficiency, and strong supporting documents.'
          }
        ],
        website: 'https://www.cam.ac.uk',
        email: 'admissions@cam.ac.uk',
        phone: '+44 1223 337733',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        name: 'Seoul National University',
        slug: 'seoul-national-university',
        description: 'Korea\'s most prestigious national university, known for excellence in research and education.',
        shortDescription: 'Top-ranked national university in South Korea.',
        country: 'South Korea',
        destination: 'south-korea',
        city: 'Seoul',
        type: 'Research',
        ranking: { global: 29, national: 1 },
        isActive: true,
        isFeatured: true,
        priority: 9,
        programs: [
          {
            name: 'Computer Science',
            level: 'Bachelor',
            duration: 4,
            language: 'Korean',
            tuition: {
              amount: 4000000,
              currency: 'KRW',
              local: 2000000,
              international: 4000000,
              perYear: false
            }
          }
        ],
        fees: {
          application: 100000,
          tuition: {
            amount: 4000000,
            currency: 'KRW'
          },
          entries: [
            {
              type: 'Tuition Fee',
              amount: '₩4,000,000',
              currency: 'KRW',
              description: 'Semester tuition fee for international students'
            }
          ]
        },
        scholarships: [
          {
            name: 'Korean Government Scholarship Program',
            value: {
              percentage: 100,
              afterScholarshipFee: '₩0'
            },
            currency: 'KRW',
            type: 'government',
            description: 'Full scholarship including tuition, accommodation, and monthly stipend'
          }
        ],
        requirements: {
          general: [
            'High school diploma',
            'Korean language proficiency (TOPIK Level 3+)',
            'English proficiency test',
            'Academic transcripts'
          ],
          documents: [
            'Academic transcripts',
            'Korean language test results',
            'English test results',
            'Passport copy',
            'Application form'
          ],
          languageTests: [
            { test: 'TOPIK', minScore: 'Level 3' },
            { test: 'TOEFL', minScore: 80 }
          ]
        },
        faqs: [
          {
            question: 'Do I need to know Korean?',
            answer: 'Yes, most programs require Korean language proficiency at TOPIK Level 3 or higher.'
          }
        ],
        website: 'https://www.snu.ac.kr',
        email: 'intl@snu.ac.kr',
        phone: '+82-2-880-6971',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    pagination: {
      total: 2,
      limit: 50,
      offset: 0,
      hasMore: false
    },
    stats: {
      total: 2,
      featured: 2,
      countryDistribution: [
        { _id: 'United Kingdom', count: 1 },
        { _id: 'South Korea', count: 1 }
      ],
      typeDistribution: [
        { _id: 'Research', count: 2 }
      ]
    },
    lastUpdated: new Date().toISOString()
  };
}
