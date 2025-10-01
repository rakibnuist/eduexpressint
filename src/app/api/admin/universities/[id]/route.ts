import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import University from '@/models/University';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { id } = params;
    
    // Update university
    const updatedUniversity = await University.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedUniversity) {
      return NextResponse.json({
        success: false,
        error: 'University not found',
        message: 'University with the given ID was not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: updatedUniversity,
      message: 'University updated successfully'
    });
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update university',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Delete university
    const deletedUniversity = await University.findByIdAndDelete(id);
    
    if (!deletedUniversity) {
      return NextResponse.json({
        success: false,
        error: 'University not found',
        message: 'University with the given ID was not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: deletedUniversity,
      message: 'University deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete university',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Get single university
    const university = await University.findById(id);
    
    if (!university) {
      return NextResponse.json({
        success: false,
        error: 'University not found',
        message: 'University with the given ID was not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: university,
      message: 'University fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching university:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch university',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
