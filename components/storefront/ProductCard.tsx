import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface IAppProps {
  item: {
    name: string;
    id: string;
    description: string;
    price: number;
    images: string[];
  };
}

export default function ProductCard({ item }: IAppProps) {
  return (
    <div className="rounded-lg flex flex-col">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, i) => (
            <CarouselItem key={i}>
              <div className="relative h-[330px]">
                <Image
                  src={item}
                  fill
                  alt={'Product Image'}
                  className="object-center object-cover w-full h-full rounded-lg"
                  sizes="h-[330px] w-auto"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex items-center justify-between mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">
        {item.description}
      </p>

      <Button className="mt-5 w-full cursor-pointer" asChild>
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col gap-y-2 mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-5" />
    </div>
  );
}
