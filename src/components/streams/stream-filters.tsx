'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type StreamFilterType = 'upcoming' | 'past';

export interface StreamFiltersProps {
  activeFilter: StreamFilterType;
  onFilterChange: (filter: StreamFilterType) => void;
  className?: string;
}

const STREAM_TABS: Array<{
  value: StreamFilterType;
  label: string;
}> = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Completed' },
];

export function StreamFilters({
  activeFilter,
  onFilterChange,
  className,
}: StreamFiltersProps) {
  return (
    <Tabs
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as StreamFilterType)}
      className={className}
    >
      <TabsList className="flex gap-3 bg-transparent p-1">
        {STREAM_TABS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn(
              'px-4 py-2 rounded-full bg-neutral-3 cursor-pointer text-base font-medium text-neutral-12',
              'data-[state=active]:bg-neutral-12 data-[state=active]:text-background',
            )}
            activeClassName="bg-transparent rounded-none shadow-none"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
