import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Update from '@/models/Update';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    
    // Build query for published updates
    const query: any = {
      status: 'published',
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    };
    
    // Add type filter
    if (type && type !== 'all') {
      query.type = type;
    }
    
    // Add search filter
    if (search) {
      query.$and = [
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ]
        }
      ];
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Fetch updates with pagination
    const updates = await Update.find(query)
      .sort({ isPinned: -1, publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Update.countDocuments(query);
    
    // If no updates found, return fallback data
    if (updates.length === 0) {
      const fallbackUpdates = [
        {
          _id: 'fallback-1',
          title: 'Welcome to EduExpress International',
          content: 'We are excited to help you with your study abroad journey. Our team is dedicated to providing you with the best guidance and support for your international education goals.',
          type: 'announcement',
          priority: 'high',
          status: 'published',
          targetAudience: 'all',
          tags: ['welcome', 'announcement'],
          author: {
            id: 'admin',
            name: 'Admin',
            email: 'admin@eduexpress.info'
          },
          publishedAt: new Date().toISOString(),
          isPinned: true,
          views: 0,
          likes: 0,
          comments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      return NextResponse.json({
        success: true,
        data: {
          updates: fallbackUpdates,
          pagination: {
            page: 1,
            limit,
            total: 1,
            pages: 1
          }
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        updates,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    
    // Return fallback data on error
    const fallbackUpdates = [
      {
        _id: 'fallback-1',
        title: 'Welcome to EduExpress International',
        content: 'We are excited to help you with your study abroad journey. Our team is dedicated to providing you with the best guidance and support for your international education goals.',
        type: 'announcement',
        priority: 'high',
        status: 'published',
        targetAudience: 'all',
        tags: ['welcome', 'announcement'],
        author: {
          id: 'admin',
          name: 'Admin',
          email: 'admin@eduexpress.info'
        },
        publishedAt: new Date().toISOString(),
        isPinned: true,
        views: 0,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({
      success: true,
      data: {
        updates: fallbackUpdates,
        pagination: {
          page: 1,
          limit: 12,
          total: 1,
          pages: 1
        }
      }
    });
  }
}
