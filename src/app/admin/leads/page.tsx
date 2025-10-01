'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

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
        } else {
          throw new Error(data.error || 'Failed to fetch leads data');
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        // Fallback to empty array if API fails
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Handler functions
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
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
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setLeads(leads.map(lead => 
          lead._id === leadId ? { ...lead, status: newStatus as any } : lead
        ));
        setSelectedLead(prev => prev ? { ...prev, status: newStatus as any } : null);
        setIsEditModalOpen(false);
        setEditingLead(null);
        setIsViewModalOpen(false);
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
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 mt-8 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                  <p className="text-gray-600">Manage student leads and inquiries</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FaPlus className="mr-2" /> Add Lead
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : leads.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">New Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'New').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Contacted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'Contacted').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Enrolled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : leads.filter(l => l.status === 'Enrolled').length}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow">
                <DataTable
                  data={leads}
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

      {/* View Lead Modal */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lead Details</h2>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                <FaTimes />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-lg">{selectedLead.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Country</label>
                  <p className="text-lg">{selectedLead.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Program</label>
                  <p className="text-lg">{selectedLead.program}</p>
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
                  <p className="text-lg">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-lg">{new Date(selectedLead.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Update Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['New', 'Contacted', 'Qualified', 'Application Submitted', 'Under Review', 'Interview Scheduled', 'Interview Completed', 'Accepted', 'Waitlisted', 'Rejected', 'VISA Processing', 'VISA Approved', 'Enrolled', 'Deferred', 'Withdrawn'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedLead._id, status)}
                      disabled={updating}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditLead(selectedLead);
                  }}
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
