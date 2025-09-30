'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FaUserShield,
  FaUserCog,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaInfoCircle
} from 'react-icons/fa';

interface AdminUser {
  _id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superuser' | 'operator';
  permissions: {
    canManageLeads: boolean;
    canManageUniversities: boolean;
    canManageB2BLeads: boolean;
    canManageUpdates: boolean;
    canManageAdmins: boolean;
  };
  isActive: boolean;
  password?: string;
  createdAt?: string;
  lastLogin?: string;
}

interface AdminFormProps {
  initialData?: AdminUser | null;
  onSubmit: (data: AdminUser) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit' | 'view';
}

const ROLES = [
  { value: 'superuser', label: 'Super User', description: 'Full access to all features' },
  { value: 'operator', label: 'Operator', description: 'Limited access based on permissions' },
];

const PERMISSIONS = [
  {
    key: 'canManageLeads',
    label: 'Manage Leads',
    description: 'Can view, create, edit, and delete leads',
    icon: '👥'
  },
  {
    key: 'canManageUniversities',
    label: 'Manage Universities',
    description: 'Can view, create, edit, and delete universities',
    icon: '🏫'
  },
  {
    key: 'canManageB2BLeads',
    label: 'Manage B2B Leads',
    description: 'Can view, create, edit, and delete B2B leads',
    icon: '🤝'
  },
  {
    key: 'canManageUpdates',
    label: 'Manage Updates',
    description: 'Can view, create, edit, and delete updates',
    icon: '📰'
  },
  {
    key: 'canManageAdmins',
    label: 'Manage Admins',
    description: 'Can create, edit, and delete other admin users',
    icon: '👨‍💼'
  }
];

export default function AdminForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting, 
  mode 
}: AdminFormProps) {
  const [formData, setFormData] = useState<AdminUser>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'operator',
    permissions: {
      canManageLeads: false,
      canManageUniversities: false,
      canManageB2BLeads: false,
      canManageUpdates: false,
      canManageAdmins: false,
    },
    isActive: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        password: '', // Don't pre-fill password for security
      });
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permission: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (mode === 'create' && !formData.password?.trim()) {
      newErrors.password = 'Password is required for new admins';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isReadOnly = mode === 'view';
  const isEditing = mode === 'edit';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FaUserShield className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter username"
                disabled={isReadOnly}
                className={errors.username ? 'border-red-300' : ''}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email"
                disabled={isReadOnly}
                className={errors.email ? 'border-red-300' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                disabled={isReadOnly}
                className={errors.firstName ? 'border-red-300' : ''}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                disabled={isReadOnly}
                className={errors.lastName ? 'border-red-300' : ''}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {mode === 'create' && (
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password || ''}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password"
                  className={errors.password ? 'border-red-300 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {isEditing && (
            <div>
              <Label htmlFor="password">New Password (optional)</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password || ''}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Leave blank to keep the current password
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role and Status */}
      <Card>
        <CardHeader>
          <CardTitle>Role & Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'superuser' | 'operator') => handleInputChange('role', value)}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    <div>
                      <div className="font-medium">{role.label}</div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Active Status</Label>
              <p className="text-sm text-gray-500">Whether this admin can log in</p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              disabled={isReadOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FaUserCog className="h-5 w-5" />
            <span>Permissions</span>
            {formData.role === 'superuser' && (
              <Badge variant="default" className="ml-2">
                Full Access
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.role === 'superuser' ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-800">
                <FaInfoCircle className="h-4 w-4" />
                <span className="font-medium">Super User</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Super users have full access to all features and permissions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {PERMISSIONS.map(permission => (
                <div key={permission.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{permission.icon}</span>
                    <div>
                      <Label className="font-medium">{permission.label}</Label>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.permissions[permission.key as keyof typeof formData.permissions]}
                    onCheckedChange={(checked) => handlePermissionChange(permission.key, checked)}
                    disabled={isReadOnly}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FaUserCog className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <FaCheck className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Admin' : 'Create Admin'}
              </>
            )}
          </Button>
        </div>
      )}

      {isReadOnly && (
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      )}
    </form>
  );
}
