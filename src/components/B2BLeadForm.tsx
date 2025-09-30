'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface B2BLead {
  _id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  country?: string;
  city?: string;
  status: string;
  priority: string;
  dealStage: string;
  expectedValue?: number;
  source: string;
  services?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  lastContact?: string;
  assignedTo?: string;
}

interface B2BLeadFormProps {
  lead?: B2BLead | null;
  onSubmit: (leadData: B2BLead) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function B2BLeadForm({ lead, onSubmit, onCancel, isLoading = false }: B2BLeadFormProps) {
  const [formData, setFormData] = useState<B2BLead>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    companySize: '',
    country: '',
    city: '',
    status: 'New',
    priority: 'High',
    dealStage: 'Lead',
    expectedValue: undefined,
    source: 'B2B Partnership Page',
    services: [],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [servicesInput, setServicesInput] = useState('');

  useEffect(() => {
    if (lead) {
      setFormData(lead);
      setServicesInput(lead.services?.join(', ') || '');
    }
  }, [lead]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Process services
    const services = servicesInput.split(',').map(service => service.trim()).filter(service => service.length > 0);

    try {
      await onSubmit({
        ...formData,
        services,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof B2BLead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={errors.companyName ? 'border-red-500' : ''}
                placeholder="Enter company name"
              />
              {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className={errors.website ? 'border-red-500' : ''}
                placeholder="https://company.com"
              />
              {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website}</p>}
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry || ''}
                onValueChange={(value) => handleInputChange('industry', value)}
              >
                <option value="">Select industry</option>
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Consulting">Consulting</option>
                <option value="Government">Government</option>
                <option value="Non-profit">Non-profit</option>
                <option value="Other">Other</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                value={formData.companySize || ''}
                onValueChange={(value) => handleInputChange('companySize', value)}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                className={errors.contactPerson ? 'border-red-500' : ''}
                placeholder="Enter contact person name"
              />
              {errors.contactPerson && <p className="text-sm text-red-500 mt-1">{errors.contactPerson}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country || ''}
                  onValueChange={(value) => handleInputChange('country', value)}
                >
                  <option value="">Select country</option>
                  <option value="UK">United Kingdom</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Finland">Finland</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Negotiating">Negotiating</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="dealStage">Deal Stage</Label>
              <Select
                value={formData.dealStage}
                onValueChange={(value) => handleInputChange('dealStage', value)}
              >
                <option value="Lead">Lead</option>
                <option value="Prospect">Prospect</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed">Closed</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="expectedValue">Expected Value ($)</Label>
              <Input
                id="expectedValue"
                type="number"
                value={formData.expectedValue || ''}
                onChange={(e) => handleInputChange('expectedValue', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Enter expected deal value"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="source">Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleInputChange('source', value)}
              >
                <option value="B2B Partnership Page">B2B Partnership Page</option>
                <option value="Referral">Referral</option>
                <option value="Cold Outreach">Cold Outreach</option>
                <option value="Event">Event</option>
                <option value="Social Media">Social Media</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Services & Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Services & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="services">Services of Interest</Label>
              <Input
                id="services"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                placeholder="university applications, visa assistance, career guidance (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate services with commas</p>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes about the lead..."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : lead ? 'Update B2B Lead' : 'Create B2B Lead'}
        </Button>
      </div>
    </form>
  );
}
