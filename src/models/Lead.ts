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
  lastContact: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);