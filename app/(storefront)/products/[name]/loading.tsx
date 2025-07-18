import { LoadingProductCard } from '@/components/storefront/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingFile() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <Skeleton className="h-10 w-56 my-5" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
