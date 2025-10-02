'use client';

import React from 'react';

import OptimizedDestinationPage from '@/components/destinations/OptimizedDestinationPage';

export default function ChinaPageOptimized() {
  const destinationConfig = {
    name: 'China',
    emoji: '🇨🇳',
    gradient: 'bg-gradient-to-br from-red-500 via-red-600 to-yellow-500',
    primaryColor: 'from-red-500 to-red-600',
    secondaryColor: 'from-yellow-500 to-orange-500',
    tertiaryColor: 'from-blue-500 to-cyan-500',
    keyStats: {
      tuition: '€2,000-8,000',
      programs: '500+',
      living: '€300-600'
    },
    features: [
      'World-Class Universities',
      'CSC Scholarships Available',
      'English Programs',
      'Cultural Experience',
      'Affordable Education',
      'Global Recognition'
    ],
    intakes: ['March', 'September']
  };

  return (
    <OptimizedDestinationPage 
      destinationSlug="china"
      destinationConfig={destinationConfig}
    />
  );
}
