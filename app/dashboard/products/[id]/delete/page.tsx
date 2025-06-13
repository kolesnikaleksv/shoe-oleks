import { deleteProduct } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function DeleteProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delet this
            product and remove all data from our servers
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button className="cursor-pointer" variant="secondary" asChild>
            <Link href={'/dashboard/products'}>Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={id as string} />
            <SubmitButton text="Delete Product" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
