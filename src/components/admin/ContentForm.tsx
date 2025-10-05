'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaTimes, FaSave, FaEye, FaCode } from 'react-icons/fa';

interface Content {
  _id?: string;
  title: string;
  slug: string;
  type: 'Page' | 'Blog' | 'Landing Page' | 'News' | 'Announcement';
  author: string;
  content: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  metaDescription?: string;
  categories: string[];
  tags: string[];
  published: boolean;
}

interface ContentFormProps {
  content?: Content | null;
  onSave: (content: Content) => void;
  onCancel: () => void;
  onAutoOpen?: (slug: string) => void;
}

const CONTENT_TYPES = ['Page', 'Blog', 'Landing Page', 'News', 'Announcement'];
const AVAILABLE_CATEGORIES = [
  'Announcement',
  'Partnership', 
  'University',
  'News',
  'Success',
  'Study Abroad',
  'Scholarship',
  'Visa',
  'Application'
];

export default function ContentForm({ content, onSave, onCancel, onAutoOpen }: ContentFormProps) {
  const [formData, setFormData] = useState<Content>({
    title: '',
    slug: '',
    type: 'Page',
    author: 'Admin',
    content: '',
    featuredImage: {
      url: 'https://example.com/image.jpg',
      alt: ''
    },
    metaDescription: '',
    categories: [],
    tags: [],
    published: false
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Initialize form data when content prop changes
  useEffect(() => {
    if (content) {
      setFormData({
        _id: content._id,
        title: content.title,
        slug: content.slug,
        type: content.type,
        author: content.author,
        content: content.content,
        featuredImage: content.featuredImage || { url: 'https://example.com/image.jpg', alt: '' },
        metaDescription: content.metaDescription || '',
        categories: content.categories || [],
        tags: content.tags || [],
        published: content.published || false
      });
    }
  }, [content]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof Content, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug when title changes
    if (field === 'title' && !content) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // You can implement image upload logic here
      // For now, we'll just store the file reference
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = content?._id 
        ? `/api/admin/content/${content._id}`
        : '/api/admin/content';
      
      const method = content?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        throw new Error(`Failed to save content: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        onSave(result.data);
        
        // Auto-open the page if it's a new Page type content and published
        if (!content && formData.type === 'Page' && formData.published && onAutoOpen) {
          onAutoOpen(result.data.slug);
        }
      } else {
        throw new Error(result.error || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            {content ? 'Edit Content' : 'Add New Content'}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            <FaTimes />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter content title"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="url-friendly-slug"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Author name"
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <Label>Content</Label>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="html" className="flex items-center gap-2">
                  <FaCode className="h-4 w-4" />
                  HTML Code
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <FaEye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="html" className="mt-4">
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter HTML content here..."
                  className="min-h-[300px] font-mono text-sm"
                  required
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div 
                  className="min-h-[300px] p-4 border rounded-lg bg-gray-50 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500">No content to preview</p>' }}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.featuredImage?.url || ''}
                  onChange={(e) => handleInputChange('featuredImage', {
                    ...formData.featuredImage,
                    url: e.target.value
                  })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor="imageAlt">Alt Text</Label>
                <Input
                  id="imageAlt"
                  value={formData.featuredImage?.alt || ''}
                  onChange={(e) => handleInputChange('featuredImage', {
                    ...formData.featuredImage,
                    alt: e.target.value
                  })}
                  placeholder="Image description for accessibility"
                />
              </div>

              <div>
                <Label htmlFor="imageUpload">Or Upload Image</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">
                    {imageFile ? imageFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta Description */}
          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              placeholder="SEO meta description..."
              className="min-h-[80px]"
            />
          </div>

          {/* Categories */}
          <div>
            <Label>Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {AVAILABLE_CATEGORIES.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="study abroad, education, scholarship..."
            />
          </div>

          {/* Published */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleInputChange('published', checked)}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FaSave className="mr-2" />
              {loading ? 'Saving...' : (content ? 'Update Content' : 'Add Content')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
