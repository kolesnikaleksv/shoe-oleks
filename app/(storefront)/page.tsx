import CategorySection from '@/components/storefront/CategorySection';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import { Hero } from '@/components/storefront/Hero';
import React from 'react';

export default function IndexPage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </>
  );
}
