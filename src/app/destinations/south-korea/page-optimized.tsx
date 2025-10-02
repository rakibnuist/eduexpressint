'use client';

import React from 'react';

import OptimizedDestinationPage from '@/components/destinations/OptimizedDestinationPage';

export default function SouthKoreaPageOptimized() {
  const destinationConfig = {
    name: 'South Korea',
    emoji: '🇰🇷',
    gradient: 'bg-gradient-to-br from-blue-500 via-red-500 to-blue-600',
    primaryColor: 'from-blue-500 to-blue-600',
    secondaryColor: 'from-red-500 to-red-600',
    tertiaryColor: 'from-yellow-500 to-orange-500',
    keyStats: {
      tuition: '€3,000-12,000',
      programs: '200+',
      living: '€600-1,200'
    },
    features: [
      'K-Government Scholarships',
      'EAP/KAP Programs',
      'English Programs',
      'Technology Innovation',
      'Cultural Experience',
      'Global Recognition'
    ],
    intakes: ['March', 'September']
  };

  return (
    <OptimizedDestinationPage 
      destinationSlug="south-korea"
      destinationConfig={destinationConfig}
    />
  );
}
