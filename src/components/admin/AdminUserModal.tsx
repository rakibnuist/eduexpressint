'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaUserShield, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface AdminUser {
  _id?: string;
  username: string;
  email: string;
  password?: string;
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
}

interface AdminUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: AdminUser) => Promise<void>;
  user?: AdminUser | null;
  mode: 'create' | 'edit';
}

export default function AdminUserModal({ isOpen, onClose, onSave, user, mode }: AdminUserModalProps) {
  const [formData, setFormData] = useState<AdminUser>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'operator',
    isActive: true,
    permissions: {
      canManageLeads: false,
      canManageUniversities: false,
      canManageB2BLeads: false,
      canManageUpdates: false,
      canManageAdmins: false,
      canManageSuccessStories: false,
    }
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && user) {
        setFormData({
          ...user,
          password: '' // Don't pre-fill password for edit
        });
      } else {
        // Reset form for create mode
        setFormData({
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          role: 'operator',
          isActive: true,
          permissions: {
            canManageLeads: false,
            canManageUniversities: false,
            canManageB2BLeads: false,
            canManageUpdates: false,
            canManageAdmins: false,
            canManageSuccessStories: false,
          }
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permission: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Remove password from data if it's empty (for edit mode)
      const userData = { ...formData };
      if (mode === 'edit' && !userData.password) {
        delete userData.password;
      }

      await onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role: 'superuser' | 'operator') => {
    setFormData(prev => ({
      ...prev,
      role,
      permissions: role === 'superuser' ? {
        canManageLeads: true,
        canManageUniversities: true,
        canManageB2BLeads: true,
        canManageUpdates: true,
        canManageAdmins: true,
        canManageSuccessStories: true,
      } : {
        canManageLeads: false,
        canManageUniversities: false,
        canManageB2BLeads: false,
        canManageUpdates: false,
        canManageAdmins: false,
        canManageSuccessStories: false,
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {mode === 'create' ? 'Create New Admin User' : 'Edit Admin User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username" className="flex items-center gap-2">
                <FaUser className="h-4 w-4" />
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={errors.username ? 'border-red-500' : ''}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <FaEnvelope className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={errors.firstName ? 'border-red-500' : ''}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={errors.lastName ? 'border-red-500' : ''}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {mode === 'create' && (
              <div className="md:col-span-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <FaLock className="h-4 w-4" />
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            {mode === 'edit' && (
              <div className="md:col-span-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <FaLock className="h-4 w-4" />
                  New Password (leave blank to keep current)
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            )}
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role" className="flex items-center gap-2">
                <FaUserShield className="h-4 w-4" />
                Role *
              </Label>
              <Select
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <option value="operator">Operator</option>
                <option value="superuser">Superuser</option>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              />
              <Label htmlFor="isActive" className="flex items-center gap-2">
                {formData.isActive ? (
                  <FaUserCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <FaUserTimes className="h-4 w-4 text-red-500" />
                )}
                Active User
              </Label>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                    disabled={formData.role === 'superuser'}
                  />
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                </div>
              ))}
            </div>
            {formData.role === 'superuser' && (
              <p className="text-sm text-gray-500 mt-2">
                Superusers have all permissions enabled by default.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Saving...' : (mode === 'create' ? 'Create User' : 'Update User')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
