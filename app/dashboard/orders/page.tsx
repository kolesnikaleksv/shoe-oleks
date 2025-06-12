import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import React from 'react';

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export default async function OrderPage() {
  const data = await getData();

  return (
    <div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent order from your store!</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-US').format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
