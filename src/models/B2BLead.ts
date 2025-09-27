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
  status?: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiating' | 'Closed Won' | 'Closed Lost';
  priority?: 'High' | 'Medium' | 'Low';
  source?: string;
  notes?: string;
  lastContact?: Date;
  assignedTo?: string;
  expectedValue?: number;
  dealStage?: 'Lead' | 'Prospect' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
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
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiating', 'Closed Won', 'Closed Lost'],
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
  }
}, { timestamps: true });

export default mongoose.models.B2BLead || mongoose.model<IB2BLead>('B2BLead', B2BLeadSchema);
