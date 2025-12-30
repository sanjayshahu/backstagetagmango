'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

function Avatar({
  className,
  loading,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { loading?: boolean }) {
  const isLoading = useSkeletonLoading(loading);

  if (isLoading) {
    return (
      <Skeleton
        variant="avatar"
        className={cn('size-8', className)}
      />
    );
  }

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full text-neutral-11 bg-gray-5',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

