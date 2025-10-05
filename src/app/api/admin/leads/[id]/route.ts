import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';
import { metaConversionsAPI } from '@/components/MetaConversionsAPI';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    
    // Validate the update data
    const allowedFields = ['status', 'notes', 'assignedTo'];
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
    
    // Get the original lead for comparison
    const originalLead = await Lead.findById(id);
    if (!originalLead) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }

    // Update the lead
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedLead) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }

    // Track lead status changes with Meta Pixel and Conversions API
    if (updateData.status && updateData.status !== originalLead.status) {
      try {
        await metaConversionsAPI.sendEvent(
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_source_url: request.headers.get('referer') || 'https://www.eduexpressint.com/admin/leads',
            action_source: 'website'
          },
          {
            email: updatedLead.email,
            phone: updatedLead.phone,
            first_name: updatedLead.name.split(' ')[0],
            last_name: updatedLead.name.split(' ').slice(1).join(' ') || '',
            country: updatedLead.countryOfInterest
          },
          {
            content_name: `Lead Status Updated: ${updateData.status}`,
            content_category: 'Lead Management',
            content_type: 'lead_status_update',
            value: updateData.status === 'Converted' ? 10 : 1,
            currency: 'USD',
            destination: updatedLead.countryOfInterest,
            program_type: updatedLead.programType,
            major: updatedLead.major,
            source: updatedLead.source,
            lead_id: updatedLead._id.toString(),
            previous_status: originalLead.status,
            new_status: updateData.status,
            status_change_reason: updateData.notes || 'Status updated by admin'
          }
        );
        
        console.log('✅ Meta tracking: Lead status update tracked successfully');
      } catch (trackingError) {
        console.error('❌ Meta tracking error:', trackingError);
        // Don't fail the update if tracking fails
      }
    }
    
    return NextResponse.json({
      success: true,
      data: updatedLead,
      message: 'Lead updated successfully'
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update lead',
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
    
    const deletedLead = await Lead.findByIdAndDelete(id);
    
    if (!deletedLead) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete lead',
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
    
    const lead = await Lead.findById(id);
    
    if (!lead) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
