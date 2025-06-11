import { checkout, delItem } from '@/app/actions';
import { CheckoutButton, DeleteItemButton } from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect('/');
  }
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  let subtotal = 0;
  cart?.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[25vh]">
      {!cart || !cart.items ? (
        <div className="flex flex-col min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 justify-center items-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 font-semibold text-xl">
            You dont have any products in your bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm text-muted-foreground leading-6 max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here
          </p>
          <Button asChild>
            <Link href={'/'}>Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10 w-full">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  src={item.imageString}
                  alt="Product picture"
                  fill
                  sizes="w-24 h-24 sm:w-32 sm:h-32"
                />
              </div>
              <div className="flex ml-5 justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>
                  <form action={delItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />

                    <DeleteItemButton />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>{new Intl.NumberFormat('en-US').format(subtotal)}</p>
            </div>

            <form action={checkout}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
