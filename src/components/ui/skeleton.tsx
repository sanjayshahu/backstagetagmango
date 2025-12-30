import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted bg-gray-5', {
  variants: {
    variant: {
      default: '',
      text: `h-4 w-full`,
      heading: 'h-6 w-3/4',
      button: 'h-9 w-24',
      'button-sm': 'h-8 w-20',
      'button-lg': 'h-10 w-28',
      'button-icon': 'size-9',
      input: 'h-9 w-full',
      badge: 'h-5 w-16',
      avatar: 'size-8 rounded-full',
      'avatar-sm': 'size-6 rounded-full',
      'avatar-lg': 'size-12 rounded-full',
      label: 'h-4 w-20',
      image: 'h-48 w-full',
      'image-sm': 'h-24 w-24',
      'image-lg': 'h-64 w-full',
      circular: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof skeletonVariants> { }

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
