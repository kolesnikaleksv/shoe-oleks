import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import prisma from '@/lib/prisma';

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export async function Hero() {
  const data = await getData();
  console.log(data);
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                fill
                src={item.imageString}
                alt="Banner image"
                className="object-contain w-full h-full rounded-xl"
              />
              <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-4xl font-bold ">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-8" />
      <CarouselNext className="mr-8" />
    </Carousel>
  );
}
