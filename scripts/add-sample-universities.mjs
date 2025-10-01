import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';
const MONGODB_DB = process.env.MONGODB_DB || 'edu-express';

// University Schema
const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 500 },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }]
  },
  country: { type: String, required: true },
  destination: { type: String },
  city: { type: String, required: true },
  type: { type: String, enum: ['Public', 'Private', 'Community', 'Research', 'Technical'], required: true },
  logoUrl: { type: String },
  coverImageUrl: { type: String },
  ranking: {
    global: { type: Number },
    national: { type: Number }
  },
  programs: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'], required: true },
    duration: { type: Number, required: true },
    tuition: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    }
  }],
  fees: [{
    type: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true }
  }],
  scholarships: [{
    name: { type: String, required: true },
    value: {
      tuitionFee: { type: String }
    },
    currency: { type: String, required: true },
    type: { type: String, required: true }
  }],
  conditions: [{ type: String }],
  requirements: {
    general: [{ type: String }],
    documents: [{ type: String }],
    languageTests: [{
      test: { type: String, required: true },
      minScore: { type: mongoose.Schema.Types.Mixed, required: true }
    }]
  },
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  priority: { type: Number, default: 0 }
}, {
  timestamps: true
});

const University = mongoose.models.University || mongoose.model('University', UniversitySchema);

