'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

function Label({
  className,
  loading,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { loading?: boolean }) {
  const isLoading = useSkeletonLoading(loading);

  if (isLoading) {
    return <Skeleton variant="label" className={className} />;
  }

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Label };

