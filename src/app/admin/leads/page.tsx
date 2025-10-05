'use client';

import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCheck, FaTimes, FaPhone, FaSearch, FaFilter } from 'react-icons/fa';
import { metaPixel } from '@/components/MetaPixel';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  program: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Application Submitted' | 'Under Review' | 'Interview Scheduled' | 'Interview Completed' | 'Accepted' | 'Waitlisted' | 'Rejected' | 'VISA Processing' | 'VISA Approved' | 'Enrolled' | 'Deferred' | 'Withdrawn';
  createdAt: string;
  updatedAt: string;
}

export default function AdminLeads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/leads', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setLeads(data.data.leads);
          setFilteredLeads(data.data.leads);
          
          // Track admin page view
          metaPixel.trackCustomEvent('AdminPageView', {
            content_name: 'Admin Leads Management',
            content_category: 'Admin Dashboard',
            page_type: 'lead_management',
            admin_user: user?.firstName || 'Admin',
            total_leads: data.data.leads?.length || 0
          });
          
          console.log('✅ Meta Pixel: Admin leads page view tracked');
        } else {
          throw new Error(data.error || 'Failed to fetch leads data');
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        // Fallback to empty array if API fails
        setLeads([]);
        setFilteredLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [user]);

  // Filter leads based on search term, country, and status
  useEffect(() => {
    let filtered = leads;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (countryFilter && countryFilter !== 'all') {
      filtered = filtered.filter(lead => lead.country === countryFilter);
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, countryFilter, statusFilter]);

  // Handler functions
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleCallLead = (phone: string) => {
    if (phone) {
      // Track call action
      metaPixel.trackCustomEvent('LeadCall', {
        content_name: 'Direct Call to Lead',
        content_category: 'Lead Management',
        action_type: 'call',
        phone_number: phone,
        value: 1,
        currency: 'USD'
      });
      
      // Open phone dialer
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead({ ...lead });
    setIsEditModalOpen(true);
  };

  const handleDeleteLead = async (lead: Lead) => {
    if (window.confirm(`Are you sure you want to delete ${lead.name}?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/leads/${lead._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setLeads(leads.filter(l => l._id !== lead._id));
          alert('Lead deleted successfully');
        } else {
          alert('Failed to delete lead');
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert('Error deleting lead');
      }
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('adminToken');
      
      // Get the current lead data for tracking
      const currentLead = leads.find(lead => lead._id === leadId);
      
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedLeads = leads.map(lead => 
          lead._id === leadId ? { ...lead, status: newStatus as any } : lead
        );
        setLeads(updatedLeads);
        setSelectedLead(prev => prev ? { ...prev, status: newStatus as any } : null);
        setIsEditModalOpen(false);
        setEditingLead(null);
        setIsViewModalOpen(false);
        
        // Track lead status update with Meta Pixel
        if (currentLead) {
          metaPixel.trackCustomEvent('LeadStatusUpdated', {
            content_name: `Lead Status Updated: ${newStatus}`,
            content_category: 'Lead Management',
            lead_id: leadId,
            previous_status: currentLead.status,
            new_status: newStatus,
            lead_name: currentLead.name,
            lead_email: currentLead.email,
            destination: currentLead.country,
            program: currentLead.program,
            value: newStatus === 'Converted' || newStatus === 'Enrolled' ? 10 : 1,
            currency: 'USD'
          });
          
          console.log('✅ Meta Pixel: Lead status update tracked');
        }
        
        alert('Status updated successfully');
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Application Submitted': 'bg-purple-100 text-purple-800',
      'Under Review': 'bg-orange-100 text-orange-800',
      'Interview Scheduled': 'bg-indigo-100 text-indigo-800',
      'Interview Completed': 'bg-teal-100 text-teal-800',
      'Accepted': 'bg-emerald-100 text-emerald-800',
      'Waitlisted': 'bg-amber-100 text-amber-800',
      'Rejected': 'bg-red-100 text-red-800',
      'VISA Processing': 'bg-cyan-100 text-cyan-800',
      'VISA Approved': 'bg-green-100 text-green-800',
      'Enrolled': 'bg-emerald-100 text-emerald-800',
      'Deferred': 'bg-gray-100 text-gray-800',
      'Withdrawn': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get unique countries for filter
  const uniqueCountries = Array.from(new Set(leads.map(lead => lead.country))).sort();
  
  // Get unique statuses for filter
  const uniqueStatuses = Array.from(new Set(leads.map(lead => lead.status))).sort();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'country', label: 'Country' },
    { key: 'program', label: 'Program' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <ProtectedRoute requiredPermission="leads:read">
      <AdminLayout>
        <div className="space-y-8">
              {/* Header Section - Mobile Responsive */}
              <div className="mb-6 lg:mb-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-sm lg:text-base text-gray-600">Manage student leads and inquiries</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto">
                    <FaPlus className="mr-2" /> Add Lead
                  </Button>
                </div>
              </div>

              {/* Search and Filters - Mobile Responsive */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search leads by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={countryFilter} onValueChange={setCountryFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {uniqueCountries.map((country, index) => (
                          <SelectItem key={`country-${index}-${country}`} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {uniqueStatuses.map((status, index) => (
                          <SelectItem key={`status-${index}-${status}`} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  {(countryFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCountryFilter('all');
                        setStatusFilter('all');
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
                  Showing {filteredLeads.length} of {leads.length} leads
                </div>
              </div>

              {/* Summary Cards - Mobile Responsive */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Total Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : leads.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">New Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'New').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Contacted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'Contacted').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Enrolled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg lg:text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'Enrolled').length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Table - Mobile Responsive */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <DataTable
                  data={filteredLeads}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditLead}
                  onView={handleViewLead}
                  onDelete={handleDeleteLead}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* View Lead Modal - Mobile Responsive */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 lg:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg lg:text-xl font-bold">Lead Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsViewModalOpen(false)}
              >
                <FaTimes />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Quick Actions - Mobile Friendly */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                {selectedLead.phone && (
                  <Button
                    onClick={() => handleCallLead(selectedLead.phone!)}
                    className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                  >
                    <FaPhone className="mr-2" />
                    Call {selectedLead.name}
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditLead(selectedLead);
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <FaEdit className="mr-2" />
                  Edit Lead
                </Button>
              </div>

              {/* Lead Information - Mobile Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-base lg:text-lg font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-base lg:text-lg break-all">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <div className="flex items-center gap-2">
                    <p className="text-base lg:text-lg">{selectedLead.phone || 'N/A'}</p>
                    {selectedLead.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallLead(selectedLead.phone!)}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <FaPhone className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Country</label>
                  <p className="text-base lg:text-lg">{selectedLead.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Program</label>
                  <p className="text-base lg:text-lg">{selectedLead.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedLead.status)}>
                      {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created</label>
                  <p className="text-base lg:text-lg">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-base lg:text-lg">{new Date(selectedLead.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status Update Section - Mobile Responsive */}
              <div className="border-t pt-4">
                <h3 className="text-base lg:text-lg font-semibold mb-3">Update Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {['New', 'Contacted', 'Qualified', 'Application Submitted', 'Under Review', 'Interview Scheduled', 'Interview Completed', 'Accepted', 'Waitlisted', 'Rejected', 'VISA Processing', 'VISA Approved', 'Enrolled', 'Deferred', 'Withdrawn'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedLead._id, status)}
                      disabled={updating}
                      className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                        selectedLead.status === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${updating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons - Mobile Responsive */}
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
                    handleEditLead(selectedLead);
                  }}
                  className="w-full sm:w-auto"
                >
                  <FaEdit className="mr-2" /> Full Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {isEditModalOpen && editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Lead Status</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                <FaTimes />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Lead Name</label>
                <p className="text-lg font-semibold">{editingLead.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Current Status</label>
                <Badge className={getStatusColor(editingLead.status)}>
                  {editingLead.status.charAt(0).toUpperCase() + editingLead.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Update Status</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['New', 'Contacted', 'Qualified', 'Application Submitted', 'Under Review', 'Interview Scheduled', 'Interview Completed', 'Accepted', 'Waitlisted', 'Rejected', 'VISA Processing', 'VISA Approved', 'Enrolled', 'Deferred', 'Withdrawn'].map((status) => (
                    <Button
                      key={status}
                      variant={editingLead.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditingLead({ ...editingLead, status: status as any })}
                      className="text-xs"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(editingLead._id, editingLead.status)}
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
