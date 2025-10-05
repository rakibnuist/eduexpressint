import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import Content from '@/models/Content';
import mongoose from 'mongoose';

// Helper function to check authentication
async function checkAuth(request: Request) {
  try {
    // Check for Bearer token in Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // For now, accept any non-empty token (you can add proper JWT validation later)
      if (token && token.length > 0) {
        return true;
      }
    }
    
    // Fallback to cookie-based authentication
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

// GET - Fetch single content by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json(
        { success: false, error: 'Database not connected' },
        { status: 500 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content ID' },
        { status: 400 }
      );
    }

    const content = await Content.findById(params.id).lean();

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT - Update content by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json(
        { success: false, error: 'Database not connected' },
        { status: 500 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      type,
      author,
      content,
      featuredImage,
      metaDescription,
      categories,
      tags,
      published
    } = body;

    // Check if content exists
    const existingContent = await Content.findById(params.id);
    if (!existingContent) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingContent.slug) {
      const slugExists = await Content.findOne({ slug, _id: { $ne: params.id } });
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update content
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (type !== undefined) updateData.type = type;
    if (author !== undefined) updateData.author = author;
    if (content !== undefined) updateData.content = content;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (categories !== undefined) updateData.categories = categories;
    if (tags !== undefined) updateData.tags = tags;
    if (published !== undefined) {
      updateData.published = published;
      // Set publishedAt if being published for the first time
      if (published && !existingContent.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updatedContent = await Content.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedContent,
      message: 'Content updated successfully'
    });

  } catch (error) {
    console.error('Error updating content:', error);
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE - Delete content by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json(
        { success: false, error: 'Database not connected' },
        { status: 500 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content ID' },
        { status: 400 }
      );
    }

    const content = await Content.findByIdAndDelete(params.id);

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}
