'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text } from '../ui/text';

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
};

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
}: StatsCardProps) {
  const TrendIcon = useMemo(() => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  }, [trend]);

  const trendColor = useMemo(() => {
    if (trend === 'up') return 'text-static-success-11';
    if (trend === 'down') return 'text-static-error-11';
    return 'text-static-white';
  }, [trend]);

  return (
    <div className="rounded-3xl space-y-2 border-none bg-static-neutral-alpha-3 p-4">
      <h5 className="text-base font-normal text-static-white">{title}</h5>
      <Text as='p' className="text-[28px] font-semibold text-static-white">
        {value}
      </Text>
      {subtitle && (
        <Text as='p'
          className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trendColor
          )}
        >
          <TrendIcon className="size-4" />
          {subtitle}
        </Text>
      )}
    </div>
  );
}
