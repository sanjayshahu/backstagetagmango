'use client';

import { useState, useMemo, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useVideoCallStats } from '@/hooks/use-video-calls';
import { Text } from '@/components/ui/text';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { Card } from '@/components/ui/card';
import { useStageAccess } from '@/lib/stage-access-context';
import { PerformanceCard } from '@/components/common/performance/performance-card';
import {
  FILTER_PERIOD,
  FILTER_PERIOD_OPTIONS,
  getComparisonDateRanges,
  calculateDiff,
  getTrend,
  formatNumber,
  getPeriodLabel,
} from '@/components/common/performance/performance-utils';

interface StreamPerformanceProps {
  stageId: string;
  className?: string;
}

export function StreamPerformance({ stageId, className }: StreamPerformanceProps) {
  const { role } = useStageAccess();
  const isStaff = role === 'owner' || role === 'admin' || role === 'moderator';

  const [period, setPeriod] = useState<FILTER_PERIOD>(
    FILTER_PERIOD.LAST_SEVEN_DAYS
  );

  // Memoized date ranges
  const dateRanges = useMemo(() => getComparisonDateRanges(period), [period]);

  const isAllTime = period === FILTER_PERIOD.ALL_TIME;

  // Stable all-time date range (computed once on mount to prevent query key changes)
  const allTimeDateRange = useMemo(() => {
    return {
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: new Date().toISOString(),
    };
  }, []);

  // Current period stats
  const { data: currentStats, isLoading: currentStatsLoading } =
    useVideoCallStats(
      {
        stageId,
        startDate: dateRanges?.current.startDate,
        endDate: dateRanges?.current.endDate,
      },
      { enabled: isStaff && !isAllTime && !!dateRanges }
    );

  // Previous period stats (only fetch when not ALL_TIME)
  const { data: previousStats, isLoading: previousStatsLoading } =
    useVideoCallStats(
      {
        stageId,
        startDate: dateRanges?.previous.startDate,
        endDate: dateRanges?.previous.endDate,
      },
      { enabled: isStaff && !isAllTime && !!dateRanges }
    );

  // All-time stats
  const { data: allTimeStats, isLoading: allTimeStatsLoading } =
    useVideoCallStats(
      {
        stageId,
        startDate: allTimeDateRange.startDate,
        endDate: allTimeDateRange.endDate,
      },
      { enabled: isStaff && isAllTime }
    );

  const isLoading = isAllTime
    ? allTimeStatsLoading
    : currentStatsLoading || previousStatsLoading;

  // Period label for subtext
  const periodLabel = useMemo(() => getPeriodLabel(period), [period]);

  // Calculate diffs
  const streamsDiff = useMemo(() => {
    if (isAllTime || !currentStats || !previousStats) return null;
    return calculateDiff(
      currentStats.totalCalls ?? 0,
      previousStats.totalCalls ?? 0
    );
  }, [isAllTime, currentStats, previousStats]);

  const attendeesDiff = useMemo(() => {
    if (isAllTime || !currentStats || !previousStats) return null;
    return calculateDiff(
      currentStats.totalUniqueAttendees ?? 0,
      previousStats.totalUniqueAttendees ?? 0
    );
  }, [isAllTime, currentStats, previousStats]);

  // Format subtexts
  const formatDiffSubtext = useCallback(
    (diff: number | null, unit: string) => {
      if (isAllTime) return undefined;
      if (diff === null) return undefined;
      if (diff === 0) return `No change from ${periodLabel}`;
      const prefix = diff > 0 ? '+' : '';
      return `${prefix}${diff} ${unit} from ${periodLabel}`;
    },
    [isAllTime, periodLabel]
  );

  const streamsSubtext = useMemo(
    () => formatDiffSubtext(streamsDiff, 'streams'),
    [formatDiffSubtext, streamsDiff]
  );

  const attendeesSubtext = useMemo(
    () => formatDiffSubtext(attendeesDiff, 'attendees'),
    [formatDiffSubtext, attendeesDiff]
  );

  // Get display values based on period
  const displayStreams = useMemo(() => {
    const count = isAllTime
      ? allTimeStats?.totalCalls ?? 0
      : currentStats?.totalCalls ?? 0;
    return formatNumber(count);
  }, [isAllTime, allTimeStats, currentStats]);

  const displayAttendees = useMemo(() => {
    const count = isAllTime
      ? allTimeStats?.totalUniqueAttendees ?? 0
      : currentStats?.totalUniqueAttendees ?? 0;
    return formatNumber(count);
  }, [isAllTime, allTimeStats, currentStats]);

  // Don't render if not staff
  if (!isStaff) {
    return null;
  }

  return (
    <Card
      className={cn(
        'overflow-hidden rounded-3xl border bg-neutral-1 border-neutral-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Text className="text-2xl font-medium text-neutral-12">
          Stream Performance
        </Text>
        <Tabs
          value={period}
          onValueChange={(v) => setPeriod(v as FILTER_PERIOD)}
          className="w-auto"
        >
          <TabsList className="h-8 bg-transparent p-0 gap-1 text-neutral-12">
            {FILTER_PERIOD_OPTIONS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                activeClassName="bg:transparent opacity-0!"
                className={`text-sm font-base px-3 cursor-pointer rounded-full bg-transparent text-neutral-12 transition-colors hover:bg-neutral-alpha-3 ${period === tab.value && 'text-medium bg-neutral-alpha-3'} `}
              >
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <SkeletonProvider loading={isLoading}>
        <div className="flex gap-4 px-4 pb-4 w-full">
          <PerformanceCard
            label="Total Streams"
            mainText={displayStreams}
            subtext={streamsSubtext}
            trend={getTrend(streamsDiff)}
          />
          <PerformanceCard
            label="Total Attendees"
            mainText={displayAttendees}
            subtext={attendeesSubtext}
            trend={getTrend(attendeesDiff)}
          />
        </div>
      </SkeletonProvider>
    </Card>
  );
}
