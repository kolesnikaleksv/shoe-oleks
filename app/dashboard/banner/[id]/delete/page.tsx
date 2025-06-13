import { deleteBanner } from '@/app/actions';
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

export default async function DeleteBanner({
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
            banner and remove all data from our servers
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button className="cursor-pointer" variant="secondary" asChild>
            <Link href={'/dashboard/banner'}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={id as string} />
            <SubmitButton text="Delete Product" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
