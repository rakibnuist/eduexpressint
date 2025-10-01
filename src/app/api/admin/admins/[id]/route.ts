import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

// Helper function to check authentication
async function checkAuth(request: Request) {
  try {
    const cookieStore = cookies();
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = params;
    
    const user = await User.findById(id);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Admin user not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch admin user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    
    // Validate the update data
    const allowedFields = ['firstName', 'lastName', 'email', 'role', 'isActive', 'permissions'];
    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No valid fields to update'
      }, { status: 400 });
    }

    // Validate email format if email is being updated
    if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate role if role is being updated
    if (updateData.role && !['superuser', 'operator'].includes(updateData.role)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid role. Must be superuser or operator'
      }, { status: 400 });
    }
    
    // Update the admin user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        error: 'Admin user not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Admin user updated successfully'
    });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update admin user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = params;
    
    // Check if this is the main admin user (prevent deletion of main admin)
    if (id === 'admin-001') {
      return NextResponse.json({
        success: false,
        error: 'Cannot delete the main admin user'
      }, { status: 400 });
    }
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        error: 'Admin user not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Admin user deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete admin user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
