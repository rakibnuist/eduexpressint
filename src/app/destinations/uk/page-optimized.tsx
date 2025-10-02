'use client';

import React from 'react';

import OptimizedDestinationPage from '@/components/destinations/OptimizedDestinationPage';

export default function UKPageOptimized() {
  const destinationConfig = {
    name: 'United Kingdom',
    emoji: '🇬🇧',
    gradient: 'bg-gradient-to-br from-blue-600 via-red-500 to-blue-800',
    primaryColor: 'from-blue-600 to-blue-700',
    secondaryColor: 'from-red-500 to-red-600',
    tertiaryColor: 'from-green-500 to-emerald-500',
    keyStats: {
      tuition: '€15,000-35,000',
      programs: '1,000+',
      living: '€1,200-2,000'
    },
    features: [
      'World-Renowned Universities',
      'Chevening Scholarships',
      'English Programs',
      'Global Recognition',
      'Research Excellence',
      'Cultural Heritage'
    ],
    intakes: ['September', 'January']
  };

  return (
    <OptimizedDestinationPage 
      destinationSlug="uk"
      destinationConfig={destinationConfig}
    />
  );
}
