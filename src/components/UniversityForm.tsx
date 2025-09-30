'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
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
    fees: {
      application: 0,
      tuition: {
        amount: 0,
        currency: 'USD',
      },
      entries: [],
    },
    faqs: [],
    requirements: {
      general: [],
      documents: [],
      languageTests: [],
    },
    isActive: true,
    isFeatured: false,
    priority: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (university) {
      setFormData(university);
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
                value={formData.country}
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
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Community">Community</option>
                <option value="Research">Research</option>
                <option value="Technical">Technical</option>
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