const sampleUniversities = [
  {
    name: 'University of Cambridge',
    slug: 'university-of-cambridge',
    description: 'One of the world\'s oldest and most prestigious universities, located in Cambridge, England. Founded in 1209, Cambridge is a collegiate research university and a member of the Russell Group.',
    shortDescription: 'Prestigious research university in Cambridge, England, founded in 1209.',
    seo: {
      title: 'University of Cambridge - Study at Cambridge University',
      description: 'Study at the University of Cambridge, one of the world\'s top universities. Get expert guidance on admissions, programs, and scholarships.',
      keywords: ['Cambridge University', 'UK universities', 'study in UK', 'prestigious universities']
    },
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
        tuition: {
          amount: 22227,
          currency: 'GBP'
        }
      },
      {
        name: 'Engineering',
        level: 'Bachelor',
        duration: 4,
        tuition: {
          amount: 22227,
          currency: 'GBP'
        }
      },
      {
        name: 'Business Administration',
        level: 'Masters',
        duration: 1,
        tuition: {
          amount: 35000,
          currency: 'GBP'
        }
      }
    ],
    fees: [
      {
        type: 'Tuition Fee',
        amount: '£22,227',
        currency: 'GBP',
        description: 'Annual tuition fee for international students'
      },
      {
        type: 'Application Fee',
        amount: '£22',
        currency: 'GBP',
        description: 'Non-refundable application fee'
      }
    ],
    scholarships: [
      {
        name: 'Cambridge Trust Scholarships',
        value: {
          tuitionFee: 'Full tuition coverage'
        },
        currency: 'GBP',
        type: 'university'
      }
    ],
    conditions: [
      'Outstanding academic performance',
      'English language proficiency',
      'Strong personal statement'
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
    phone: '+44 1223 337733'
  },
  {
    name: 'Seoul National University',
    slug: 'seoul-national-university',
    description: 'Korea\'s most prestigious national university, known for excellence in research and education. Located in Seoul, it offers world-class programs across various disciplines.',
    shortDescription: 'Top-ranked national university in South Korea, located in Seoul.',
    seo: {
      title: 'Seoul National University - Study in South Korea',
      description: 'Study at Seoul National University, Korea\'s top university. Expert guidance on Korean university admissions and programs.',
      keywords: ['Seoul National University', 'study in Korea', 'Korean universities', 'SNU']
    },
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
        tuition: {
          amount: 4000000,
          currency: 'KRW'
        }
      },
      {
        name: 'Business Administration',
        level: 'Masters',
        duration: 2,
        tuition: {
          amount: 5000000,
          currency: 'KRW'
        }
      }
    ],
    fees: [
      {
        type: 'Tuition Fee',
        amount: '₩4,000,000',
        currency: 'KRW',
        description: 'Semester tuition fee for international students'
      },
      {
        type: 'Application Fee',
        amount: '₩100,000',
        currency: 'KRW',
        description: 'Non-refundable application fee'
      }
    ],
    scholarships: [
      {
        name: 'Korean Government Scholarship Program',
        value: {
          tuitionFee: 'Full scholarship including tuition and living expenses'
        },
        currency: 'KRW',
        type: 'government'
      }
    ],
    conditions: [
      'High academic performance',
      'Korean language proficiency (TOPIK Level 3+)',
      'English proficiency for some programs'
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
    phone: '+82-2-880-6971'
  },
  {
    name: 'University of Manchester',
    slug: 'university-of-manchester',
    description: 'A prestigious research university in Manchester, England, known for its world-class research and teaching. Member of the Russell Group and consistently ranked among the top universities globally.',
    shortDescription: 'Prestigious Russell Group university in Manchester, England.',
    seo: {
      title: 'University of Manchester - Study in Manchester UK',
      description: 'Study at the University of Manchester, a top Russell Group university. Expert guidance on admissions and programs.',
      keywords: ['University of Manchester', 'Manchester University', 'study in UK', 'Russell Group']
    },
    country: 'United Kingdom',
    destination: 'uk',
    city: 'Manchester',
    type: 'Research',
    ranking: { global: 27, national: 6 },
    isActive: true,
    isFeatured: true,
    priority: 8,
    programs: [
      {
        name: 'Computer Science',
        level: 'Bachelor',
        duration: 3,
        tuition: {
          amount: 25000,
          currency: 'GBP'
        }
      },
      {
        name: 'Business Management',
        level: 'Bachelor',
        duration: 3,
        tuition: {
          amount: 25000,
          currency: 'GBP'
        }
      },
      {
        name: 'Engineering',
        level: 'Masters',
        duration: 1,
        tuition: {
          amount: 28000,
          currency: 'GBP'
        }
      }
    ],
    fees: [
      {
        type: 'Tuition Fee',
        amount: '£25,000',
        currency: 'GBP',
        description: 'Annual tuition fee for international students'
      },
      {
        type: 'Application Fee',
        amount: '£20',
        currency: 'GBP',
        description: 'Non-refundable application fee'
      }
    ],
    scholarships: [
      {
        name: 'Manchester International Excellence Scholarship',
        value: {
          tuitionFee: 'Up to £5,000 per year'
        },
        currency: 'GBP',
        type: 'university'
      }
    ],
    conditions: [
      'Strong academic background',
      'English language proficiency',
      'Relevant work experience (for some programs)'
    ],
    requirements: {
      general: [
        'High school diploma with good grades',
        'English proficiency test (IELTS 6.5+ or TOEFL 90+)',
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
        { test: 'IELTS', minScore: 6.5 },
        { test: 'TOEFL', minScore: 90 }
      ]
    },
    faqs: [
      {
        question: 'What is the application deadline?',
        answer: 'Applications typically close in January for September intake.'
      }
    ],
    website: 'https://www.manchester.ac.uk',
    email: 'international@manchester.ac.uk',
    phone: '+44 161 306 6000'
  }
];

async function addSampleUniversities() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    await mongoose.connect(MONGODB_URI, opts);
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database:', mongoose.connection.db.databaseName);

    // Clear existing universities
    await University.deleteMany({});
    console.log('🗑️  Cleared existing universities');

    // Add sample universities
    const universities = await University.insertMany(sampleUniversities);
    console.log(`✅ Added ${universities.length} sample universities:`);
    
    universities.forEach(uni => {
      console.log(`   - ${uni.name} (${uni.country})`);
    });

    console.log('\n🎉 Sample universities added successfully!');
    console.log('🌐 You can now visit http://localhost:3003/universities to see the data');

  } catch (error) {
    console.error('❌ Error adding sample universities:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

addSampleUniversities();
