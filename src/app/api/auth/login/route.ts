import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Default admin credentials (you should change these in production)
const ADMIN_CREDENTIALS = {
  email: 'admin@eduexpress.info',
  password: 'admin123',
  user: {
    _id: 'admin-001',
    username: 'admin',
    email: 'admin@eduexpress.info',
    role: 'superuser' as const,
    firstName: 'Admin',
    lastName: 'User',
    isActive: true,
    permissions: {
      canManageLeads: true,
      canManageUniversities: true,
      canManageB2BLeads: true,
      canManageUpdates: true,
      canManageAdmins: true,
      canManageSuccessStories: true,
    },
    lastLogin: new Date(),
    createdAt: new Date(),
  }
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Set session cookie (in production, use proper JWT tokens)
      const cookieStore = await cookies();
      cookieStore.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        user: ADMIN_CREDENTIALS.user,
        message: 'Login successful'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 });
  }
}
