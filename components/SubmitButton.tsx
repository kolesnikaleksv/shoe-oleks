'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface ButtonTypes {
  text: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: ButtonTypes) {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}
