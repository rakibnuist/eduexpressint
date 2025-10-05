'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaPlus, FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaGlobe, FaFileAlt } from 'react-icons/fa';
import { metaPixel } from '@/components/MetaPixel';
import ContentForm from '@/components/admin/ContentForm';

interface Content {
  _id: string;
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
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContent() {
  const { user } = useAuth();
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/content', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setContent(data.data.content);
          setFilteredContent(data.data.content);
          
          // Track admin page view
          metaPixel.trackCustomEvent('AdminPageView', {
            content_name: 'Admin Content Management',
            content_category: 'Admin Dashboard',
            page_type: 'content_management',
            admin_user: user?.firstName || 'Admin',
            total_content: data.data.content?.length || 0
          });
          
          console.log('✅ Meta Pixel: Admin content page view tracked');
        } else {
          throw new Error(data.error || 'Failed to fetch content data');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent([]);
        setFilteredContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [user]);

  // Filter content based on search term, type, published status, and category
  useEffect(() => {
    let filtered = content;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    // Filter by published status
    if (publishedFilter && publishedFilter !== 'all') {
      const isPublished = publishedFilter === 'true';
      filtered = filtered.filter(item => item.published === isPublished);
    }

    // Filter by category
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.categories.includes(categoryFilter));
    }

    setFilteredContent(filtered);
  }, [content, searchTerm, typeFilter, publishedFilter, categoryFilter]);

  // Handler functions
  const handleViewContent = (item: Content) => {
    setSelectedContent(item);
    setIsViewModalOpen(true);
  };

  const handleEditContent = (item: Content) => {
    setEditingContent({ ...item });
    setIsEditModalOpen(true);
  };

  const handleDeleteContent = async (item: Content) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/content/${item._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setContent(content.filter(c => c._id !== item._id));
          alert('Content deleted successfully');
        } else {
          alert('Failed to delete content');
        }
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Error deleting content');
      }
    }
  };

  const handleAddContent = () => {
    setIsAddModalOpen(true);
  };

  const handleContentSaved = (newContent: Content) => {
    if (editingContent) {
      // Update existing content
      setContent(content.map(c => c._id === newContent._id ? newContent : c));
      setIsEditModalOpen(false);
      setEditingContent(null);
    } else {
      // Add new content
      setContent([newContent, ...content]);
      setIsAddModalOpen(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Page': 'bg-blue-100 text-blue-800',
      'Blog': 'bg-green-100 text-green-800',
      'Landing Page': 'bg-purple-100 text-purple-800',
      'News': 'bg-orange-100 text-orange-800',
      'Announcement': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPublishedColor = (published: boolean) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  // Get unique types for filter
  const uniqueTypes = Array.from(new Set(content.map(item => item.type))).sort();
  
  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(content.flatMap(item => item.categories))).sort();

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => (
        <Badge className={getTypeColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'author', label: 'Author' },
    { 
      key: 'published', 
      label: 'Status',
      render: (value: boolean) => (
        <Badge className={getPublishedColor(value)}>
          {value ? 'Published' : 'Draft'}
        </Badge>
      )
    },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <ProtectedRoute requiredPermission="content:read">
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-6 lg:mb-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Content Management</h1>
                    <p className="text-sm lg:text-base text-gray-600">Manage landing pages, blogs, and other content</p>
                  </div>
                  <Button 
                    onClick={handleAddContent}
                    className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                  >
                    <FaPlus className="mr-2" /> Add Content
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search content by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="true">Published</SelectItem>
                        <SelectItem value="false">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {uniqueCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  {(typeFilter !== 'all' || publishedFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTypeFilter('all');
                        setPublishedFilter('all');
                        setCategoryFilter('all');
                        setSearchTerm('');
                      }}
                      className="w-full sm:w-auto"
                    >
                      <FaFilter className="mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Showing {filteredContent.length} of {content.length} content items
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Total Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : content.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Published</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : content.filter(c => c.published).length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Drafts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : content.filter(c => !c.published).length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Landing Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : content.filter(c => c.type === 'Landing Page').length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <DataTable
                  data={filteredContent}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditContent}
                  onView={handleViewContent}
                  onDelete={handleDeleteContent}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* View Content Modal */}
      {isViewModalOpen && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 lg:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg lg:text-xl font-bold">Content Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsViewModalOpen(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Content Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-base lg:text-lg font-medium">{selectedContent.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Slug</label>
                  <p className="text-base lg:text-lg font-mono">{selectedContent.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <Badge className={getTypeColor(selectedContent.type)}>
                    {selectedContent.type}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Author</label>
                  <p className="text-base lg:text-lg">{selectedContent.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge className={getPublishedColor(selectedContent.published)}>
                    {selectedContent.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created</label>
                  <p className="text-base lg:text-lg">{new Date(selectedContent.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Categories and Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Categories</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedContent.categories.map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedContent.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Meta Description */}
              {selectedContent.metaDescription && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Meta Description</label>
                  <p className="text-base lg:text-lg text-gray-700 mt-1">{selectedContent.metaDescription}</p>
                </div>
              )}

              {/* Featured Image */}
              {selectedContent.featuredImage?.url && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Featured Image</label>
                  <div className="mt-2">
                    <img 
                      src={selectedContent.featuredImage.url} 
                      alt={selectedContent.featuredImage.alt || selectedContent.title}
                      className="max-w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Content Preview */}
              <div>
                <label className="text-sm font-medium text-gray-600">Content Preview</label>
                <div 
                  className="mt-2 p-4 border rounded-lg bg-gray-50 max-h-60 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedContent.content.substring(0, 500) + (selectedContent.content.length > 500 ? '...' : '') }}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditContent(selectedContent);
                  }}
                  className="w-full sm:w-auto"
                >
                  <FaEdit className="mr-2" /> Edit Content
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Content Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <ContentForm
          content={editingContent}
          onSave={handleContentSaved}
          onCancel={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setEditingContent(null);
          }}
        />
      )}
    </ProtectedRoute>
  );
}
