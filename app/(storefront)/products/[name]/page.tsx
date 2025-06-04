import ProductCard from '@/components/storefront/ProductCard';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = prisma.product.findMany({
        select: {
          name: true,
          images: true,
          description: true,
          id: true,
          price: true,
        },
        where: {
          status: 'published',
        },
      });
      return {
        title: 'All Products',
        data,
      };
    }
    case 'men': {
      const data = prisma.product.findMany({
        where: {
          category: 'men',
          status: 'published',
        },
        select: {
          name: true,
          images: true,
          description: true,
          id: true,
          price: true,
        },
      });
      return {
        title: 'Products for men',
        data,
      };
    }
    case 'women': {
      const data = prisma.product.findMany({
        where: {
          category: 'women',
          status: 'published',
        },
        select: {
          name: true,
          images: true,
          description: true,
          id: true,
          price: true,
        },
      });
      return {
        title: 'Products for women',
        data,
      };
    }
    case 'kids': {
      const data = prisma.product.findMany({
        where: {
          category: 'kids',
          status: 'published',
        },
        select: {
          name: true,
          images: true,
          description: true,
          id: true,
          price: true,
        },
      });
      return {
        title: 'Products for kids',
        data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  const { data, title } = await getData(name);

  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(await data).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
