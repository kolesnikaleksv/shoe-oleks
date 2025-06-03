import Image from 'next/image';
import Link from 'next/link';
import all from '@/public/all.jpg';
import men from '@/public/men.jpg';
import women from '@/public/women.jpg';

export default function CategorySection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h1>
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href={'/products/all'}
        >
          Browse All Products &rarr;
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg: gap-8">
        <div className="relative group aspect-[2/1] rounded-xl overflow-hidden sm:aspect-none sm:row-span-2 sm:w-full sm:h-full">
          <Image
            src={all}
            alt="All products image"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute inset-0 p-6 flex items-end">
            <Link href={'/products/all'}>
              <h3 className="text-white font-semibold">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>
        <div className="group aspect-[2/1] rounded-xl overflow-hidden relative sm:aspect-none sm:h-full">
          <Image
            src={men}
            alt="For men products image"
            className="object-cover object-bottom absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute inset-0 p-6 flex items-end">
            <Link href={'/products/men'}>
              <h3 className="text-white font-semibold">Products for men</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>
        <div className="relative group aspect-[2/1] rounded-xl overflow-hidden sm:aspect-none sm:h-full">
          <Image
            src={women}
            alt="For women products image"
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute inset-0 p-6 flex items-end">
            <Link href={'/products/women'}>
              <h3 className="text-white font-semibold">Products for women</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
