import Navbar from '@/components/storefront/Navbar';
import React, { type ReactNode } from 'react';

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1">
        {children}
      </main>
    </>
  );
}
