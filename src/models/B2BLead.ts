import mongoose, { Schema, Document } from 'mongoose';

export interface IB2BLead extends Document {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+' | '1000+';
  country?: string;
  city?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  priority?: 'High' | 'Medium' | 'Low';
  source?: string;
  notes?: string;
  lastContact?: Date;
  assignedTo?: string;
  expectedValue?: number;
  dealStage?: 'Lead' | 'Prospect' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  // Meta (Facebook) Tracking
  metaTracking?: {
    fbclid?: string;
    campaignId?: string;
    adsetId?: string;
    adId?: string;
    campaignName?: string;
    adsetName?: string;
    adName?: string;
    placement?: string;
    deviceType?: string;
    platform?: string;
  };
  // Google Tag Manager Tracking
  gtmTracking?: {
    gclid?: string;
    campaignId?: string;
    adgroupId?: string;
    keywordId?: string;
    campaignName?: string;
    adgroupName?: string;
    keyword?: string;
    matchType?: string;
    deviceType?: string;
    network?: string;
    placement?: string;
  };
  // UTM Parameters
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

const B2BLeadSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  industry: { type: String },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+', '1000+'],
  },
  country: { type: String },
  city: { type: String },
  services: [{ type: String }],
  budget: { type: String },
  timeline: { type: String },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  source: { type: String, default: 'Website' },
  notes: { type: String },
  lastContact: { type: Date, default: Date.now },
  assignedTo: { type: String },
  expectedValue: { type: Number },
  dealStage: {
    type: String,
    enum: ['Lead', 'Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Closed'],
    default: 'Lead'
  },
  // Meta (Facebook) Tracking
  metaTracking: {
    fbclid: { type: String },
    campaignId: { type: String },
    adsetId: { type: String },
    adId: { type: String },
    campaignName: { type: String },
    adsetName: { type: String },
    adName: { type: String },
    placement: { type: String },
    deviceType: { type: String },
    platform: { type: String }
  },
  // Google Tag Manager Tracking
  gtmTracking: {
    gclid: { type: String },
    campaignId: { type: String },
    adgroupId: { type: String },
    keywordId: { type: String },
    campaignName: { type: String },
    adgroupName: { type: String },
    keyword: { type: String },
    matchType: { type: String },
    deviceType: { type: String },
    network: { type: String },
    placement: { type: String }
  },
  // UTM Parameters
  utmParams: {
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    utm_term: { type: String },
    utm_content: { type: String }
  }
}, { timestamps: true });

// Indexes for better performance
B2BLeadSchema.index({ email: 1 });
B2BLeadSchema.index({ companyName: 1 });
B2BLeadSchema.index({ status: 1, priority: 1 });
B2BLeadSchema.index({ industry: 1 });
B2BLeadSchema.index({ country: 1 });
B2BLeadSchema.index({ assignedTo: 1 });
B2BLeadSchema.index({ dealStage: 1 });
B2BLeadSchema.index({ createdAt: -1 });
B2BLeadSchema.index({ lastContact: -1 });
B2BLeadSchema.index({ expectedValue: -1 });
// Tracking indexes
B2BLeadSchema.index({ 'metaTracking.fbclid': 1 });
B2BLeadSchema.index({ 'metaTracking.campaignId': 1 });
B2BLeadSchema.index({ 'gtmTracking.gclid': 1 });
B2BLeadSchema.index({ 'gtmTracking.campaignId': 1 });
B2BLeadSchema.index({ 'utmParams.utm_source': 1 });
B2BLeadSchema.index({ 'utmParams.utm_campaign': 1 });

// Virtual for deal age in days
B2BLeadSchema.virtual('dealAge').get(function(this: any) {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Static method to get B2B leads by status
B2BLeadSchema.statics.getByStatus = function(status: string, limit = 50) {
  return this.find({ status })
    .sort({ priority: -1, expectedValue: -1 })
    .limit(limit);
};

// Static method to get high-value deals
B2BLeadSchema.statics.getHighValue = function(minValue = 10000, limit = 20) {
  return this.find({ 
    expectedValue: { $gte: minValue },
    status: { $nin: ['Closed Won', 'Closed Lost'] }
  })
    .sort({ expectedValue: -1, priority: -1 })
    .limit(limit);
};

export default mongoose.models.B2BLead || mongoose.model<IB2BLead>('B2BLead', B2BLeadSchema);
