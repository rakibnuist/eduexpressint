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
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        return (
          <div key={item._id} className="space-y-2 group">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold capitalize text-gray-700 group-hover:text-gray-900 transition-colors">
                {item._id}
              </span>
              <div className="flex items-center gap-3">
                {showValue && (
                  <span className="text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
                {showPercentage && (
                  <span className="text-gray-500 text-xs font-medium">
                    {percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${getColor(index)} transition-all duration-1000 ease-out group-hover:shadow-lg`}
                style={{ 
                  width: `${percentage}%`,
                  animationDelay: `${index * 100}ms`
                }}
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
    <div className="space-y-3">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {data.length > 0 ? (
          renderChart()
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
