'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface IAppProps {
  images: string[];
}
export default function ImageSlider({ images }: IAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePreviousClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setMainImageIndex((previous) =>
      previous === images.length - 1 ? 0 : previous + 1
    );
  };

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative w-[600px] h-[600px]">
          <Image
            src={images[mainImageIndex]}
            alt={'Product Image'}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={handlePreviousClick}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextClick}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, i) => (
          <div
            className={cn(
              i === mainImageIndex
                ? 'border-2 border-primary'
                : 'border border-gray-200',
              'relative overflow-hidden rounded-lg cursor-pointer'
            )}
            key={i}
            onClick={() => setMainImageIndex(i)}
          >
            <Image
              src={image}
              alt={'Product image'}
              width={80}
              height={100}
              className="object-cover w-[80px] h-[100px] "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
