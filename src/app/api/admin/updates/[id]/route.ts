import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import Update from '@/models/Update';
import { DatabaseValidator, withDatabaseValidation } from '@/lib/database-validation';

// Helper function to check authentication
async function checkAuth(request: Request) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin-session');
    
    if (!session || session.value !== 'authenticated') {
      return null;
    }
    
    return {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@eduexpert.com'
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

// GET - Fetch a single update
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await checkAuth(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const update = await Update.findById(params.id);
    
    if (!update) {
      return NextResponse.json({
        success: false,
        error: 'Update not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: update
    });
  } catch (error) {
    console.error('Error fetching update:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch update',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT - Update an update
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await checkAuth(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const body = await request.json();
    
    // Validate the data before processing
    const validation = DatabaseValidator.validateUpdateData(body);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        message: validation.message
      }, { status: 400 });
    }
    
    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, views, likes, ...updateData } = body;
    
    // Set publishedAt if status is being changed to published
    if (updateData.status === 'published' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }
    
    // Use database validation wrapper
    const result = await withDatabaseValidation(
      async () => {
        return await Update.findByIdAndUpdate(
          params.id,
          { 
            ...updateData,
            updatedAt: new Date()
          },
          { new: true, runValidators: true }
        );
      },
      'UPDATE_UPDATE',
      'updates',
      updateData
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: result.message
      }, { status: 500 });
    }

    const update = result.data;
    
    if (!update) {
      return NextResponse.json({
        success: false,
        error: 'Update not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: update,
      message: 'Update updated successfully'
    });
  } catch (error) {
    console.error('Error updating update:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update update',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Delete an update
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await checkAuth(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const update = await Update.findByIdAndDelete(params.id);
    
    if (!update) {
      return NextResponse.json({
        success: false,
        error: 'Update not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Update deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting update:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete update',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
