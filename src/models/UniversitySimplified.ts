import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversitySimplified extends Document {
  // Basic Information (Required)
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  
  // Location (Required)
  country: string;
  destination: string;
  city: string;
  type: 'Public' | 'Private' | 'Community' | 'Research' | 'Technical';
  
  // Visual Assets (Required for display)
  logoUrl: string;
  coverImageUrl: string;
  
  // Rankings (Displayed on client)
  ranking: {
    global: number;
    national: number;
  };
  
  // Programs (Displayed on client)
  programs: Array<{
    name: string;
    level: 'Bachelor' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation' | 'Certificate';
    duration: number;
    tuition: {
      international: number;
      currency: string;
    };
  }>;
  
  // Scholarships (Displayed on client)
  scholarships: Array<{
    name: string;
    value: {
      tuitionFee: string;
    };
    currency: string;
    type: string;
  }>;
  
  // Fees (Displayed on client)
  fees: {
    tuition: {
      international: number;
      currency: string;
    };
    entries: Array<{
      type: string;
      amount: string;
      currency: string;
      description: string;
    }>;
  };
  
  // FAQ (Displayed on client)
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // Requirements (Displayed on client)
  requirements: {
    general: string[];
    documents: string[];
    languageTests: Array<{
      test: string;
      minScore: number;
    }>;
  };
  
  // Status (Required for functionality)
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
}

const UniversitySimplifiedSchema: Schema = new Schema({
  // Basic Information
  name: { 
    type: String, 
    required: [true, 'University name is required'], 
    trim: true, 
    maxlength: [200, 'University name cannot exceed 200 characters'],
    minlength: [2, 'University name must be at least 2 characters']
  },
  slug: { 
    type: String, 
    required: [true, 'Slug is required'], 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    minlength: [50, 'Description must be at least 50 characters']
  },
  shortDescription: { 
    type: String, 
    required: [true, 'Short description is required'], 
    maxlength: [500, 'Short description cannot exceed 500 characters'],
    minlength: [20, 'Short description must be at least 20 characters']
  },
  
  // Location
  country: { 
    type: String, 
    required: [true, 'Country is required'],
    trim: true
  },
  destination: { 
    type: String, 
    required: [true, 'Destination is required'],
    trim: true
  },
  city: { 
    type: String, 
    required: [true, 'City is required'],
    trim: true
  },
  type: { 
    type: String, 
    enum: {
      values: ['Public', 'Private', 'Community', 'Research', 'Technical'],
      message: 'University type must be one of: Public, Private, Community, Research, Technical'
    }, 
    required: [true, 'University type is required']
  },
  
  // Visual Assets
  logoUrl: { 
    type: String, 
    required: [true, 'Logo URL is required'],
    match: [/^https?:\/\/.+/, 'Logo URL must be a valid HTTP/HTTPS URL']
  },
  coverImageUrl: { 
    type: String, 
    required: [true, 'Cover image URL is required'],
    match: [/^https?:\/\/.+/, 'Cover image URL must be a valid HTTP/HTTPS URL']
  },
  
  // Rankings
  ranking: {
    global: { 
      type: Number, 
      required: [true, 'Global ranking is required'],
      min: [1, 'Global ranking must be at least 1'],
      max: [10000, 'Global ranking cannot exceed 10000']
    },
    national: { 
      type: Number, 
      required: [true, 'National ranking is required'],
      min: [1, 'National ranking must be at least 1'],
      max: [1000, 'National ranking cannot exceed 1000']
    }
  },
  
  // Programs
  programs: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'], required: true },
    duration: { type: Number, required: true },
    tuition: {
      international: { type: Number, required: true },
      currency: { type: String, required: true, default: 'USD' }
    }
  }],
  
  // Scholarships
  scholarships: [{
    name: { type: String, required: true },
    value: {
      tuitionFee: { type: String, required: true }
    },
    currency: { type: String, required: true, default: 'USD' },
    type: { type: String, required: true }
  }],
  
  // Fees
  fees: {
    tuition: {
      international: { type: Number, required: true },
      currency: { type: String, required: true, default: 'USD' }
    },
    entries: [{
      type: { type: String, required: true },
      amount: { type: String, required: true },
      currency: { type: String, required: true },
      description: { type: String, required: true }
    }]
  },
  
  // FAQ
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  
  // Requirements
  requirements: {
    general: [{ type: String, required: true }],
    documents: [{ type: String, required: true }],
    languageTests: [{
      test: { type: String, required: true },
      minScore: { type: Number, required: true }
    }]
  },
  
  // Status
  isActive: { type: Boolean, required: true, default: true },
  isFeatured: { type: Boolean, required: true, default: false },
  priority: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

// Indexes for better performance
UniversitySimplifiedSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });

export default mongoose.models.UniversitySimplified || mongoose.model<IUniversitySimplified>('UniversitySimplified', UniversitySimplifiedSchema);
