'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import SuccessStoryModal from '@/components/admin/SuccessStoryModal';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface SuccessStory {
  _id: string;
  studentName: string;
  studentImage?: string;
  studentNationality: string;
  university: string;
  universityCountry: string;
  program: string;
  programLevel: string;
  title: string;
  story: string;
  shortDescription: string;
  testimonialQuote?: string;
  isPublished: boolean;
  isFeatured: boolean;
  priority: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSuccessStories() {
  const { user } = useAuth();
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/success-stories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setSuccessStories(data.data.successStories);
      } else {
        throw new Error(data.error || 'Failed to fetch success stories data');
      }
    } catch (error) {
      console.error('Error fetching success stories:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch success stories');
      setSuccessStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStory = () => {
    setSelectedStory(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditStory = (story: SuccessStory) => {
    setSelectedStory(story);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewStory = (story: SuccessStory) => {
    // For now, just open in edit mode for viewing
    // You could create a separate view-only modal if needed
    setSelectedStory(story);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteStory = async (story: SuccessStory) => {
    if (!confirm(`Are you sure you want to delete "${story.studentName}"'s success story? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/success-stories/${story._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Remove the story from the local state
        setSuccessStories(prev => prev.filter(s => s._id !== story._id));
        alert('Success story deleted successfully');
      } else {
        throw new Error(data.error || 'Failed to delete success story');
      }
    } catch (error) {
      console.error('Error deleting success story:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete success story');
    }
  };

  const handleSaveStory = async (storyData: any) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const url = modalMode === 'create' 
        ? '/api/admin/success-stories'
        : `/api/admin/success-stories/${selectedStory?._id}`;
      
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(storyData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        if (modalMode === 'create') {
          setSuccessStories(prev => [data.data, ...prev]);
        } else {
          setSuccessStories(prev => 
            prev.map(s => s._id === selectedStory?._id ? data.data : s)
          );
        }
        setIsModalOpen(false);
        alert(data.message || 'Success story saved successfully');
      } else {
        throw new Error(data.error || 'Failed to save success story');
      }
    } catch (error) {
      console.error('Error saving success story:', error);
      setError(error instanceof Error ? error.message : 'Failed to save success story');
      throw error; // Re-throw to let the modal handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSelectedStory(null);
      setError(null);
    }
  };

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'university', label: 'University' },
    { key: 'program', label: 'Program' },
    { key: 'isPublished', label: 'Published', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Published' : 'Draft'}
      </span>
    )},
    { key: 'isFeatured', label: 'Featured', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {value ? 'Featured' : 'Regular'}
      </span>
    )},
    { key: 'views', label: 'Views' },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <ProtectedRoute requiredPermission="successStories:read">
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 mt-8 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Success Stories Management</h1>
                  <p className="text-gray-600">Manage student success stories and testimonials</p>
                </div>
                <Button 
                  onClick={handleAddStory}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FaPlus className="h-4 w-4 mr-2" />
                  Add Success Story
                </Button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div className="bg-white rounded-lg shadow">
                <DataTable
                  title="Success Stories"
                  data={successStories}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditStory}
                  onView={handleViewStory}
                  onDelete={handleDeleteStory}
                  emptyMessage="No success stories found. Click 'Add Success Story' to create your first one."
                />
              </div>

              <SuccessStoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveStory}
                initialData={selectedStory}
                mode={modalMode}
              />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
