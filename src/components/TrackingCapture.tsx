'use client';

import { useEffect } from 'react';
import { metaPixel } from './MetaPixel';

interface TrackingCaptureProps {
  eventName: string;
  eventData?: Record<string, any>;
  children?: React.ReactNode;
}

export default function TrackingCapture({ eventName, eventData = {}, children }: TrackingCaptureProps) {
  useEffect(() => {
    // Track the event when component mounts
    if (eventName) {
      metaPixel.trackCustomEvent(eventName, eventData);
      console.log(`✅ Meta Pixel: ${eventName} tracked`, eventData);
    }
  }, [eventName, eventData]);

  return <>{children}</>;
}
