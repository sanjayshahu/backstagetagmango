'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';

// Map text sizes to skeleton heights (roughly matching line-height)
const textSizeToSkeletonHeight: Record<string, string> = {
  'text-xs': 'h-3',
  'text-sm': 'h-3.5',
  'text-base': 'h-4',
  'text-lg': 'h-5',
  'text-xl': 'h-5',
  'text-2xl': 'h-6',
  'text-3xl': 'h-7',
  'text-4xl': 'h-9',
  'text-5xl': 'h-12',
};

function getSkeletonHeight(className?: string): string {
  // First, check if className contains a text size override
  if (className) {
    for (const [textClass, heightClass] of Object.entries(textSizeToSkeletonHeight)) {
      if (className.includes(textClass)) {
        return heightClass;
      }
    }
  }

  return 'h-4';
}


type TextElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  loading?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as: Component = 'div', loading, children, ...props }, ref) => {
    const isLoading = useSkeletonLoading(loading);

    if (isLoading) {
      if (Component === 'p') {
        return (
          <div className="space-y-2">
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        );
      }
      const skeletonHeight = getSkeletonHeight(className);
      return <Skeleton className={cn(skeletonHeight, className)} />;
    }

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        data-slot="text"
        className={cn('text-neutral-12', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

export { Text, type TextElement };
