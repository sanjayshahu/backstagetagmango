import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(className)}
      {...props}
    />
  );
}

function CardSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-section"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Card,
  CardSection
};

