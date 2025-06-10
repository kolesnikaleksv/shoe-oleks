'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';

interface ButtonTypes {
  text: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: ButtonTypes) {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          <ShoppingBag className="mr-4 h-5 w-5" />
          Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" />
          Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItemButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          disabled
          className="font-medium text-primary flex flex-row items-center"
        >
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Removing...
        </button>
      ) : (
        <button
          type="submit"
          className="font-medium text-primary cursor-pointer"
        >
          Delete
        </button>
      )}
    </>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="mt-5 w-full sm:mt-6 flex flex-row gap-2">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Pleas Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="mt-5 w-full">
          Checkout
        </Button>
      )}
    </>
  );
}
