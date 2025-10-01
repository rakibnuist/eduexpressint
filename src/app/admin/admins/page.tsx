'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DataTable from '@/components/admin/DataTable';
import AdminUserModal from '@/components/admin/AdminUserModal';
import { FaPlus, FaUserShield, FaUser, FaUserCheck, FaUserTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superuser' | 'operator';
  isActive: boolean;
  permissions: {
    canManageLeads: boolean;
    canManageUniversities: boolean;
    canManageB2BLeads: boolean;
    canManageUpdates: boolean;
    canManageAdmins: boolean;
    canManageSuccessStories: boolean;
  };
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsers() {
  const { user } = useAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const getFallbackAdminUsers = (): AdminUser[] => {
    return [
      {
        _id: 'admin-001',
        username: 'admin',
        email: 'admin@eduexpress.info',
        firstName: 'Admin',
        lastName: 'User',
        role: 'superuser',
        isActive: true,
        permissions: {
          canManageLeads: true,
          canManageUniversities: true,
          canManageB2BLeads: true,
          canManageUpdates: true,
          canManageAdmins: true,
          canManageSuccessStories: true,
        },
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'operator-001',
        username: 'operator1',
        email: 'operator1@eduexpress.info',
        firstName: 'John',
        lastName: 'Doe',
        role: 'operator',
        isActive: true,
        permissions: {
          canManageLeads: true,
          canManageUniversities: false,
          canManageB2BLeads: true,
          canManageUpdates: false,
          canManageAdmins: false,
          canManageSuccessStories: true,
        },
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  };

  const handleViewUser = (adminUser: AdminUser) => {
    setSelectedUser(adminUser);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (adminUser: AdminUser) => {
    setEditingUser(adminUser);
    setModalMode('edit');
    setIsUserModalOpen(true);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setModalMode('create');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (userData: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      let response;

      if (modalMode === 'create') {
        response = await fetch('/api/admin/admins', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
      } else {
        response = await fetch(`/api/admin/admins/${editingUser?._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Refresh the users list
          await fetchAdminUsers();
          alert(modalMode === 'create' ? 'Admin user created successfully!' : 'Admin user updated successfully!');
        } else {
          throw new Error(result.error || 'Failed to save user');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to save user'}`);
      throw error;
    }
  };

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/admins', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setAdminUsers(data.data.adminUsers);
      } else {
        throw new Error(data.error || 'Failed to fetch admin users data');
      }
    } catch (error) {
      console.error('Error fetching admin users:', error);
      // Fallback to demo data if API fails
      setAdminUsers(getFallbackAdminUsers());
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (adminUser: AdminUser) => {
    if (window.confirm(`Are you sure you want to delete ${adminUser.firstName} ${adminUser.lastName}?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/admins/${adminUser._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setAdminUsers(adminUsers.filter(u => u._id !== adminUser._id));
          alert('Admin user deleted successfully');
        } else {
          alert('Failed to delete admin user');
        }
      } catch (error) {
        console.error('Error deleting admin user:', error);
        alert('Error deleting admin user');
      }
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'superuser' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const columns = [
    { key: 'username', label: 'Username' },
    { 
      key: 'name', 
      label: 'Name',
      render: (value: any, row: AdminUser) => `${row.firstName} ${row.lastName}`
    },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => (
        <Badge className={getRoleColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'isActive', 
      label: 'Status',
      render: (value: boolean) => (
        <Badge className={getStatusColor(value)}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    { 
      key: 'lastLogin', 
      label: 'Last Login',
      render: (value: string | undefined) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
    { key: 'createdAt', label: 'Created' },
  ];

  const totalUsers = adminUsers.length;
  const activeUsers = adminUsers.filter(user => user.isActive).length;
  const superUsers = adminUsers.filter(user => user.role === 'superuser').length;
  const operators = adminUsers.filter(user => user.role === 'operator').length;

  return (
    <ProtectedRoute requiredPermission="admins:read">
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 mt-8 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Users Management</h1>
                  <p className="text-gray-600">Manage admin users and their permissions</p>
                </div>
                <Button
                  onClick={handleCreateUser}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Admin User
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <FaUserShield className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : totalUsers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <FaUserCheck className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : activeUsers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Superusers</CardTitle>
                    <FaUserShield className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : superUsers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Operators</CardTitle>
                    <FaUser className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : operators}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow">
                <DataTable
                  title="Admin Users"
                  data={adminUsers}
                  columns={columns}
                  loading={loading}
                  onEdit={handleEditUser}
                  onView={handleViewUser}
                  onDelete={handleDeleteUser}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* View User Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Admin User Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Username</label>
                  <p className="text-lg font-semibold">{selectedUser.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <div className="mt-1">
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedUser.isActive)}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Login</label>
                  <p className="text-lg">
                    {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Never'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created</label>
                  <p className="text-lg">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-lg">{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Permissions */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Permissions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedUser.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <Badge className={value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {value ? 'Allowed' : 'Denied'}
                      </Badge>
                    </div>
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
                    handleEditUser(selectedUser);
                  }}
                >
                  <FaEdit className="mr-2" /> Edit User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin User Modal */}
      <AdminUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
        mode={modalMode}
      />
    </ProtectedRoute>
  );
}
