'use client';
import { createBanner } from '@/app/actions';
import { UploadDropzone } from '@/app/lib/uploadthing';
import { bannerShema } from '@/app/lib/zodSchemas';
import { SubmitButton } from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';

export default function CreateRoute() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(createBanner, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerShema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant={'outline'} size={'icon'} asChild>
          <Link href={'/dashboard/products'}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Create title for banner"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <label>Images</label>
              <Input
                type="hidden"
                name={fields.imageString.name}
                key={fields.imageString.key}
                value={image ?? ''}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover rounded-xl"
                />
              ) : (
                <UploadDropzone
                  endpoint={'bannerImageRoute'}
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    alert('Something went wrong');
                  }}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
