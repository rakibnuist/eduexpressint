'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface Update {
  _id?: string;
  title: string;
  content: string;
  type: string;
  status: string;
  priority: string;
  targetAudience: string;
  isPinned: boolean;
  views?: number;
  likes?: number;
  publishedAt?: string;
  createdAt?: string;
  tags: string[];
}

interface UpdateFormProps {
  update?: Update | null;
  onSubmit: (updateData: Update) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UpdateForm({ update, onSubmit, onCancel, isLoading = false }: UpdateFormProps) {
  const [formData, setFormData] = useState<Update>({
    title: '',
    content: '',
    type: 'announcement',
    status: 'draft',
    priority: 'medium',
    targetAudience: 'all',
    isPinned: false,
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (update) {
      setFormData(update);
      setTagsInput(update.tags?.join(', ') || '');
    }
  }, [update]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Process tags
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    try {
      await onSubmit({
        ...formData,
        tags,
      });
    } catch (error) {
    }
  };

  const handleInputChange = (field: keyof Update, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500' : ''}
                placeholder="Enter update title"
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <option value="announcement">Announcement</option>
                <option value="news">News</option>
                <option value="update">Update</option>
                <option value="event">Event</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => handleInputChange('targetAudience', value)}
              >
                <option value="all">All Users</option>
                <option value="students">Students</option>
                <option value="parents">Parents</option>
                <option value="partners">Partners</option>
                <option value="staff">Staff</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="education, scholarship, deadline (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isPinned">Pin to Top</Label>
                <p className="text-sm text-gray-500">Show this update at the top of the list</p>
              </div>
              <Switch
                id="isPinned"
                checked={formData.isPinned}
                onCheckedChange={(checked) => handleInputChange('isPinned', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className={errors.content ? 'border-red-500' : ''}
              placeholder="Enter the update content..."
              rows={8}
            />
            {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length} characters (minimum 50 required)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : update ? 'Update' : 'Create Update'}
        </Button>
      </div>
    </form>
  );
}
