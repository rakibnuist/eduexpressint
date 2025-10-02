import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import University from '@/models/University';

export async function POST(request: Request) {
  try {
    // Check authentication first
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session')?.value;
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }

    await dbConnect();
    
    const body = await request.json();
    
    // Create new university
    const university = new University(body);
    const savedUniversity = await university.save();
    
    return NextResponse.json({
      success: true,
      data: savedUniversity,
      message: 'University created successfully'
    });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create university',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication first
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session')?.value;
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }

    // Try to connect to database
    await dbConnect();
    
    // Get universities from database with better error handling
    let universities: any[] = [];
    let totalCount = 0;
    let activeCount = 0;
    let dataSource = 'database';

    try {
      // Try to fetch universities directly
      universities = await University.find()
        .sort({ updatedAt: -1 })
        .limit(100)
        .lean();
      
      totalCount = await University.countDocuments();
      activeCount = await University.countDocuments({ isActive: true });
      
      console.log(`Successfully fetched ${totalCount} universities from database`);
      
      // If we get here, we have real data
      if (universities.length === 0) {
        console.log('No universities found in database, using fallback data');
        dataSource = 'fallback';
        const fallbackData = getFallbackUniversitiesData();
        universities = fallbackData.universities;
        totalCount = fallbackData.totalCount;
        activeCount = fallbackData.activeCount;
      }
    } catch (error) {
      console.error('Error fetching universities from database:', error);
      console.log('Falling back to sample data');
      dataSource = 'fallback';
      const fallbackData = getFallbackUniversitiesData();
      universities = fallbackData.universities;
      totalCount = fallbackData.totalCount;
      activeCount = fallbackData.activeCount;
    }

    // Get country distribution
    let countryStats: any[] = [];
    try {
      countryStats = await University.aggregate([
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching country stats:', error);
    }

    // Get ranking distribution
    let rankingStats: any[] = [];
    try {
      rankingStats = await University.aggregate([
        { 
          $group: { 
            _id: { 
              $switch: {
                branches: [
                  { case: { $lte: ['$ranking', 50] }, then: 'Top 50' },
                  { case: { $lte: ['$ranking', 100] }, then: '51-100' },
                  { case: { $lte: ['$ranking', 200] }, then: '101-200' },
                  { case: { $lte: ['$ranking', 500] }, then: '201-500' }
                ],
                default: '500+'
              }
            }, 
            count: { $sum: 1 } 
          } 
        },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching ranking stats:', error);
    }

    const responseData = {
      universities,
      totalCount,
      activeCount,
      analytics: {
        countryDistribution: countryStats,
        rankingDistribution: rankingStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: dataSource
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in universities API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch universities data',
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
        name: 'Tsinghua University',
        slug: 'tsinghua-university',
        description: 'A leading research university in China, known for its excellence in science and technology.',
        shortDescription: 'Leading research university in China',
        country: 'China',
        destination: 'china',
        city: 'Beijing',
        type: 'Public',
        logoUrl: '',
        coverImageUrl: '',
        ranking: { global: 14, national: 1 },
        programs: [
          {
            name: 'Computer Science',
            level: 'Bachelor',
            duration: 4,
            tuition: { amount: 30000, currency: 'USD' }
          },
          {
            name: 'Engineering',
            level: 'Masters',
            duration: 2,
            tuition: { amount: 35000, currency: 'USD' }
          }
        ],
        fees: [
          {
            type: 'Tuition Fee',
            amount: '30000',
            currency: 'USD',
            description: 'Annual tuition fee for international students'
          },
          {
            type: 'Application Fee',
            amount: '100',
            currency: 'USD',
            description: 'One-time application processing fee'
          }
        ],
        scholarships: [
          {
            name: 'International Excellence Scholarship',
            value: { tuitionFee: '50%' },
            currency: 'USD',
            type: 'Merit-based'
          }
        ],
        conditions: ['Academic excellence', 'English proficiency'],
        requirements: {
          general: ['High school diploma', 'English proficiency'],
          documents: ['Transcripts', 'Recommendation letters', 'Personal statement'],
          languageTests: [
            { test: 'IELTS', minScore: 6.5 },
            { test: 'TOEFL', minScore: 90 }
          ]
        },
        faqs: [
          {
            question: 'What are the admission requirements?',
            answer: 'Students need a high school diploma and English proficiency test scores.'
          }
        ],
        seo: {
          title: 'Tsinghua University - Study in China',
          description: 'Study at Tsinghua University, one of China\'s top universities',
          keywords: ['China', 'University', 'Study abroad', 'Tsinghua']
        },
        isActive: true,
        isFeatured: true,
        priority: 1,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        name: 'Peking University',
        slug: 'peking-university',
        description: 'One of China\'s most prestigious universities, known for its comprehensive academic programs.',
        shortDescription: 'Prestigious comprehensive university in China',
        country: 'China',
        destination: 'china',
        city: 'Beijing',
        type: 'Public',
        logoUrl: '',
        coverImageUrl: '',
        ranking: { global: 12, national: 2 },
        programs: [
          {
            name: 'Medicine',
            level: 'Bachelor',
            duration: 6,
            tuition: { amount: 28000, currency: 'USD' }
          },
          {
            name: 'Law',
            level: 'Masters',
            duration: 2,
            tuition: { amount: 32000, currency: 'USD' }
          }
        ],
        fees: [
          {
            type: 'Tuition Fee',
            amount: '28000',
            currency: 'USD',
            description: 'Annual tuition fee for international students'
          },
          {
            type: 'Application Fee',
            amount: '100',
            currency: 'USD',
            description: 'One-time application processing fee'
          }
        ],
        scholarships: [
          {
            name: 'Peking University Scholarship',
            value: { tuitionFee: '30%' },
            currency: 'USD',
            type: 'Merit-based'
          }
        ],
        conditions: ['Academic excellence', 'Chinese language proficiency'],
        requirements: {
          general: ['High school diploma', 'Language proficiency'],
          documents: ['Transcripts', 'Recommendation letters', 'Personal statement'],
          languageTests: [
            { test: 'HSK', minScore: 4 },
            { test: 'IELTS', minScore: 6.0 }
          ]
        },
        faqs: [
          {
            question: 'What programs are available?',
            answer: 'We offer programs in Medicine, Law, Arts, and many other fields.'
          }
        ],
        seo: {
          title: 'Peking University - Study in China',
          description: 'Study at Peking University, one of China\'s most prestigious universities',
          keywords: ['China', 'University', 'Study abroad', 'Peking']
        },
        isActive: true,
        isFeatured: true,
        priority: 2,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 2,
    activeCount: 2,
    analytics: {
      countryDistribution: [
        { _id: 'China', count: 2 }
      ],
      rankingDistribution: [
        { _id: 'Top 50', count: 2 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
