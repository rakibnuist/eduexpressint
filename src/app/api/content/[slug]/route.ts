import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Content from '@/models/Content';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Try to connect to database
    await dbConnect();
    
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json({
        success: false,
        error: 'Content slug is required'
      }, { status: 400 });
    }

    try {
      // Find content by slug and ensure it's published
      const content = await Content.findOne({ 
        slug: slug,
        published: true 
      }).lean();
      
      if (!content) {
        return NextResponse.json({
          success: false,
          error: 'Content not found or not published'
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: content
      });
    } catch (error) {
      console.error('Error fetching content by slug:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch content',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in content API:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Database connection failed'
    }, { status: 500 });
  }
}
