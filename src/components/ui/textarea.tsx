'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { loading?: boolean }
>(({ className, loading, ...props }, ref) => {
  const isLoading = useSkeletonLoading(loading);

  if (isLoading) {
    return <Skeleton className={cn('min-h-[80px] w-full rounded-md', className)} />;
  }

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
