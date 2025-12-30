'use client';

import { cn } from '@/lib/utils';

interface BlurryImageEffectProps {
  src?: string;
  alt?: string;
  className?: string;
  blur?: number;
  lightGradientColor?: string;
  darkGradientColor?: string;
}

export function BlurryImageEffect({
  src = '/creator_dp.png',
  alt = '',
  className,
  blur = 276,
  lightGradientColor = '#F7F6FC',
  darkGradientColor = '#030303',
}: BlurryImageEffectProps) {
  return (
    <div
      aria-label={alt}
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{
        background: `url(${src}) lightgray 50% / 100% 711.111% no-repeat`,
      }}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-linear-to-b',
          'from-[rgba(247,246,252,0.3)] to-[var(--gradient-color)]',
          'dark:from-[rgba(3,3,3,0.3)] dark:to-[var(--gradient-color-dark)]',
        )}
        style={
          {
            '--gradient-color': lightGradientColor,
            '--gradient-color-dark': darkGradientColor,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
