import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import StudentSuccessStory from '@/models/StudentSuccessStory';
import { DatabaseValidator, withDatabaseValidation } from '@/lib/database-validation';

// Helper function to check authentication and get user info
async function checkAuth(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    
    if (!session || session.value !== 'authenticated') {
      return null;
    }
    
    // Get user info from Authorization header if available
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // For now, we'll use a default admin user since we don't have JWT parsing
      return {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@eduexpert.com'
      };
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

// GET - Fetch a single success story
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

    const successStory = await StudentSuccessStory.findById(params.id);
    
    if (!successStory) {
      return NextResponse.json({
        success: false,
        error: 'Success story not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: successStory
    });
  } catch (error) {
    console.error('Error fetching success story:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch success story',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT - Update a success story
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
    const validation = DatabaseValidator.validateSuccessStoryData(body);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        message: validation.message
      }, { status: 400 });
    }
    
    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, views, likes, shares, ...updateData } = body;
    
    // Use database validation wrapper
    const result = await withDatabaseValidation(
      async () => {
        return await StudentSuccessStory.findByIdAndUpdate(
          params.id,
          { 
            ...updateData,
            updatedAt: new Date()
          },
          { new: true, runValidators: true }
        );
      },
      'UPDATE_SUCCESS_STORY',
      'successstories',
      updateData
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: result.message
      }, { status: 500 });
    }

    const successStory = result.data;
    
    if (!successStory) {
      return NextResponse.json({
        success: false,
        error: 'Success story not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: successStory,
      message: 'Success story updated successfully'
    });
  } catch (error) {
    console.error('Error updating success story:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update success story',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Delete a success story
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

    const successStory = await StudentSuccessStory.findByIdAndDelete(params.id);
    
    if (!successStory) {
      return NextResponse.json({
        success: false,
        error: 'Success story not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Success story deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting success story:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete success story',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
