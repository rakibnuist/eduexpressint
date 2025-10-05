'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAForm from '@/components/CTAForm';
import { CTAProvider } from '@/context/CTAContext';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // For admin routes, don't show navbar, footer, or CTA form
    return <>{children}</>;
  }

  // For regular routes, show the full layout
  return (
    <CTAProvider>
      <Navbar />
      <main className="pt-20 min-h-screen">{children}</main>
      <Footer />
      <CTAForm />
    </CTAProvider>
  );
}
