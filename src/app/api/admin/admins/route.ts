import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

// Helper function to check authentication
async function checkAuth(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    
    if (!session || session.value !== 'authenticated') {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data
    if (!dbConnection) {
      console.log('Database not connected, returning fallback admin users data');
      return NextResponse.json({
        success: true,
        data: getFallbackAdminUsersData()
      });
    }

    // Get admin users from database
    let adminUsers: any[] = [];
    let totalCount = 0;
    let activeCount = 0;

    try {
      adminUsers = await User.find({ role: { $in: ['superuser', 'operator'] } })
        .sort({ createdAt: -1 })
        .limit(100) // Limit to 100 most recent admin users
        .lean();
      
      totalCount = await User.countDocuments({ role: { $in: ['superuser', 'operator'] } });
      activeCount = await User.countDocuments({ 
        role: { $in: ['superuser', 'operator'] },
        isActive: true 
      });
    } catch (error) {
      console.error('Error fetching admin users:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: getFallbackAdminUsersData()
      });
    }

    // Get role distribution
    let roleStats: any[] = [];
    try {
      roleStats = await User.aggregate([
        { 
          $match: { role: { $in: ['superuser', 'operator'] } }
        },
        { 
          $group: { 
            _id: '$role', 
            count: { $sum: 1 },
            activeCount: { $sum: { $cond: ['$isActive', 1, 0] } }
          } 
        },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching role stats:', error);
    }

    const responseData = {
      adminUsers,
      totalCount,
      activeCount,
      analytics: {
        roleDistribution: roleStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch admin users data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const body = await request.json();
    const { username, email, password, firstName, lastName, role, permissions } = body;

    // Validate required fields
    const requiredFields = ['username', 'email', 'password', 'firstName', 'lastName', 'role'];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        return NextResponse.json({
          success: false,
          error: `${field} is required`
        }, { status: 400 });
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate role
    if (!['superuser', 'operator'].includes(role)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid role. Must be superuser or operator'
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User with this email or username already exists'
      }, { status: 400 });
    }

    // Create new admin user
    const newUser = new User({
      username,
      email,
      password, // In production, hash this password
      firstName,
      lastName,
      role,
      isActive: true,
      permissions: permissions || {
        canManageLeads: role === 'superuser',
        canManageUniversities: role === 'superuser',
        canManageB2BLeads: role === 'superuser',
        canManageUpdates: role === 'superuser',
        canManageAdmins: role === 'superuser',
        canManageSuccessStories: role === 'superuser',
      }
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'Admin user created successfully'
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create admin user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackAdminUsersData() {
  return {
    adminUsers: [
      {
        _id: 'admin-001',
        username: 'admin',
        email: 'admin@eduexpress.info',
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
        },
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'operator-001',
        username: 'operator1',
        email: 'operator1@eduexpress.info',
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
        },
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 2,
    activeCount: 2,
    analytics: {
      roleDistribution: [
        { _id: 'superuser', count: 1, activeCount: 1 },
        { _id: 'operator', count: 1, activeCount: 1 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
