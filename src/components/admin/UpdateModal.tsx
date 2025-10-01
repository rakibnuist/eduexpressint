'use client';

import { useState } from 'react';
import UpdateForm from '@/components/UpdateForm';
import { Button } from '@/components/ui/button';
import { FaTimes } from 'react-icons/fa';

interface Update {
  _id?: string;
  title: string;
  content: string;
  type: 'announcement' | 'news' | 'update' | 'event';
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'published' | 'archived';
  targetAudience: 'all' | 'students' | 'partners';
  isPinned: boolean;
  views?: number;
  likes?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Update) => Promise<void>;
  initialData?: Update | null;
  mode: 'create' | 'edit';
}

export default function UpdateModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode
}: UpdateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Update) => {
    try {
      setIsSubmitting(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving update:', error);
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
            {mode === 'create' ? 'Add New Update' : 'Edit Update'}
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
          <UpdateForm
            update={initialData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
}
