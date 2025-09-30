'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaPlus, FaTimes, FaSave } from 'react-icons/fa';

interface StudentSuccessStory {
  _id?: string;
  studentName: string;
  studentImage?: string;
  studentAge?: number;
  studentNationality: string;
  studentEmail?: string;
  studentLinkedIn?: string;
  university: string;
  universityCountry: string;
  program: string;
  programLevel: 'Bachelor' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation' | 'Certificate';
  graduationYear: number;
  gpa?: number;
  title: string;
  story: string;
  shortDescription: string;
  keyAchievements: string[];
  challenges: string[];
  advice: string[];
  images?: string[];
  videoUrl?: string;
  testimonialQuote?: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  priority: number;
  views: number;
  likes: number;
  shares: number;
}

interface SuccessStoryFormProps {
  initialData?: StudentSuccessStory | null;
  onSubmit: (data: StudentSuccessStory) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit' | 'view';
}

export default function SuccessStoryForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  mode
}: SuccessStoryFormProps) {
  const [formData, setFormData] = useState<StudentSuccessStory>({
    studentName: '',
    studentImage: '',
    studentAge: undefined,
    studentNationality: '',
    studentEmail: '',
    studentLinkedIn: '',
    university: '',
    universityCountry: '',
    program: '',
    programLevel: 'Bachelor',
    graduationYear: new Date().getFullYear(),
    gpa: undefined,
    title: '',
    story: '',
    shortDescription: '',
    keyAchievements: [''],
    challenges: [''],
    advice: [''],
    images: [],
    videoUrl: '',
    testimonialQuote: '',
    tags: [],
    isFeatured: false,
    isPublished: false,
    priority: 0,
    views: 0,
    likes: 0,
    shares: 0,
    ...initialData
  });

  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');

  const programLevels = [
    'Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland',
    'Austria', 'Belgium', 'Ireland', 'New Zealand', 'Singapore', 'Japan',
    'South Korea', 'China', 'Hong Kong', 'Malaysia', 'Thailand', 'India'
  ];

  const handleInputChange = (field: keyof StudentSuccessStory, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayItemChange = (field: 'keyAchievements' | 'challenges' | 'advice', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'keyAchievements' | 'challenges' | 'advice') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'keyAchievements' | 'challenges' | 'advice', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images?.includes(newImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== imageToRemove) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty array items
    const cleanedData = {
      ...formData,
      keyAchievements: formData.keyAchievements.filter(item => item.trim() !== ''),
      challenges: formData.challenges.filter(item => item.trim() !== ''),
      advice: formData.advice.filter(item => item.trim() !== ''),
    };

    await onSubmit(cleanedData);
  };

  const isReadOnly = mode === 'view';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Basic information about the student</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="Enter student's full name"
                required
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="studentAge">Age</Label>
              <Input
                id="studentAge"
                type="number"
                value={formData.studentAge || ''}
                onChange={(e) => handleInputChange('studentAge', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Student's age"
                min="16"
                max="50"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentNationality">Nationality *</Label>
              <Input
                id="studentNationality"
                value={formData.studentNationality}
                onChange={(e) => handleInputChange('studentNationality', e.target.value)}
                placeholder="Student's nationality"
                required
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input
                id="studentEmail"
                type="email"
                value={formData.studentEmail || ''}
                onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                placeholder="Student's email"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentImage">Profile Image URL</Label>
              <Input
                id="studentImage"
                value={formData.studentImage || ''}
                onChange={(e) => handleInputChange('studentImage', e.target.value)}
                placeholder="URL to student's profile image"
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="studentLinkedIn">LinkedIn Profile</Label>
              <Input
                id="studentLinkedIn"
                value={formData.studentLinkedIn || ''}
                onChange={(e) => handleInputChange('studentLinkedIn', e.target.value)}
                placeholder="LinkedIn profile URL"
                disabled={isReadOnly}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <CardDescription>Details about the student's academic journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="university">University *</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                placeholder="University name"
                required
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="universityCountry">Country *</Label>
              <Select
                value={formData.universityCountry}
                onValueChange={(value) => handleInputChange('universityCountry', value)}
                disabled={isReadOnly}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="program">Program *</Label>
              <Input
                id="program"
                value={formData.program}
                onChange={(e) => handleInputChange('program', e.target.value)}
                placeholder="Program/degree name"
                required
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="programLevel">Program Level *</Label>
              <Select
                value={formData.programLevel}
                onValueChange={(value) => handleInputChange('programLevel', value)}
                disabled={isReadOnly}
              >
                {programLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="graduationYear">Graduation Year *</Label>
              <Input
                id="graduationYear"
                type="number"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                placeholder="Year of graduation"
                min="2000"
                max="2030"
                required
                disabled={isReadOnly}
              />
            </div>
            <div>
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                value={formData.gpa || ''}
                onChange={(e) => handleInputChange('gpa', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="GPA (0.0 - 4.0)"
                min="0"
                max="4"
                disabled={isReadOnly}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Content */}
      <Card>
        <CardHeader>
          <CardTitle>Story Content</CardTitle>
          <CardDescription>The main content of the success story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Story Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Compelling title for the success story"
              required
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              placeholder="Brief description of the success story (max 500 characters)"
              maxLength={500}
              required
              disabled={isReadOnly}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.shortDescription.length}/500 characters
            </p>
          </div>

          <div>
            <Label htmlFor="story">Full Story *</Label>
            <Textarea
              id="story"
              value={formData.story}
              onChange={(e) => handleInputChange('story', e.target.value)}
              placeholder="Write the complete success story here..."
              rows={8}
              required
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="testimonialQuote">Testimonial Quote</Label>
            <Textarea
              id="testimonialQuote"
              value={formData.testimonialQuote || ''}
              onChange={(e) => handleInputChange('testimonialQuote', e.target.value)}
              placeholder="A memorable quote from the student"
              maxLength={500}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Key Achievements</CardTitle>
          <CardDescription>List the student's main achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.keyAchievements.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={achievement}
                onChange={(e) => handleArrayItemChange('keyAchievements', index, e.target.value)}
                placeholder="Enter an achievement"
                disabled={isReadOnly}
              />
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('keyAchievements', index)}
                  disabled={formData.keyAchievements.length === 1}
                >
                  <FaTimes className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {!isReadOnly && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('keyAchievements')}
            >
              <FaPlus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Challenges Faced</CardTitle>
          <CardDescription>Challenges the student overcame</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.challenges.map((challenge, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={challenge}
                onChange={(e) => handleArrayItemChange('challenges', index, e.target.value)}
                placeholder="Enter a challenge"
                disabled={isReadOnly}
              />
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('challenges', index)}
                  disabled={formData.challenges.length === 1}
                >
                  <FaTimes className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {!isReadOnly && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('challenges')}
            >
              <FaPlus className="h-4 w-4 mr-2" />
              Add Challenge
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Advice */}
      <Card>
        <CardHeader>
          <CardTitle>Advice for Others</CardTitle>
          <CardDescription>Advice the student wants to share</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.advice.map((advice, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={advice}
                onChange={(e) => handleArrayItemChange('advice', index, e.target.value)}
                placeholder="Enter advice"
                disabled={isReadOnly}
              />
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('advice', index)}
                  disabled={formData.advice.length === 1}
                >
                  <FaTimes className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {!isReadOnly && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('advice')}
            >
              <FaPlus className="h-4 w-4 mr-2" />
              Add Advice
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>Images and videos for the story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl || ''}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              placeholder="YouTube or other video URL"
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label>Images</Label>
            <div className="space-y-2">
              {formData.images?.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => {
                      const newImages = [...(formData.images || [])];
                      newImages[index] = e.target.value;
                      handleInputChange('images', newImages);
                    }}
                    placeholder="Image URL"
                    disabled={isReadOnly}
                  />
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(image)}
                    >
                      <FaTimes className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!isReadOnly && (
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Add new image URL"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImage}
                  >
                    <FaPlus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Tags to categorize this success story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {!isReadOnly && (
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
              >
                <FaPlus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Control the visibility and priority of this story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isPublished">Published</Label>
              <p className="text-sm text-gray-500">Make this story visible to the public</p>
            </div>
            <Switch
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
              disabled={isReadOnly}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isFeatured">Featured</Label>
              <p className="text-sm text-gray-500">Highlight this story as featured content</p>
            </div>
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
              disabled={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              type="number"
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', parseInt(e.target.value) || 0)}
              placeholder="Priority (0-100)"
              min="0"
              max="100"
              disabled={isReadOnly}
            />
            <p className="text-sm text-gray-500 mt-1">Higher numbers appear first in listings</p>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      {!isReadOnly && (
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            <FaSave className="h-4 w-4" />
            <span>{mode === 'create' ? 'Create Story' : 'Update Story'}</span>
          </Button>
        </div>
      )}

      {isReadOnly && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Close
          </Button>
        </div>
      )}
    </form>
  );
}
