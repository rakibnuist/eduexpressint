'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import B2BLeadEditModal from '@/components/admin/B2BLeadEditModal';
import { FaPlus, FaDollarSign, FaChartLine, FaExclamationTriangle, FaUsers, FaTimes, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface B2BLead {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  country: string;
  services: string[];
  status: string;
  priority: string;
  source: string;
  notes: string;
  lastContact: string;
  dealStage: string;
  createdAt: string;
  updatedAt: string;
  // Optional fields that might not exist in all records
  companySize?: string;
  city?: string;
  budget?: string;
  timeline?: string;
  assignedTo?: string;
  expectedValue?: number;
}

export default function AdminB2BLeads() {
  const { user } = useAuth();
  const [b2bLeads, setB2bLeads] = useState<B2BLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState<B2BLead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<B2BLead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchB2BLeads = async () => {
      try {
        setLoading(true);
        
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/b2b-leads', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setB2bLeads(data.data.b2bLeads);
        } else {
          throw new Error(data.error || 'Failed to fetch B2B leads data');
        }
      } catch (error) {
        console.error('Error fetching B2B leads:', error);
        // Fallback to empty array if API fails
        setB2bLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchB2BLeads();
  }, []);

  const columns = [
    { key: 'companyName', label: 'Company' },
    { key: 'contactPerson', label: 'Contact' },
    { key: 'email', label: 'Email' },
    { key: 'industry', label: 'Industry' },
    { key: 'country', label: 'Country' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    {
      key: 'expectedValue',
      label: 'Value',
      render: (value: number | undefined) => {
        if (value === undefined || value === null) return 'N/A';
        return `$${value.toLocaleString()}`;
      },
    },
    { 
      key: 'assignedTo', 
      label: 'Assigned To',
      render: (value: string | undefined) => value || 'Unassigned'
    },
    { key: 'createdAt', label: 'Created' },
  ];

  const totalLeads = b2bLeads.length;
  const totalValue = b2bLeads.reduce((sum, lead) => sum + (lead.expectedValue || 0), 0);
  const highPriorityLeads = b2bLeads.filter(lead => lead.priority === 'High').length;
  const qualifiedLeads = b2bLeads.filter(lead => lead.status === 'Qualified').length;

  const handleEditLead = (lead: B2BLead) => {
    setEditingLead(lead);
    setIsEditModalOpen(true);
  };

  const handleSaveLead = async (updatedLead: B2BLead) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/b2b-leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedLead)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Update the lead in the local state
        setB2bLeads(prev => 
          prev.map(lead => 
            lead._id === updatedLead._id ? updatedLead : lead
          )
        );
        setIsEditModalOpen(false);
        setEditingLead(null);
      } else {
        throw new Error(data.error || 'Failed to update B2B lead');
      }
    } catch (error) {
      console.error('Error updating B2B lead:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update B2B lead. Please try again.';
      alert(`Failed to update B2B lead: ${errorMessage}`);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingLead(null);
  };

  const handleViewLead = (lead: B2BLead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/b2b-leads', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          _id: leadId, 
          status: newStatus,
          ...b2bLeads.find(lead => lead._id === leadId)
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setB2bLeads(prev => 
            prev.map(lead => 
              lead._id === leadId ? { ...lead, status: newStatus } : lead
            )
          );
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
          setIsViewModalOpen(false);
          alert('Status updated successfully');
        } else {
          throw new Error(data.error || 'Failed to update status');
        }
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error updating status';
      alert(`Failed to update B2B lead: ${errorMessage}`);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Proposal Sent': 'bg-purple-100 text-purple-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-emerald-100 text-emerald-800',
      'Closed Lost': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <ProtectedRoute requiredPermission="b2b:read">
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 mt-8 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">B2B Leads Management</h1>
                  <p className="text-gray-600">Manage business partnership opportunities</p>
                </div>
                <button
                  onClick={() => console.log('Add new B2B lead')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" /> Add B2B Lead
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    <FaUsers className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : totalLeads}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                    <FaDollarSign className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : `$${totalValue.toLocaleString()}`}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                    <FaExclamationTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : highPriorityLeads}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
                    <FaChartLine className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : qualifiedLeads}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow">
                <DataTable
                  title="B2B Leads"
                  data={b2bLeads}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditLead}
                  onView={handleViewLead}
                  onDelete={(item) => console.log('Delete B2B lead:', item)}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* View Lead Modal */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">B2B Lead Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Name</label>
                  <p className="text-lg font-semibold">{selectedLead.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <p className="text-lg">{selectedLead.contactPerson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-lg">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Website</label>
                  <p className="text-lg">{selectedLead.website || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Country</label>
                  <p className="text-lg">{selectedLead.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Industry</label>
                  <p className="text-lg">{selectedLead.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Size</label>
                  <p className="text-lg">{selectedLead.companySize || 'N/A'}</p>
                </div>
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedLead.status)}>
                      {selectedLead.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedLead.priority)}>
                      {selectedLead.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Expected Value</label>
                  <p className="text-lg font-semibold">
                    {selectedLead.expectedValue ? `$${selectedLead.expectedValue.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Update Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'].map((status) => (
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

              {/* Additional Information */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Deal Stage</label>
                    <p className="text-lg">{selectedLead.dealStage || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assigned To</label>
                    <p className="text-lg">{selectedLead.assignedTo || 'Unassigned'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Source</label>
                    <p className="text-lg">{selectedLead.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Contact</label>
                    <p className="text-lg">
                      {selectedLead.lastContact ? new Date(selectedLead.lastContact).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                {selectedLead.notes && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-600">Notes</label>
                    <p className="text-lg bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditLead(selectedLead);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaEdit className="mr-2" /> Full Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <B2BLeadEditModal
        lead={editingLead}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveLead}
      />
    </ProtectedRoute>
  );
}