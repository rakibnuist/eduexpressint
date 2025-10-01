import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';
import { extractTrackingFromForm, extractTrackingFromRequest } from '@/lib/trackingUtils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, countryOfInterest, programType, source } = body;
    
    if (!name || !email || !phone || !countryOfInterest || !programType) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid form data',
        message: 'Missing required fields: name, email, phone, countryOfInterest, and programType are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid form data',
        message: 'Please provide a valid email address'
      }, { status: 400 });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid form data',
        message: 'Please provide a valid phone number'
      }, { status: 400 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      console.error('Database connection failed');
      return NextResponse.json({
        ok: false,
        error: 'Database connection failed',
        message: 'Unable to save your information. Please try again later.'
      }, { status: 500 });
    }

    // Check for duplicate leads (same email in last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingLead = await Lead.findOne({
      email: email,
      createdAt: { $gte: oneDayAgo }
    });

    if (existingLead) {
      return NextResponse.json({
        ok: false,
        error: 'Too many requests',
        message: 'A lead with this email was already submitted recently. Please wait 24 hours before submitting again.'
      }, { status: 429 });
    }

    // Extract tracking data from request
    const trackingData = extractTrackingFromRequest(request);
    
    // Create new lead
    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      countryOfInterest: countryOfInterest,
      programType: programType,
      major: body.major?.trim() || '',
      message: body.message?.trim() || '',
      source: source || 'CTA Form',
      status: 'New',
      priority: 'Medium',
      leadScore: 50, // Default lead score
      timeline: [{
        action: 'Lead created from CTA Form',
        timestamp: new Date(),
        notes: `Source: ${source || 'CTA Form'}`
      }],
      // Add tracking data
      ...trackingData
    };

    const newLead = new Lead(leadData);
    await newLead.save();

    console.log('New lead created:', {
      id: newLead._id,
      name: newLead.name,
      email: newLead.email,
      countryOfInterest: newLead.countryOfInterest,
      programType: newLead.programType,
      source: newLead.source
    });

    return NextResponse.json({
      ok: true,
      message: 'Lead submitted successfully',
      data: {
        id: newLead._id,
        name: newLead.name,
        email: newLead.email
      }
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json({
          ok: false,
          error: 'Duplicate entry',
          message: 'A lead with this email already exists. Please use a different email or contact us directly.'
        }, { status: 409 });
      }
      
      if (error.message.includes('validation failed')) {
        return NextResponse.json({
          ok: false,
          error: 'Invalid form data',
          message: 'Please check your form data and try again. Make sure all required fields are filled correctly.'
        }, { status: 400 });
      }
    }

    return NextResponse.json({
      ok: false,
      error: 'Failed to save lead',
      message: 'Unable to save your information. Please try again or contact us directly.'
    }, { status: 500 });
  }
}

// Optional: Add GET method for testing
export async function GET() {
  try {
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        ok: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email countryOfInterest programType source createdAt')
      .lean();

    return NextResponse.json({
      ok: true,
      data: leads
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to fetch leads'
    }, { status: 500 });
  }
}
