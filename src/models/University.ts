import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  // Basic Information
  name: string;
  slug: string;
  description: string;
  shortDescription: string;

  // SEO Information
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Location and Type
  country: string;
  destination: string;
  city: string;
  type: 'Public' | 'Private' | 'Community' | 'Research' | 'Technical';

  // Visual Assets
  logoUrl?: string;
  logo?: string;
  coverImageUrl?: string;
  images?: string[];
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  founded?: number;
  about?: string;

  // Rankings
  ranking?: {
    global?: number;
    national?: number;
  };

  // Programs Offered
  programs: Array<{
    name: string;
    level: 'Bachelor' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation' | 'Certificate';
    duration: number; // Duration in years
    language: string;
    tuition: {
      amount: number;
      currency: string;
      local: number;
      international: number;
      perYear: boolean;
    };
  }>;

  // Fees Information
  fees: {
    application: number;
    tuition: {
      amount: number;
      currency: string;
    };
    entries: Array<{
      type: string;
      amount: string;
      currency: string;
      description: string;
    }>;
  };

  // Scholarships
  scholarships: Array<{
    name: string;
    value: {
      tuitionFee?: string;
      accommodationFee?: string;
      monthlyStipend?: string;
      percentage?: number;
      afterScholarshipFee?: string;
    };
    currency: string;
    type: 'freshman' | 'university' | 'government' | 'provencial' | 'departmental' | 'external';
    description?: string;
  }>;

  // Scholarship Conditions
  conditions: string[];

  // Requirements
  requirements: {
    general: string[];
    documents: string[];
    languageTests: Array<{
      test: string;
      minScore: number | string;
    }>;
  };

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;

  // Status
  isActive: boolean;
  isFeatured: boolean;
  priority: number;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

const UniversitySchema: Schema = new Schema({
  // Basic Information
  name: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 500 },

  // SEO Information
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String, required: true }]
  },

  // Location and Type
  country: { type: String, required: true },
  destination: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, enum: ['Public', 'Private', 'Community', 'Research', 'Technical'], required: true },

  // Visual Assets
  logoUrl: { type: String },
  logo: { type: String },
  coverImageUrl: { type: String },
  images: [{ type: String }],
  website: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  founded: { type: Number },
  about: { type: String },

  // Rankings
  ranking: {
    global: { type: Number },
    national: { type: Number }
  },

  // Programs Offered
  programs: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'], required: true },
    duration: { type: Number, required: true },
    language: { type: String, required: true },
    tuition: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      local: { type: Number, required: true },
      international: { type: Number, required: true },
      perYear: { type: Boolean, required: true }
    }
  }],

  // Fees Information
  fees: {
    application: { type: Number, required: true },
    tuition: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    },
    entries: [{
      type: { type: String, required: true },
      amount: { type: String, required: true },
      currency: { type: String, required: true },
      description: { type: String, required: true }
    }]
  },

  // Scholarships
  scholarships: [{
    name: { type: String, required: true },
    value: {
      tuitionFee: { type: String },
      accommodationFee: { type: String },
      monthlyStipend: { type: String },
      afterScholarshipFee: { type: String },
    },
    currency: { type: String, required: true, default: 'USD' },
    type: {
      type: String,
      enum: ['freshman', 'university', 'government', 'provencial', 'departmental', 'external'],
      required: true
    },
    description: { type: String },
  }],

  // Scholarship Conditions
  conditions: [{ type: String, required: true }],

  // Requirements
  requirements: {
    general: [{ type: String, required: true }],
    documents: [{ type: String, required: true }],
    languageTests: [{
      test: { type: String, required: true },
      minScore: { type: Schema.Types.Mixed, required: true }
    }]
  },

  // FAQ Section
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],

  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  priority: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Indexes for better SEO and performance
UniversitySchema.index({ name: 'text', description: 'text', shortDescription: 'text', 'seo.title': 'text', 'seo.description': 'text', 'seo.keywords': 'text' });
UniversitySchema.index({ country: 1, city: 1 });
UniversitySchema.index({ type: 1, isActive: 1 });
UniversitySchema.index({ 'ranking.global': 1 });
UniversitySchema.index({ 'ranking.national': 1 });

// Static method to get universities by country
UniversitySchema.statics.getByCountry = function(country: string, limit = 20) {
  return this.find({ country, isActive: true })
    .sort({ isFeatured: -1, priority: -1, 'ranking.global': 1 })
    .limit(limit);
};

// Static method to search universities
UniversitySchema.statics.search = function(query: string, filters = {}) {
  const searchQuery: any = {
    isActive: true,
    $text: { $search: query }
  };
  
  if (filters.country) searchQuery.country = filters.country;
  if (filters.type) searchQuery.type = filters.type;
  if (filters.programLevel) {
    searchQuery['programs.level'] = filters.programLevel;
  }
  
  return this.find(searchQuery, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' }, isFeatured: -1 });
};

// Pre-save middleware to generate slug if not provided
UniversitySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = (this.name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);
