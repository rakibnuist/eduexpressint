'use client';

import { useState } from 'react';
import SuccessStoryForm from '@/components/SuccessStoryForm';
import { Button } from '@/components/ui/button';
import { FaTimes } from 'react-icons/fa';

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
  createdAt?: string;
  updatedAt?: string;
}

interface SuccessStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentSuccessStory) => Promise<void>;
  initialData?: StudentSuccessStory | null;
  mode: 'create' | 'edit';
}

export default function SuccessStoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode
}: SuccessStoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: StudentSuccessStory) => {
    try {
      setIsSubmitting(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving success story:', error);
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleCancel}
      />
      
      {/* Modal Content */}
      <div className="relative z-[10000] w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Add New Success Story' : 'Edit Success Story'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <FaTimes className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 bg-white overflow-y-auto max-h-[calc(90vh-120px)]">
          <SuccessStoryForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
}
