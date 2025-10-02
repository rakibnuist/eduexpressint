'use client';

import React from 'react';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CTAContextType {
  isOpen: boolean;
  openCTA: (source?: string) => void;
  closeCTA: () => void;
  source: string;
}

const CTAContext = createContext<CTAContextType | undefined>(undefined);

export function CTAProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('CTA Form');

  const openCTA = (sourceName: string = 'CTA Form') => {
    setSource(sourceName);
    setIsOpen(true);
  };

  const closeCTA = () => {
    setIsOpen(false);
  };

  return (
    <CTAContext.Provider value={{ isOpen, openCTA, closeCTA, source }}>
      {children}
    </CTAContext.Provider>
  );
}

export function useCTA() {
  const context = useContext(CTAContext);
  if (context === undefined) {
    throw new Error('useCTA must be used within a CTAProvider');
  }
  return context;
}
