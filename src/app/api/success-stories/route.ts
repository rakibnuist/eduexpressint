import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import StudentSuccessStory from '@/models/StudentSuccessStory';

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const country = searchParams.get('country');
    const programLevel = searchParams.get('programLevel');

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data
    if (!dbConnection) {
      console.log('Database not connected, returning fallback success stories data');
      return NextResponse.json({
        success: true,
        data: {
          stories: getFallbackSuccessStories(),
          totalCount: 3,
          featuredCount: 3
        }
      });
    }

    // Build query filters
    const query: any = { isPublished: true };
    
    if (featured) {
      query.isFeatured = true;
    }
    
    if (country) {
      query.universityCountry = new RegExp(country, 'i');
    }
    
    if (programLevel) {
      query.programLevel = new RegExp(programLevel, 'i');
    }

    // Get success stories from database
    let stories: any[] = [];
    let totalCount = 0;
    let featuredCount = 0;

    try {
      stories = await StudentSuccessStory.find(query)
        .sort({ priority: -1, createdAt: -1 })
        .limit(limit)
        .select('studentName studentImage university universityCountry program programLevel testimonialQuote shortDescription story isFeatured priority createdAt')
        .lean();
      
      totalCount = await StudentSuccessStory.countDocuments({ isPublished: true });
      featuredCount = await StudentSuccessStory.countDocuments({ isPublished: true, isFeatured: true });
    } catch (error) {
      console.error('Error fetching success stories:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: {
          stories: getFallbackSuccessStories(),
          totalCount: 3,
          featuredCount: 3
        }
      });
    }

    const responseData = {
      stories,
      totalCount,
      featuredCount,
      filters: {
        featured,
        limit,
        country,
        programLevel
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in success stories API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch success stories data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback success stories data
function getFallbackSuccessStories() {
  return [
    {
      _id: 'fallback-1',
      studentName: 'Sarah Ahmed',
      studentImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      university: 'University of Cambridge',
      universityCountry: 'United Kingdom',
      program: 'Computer Science',
      programLevel: 'Bachelor',
      testimonialQuote: 'EduExpress made my dream of studying in the UK come true. Their guidance was invaluable throughout the entire process.',
      shortDescription: 'Successfully secured admission to Cambridge with scholarship support.',
      story: 'Sarah always dreamed of studying computer science at a top UK university. With EduExpress guidance, she not only got into Cambridge but also secured a 50% scholarship.',
      isFeatured: true,
      priority: 1,
      createdAt: new Date('2024-01-15')
    },
    {
      _id: 'fallback-2',
      studentName: 'Mohammad Rahman',
      studentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      university: 'Tsinghua University',
      universityCountry: 'China',
      program: 'Engineering',
      programLevel: 'Master',
      testimonialQuote: 'The visa assistance was exceptional. I got my student visa approved on the first try thanks to their expert support.',
      shortDescription: 'Master\'s degree in Engineering from Tsinghua University with full scholarship.',
      story: 'Mohammad wanted to pursue advanced engineering studies in China. EduExpress helped him secure admission to Tsinghua University with a full scholarship and smooth visa processing.',
      isFeatured: true,
      priority: 2,
      createdAt: new Date('2024-02-20')
    },
    {
      _id: 'fallback-3',
      studentName: 'Fatima Khan',
      studentImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      university: 'Seoul National University',
      universityCountry: 'South Korea',
      program: 'Business Administration',
      programLevel: 'Master',
      testimonialQuote: 'They helped me secure a scholarship that covered 50% of my tuition fees. Highly recommended!',
      shortDescription: 'MBA from Seoul National University with significant scholarship support.',
      story: 'Fatima aimed for an MBA from a top Asian university. With EduExpress support, she got into Seoul National University with a 50% tuition scholarship.',
      isFeatured: true,
      priority: 3,
      createdAt: new Date('2024-03-10')
    }
  ];
}
