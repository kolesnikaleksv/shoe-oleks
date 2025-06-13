import { addItem } from '@/app/actions';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import ImageSlider from '@/components/storefront/ImageSlider';
import { ShoppingBagButton } from '@/components/SubmitButton';
import prisma from '@/lib/prisma';
import { StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getData(id);

  const addProducttoShopingCart = addItem.bind(null, product.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={product.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${product.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{product.description}</p>
          <form action={addProducttoShopingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
