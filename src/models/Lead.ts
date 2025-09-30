import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  dob?: Date;
  email: string;
  phone?: string;
  countryOfInterest?: string;
  programType?: 'Bachelor' | 'Masters' | 'PhD' | 'Language' | 'Foundation' | 'Non Degree';
  major?: string;
  message?: string;
  destination?: string;
  university?: string;
  program?: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Application Submitted' | 'Under Review' | 'Interview Scheduled' | 'Interview Completed' | 'Accepted' | 'Waitlisted' | 'Rejected' | 'VISA Processing' | 'VISA Approved' | 'Enrolled' | 'Deferred' | 'Withdrawn';
  priority?: 'High' | 'Medium' | 'Low';
  source?: string;
  budget?: string;
  intake?: string;
  notes?: string;
  lastContact?: Date;
  leadScore?: number;
  tags?: string[];
  assignedTo?: string;
  sourceDetails?: {
    campaign?: string;
    medium?: string;
    referrer?: string;
    landingPage?: string;
  };
  timeline?: Array<{
    action: string;
    timestamp: Date;
    notes?: string;
    performedBy?: string;
  }>;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  email: { type: String, required: true },
  phone: { type: String },
  countryOfInterest: { type: String },
  programType: {
    type: String,
    enum: ['Bachelor', 'Masters', 'PhD', 'Language', 'Foundation', 'Non Degree'],
  },
  major: { type: String },
  message: { type: String },
  destination: { type: String },
  university: { type: String },
  program: { type: String },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Application Submitted', 'Under Review', 'Interview Scheduled', 'Interview Completed', 'Accepted', 'Waitlisted', 'Rejected', 'VISA Processing', 'VISA Approved', 'Enrolled', 'Deferred', 'Withdrawn'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  source: { type: String, default: 'Website' },
  budget: { type: String },
  intake: { type: String },
  notes: { type: String },
  lastContact: { type: Date, default: Date.now },
  leadScore: { type: Number, default: 0, min: 0, max: 100 },
  tags: [{ type: String }],
  assignedTo: { type: String },
  sourceDetails: {
    campaign: { type: String },
    medium: { type: String },
    referrer: { type: String },
    landingPage: { type: String }
  },
  timeline: [{
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
    performedBy: { type: String }
  }]
}, { timestamps: true });

// Indexes for better performance
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1, priority: 1 });
LeadSchema.index({ countryOfInterest: 1 });
LeadSchema.index({ programType: 1 });
LeadSchema.index({ assignedTo: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ lastContact: -1 });

// Virtual for lead age in days
LeadSchema.virtual('leadAge').get(function(this: any) {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Static method to get leads by status
LeadSchema.statics.getByStatus = function(status: string, limit = 50) {
  return this.find({ status })
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to get leads by assigned user
LeadSchema.statics.getByAssignee = function(assignedTo: string, limit = 50) {
  return this.find({ assignedTo })
    .sort({ priority: -1, lastContact: -1 })
    .limit(limit);
};

// Static method to get high-priority leads
LeadSchema.statics.getHighPriority = function(limit = 20) {
  return this.find({ priority: 'High', status: { $nin: ['Enrolled', 'Rejected', 'Withdrawn'] } })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Pre-save middleware to update lastContact when status changes
LeadSchema.pre('save', function(this: any, next) {
  if (this.isModified('status') && this.status !== 'New') {
    this.lastContact = new Date();
    
    // Add to timeline
    if (!this.timeline) this.timeline = [];
    this.timeline.push({
      action: `Status changed to ${this.status}`,
      timestamp: new Date()
    });
  }
  next();
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);