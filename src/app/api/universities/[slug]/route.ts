import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import University from '@/models/University';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Try to connect to database
    await dbConnect();
    
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({
        success: false,
        error: 'University slug is required'
      }, { status: 400 });
    }

    try {
      // Try to find university by slug first, then by _id
      let university = await University.findOne({ 
        slug: slug,
        isActive: true 
      }).lean();
      
      // If not found by slug, try by _id
      if (!university) {
        university = await University.findOne({ 
          _id: slug,
          isActive: true 
        }).lean();
      }
      
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
      console.error('Error fetching university by slug:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch university',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in university API:', error);
    
    // Return fallback data if database connection fails
    const fallbackUniversity = getFallbackUniversityData();
    return NextResponse.json({
      success: true,
      data: fallbackUniversity,
      warning: 'Using fallback data due to connection error'
    });
  }
}

// Fallback data function for when database is not connected
function getFallbackUniversityData() {
  return {
    _id: '1',
    name: 'Zhengzhou University',
    slug: 'zzu',
    description: 'Zhengzhou University is a comprehensive public research university located in Zhengzhou, Henan Province, China. It is one of the key universities under the "Double First-Class" initiative and is known for its excellence in engineering, medicine, and humanities.',
    shortDescription: 'Leading comprehensive university in Henan Province, China.',
    country: 'China',
    destination: 'china',
    city: 'Zhengzhou',
    type: 'Research',
    ranking: { global: 501, national: 45 },
    logoUrl: '/brand/logo.png',
    coverImageUrl: '/brand/logo.png',
    isActive: true,
    isFeatured: true,
    priority: 8,
    programs: [
      {
        name: 'Computer Science and Technology',
        level: 'Bachelor',
        duration: 4,
        language: 'Chinese',
        tuition: {
          amount: 20000,
          currency: 'CNY',
          local: 5000,
          international: 20000,
          perYear: true
        }
      },
      {
        name: 'International Business',
        level: 'Bachelor',
        duration: 4,
        language: 'English',
        tuition: {
          amount: 25000,
          currency: 'CNY',
          local: 5000,
          international: 25000,
          perYear: true
        }
      },
      {
        name: 'Mechanical Engineering',
        level: 'Bachelor',
        duration: 4,
        language: 'Chinese',
        tuition: {
          amount: 20000,
          currency: 'CNY',
          local: 5000,
          international: 20000,
          perYear: true
        }
      },
      {
        name: 'Clinical Medicine',
        level: 'Bachelor',
        duration: 5,
        language: 'Chinese',
        tuition: {
          amount: 30000,
          currency: 'CNY',
          local: 5000,
          international: 30000,
          perYear: true
        }
      }
    ],
    fees: {
      application: 400,
      tuition: {
        amount: 20000,
        currency: 'CNY'
      },
      entries: [
        {
          type: 'Tuition Fee',
          amount: '¥20,000',
          currency: 'CNY',
          description: 'Annual tuition fee for international students'
        },
        {
          type: 'Accommodation',
          amount: '¥3,000',
          currency: 'CNY',
          description: 'Annual accommodation fee'
        },
        {
          type: 'Application Fee',
          amount: '¥400',
          currency: 'CNY',
          description: 'One-time application fee'
        }
      ]
    },
    scholarships: [
      {
        name: 'Chinese Government Scholarship',
        value: {
          percentage: 100,
          afterScholarshipFee: '¥0',
          monthlyStipend: '¥2,500'
        },
        currency: 'CNY',
        type: 'government',
        description: 'Full scholarship including tuition, accommodation, and monthly stipend'
      },
      {
        name: 'Zhengzhou University Scholarship',
        value: {
          percentage: 50,
          afterScholarshipFee: '¥10,000'
        },
        currency: 'CNY',
        type: 'university',
        description: '50% tuition fee waiver for outstanding students'
      }
    ],
    requirements: {
      general: [
        'High school diploma with good grades',
        'Chinese language proficiency (HSK Level 4+) for Chinese-taught programs',
        'English proficiency test (IELTS 6.0+ or TOEFL 80+) for English-taught programs',
        'Physical examination certificate',
        'No criminal record certificate'
      ],
      documents: [
        'Academic transcripts',
        'High school diploma',
        'Language proficiency test results',
        'Physical examination certificate',
        'No criminal record certificate',
        'Passport copy',
        'Application form',
        'Personal statement'
      ],
      languageTests: [
        { test: 'HSK', minScore: 'Level 4' },
        { test: 'IELTS', minScore: 6.0 },
        { test: 'TOEFL', minScore: 80 }
      ]
    },
    faqs: [
      {
        question: 'What are the admission requirements for international students?',
        answer: 'International students need a high school diploma, language proficiency test results, and various supporting documents including physical examination and no criminal record certificates.'
      },
      {
        question: 'Do I need to know Chinese to study at Zhengzhou University?',
        answer: 'For Chinese-taught programs, you need HSK Level 4 or higher. For English-taught programs, you need IELTS 6.0+ or TOEFL 80+.'
      },
      {
        question: 'What scholarships are available for international students?',
        answer: 'Zhengzhou University offers Chinese Government Scholarships (full coverage) and university scholarships (partial tuition waiver) for qualified international students.'
      },
      {
        question: 'What is the cost of living in Zhengzhou?',
        answer: 'The cost of living in Zhengzhou is relatively affordable, with monthly expenses ranging from ¥2,000-3,000 including accommodation, food, and transportation.'
      }
    ],
    website: 'https://www.zzu.edu.cn',
    email: 'admission@zzu.edu.cn',
    phone: '+86-371-67781111',
    address: '100 Science Avenue, Zhengzhou, Henan Province, China',
    founded: 1956,
    about: 'Zhengzhou University (ZZU) is a comprehensive public research university located in Zhengzhou, the capital city of Henan Province, China. Established in 1956, ZZU has grown to become one of the key universities under China\'s "Double First-Class" initiative. The university is known for its strong programs in engineering, medicine, humanities, and social sciences. With over 70,000 students and 6,000 faculty members, ZZU provides a vibrant academic environment for both domestic and international students.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
