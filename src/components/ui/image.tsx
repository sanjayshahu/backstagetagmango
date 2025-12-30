'use client';

import * as React from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

export interface ImageProps extends NextImageProps {
  skeleton?: boolean;
}

function Image({ className, skeleton, ...props }: ImageProps) {
  const isLoading = useSkeletonLoading(skeleton);

  if (isLoading) {
    return <Skeleton variant="image" className={className} />;
  }

  return (
    <NextImage
      data-slot="image"
      className={cn(className)}
      {...props}
    />
  );
}

export { Image };
