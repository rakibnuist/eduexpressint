import mongoose, { Document, Schema } from 'mongoose';

export interface IUpdate extends Document {
  title: string;
  content: string;
  type: 'announcement' | 'news' | 'maintenance' | 'feature' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  targetAudience: 'all' | 'students' | 'partners' | 'staff' | 'admin';
  tags: string[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  publishedAt?: Date;
  expiresAt?: Date;
  isPinned: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  views: number;
  likes: number;
  comments: Array<{
    id: string;
    author: {
      id: string;
      name: string;
    };
    content: string;
    createdAt: Date;
    isEdited: boolean;
    editedAt?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UpdateSchema = new Schema<IUpdate>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['announcement', 'news', 'maintenance', 'feature', 'general'],
    default: 'general',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['all', 'students', 'partners', 'staff', 'admin'],
    default: 'all',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  publishedAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    id: {
      type: String,
      required: true
    },
    author: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: Date
  }]
}, {
  timestamps: true
});

// Indexes for better performance
UpdateSchema.index({ status: 1, publishedAt: -1 });
UpdateSchema.index({ type: 1, status: 1 });
UpdateSchema.index({ targetAudience: 1, status: 1 });
UpdateSchema.index({ tags: 1 });
UpdateSchema.index({ isPinned: -1, publishedAt: -1 });
UpdateSchema.index({ 'author.id': 1 });

// Virtual for formatted date
UpdateSchema.virtual('formattedDate').get(function() {
  return this.publishedAt ? this.publishedAt.toLocaleDateString() : this.createdAt.toLocaleDateString();
});

// Pre-save middleware to set publishedAt when status changes to published
UpdateSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Static method to get published updates
UpdateSchema.statics.getPublished = function(limit = 10, skip = 0) {
  return this.find({ 
    status: 'published',
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  })
  .sort({ isPinned: -1, publishedAt: -1 })
  .limit(limit)
  .skip(skip);
};

// Static method to get updates by type
UpdateSchema.statics.getByType = function(type: string, limit = 10) {
  return this.find({ 
    type,
    status: 'published',
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  })
  .sort({ isPinned: -1, publishedAt: -1 })
  .limit(limit);
};

// Static method to search updates
UpdateSchema.statics.search = function(query: string, limit = 10) {
  return this.find({
    $and: [
      { status: 'published' },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  })
  .sort({ isPinned: -1, publishedAt: -1 })
  .limit(limit);
};

export default mongoose.models.Update || mongoose.model<IUpdate>('Update', UpdateSchema);
