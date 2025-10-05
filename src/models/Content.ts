import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: string;
  slug: string;
  type: 'Page' | 'Blog' | 'Landing Page' | 'News' | 'Announcement';
  author: string;
  content: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  metaDescription?: string;
  categories: string[];
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  type: {
    type: String,
    enum: ['Page', 'Blog', 'Landing Page', 'News', 'Announcement'],
    default: 'Page'
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  featuredImage: {
    url: {
      type: String,
      trim: true
    },
    alt: {
      type: String,
      trim: true,
      maxlength: [200, 'Alt text cannot exceed 200 characters']
    }
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Meta description cannot exceed 300 characters']
  },
  categories: [{
    type: String,
    enum: ['Announcement', 'Partnership', 'University', 'News', 'Success', 'Study Abroad', 'Scholarship', 'Visa', 'Application'],
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Each tag cannot exceed 50 characters']
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance (slug index is already created by unique: true)
ContentSchema.index({ type: 1 });
ContentSchema.index({ published: 1 });
ContentSchema.index({ categories: 1 });
ContentSchema.index({ tags: 1 });
ContentSchema.index({ createdAt: -1 });

// Virtual for formatted date
ContentSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

ContentSchema.virtual('formattedUpdatedAt').get(function() {
  return this.updatedAt.toLocaleDateString();
});

// Pre-save middleware to set publishedAt when published is true
ContentSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Static method to generate slug from title
ContentSchema.statics.generateSlug = function(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

const Content = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);

export default Content;
