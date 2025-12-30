'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { loading?: boolean }
>(({ className, type, loading, children, ...props }, ref) => {
  const isLoading = useSkeletonLoading(loading);

  if (isLoading) {
    return <Skeleton variant="input" className={className} />;
  }

  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn('w-full h-12 text-neutral-12 bg-white border border-neutral-alpha-6 disabled:border-neutral-alpha-2 focus:border-neutral-4 rounded-full p-4 focus:outline-none', className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
