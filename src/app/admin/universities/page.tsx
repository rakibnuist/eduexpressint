'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import UniversityForm from '@/components/UniversityForm';
import UniversitySyncStatus from '@/components/UniversitySyncStatus';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaSync } from 'react-icons/fa';

import { IUniversity } from '@/models/University';

interface University extends Omit<IUniversity, 'createdAt' | 'updatedAt'> {
  _id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function AdminUniversities() {
  const { user } = useAuth();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUniversities();
  }, []);

  // Handler functions
  const handleAddUniversity = () => {
    setEditingUniversity(null);
    setIsAddModalOpen(true);
  };

  const handleEditUniversity = (university: University) => {
    setEditingUniversity(university);
    setIsEditModalOpen(true);
  };

  const handleDeleteUniversity = async (university: University) => {
    if (window.confirm(`Are you sure you want to delete ${university.name}?`)) {
      try {
        const response = await fetch(`/api/admin/universities/${university._id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setUniversities(universities.filter(u => u._id !== university._id));
          alert('University deleted successfully');
        } else {
          alert('Failed to delete university');
        }
      } catch (error) {
        console.error('Error deleting university:', error);
        alert('Error deleting university');
      }
    }
  };

  const handleFormSubmit = async (universityData: any) => {
    try {
      setSubmitting(true);
      
      const url = editingUniversity 
        ? `/api/admin/universities/${editingUniversity._id}`
        : '/api/admin/universities';
      
      const method = editingUniversity ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(universityData)
      });

      if (response.ok) {
        const result = await response.json();
        
        if (editingUniversity) {
          // Update existing university
          setUniversities(universities.map(u => 
            u._id === editingUniversity._id ? { ...u, ...result.data } : u
          ));
          setIsEditModalOpen(false);
          setEditingUniversity(null);
          alert('University updated successfully');
        } else {
          // Add new university
          setUniversities([result.data, ...universities]);
          setIsAddModalOpen(false);
          alert('University created successfully');
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save university');
      }
    } catch (error) {
      console.error('Error saving university:', error);
      alert('Error saving university');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditingUniversity(null);
  };

  const handleSyncComplete = (result: { success: boolean; message: string; data?: unknown }) => {
    if (result.success) {
      // Refresh the universities list after successful sync
      fetchUniversities();
      alert(result.message);
    } else {
      alert(`Sync failed: ${result.message}`);
    }
  };

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/admin/universities', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Universities API response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          console.log('Authentication failed, redirecting to login');
          // Clear any stored auth data
          localStorage.removeItem('adminToken');
          // The AuthContext will handle the redirect
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Universities API response data:', data);
      
      if (data.success && data.data && data.data.universities) {
        setUniversities(data.data.universities);
        console.log(`Successfully loaded ${data.data.universities.length} universities`);
      } else {
        throw new Error(data.error || 'Failed to fetch universities data');
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
      // Fallback to empty array if API fails
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'University Name' },
    { key: 'country', label: 'Country' },
    { key: 'city', label: 'City' },
    { 
      key: 'ranking', 
      label: 'Ranking',
      render: (value: number | { global?: number; national?: number } | null | undefined) => {
        if (typeof value === 'object' && value !== null && value !== undefined) {
          const global = value.global || 'N/A';
          const national = value.national || 'N/A';
          return `Global: ${global}, National: ${national}`;
        }
        return value?.toString() || 'N/A';
      }
    },
    { 
      key: 'programs', 
      label: 'Programs',
      render: (value: any[] | null | undefined) => {
        if (!Array.isArray(value)) return 'N/A';
        if (value.length === 0) return 'No programs';
        
        // Handle both string arrays and object arrays
        if (typeof value[0] === 'string') {
          return value.join(', ');
        } else if (typeof value[0] === 'object' && value[0] && value[0].name) {
          return value.map(program => program?.name || 'Unknown').join(', ');
        }
        
        return `${value.length} programs`;
      }
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: any, row: any) => {
        // Handle both status and isActive fields with proper null checks
        const status = value || (row?.isActive ? 'active' : 'inactive');
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {status || 'unknown'}
          </span>
        );
      }
    },
    { 
      key: 'createdAt', 
      label: 'Created',
      render: (value: string | Date | null | undefined) => {
        if (!value) return 'N/A';
        try {
          return new Date(value).toLocaleDateString();
        } catch (error) {
          return 'Invalid Date';
        }
      }
    }
  ];

  return (
    <ProtectedRoute requiredPermission="universities:read">
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader 
            title="Universities Management"
            subtitle="Manage university information and programs"
          />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                {/* Sync Status Section */}
                <div className="mb-6">
                  <ErrorBoundary>
                    <UniversitySyncStatus 
                      onSyncComplete={handleSyncComplete}
                      className="mb-4"
                    />
                  </ErrorBoundary>
                </div>

                <div className="mb-8 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Universities</h2>
                    <span className="text-sm text-gray-500">
                      {Array.isArray(universities) ? universities.length : 0} total universities
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={fetchUniversities}
                      disabled={loading}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <FaSync className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </Button>
                    <Button 
                      onClick={handleAddUniversity}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <FaPlus className="mr-2" /> Add University
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <ErrorBoundary>
                    <DataTable
                      title="Universities"
                      data={Array.isArray(universities) ? universities : []}
                      columns={columns}
                      loading={loading}
                      onEdit={handleEditUniversity}
                      onDelete={handleDeleteUniversity}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </main>
          </div>
        </div>
      </ErrorBoundary>

      {/* Add University Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New University</h2>
              <Button
                variant="outline"
                onClick={handleCancelForm}
              >
                <FaTimes />
              </Button>
            </div>
            
            <ErrorBoundary>
              <UniversityForm
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isLoading={submitting}
              />
            </ErrorBoundary>
          </div>
        </div>
      )}

      {/* Edit University Modal */}
      {isEditModalOpen && editingUniversity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit University</h2>
              <Button
                variant="outline"
                onClick={handleCancelForm}
              >
                <FaTimes />
              </Button>
            </div>
            
            <ErrorBoundary>
              <UniversityForm
                university={editingUniversity as any}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isLoading={submitting}
              />
            </ErrorBoundary>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
