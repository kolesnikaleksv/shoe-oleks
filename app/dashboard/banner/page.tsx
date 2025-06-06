import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function getData() {
  const data = prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export default async function BannerRoute() {
  const data = await getData();
  return (
    <>
      <div className="flex justify-end items-center">
        <Button className="flex gap-x-2" asChild>
          <Link href={'/dashboard/banner/create'}>
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.imageString}
                      height={64}
                      width={64}
                      alt="Banner Image"
                      className="h-16 w-16 object-cover rounded-xl"
                    />
                  </TableCell>
                  <TableCell className="font-mediums">{item.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${item.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
