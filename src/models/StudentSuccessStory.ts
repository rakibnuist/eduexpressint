import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentSuccessStory extends Document {
  // Student Information
  studentName: string;
  studentImage?: string;
  studentAge?: number;
  studentNationality: string;
  studentEmail?: string;
  studentLinkedIn?: string;
  
  // Academic Information
  university: string;
  universityCountry: string;
  program: string;
  programLevel: 'Bachelor' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation' | 'Certificate';
  graduationYear: number;
  gpa?: number;
  
  // Story Content
  title: string;
  story: string;
  shortDescription: string;
  keyAchievements: string[];
  challenges: string[];
  advice: string[];
  
  // Media
  images?: string[];
  videoUrl?: string;
  testimonialQuote?: string;
  
  // SEO and Display
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  priority: number;
  
  // Statistics
  views: number;
  likes: number;
  shares: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const StudentSuccessStorySchema: Schema = new Schema({
  // Student Information
  studentName: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100
  },
  studentImage: { 
    type: String,
    trim: true
  },
  studentAge: { 
    type: Number,
    min: 16,
    max: 50
  },
  studentNationality: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  studentEmail: { 
    type: String,
    trim: true,
    lowercase: true
  },
  studentLinkedIn: { 
    type: String,
    trim: true
  },
  
  // Academic Information
  university: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  universityCountry: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  program: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  programLevel: { 
    type: String, 
    enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'],
    required: true
  },
  graduationYear: { 
    type: Number, 
    required: true,
    min: 2000,
    max: 2030
  },
  gpa: { 
    type: Number,
    min: 0,
    max: 4.0
  },
  
  // Story Content
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  story: { 
    type: String, 
    required: true,
    minlength: 100
  },
  shortDescription: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  keyAchievements: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  challenges: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  advice: [{
    type: String,
    trim: true,
    maxlength: 200
  }],
  
  // Media
  images: [{
    type: String,
    trim: true
  }],
  videoUrl: { 
    type: String,
    trim: true
  },
  testimonialQuote: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  
  // SEO and Display
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Statistics
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  shares: {
    type: Number,
    default: 0,
    min: 0
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
StudentSuccessStorySchema.index({ university: 1 });
StudentSuccessStorySchema.index({ universityCountry: 1 });
StudentSuccessStorySchema.index({ programLevel: 1 });
StudentSuccessStorySchema.index({ isPublished: 1, isFeatured: 1 });
StudentSuccessStorySchema.index({ tags: 1 });
StudentSuccessStorySchema.index({ createdAt: -1 });

export default mongoose.models.StudentSuccessStory || mongoose.model<IStudentSuccessStory>('StudentSuccessStory', StudentSuccessStorySchema);
