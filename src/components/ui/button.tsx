'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Skeleton } from './skeleton';
import { useAuthGate } from '@/lib/auth-gate-context';

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-accent-9 hover:bg-accent-9/90 text-[#fff]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-neutral-alpha-11 text-neutral-12 hover:bg-neutral-alpha-12 hover:text-white',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        soft: 'bg-neutral-alpha-3 hover:bg-neutral-alpha-3/00 text-neutral-12',
        solid: 'bg-neutral-12 hover:bg-neutral-12/00 text-neutral-1',
        icon: 'border border-neutral-alpha-8 bg-neutral-alpha-3 hover:opacity-85',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const sizeToSkeletonVariant = {
  default: 'button',
  sm: 'button-sm',
  lg: 'button-lg',
  icon: 'button-icon',
} as const;

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  requireAuth = true,
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    /**
     * When true, clicking the button while logged out will open login modal
     * instead of executing onClick.
     * @default true
     */
    requireAuth?: boolean;
  }) {
  const isLoading = useSkeletonLoading(loading);
  const { isAuthenticated, openLoginModal } = useAuthGate();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Only intercept if requireAuth is true, user is not authenticated,
      // and there's an onClick handler
      if (requireAuth && !isAuthenticated && onClick) {
        e.preventDefault();
        openLoginModal();
        return;
      }
      onClick?.(e);
    },
    [requireAuth, isAuthenticated, onClick, openLoginModal],
  );

  if (isLoading) {
    const skeletonVariant = sizeToSkeletonVariant[size || 'default'];
    return <Skeleton variant={skeletonVariant} className={className} />;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    />
  );
}

export { Button, buttonVariants };
