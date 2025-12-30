'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';

export interface PerformanceCardProps {
  label: string;
  mainText: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function PerformanceCard({
  label,
  mainText,
  subtext,
  trend,
}: PerformanceCardProps) {
  const TrendIcon = useMemo(() => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  }, [trend]);

  const trendColor = useMemo(() => {
    if (trend === 'up') return 'text-success-10';
    if (trend === 'down') return 'text-error-10';
    return 'text-neutral-11';
  }, [trend]);

  return (
    <div className="p-4 flex items-center bg-neutral-2 border-neutral-3 justify-between rounded-3xl border w-full">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <Text className="text-base font-normal leading-6 text-neutral-12 whitespace-nowrap">
          {label}
        </Text>
        <Text className="text-2xl font-semibold leading-7.5 tracking-[-0.024px] whitespace-nowrap">
          {mainText}
        </Text>
        {subtext && (
          <div className="flex items-center gap-1">
            <TrendIcon className={cn('w-5 h-5 shrink-0', trendColor)} />
            <Text
              className={cn(
                'text-sm font-medium leading-5 whitespace-nowrap',
                trendColor
              )}
            >
              {subtext}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
