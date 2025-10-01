import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
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
    type: mongoose.Schema.Types.ObjectId,
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
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUsers() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduexpress';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if admin users already exist
    const existingUsers = await User.find({ role: { $in: ['superuser', 'operator'] } });
    
    if (existingUsers.length > 0) {
      console.log('📋 Existing admin users found:');
      existingUsers.forEach(user => {
        console.log(`  - ${user.username} (${user.role}) - ${user.email}`);
      });
      console.log('\n🔄 Skipping creation as users already exist.');
      return;
    }

    // Create default admin users
    const adminUsers = [
      {
        username: 'admin',
        email: 'admin@eduexpress.info',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'superuser',
        isActive: true,
        permissions: {
          canManageLeads: true,
          canManageUniversities: true,
          canManageB2BLeads: true,
          canManageUpdates: true,
          canManageAdmins: true,
          canManageSuccessStories: true,
        }
      },
      {
        username: 'operator1',
        email: 'operator1@eduexpress.info',
        password: 'operator123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'operator',
        isActive: true,
        permissions: {
          canManageLeads: true,
          canManageUniversities: false,
          canManageB2BLeads: true,
          canManageUpdates: false,
          canManageAdmins: false,
          canManageSuccessStories: true,
        }
      },
      {
        username: 'operator2',
        email: 'operator2@eduexpress.info',
        password: 'operator123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'operator',
        isActive: true,
        permissions: {
          canManageLeads: false,
          canManageUniversities: true,
          canManageB2BLeads: false,
          canManageUpdates: true,
          canManageAdmins: false,
          canManageSuccessStories: false,
        }
      }
    ];

    console.log('🚀 Creating admin users...');
    
    for (const userData of adminUsers) {
      try {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created ${userData.role}: ${userData.username} (${userData.email})`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  User ${userData.username} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating user ${userData.username}:`, error.message);
        }
      }
    }

    console.log('\n🎉 Admin users creation completed!');
    console.log('\n📋 Login Credentials:');
    console.log('Superuser:');
    console.log('  Username: admin');
    console.log('  Email: admin@eduexpress.info');
    console.log('  Password: admin123');
    console.log('\nOperators:');
    console.log('  Username: operator1, Email: operator1@eduexpress.info, Password: operator123');
    console.log('  Username: operator2, Email: operator2@eduexpress.info, Password: operator123');

  } catch (error) {
    console.error('❌ Error creating admin users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createAdminUsers();
