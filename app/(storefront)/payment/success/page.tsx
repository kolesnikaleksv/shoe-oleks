import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SuccesRoute() {
  return (
    <section className="flex justify-center items-center w-full min-h-[80vh]">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-22 h-22 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Succesfull
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrat to your purchase. Your payment was successfull. We hope
              you&apos;ll enjoy your product
            </p>
            <Button className="mt-5 w-full sm:mt-6" asChild>
              <Link href={'/'}>Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
