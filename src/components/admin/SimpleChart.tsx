'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  _id: string;
  count: number;
  totalValue?: number;
  featured?: number;
  active?: number;
}

interface SimpleChartProps {
  title: string;
  data: ChartData[];
  type: 'bar' | 'pie' | 'line';
  color?: string;
  showPercentage?: boolean;
  showValue?: boolean;
}

export default function SimpleChart({ 
  title, 
  data, 
  type = 'bar', 
  color = 'bg-blue-500',
  showPercentage = true,
  showValue = true
}: SimpleChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const getColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-orange-500'
    ];
    return colors[index % colors.length];
  };

  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        return (
          <div key={item._id} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium capitalize">{item._id}</span>
              <div className="flex items-center gap-2">
                {showValue && <span className="text-gray-600">{item.count}</span>}
                {showPercentage && (
                  <span className="text-gray-500 text-xs">{percentage.toFixed(1)}%</span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getColor(index)} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPieChart = () => (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.count / total) * 100 : 0;
            const circumference = 2 * Math.PI * 15; // radius = 15
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = index === 0 ? 0 : 
              data.slice(0, index).reduce((sum, prevItem) => 
                sum - ((prevItem.count / total) * circumference), 0);
            
            return (
              <circle
                key={item._id}
                cx="16"
                cy="16"
                r="15"
                fill="none"
                stroke={`var(--color-${index})`}
                strokeWidth="2"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
                style={{
                  '--color-0': '#3B82F6',
                  '--color-1': '#10B981', 
                  '--color-2': '#F59E0B',
                  '--color-3': '#EF4444',
                  '--color-4': '#8B5CF6',
                  '--color-5': '#6366F1',
                  '--color-6': '#EC4899',
                  '--color-7': '#F97316'
                } as React.CSSProperties}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">{total}</span>
        </div>
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="space-y-2">
      <div className="flex items-end justify-between h-20 gap-1">
        {data.map((item, index) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;
          return (
            <div key={item._id} className="flex flex-col items-center gap-1 flex-1">
              <div 
                className={`w-full ${getColor(index)} rounded-t transition-all duration-500`}
                style={{ height: `${percentage}%` }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        {data.map((item) => (
          <span key={item._id} className="capitalize truncate">
            {item._id}
          </span>
        ))}
      </div>
    </div>
  );

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return renderPieChart();
      case 'line':
        return renderLineChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          renderChart()
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
