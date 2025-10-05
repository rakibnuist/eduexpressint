'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Remove any global styles that might interfere with admin layout
    document.body.classList.remove('pt-20');
  }, []);

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
