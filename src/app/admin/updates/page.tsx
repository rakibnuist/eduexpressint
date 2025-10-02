'use client';

import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import UpdateModal from '@/components/admin/UpdateModal';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';

interface Update {
  _id: string;
  title: string;
  content: string;
  type: 'announcement' | 'news' | 'update';
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'published' | 'archived';
  targetAudience: 'all' | 'students' | 'partners';
  createdAt: string;
  updatedAt: string;
}

export default function AdminUpdates() {
  const { user } = useAuth();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [filteredUpdates, setFilteredUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchUpdates();
  }, []);

  // Filter updates based on search term and filters
  useEffect(() => {
    let filtered = updates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(update =>
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(update => update.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(update => update.type === typeFilter);
    }

    setFilteredUpdates(filtered);
  }, [updates, searchTerm, statusFilter, typeFilter]);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/updates', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setUpdates(data.data.updates);
      } else {
        throw new Error(data.error || 'Failed to fetch updates data');
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch updates');
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUpdate = () => {
    setSelectedUpdate(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditUpdate = (update: Update) => {
    setSelectedUpdate(update);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewUpdate = (update: Update) => {
    // For now, just open in edit mode for viewing
    // You could create a separate view-only modal if needed
    setSelectedUpdate(update);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteUpdate = async (update: Update) => {
    if (!confirm(`Are you sure you want to delete "${update.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/updates/${update._id}`, {
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
        // Remove the update from the local state
        setUpdates(prev => prev.filter(u => u._id !== update._id));
        alert('Update deleted successfully');
      } else {
        throw new Error(data.error || 'Failed to delete update');
      }
    } catch (error) {
      console.error('Error deleting update:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete update');
    }
  };

  const handleSaveUpdate = async (updateData: any) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const url = modalMode === 'create' 
        ? '/api/admin/updates'
        : `/api/admin/updates/${selectedUpdate?._id}`;
      
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        if (modalMode === 'create') {
          setUpdates(prev => [data.data, ...prev]);
        } else {
          setUpdates(prev => 
            prev.map(u => u._id === selectedUpdate?._id ? data.data : u)
          );
        }
        setIsModalOpen(false);
        alert(data.message || 'Update saved successfully');
      } else {
        throw new Error(data.error || 'Failed to save update');
      }
    } catch (error) {
      console.error('Error saving update:', error);
      setError(error instanceof Error ? error.message : 'Failed to save update');
      throw error; // Re-throw to let the modal handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSelectedUpdate(null);
      setError(null);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type', render: (value: string) => (
      <span className="capitalize px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
        {value}
      </span>
    )},
    { key: 'priority', label: 'Priority', render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'high' ? 'bg-red-100 text-red-800' :
        value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'status', label: 'Status', render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'published' ? 'bg-green-100 text-green-800' :
        value === 'draft' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'targetAudience', label: 'Target Audience' },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <ProtectedRoute requiredPermission="updates:read">
      <SEOHead
        title="Updates Management - Admin Dashboard"
        description="Manage news, announcements, and updates for the education platform. Create, edit, and publish content with HTML support."
        keywords={["admin", "updates", "management", "news", "announcements", "content management", "HTML editor", "CMS", "education platform"]}
        canonical="/admin/updates"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Updates Management System",
          "description": "Admin interface for managing platform updates and announcements",
          "applicationCategory": "Content Management System",
          "operatingSystem": "Web Browser"
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6" role="main" aria-label="Updates Management">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb Navigation */}
              <nav className="mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li>
                    <a href="/admin" className="hover:text-gray-700" aria-label="Admin Dashboard">
                      Admin
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium" aria-current="page">
                      Updates Management
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Page Header */}
              <header className="mb-8 mt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Updates Management</h1>
                    <p className="text-lg text-gray-600 mb-2">Manage news, announcements, and updates for your education platform</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        <strong>Total:</strong> {updates.length} updates
                      </span>
                      <span>
                        <strong>Showing:</strong> {filteredUpdates.length} filtered results
                      </span>
                      <span>
                        <strong>Published:</strong> {updates.filter(u => u.status === 'published').length}
                      </span>
                      <span>
                        <strong>Drafts:</strong> {updates.filter(u => u.status === 'draft').length}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddUpdate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    aria-label="Add new update"
                  >
                    <FaPlus className="h-4 w-4 mr-2" />
                    Add Update
                  </Button>
                </div>
              </header>

              {/* Search and Filter Section */}
              <section className="mb-6 bg-white p-4 rounded-lg shadow-sm border" aria-label="Search and filter options">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search Updates
                    </label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        id="search"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title or content..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-describedby="search-help"
                      />
                    </div>
                    <p id="search-help" className="text-xs text-gray-500 mt-1">
                      Search through update titles and content
                    </p>
                  </div>

                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Filter by Status
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Statuses</option>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Filter by Type
                    </label>
                    <select
                      id="type-filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="announcement">Announcement</option>
                      <option value="news">News</option>
                      <option value="update">Update</option>
                    </select>
                  </div>
                </div>
              </section>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Updates Table */}
              <section className="bg-white rounded-lg shadow" aria-label="Updates list">
                <DataTable
                  title="Updates"
                  data={filteredUpdates}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditUpdate}
                  onView={handleViewUpdate}
                  onDelete={handleDeleteUpdate}
                  emptyMessage={
                    searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                      ? "No updates match your current filters. Try adjusting your search criteria."
                      : "No updates found. Click 'Add Update' to create your first one."
                  }
                />
              </section>

              <UpdateModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveUpdate}
                initialData={selectedUpdate}
                mode={modalMode}
              />

              {/* Page Footer with SEO Information */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Content Management</h3>
                    <ul className="space-y-1">
                      <li>• HTML editor with paste functionality</li>
                      <li>• Real-time preview mode</li>
                      <li>• Automatic content sanitization</li>
                      <li>• SEO-friendly content structure</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                    <ul className="space-y-1">
                      <li>• Rich text formatting tools</li>
                      <li>• Status and priority management</li>
                      <li>• Target audience filtering</li>
                      <li>• Search and filter capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                    <ul className="space-y-1">
                      <li>• XSS protection enabled</li>
                      <li>• HTML sanitization</li>
                      <li>• Content validation</li>
                      <li>• Safe HTML paste handling</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <p>
                    Last updated: {new Date().toLocaleDateString()} | 
                    Admin: {user?.name || 'Unknown'} | 
                    Version: 1.0.0
                  </p>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
