'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaEye, 
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Filter {
  key: string;
  label: string;
  type: 'select' | 'text';
  options?: { value: string; label: string }[];
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  filters?: Filter[];
  loading?: boolean;
  error?: string | null;
  onEdit?: (item: any) => void;
  onView?: (item: any) => void;
  onDelete?: (item: any) => void;
  onSearch?: (value: string) => void;
  onFilter?: (key: string, value: string) => void;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

export default function DataTable({
  title,
  data,
  columns,
  filters = [],
  loading = false,
  error = null,
  onEdit,
  onView,
  onDelete,
  onSearch,
  onFilter,
  actions,
  emptyMessage = "No data available"
}: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <FaSort className="h-3 w-3 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <FaSortUp className="h-3 w-3 text-blue-600" />
      : <FaSortDown className="h-3 w-3 text-blue-600" />;
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Accepted': 'bg-emerald-100 text-emerald-800',
      'Rejected': 'bg-red-100 text-red-800',
      'published': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-gray-100 text-gray-800',
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderCell = (column: Column, row: any) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    // Auto-format common fields
    if (column.key === 'status' || column.key === 'priority') {
      return (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      );
    }
    
    if (column.key === 'createdAt') {
      return new Date(value).toLocaleDateString();
    }
    
    return value || '-';
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {actions}
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {onSearch && (
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {filters.map((filter) => (
            <div key={filter.key} className="flex items-center space-x-2">
              <FaFilter className="h-4 w-4 text-gray-400" />
              {filter.type === 'select' ? (
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  onChange={(e) => onFilter?.(filter.key, e.target.value)}
                >
                  <option value="">All {filter.label}</option>
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  placeholder={`Filter by ${filter.label}`}
                  onChange={(e) => onFilter?.(filter.key, e.target.value)}
                  className="w-40"
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">{emptyMessage}</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`text-left py-3 px-4 font-medium text-gray-700 ${
                        column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{column.label}</span>
                        {column.sortable && getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                  {(onEdit || onView || onDelete) && (
                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row._id || index} className="border-b border-gray-100 hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-4">
                        {renderCell(column, row)}
                      </td>
                    ))}
                    {(onEdit || onView || onDelete) && (
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          {onView && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onView(row)}
                              className="h-8 w-8 p-0"
                            >
                              <FaEye className="h-3 w-3" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(row)}
                              className="h-8 w-8 p-0"
                            >
                              <FaEdit className="h-3 w-3" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(row)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <FaTrash className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
