'use client';

import React from 'react';

import OptimizedDestinationPage from '@/components/destinations/OptimizedDestinationPage';

export default function HungaryPageOptimized() {
  const destinationConfig = {
    name: 'Hungary',
    emoji: '🇭🇺',
    gradient: 'bg-gradient-to-br from-red-500 via-white to-green-500',
    primaryColor: 'from-red-500 to-red-600',
    secondaryColor: 'from-green-500 to-green-600',
    tertiaryColor: 'from-blue-500 to-cyan-500',
    keyStats: {
      tuition: '€2,000-8,000',
      programs: '300+',
      living: '€400-800'
    },
    features: [
      'Stipendium Hungaricum',
      'EU Recognition',
      'English Programs',
      'Central European Location',
      'Affordable Education',
      'Cultural Heritage'
    ],
    intakes: ['September', 'February']
  };

  return (
    <OptimizedDestinationPage 
      destinationSlug="hungary"
      destinationConfig={destinationConfig}
    />
  );
}
