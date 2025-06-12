import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';

async function getData() {
  const orders = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });
  return orders;
}

export default async function RecentSales() {
  const orders = await getData();
  return (
    <Card className="xl:col-span-1">
      <CardHeader>
        <CardTitle>Recent sasles</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarImage
                src={order.User?.profileImage}
                alt={'Users avatar'}
              />
              <AvatarFallback>
                {order.User?.firstName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{`${order.User?.firstName} ${order.User?.lastName}`}</p>
              <p className="text-sm text-muted-foreground">
                {order.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +$ {new Intl.NumberFormat('en-US').format(order.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
