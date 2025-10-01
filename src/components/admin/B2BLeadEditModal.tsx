'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FaBuilding, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendar,
  FaSave,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';

interface B2BLead {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  country: string;
  services: string[];
  status: string;
  priority: string;
  source: string;
  notes: string;
  lastContact: string;
  dealStage: string;
  createdAt: string;
  updatedAt: string;
  companySize?: string;
  city?: string;
  budget?: string;
  timeline?: string;
  assignedTo?: string;
  expectedValue?: number;
}

interface B2BLeadEditModalProps {
  lead: B2BLead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedLead: B2BLead) => void;
}

const statusOptions = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost'
];

const priorityOptions = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

const dealStageOptions = [
  'Lead',
  'Prospect',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Closed Won',
  'Closed Lost'
];

const industryOptions = [
  'Education',
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Other'
];

const companySizeOptions = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];

export default function B2BLeadEditModal({ lead, isOpen, onClose, onSave }: B2BLeadEditModalProps) {
  const [formData, setFormData] = useState<Partial<B2BLead>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lead && isOpen) {
      setFormData({
        ...lead,
        lastContact: lead.lastContact ? new Date(lead.lastContact).toISOString().split('T')[0] : ''
      });
      setErrors({});
    }
  }, [lead, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.contactPerson?.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.industry?.trim()) {
      newErrors.industry = 'Industry is required';
    }
    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.status?.trim()) {
      newErrors.status = 'Status is required';
    }
    if (!formData.priority?.trim()) {
      newErrors.priority = 'Priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Prepare the updated lead data
      const updatedLead = {
        ...formData,
        expectedValue: formData.expectedValue ? Number(formData.expectedValue) : 0,
        lastContact: formData.lastContact ? new Date(formData.lastContact).toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as B2BLead;

      // Call the onSave callback
      onSave(updatedLead);
      onClose();
    } catch (error) {
      console.error('Error saving B2B lead:', error);
      setErrors({ submit: 'Failed to save changes. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !lead) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FaBuilding className="w-5 h-5 mr-2 text-blue-600" />
            Edit B2B Lead
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <FaTimes className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {errors.submit && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <FaExclamationTriangle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-500 text-sm font-medium">{errors.submit}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FaBuilding className="w-4 h-4 mr-2 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center">
                  <FaBuilding className="w-3 h-3 mr-1 text-gray-500" />
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName || ''}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs">{errors.companyName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="flex items-center">
                  <FaUser className="w-3 h-3 mr-1 text-gray-500" />
                  Contact Person *
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-xs">{errors.contactPerson}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <FaEnvelope className="w-3 h-3 mr-1 text-gray-500" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <FaPhone className="w-3 h-3 mr-1 text-gray-500" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center">
                  <FaGlobe className="w-3 h-3 mr-1 text-gray-500" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1 text-gray-500" />
                  Country *
                </Label>
                <Input
                  id="country"
                  value={formData.country || ''}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={errors.country ? 'border-red-500' : ''}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FaDollarSign className="w-4 h-4 mr-2 text-green-600" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center">
                  Industry *
                </Label>
                <Select
                  value={formData.industry || ''}
                  onValueChange={(value) => handleChange('industry', value)}
                >
                  <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-red-500 text-xs">{errors.industry}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize" className="flex items-center">
                  Company Size
                </Label>
                <Select
                  value={formData.companySize || ''}
                  onValueChange={(value) => handleChange('companySize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedValue" className="flex items-center">
                  <FaDollarSign className="w-3 h-3 mr-1 text-gray-500" />
                  Expected Value ($)
                </Label>
                <Input
                  id="expectedValue"
                  type="number"
                  value={formData.expectedValue || ''}
                  onChange={(e) => handleChange('expectedValue', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo" className="flex items-center">
                  <FaUser className="w-3 h-3 mr-1 text-gray-500" />
                  Assigned To
                </Label>
                <Input
                  id="assignedTo"
                  value={formData.assignedTo || ''}
                  onChange={(e) => handleChange('assignedTo', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Lead Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FaCalendar className="w-4 h-4 mr-2 text-purple-600" />
              Lead Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center">
                  Status *
                </Label>
                <Select
                  value={formData.status || ''}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="flex items-center">
                  Priority *
                </Label>
                <Select
                  value={formData.priority || ''}
                  onValueChange={(value) => handleChange('priority', value)}
                >
                  <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-red-500 text-xs">{errors.priority}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealStage" className="flex items-center">
                  Deal Stage
                </Label>
                <Select
                  value={formData.dealStage || ''}
                  onValueChange={(value) => handleChange('dealStage', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select deal stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealStageOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastContact" className="flex items-center">
                  <FaCalendar className="w-3 h-3 mr-1 text-gray-500" />
                  Last Contact Date
                </Label>
                <Input
                  id="lastContact"
                  type="date"
                  value={formData.lastContact || ''}
                  onChange={(e) => handleChange('lastContact', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                placeholder="Add any additional notes about this lead..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
