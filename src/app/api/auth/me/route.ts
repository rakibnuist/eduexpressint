import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Default admin user data
const ADMIN_USER = {
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
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');

    if (session && session.value === 'authenticated') {
      return NextResponse.json({
        success: true,
        user: ADMIN_USER
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Authentication check failed'
    }, { status: 500 });
  }
}
