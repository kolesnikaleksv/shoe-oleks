import React from 'react';
import { DollarSign, PartyPopper, ShoppingBag, User2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';

async function getData() {
  // Faster solution due to parallel execution of all queries
  const [users, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  // A less fast solution

  // const users = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //   },
  // });
  // const products = await prisma.product.findMany({
  //   select: {
  //     id: true,
  //   },
  // });
  // const orders = await prisma.order.findMany({
  //   select: {
  //     id: true,
  //     amount: true,
  //   },
  // });
  return { users, products, orders };
}

export default async function DashboardStats() {
  const { users, products, orders } = await getData();
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            $ {orders.reduce((sum, item) => item.amount + sum, 0) / 100}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{orders.length}</p>
          <p className="text-xs text-muted-foreground">
            Total sales on ShoeOleks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">
            Total products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-muted-foreground">Total Users signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
