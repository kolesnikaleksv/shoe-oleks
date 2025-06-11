import prisma from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    console.log(error);
    return new Response('Webhook handler failed. View logs.', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          id: session.id,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }
    default: {
      console.log('Unhandled event');
    }
  }

  return new Response(null, { status: 200 });
}
