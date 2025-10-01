'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { IUniversity } from '@/models/University';

type University = IUniversity;

interface UniversityFormProps {
  university?: University | null;
  onSubmit: (universityData: University) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UniversityForm({ university, onSubmit, onCancel, isLoading = false }: UniversityFormProps) {
  const [formData, setFormData] = useState<Partial<University>>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    country: '',
    destination: '',
    city: '',
    type: 'Public',
    logoUrl: '',
    coverImageUrl: '',
    ranking: {
      global: undefined,
      national: undefined,
    },
    programs: [],
    scholarships: [],
    conditions: [],
    fees: [],
    faqs: [],
    requirements: {
      general: [],
      documents: [],
      languageTests: [],
    },
    seo: {
      title: '',
      description: '',
      keywords: [],
    },
    isActive: true,
    isFeatured: false,
    priority: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || '',
        slug: university.slug || '',
        description: university.description || '',
        shortDescription: university.shortDescription || '',
        country: university.country || '',
        destination: university.destination || '',
        city: university.city || '',
        type: university.type || 'Public',
        logoUrl: university.logoUrl || '',
        coverImageUrl: university.coverImageUrl || '',
        ranking: university.ranking || { global: undefined, national: undefined },
        programs: Array.isArray(university.programs) ? university.programs : [],
        scholarships: Array.isArray(university.scholarships) ? university.scholarships : [],
        conditions: Array.isArray(university.conditions) ? university.conditions : [],
        fees: Array.isArray(university.fees) ? university.fees : [],
        faqs: Array.isArray(university.faqs) ? university.faqs : [],
        requirements: university.requirements ? {
          general: Array.isArray(university.requirements.general) ? university.requirements.general : [],
          documents: Array.isArray(university.requirements.documents) ? university.requirements.documents : [],
          languageTests: Array.isArray(university.requirements.languageTests) ? university.requirements.languageTests : [],
        } : {
          general: [],
          documents: [],
          languageTests: [],
        },
        seo: university.seo ? {
          title: university.seo.title || '',
          description: university.seo.description || '',
          keywords: Array.isArray(university.seo.keywords) ? university.seo.keywords : [],
        } : {
          title: '',
          description: '',
          keywords: [],
        },
        isActive: university.isActive !== undefined ? university.isActive : true,
        isFeatured: university.isFeatured !== undefined ? university.isFeatured : false,
        priority: university.priority || 0,
      });
    }
  }, [university]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'University name is required';
    }

    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.destination?.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.shortDescription?.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (formData.logoUrl && !/^https?:\/\/.+/.test(formData.logoUrl)) {
      newErrors.logoUrl = 'Please enter a valid logo URL';
    }

    if (formData.coverImageUrl && !/^https?:\/\/.+/.test(formData.coverImageUrl)) {
      newErrors.coverImageUrl = 'Please enter a valid cover image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        ...formData,
        slug: formData.slug || formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
      } as any);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof University, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRankingChange = (field: 'global' | 'national', value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setFormData(prev => ({
      ...prev,
      ranking: {
        ...prev.ranking,
        [field]: numValue,
      },
    }));
  };

  // Helper functions for managing dynamic arrays
  const addArrayItem = (field: keyof University, item: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[] || []), item],
    }));
  };

  const updateArrayItem = (field: keyof University, index: number, item: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[] || []).map((existingItem, i) => 
        i === index ? item : existingItem
      ),
    }));
  };

  const removeArrayItem = (field: keyof University, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[] || []).filter((_, i) => i !== index),
    }));
  };

  const addStringArrayItem = (field: keyof University, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[] || []), value.trim()],
      }));
    }
  };

  const removeStringArrayItem = (field: keyof University, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[] || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">University Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Enter university name"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="Auto-generated from name"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country || ''}
                onValueChange={(value) => handleInputChange('country', value)}
              >
                <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Netherlands">Netherlands</SelectItem>
                  <SelectItem value="South Korea">South Korea</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="Hungary">Hungary</SelectItem>
                  <SelectItem value="Croatia">Croatia</SelectItem>
                  <SelectItem value="Cyprus">Cyprus</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Finland">Finland</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
                placeholder="Enter city name"
              />
              {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className={errors.destination ? 'border-red-500' : ''}
                placeholder="Enter destination (e.g., china, uk, south-korea)"
              />
              {errors.destination && <p className="text-sm text-red-500 mt-1">{errors.destination}</p>}
            </div>

            <div>
              <Label htmlFor="type">University Type *</Label>
              <Select
                value={formData.type || 'Public'}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select university type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl || ''}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                className={errors.logoUrl ? 'border-red-500' : ''}
                placeholder="https://university.edu/logo.png"
              />
              {errors.logoUrl && <p className="text-sm text-red-500 mt-1">{errors.logoUrl}</p>}
            </div>

            <div>
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                value={formData.coverImageUrl || ''}
                onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
                className={errors.coverImageUrl ? 'border-red-500' : ''}
                placeholder="https://university.edu/cover.jpg"
              />
              {errors.coverImageUrl && <p className="text-sm text-red-500 mt-1">{errors.coverImageUrl}</p>}
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">Higher numbers appear first (0-100)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="globalRanking">Global Ranking</Label>
                <Input
                  id="globalRanking"
                  type="number"
                  value={formData.ranking?.global || ''}
                  onChange={(e) => handleRankingChange('global', e.target.value)}
                  placeholder="e.g., 1"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="nationalRanking">National Ranking</Label>
                <Input
                  id="nationalRanking"
                  type="number"
                  value={formData.ranking?.national || ''}
                  onChange={(e) => handleRankingChange('national', e.target.value)}
                  placeholder="e.g., 5"
                  min="1"
                />
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">University Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
              placeholder="Enter a detailed description of the university..."
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription || ''}
              onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              placeholder="Enter a brief description for SEO purposes..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SEO Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={formData.seo?.title || ''}
              onChange={(e) => handleInputChange('seo', { ...formData.seo, title: e.target.value })}
              placeholder="University Name - Programs & Scholarships"
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seo?.description || ''}
              onChange={(e) => handleInputChange('seo', { ...formData.seo, description: e.target.value })}
              placeholder="Brief description for search engines..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add keyword (e.g., study abroad, scholarships)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        addStringArrayItem('seo', value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                    if (input?.value.trim()) {
                      addStringArrayItem('seo', input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.seo?.keywords || [])?.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem('seo', index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scholarships */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scholarships</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {(formData.scholarships || [])?.map((scholarship, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Scholarship {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('scholarships', index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Scholarship Name</Label>
                    <Input
                      value={scholarship.name || ''}
                      onChange={(e) => updateArrayItem('scholarships', index, { ...scholarship, name: e.target.value })}
                      placeholder="e.g., Category 1 – Tuition Fee: 100% Free"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={scholarship.type || 'university'}
                      onValueChange={(value) => updateArrayItem('scholarships', index, { ...scholarship, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select scholarship type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="provencial">Provincial</SelectItem>
                        <SelectItem value="departmental">Departmental</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={scholarship.currency || 'USD'}
                      onValueChange={(value) => updateArrayItem('scholarships', index, { ...scholarship, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="CNY">CNY</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tuition Fee</Label>
                    <Input
                      value={scholarship.value?.tuitionFee || ''}
                      onChange={(e) => updateArrayItem('scholarships', index, { 
                        ...scholarship, 
                        value: { ...scholarship.value, tuitionFee: e.target.value }
                      })}
                      placeholder="e.g., 100% Free or 5000 CNY/Year"
                    />
                  </div>
                  <div>
                    <Label>After Scholarship Fee</Label>
                    <Input
                      value={scholarship.value?.afterScholarshipFee || ''}
                      onChange={(e) => updateArrayItem('scholarships', index, { 
                        ...scholarship, 
                        value: { ...scholarship.value, afterScholarshipFee: e.target.value }
                      })}
                      placeholder="e.g., Tuition Fee: 5000 CNY/Year"
                    />
                  </div>
                  <div>
                    <Label>Monthly Stipend</Label>
                    <Input
                      value={scholarship.value?.monthlyStipend || ''}
                      onChange={(e) => updateArrayItem('scholarships', index, { 
                        ...scholarship, 
                        value: { ...scholarship.value, monthlyStipend: e.target.value }
                      })}
                      placeholder="e.g., 2000 CNY/month"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={scholarship.description || ''}
                    onChange={(e) => updateArrayItem('scholarships', index, { ...scholarship, description: e.target.value })}
                    placeholder="Detailed description of the scholarship..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('scholarships', {
                name: '',
                type: 'university',
                currency: 'USD',
                value: {
                  tuitionFee: '',
                  afterScholarshipFee: '',
                  monthlyStipend: '',
                },
                description: '',
              })}
            >
              Add Scholarship
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scholarship Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add condition (e.g., Category 1 – International Economics and Trade, Tourism Management)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      addStringArrayItem('conditions', value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                  if (input?.value.trim()) {
                    addStringArrayItem('conditions', input.value);
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.conditions || [])?.map((condition, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{condition}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeStringArrayItem('conditions', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {(formData.programs || [])?.map((program, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Program {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('programs', index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Program Name</Label>
                    <Input
                      value={program.name || ''}
                      onChange={(e) => updateArrayItem('programs', index, { ...program, name: e.target.value })}
                      placeholder="e.g., International Economics and Trade"
                    />
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Select
                      value={program.level || 'Bachelor'}
                      onValueChange={(value) => updateArrayItem('programs', index, { ...program, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Bachelor">Bachelor</SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Duration (years)</Label>
                    <Input
                      type="number"
                      value={program.duration || ''}
                      onChange={(e) => updateArrayItem('programs', index, { ...program, duration: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g., 4"
                      min="0.5"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <Label>Tuition Amount</Label>
                    <Input
                      type="number"
                      value={program.tuition?.amount || ''}
                      onChange={(e) => updateArrayItem('programs', index, { 
                        ...program, 
                        tuition: { ...program.tuition, amount: parseFloat(e.target.value) || 0 }
                      })}
                      placeholder="e.g., 23000"
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={program.tuition?.currency || 'USD'}
                      onValueChange={(value) => updateArrayItem('programs', index, { 
                        ...program, 
                        tuition: { ...program.tuition, currency: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="CNY">CNY</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('programs', {
                name: '',
                level: 'Bachelor',
                duration: 4,
                tuition: {
                  amount: 0,
                  currency: 'USD',
                },
              })}
            >
              Add Program
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fees */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {Array.isArray(formData.fees) ? formData.fees.map((fee, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Fee Entry {index + 1}</h5>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('fees', index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <Label>Type</Label>
                    <Input
                      value={fee.type || ''}
                      onChange={(e) => updateArrayItem('fees', index, { ...fee, type: e.target.value })}
                      placeholder="e.g., Application Fee"
                    />
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input
                      value={fee.amount || ''}
                      onChange={(e) => updateArrayItem('fees', index, { ...fee, amount: e.target.value })}
                      placeholder="e.g., 800"
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={fee.currency || 'USD'}
                      onValueChange={(value) => updateArrayItem('fees', index, { ...fee, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="CNY">CNY</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={fee.description || ''}
                      onChange={(e) => updateArrayItem('fees', index, { ...fee, description: e.target.value })}
                      placeholder="e.g., Non-refundable application fee"
                    />
                  </div>
                </div>
              </div>
            )) : null}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('fees', {
                type: '',
                amount: '',
                currency: 'USD',
                description: ''
              })}
            >
              Add Fee Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Requirements */}
          <div>
            <Label>General Requirements</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add general requirement (e.g., High school diploma or equivalent)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        const newRequirements = [...(formData.requirements?.general || []), value.trim()];
                        handleInputChange('requirements', { ...formData.requirements, general: newRequirements });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                    if (input?.value.trim()) {
                      const newRequirements = [...(formData.requirements?.general || []), input.value.trim()];
                      handleInputChange('requirements', { ...formData.requirements, general: newRequirements });
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {(formData.requirements?.general || [])?.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1">{req}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newRequirements = formData.requirements?.general?.filter((_, i) => i !== index) || [];
                        handleInputChange('requirements', { ...formData.requirements, general: newRequirements });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <Label>Required Documents</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add required document (e.g., Application form)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        const newDocuments = [...(formData.requirements?.documents || []), value.trim()];
                        handleInputChange('requirements', { ...formData.requirements, documents: newDocuments });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                    if (input?.value.trim()) {
                      const newDocuments = [...(formData.requirements?.documents || []), input.value.trim()];
                      handleInputChange('requirements', { ...formData.requirements, documents: newDocuments });
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {(formData.requirements?.documents || [])?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1">{doc}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDocuments = formData.requirements?.documents?.filter((_, i) => i !== index) || [];
                        handleInputChange('requirements', { ...formData.requirements, documents: newDocuments });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Language Tests */}
          <div>
            <Label>Language Tests</Label>
            <div className="space-y-3">
              {(formData.requirements?.languageTests || [])?.map((test, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Language Test {index + 1}</h5>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newTests = formData.requirements?.languageTests?.filter((_, i) => i !== index) || [];
                        handleInputChange('requirements', { ...formData.requirements, languageTests: newTests });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <Label>Test Name</Label>
                      <Input
                        value={test.test || ''}
                        onChange={(e) => {
                          const newTests = formData.requirements?.languageTests?.map((item, i) => 
                            i === index ? { ...item, test: e.target.value } : item
                          ) || [];
                          handleInputChange('requirements', { ...formData.requirements, languageTests: newTests });
                        }}
                        placeholder="e.g., IELTS"
                      />
                    </div>
                    <div>
                      <Label>Minimum Score</Label>
                      <Input
                        value={test.minScore || ''}
                        onChange={(e) => {
                          const newTests = formData.requirements?.languageTests?.map((item, i) => 
                            i === index ? { ...item, minScore: e.target.value } : item
                          ) || [];
                          handleInputChange('requirements', { ...formData.requirements, languageTests: newTests });
                        }}
                        placeholder="e.g., 6.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newTests = [...(formData.requirements?.languageTests || []), {
                    test: '',
                    minScore: '',
                  }];
                  handleInputChange('requirements', { ...formData.requirements, languageTests: newTests });
                }}
              >
                Add Language Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {(formData.faqs || [])?.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">FAQ {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('faqs', index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => updateArrayItem('faqs', index, { ...faq, question: e.target.value })}
                      placeholder="e.g., What are the admission requirements?"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateArrayItem('faqs', index, { ...faq, answer: e.target.value })}
                      placeholder="Detailed answer to the question..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('faqs', {
                question: '',
                answer: '',
              })}
            >
              Add FAQ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isActive">Active</Label>
              <p className="text-sm text-gray-500">Show this university on the website</p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isFeatured">Featured</Label>
              <p className="text-sm text-gray-500">Highlight this university as featured</p>
            </div>
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : university ? 'Update University' : 'Create University'}
        </Button>
      </div>
    </form>
  );
}
