'use Client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton() {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit">Create Product</Button>
      )}
    </>
  );
}
