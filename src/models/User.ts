import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'superuser' | 'operator';
  firstName: string;
  lastName: string;
  isActive: boolean;
  permissions: {
    canManageLeads: boolean;
    canManageUniversities: boolean;
    canManageB2BLeads: boolean;
    canManageUpdates: boolean;
    canManageAdmins: boolean;
    canManageSuccessStories: boolean;
  };
  lastLogin?: Date;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['superuser', 'operator'],
    required: true,
    default: 'operator'
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: {
    canManageLeads: {
      type: Boolean,
      default: false
    },
    canManageUniversities: {
      type: Boolean,
      default: false
    },
    canManageB2BLeads: {
      type: Boolean,
      default: false
    },
    canManageUpdates: {
      type: Boolean,
      default: false
    },
    canManageAdmins: {
      type: Boolean,
      default: false
    },
    canManageSuccessStories: {
      type: Boolean,
      default: false
    }
  },
  lastLogin: {
    type: Date
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Indexes for better performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ lastLogin: -1 });

// Static method to get active users
UserSchema.statics.getActive = function() {
  return this.find({ isActive: true }).select('-password');
};

// Static method to get users by role
UserSchema.statics.getByRole = function(role: string) {
  return this.find({ role, isActive: true }).select('-password');
};

// Static method to update last login
UserSchema.statics.updateLastLogin = function(userId: string) {
  return this.findByIdAndUpdate(userId, { lastLogin: new Date() });
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
