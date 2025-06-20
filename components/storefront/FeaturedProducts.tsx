import prisma from '@/lib/prisma';
import React, { Suspense } from 'react';
import ProductCard, {
  LoadingProductCard,
} from '@/components/storefront/ProductCard';

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = await prisma.product.findMany({
    where: {
      status: 'published',
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
  return data;
}

export default function FeaturedProducts() {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">
        Featured Products
      </h1>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedProducts() {
  const data = await getData();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard /> <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
