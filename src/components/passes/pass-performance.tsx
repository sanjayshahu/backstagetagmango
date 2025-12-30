'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatPrice } from '@/lib/utils';
import { useOrderStats } from '@/hooks/use-orders';
import { usePageViewStats } from '@/hooks/use-analytics';
import { Text } from '../ui/text';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { Card } from '../ui/card';
import { PerformanceCard } from '@/components/common/performance/performance-card';
import {
  FILTER_PERIOD,
  FILTER_PERIOD_OPTIONS,
  getComparisonDateRanges,
  calculateDiff,
  calculatePercentDiff,
  getTrend,
  formatNumber,
  getPeriodLabel,
} from '@/components/common/performance/performance-utils';

interface PassPerformanceProps {
  stageId: string;
  passIds?: string[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function PassPerformance({
  stageId,
  passIds,
  className,
}: PassPerformanceProps) {
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

  // Current period order stats
  const { data: currentStats, isLoading: currentStatsLoading } = useOrderStats({
    stageId,
    startDate: dateRanges?.current.startDate,
    endDate: dateRanges?.current.endDate,
    passIds,
  });

  // Previous period order stats (only fetch when not ALL_TIME)
  const { data: previousStats, isLoading: previousStatsLoading } =
    useOrderStats(
      {
        stageId,
        startDate: dateRanges?.previous.startDate,
        endDate: dateRanges?.previous.endDate,
        passIds,
      },
      { enabled: !isAllTime && !!dateRanges }
    );

  // Current period page views
  const { data: currentPageViews, isLoading: currentPageViewsLoading } =
    usePageViewStats(
      {
        stageId,
        startDate: dateRanges?.current.startDate,
        endDate: dateRanges?.current.endDate,
      },
      { enabled: !isAllTime && !!dateRanges }
    );

  // Previous period page views
  const { data: previousPageViews, isLoading: previousPageViewsLoading } =
    usePageViewStats(
      {
        stageId,
        startDate: dateRanges?.previous.startDate,
        endDate: dateRanges?.previous.endDate,
      },
      { enabled: !isAllTime && !!dateRanges }
    );

  // All-time page views (when ALL_TIME is selected)
  const { data: allTimePageViews, isLoading: allTimePageViewsLoading } =
    usePageViewStats(
      {
        stageId,
        startDate: allTimeDateRange.startDate,
        endDate: allTimeDateRange.endDate,
      },
      { enabled: isAllTime }
    );

  // All-time order stats
  const { data: allTimeStats, isLoading: allTimeStatsLoading } = useOrderStats(
    {
      stageId,
      passIds,
    },
    { enabled: isAllTime }
  );

  const isLoading = isAllTime
    ? allTimeStatsLoading || allTimePageViewsLoading
    : currentStatsLoading ||
      previousStatsLoading ||
      currentPageViewsLoading ||
      previousPageViewsLoading;

  // Period label for subtext
  const periodLabel = useMemo(() => getPeriodLabel(period), [period]);

  // Calculate diffs
  const earningsDiff = useMemo(() => {
    if (isAllTime || !currentStats || !previousStats) return null;
    return calculateDiff(
      currentStats.totalCollectedUsdCents ?? 0,
      previousStats.totalCollectedUsdCents ?? 0
    );
  }, [isAllTime, currentStats, previousStats]);

  const ordersDiff = useMemo(() => {
    if (isAllTime || !currentStats || !previousStats) return null;
    return calculateDiff(
      currentStats.completedOrderCount ?? 0,
      previousStats.completedOrderCount ?? 0
    );
  }, [isAllTime, currentStats, previousStats]);

  const visitsDiff = useMemo(() => {
    if (isAllTime || !currentPageViews || !previousPageViews) return null;
    return calculatePercentDiff(
      currentPageViews.totalViews ?? 0,
      previousPageViews.totalViews ?? 0
    );
  }, [isAllTime, currentPageViews, previousPageViews]);

  // Format subtexts
  const earningsSubtext = useMemo(() => {
    if (isAllTime) return undefined;
    if (earningsDiff === null) return undefined;
    if (earningsDiff === 0) return `No change from ${periodLabel}`;
    const prefix = earningsDiff > 0 ? '+' : '';
    const formatted = formatPrice({
      price: { usdCents: Math.abs(earningsDiff) },
      priceType: 'paid',
    }).formattedString;
    return `${prefix}${earningsDiff > 0 ? '' : '-'}${formatted} from ${periodLabel}`;
  }, [isAllTime, earningsDiff, periodLabel]);

  const ordersSubtext = useMemo(() => {
    if (isAllTime) return undefined;
    if (ordersDiff === null) return undefined;
    if (ordersDiff === 0) return `No change from ${periodLabel}`;
    const prefix = ordersDiff > 0 ? '+' : '';
    return `${prefix}${ordersDiff} orders from ${periodLabel}`;
  }, [isAllTime, ordersDiff, periodLabel]);

  const visitsSubtext = useMemo(() => {
    if (isAllTime) return undefined;
    if (visitsDiff === null) return undefined;
    if (visitsDiff === 0) return `No change from ${periodLabel}`;
    const prefix = visitsDiff > 0 ? '+' : '';
    return `${prefix}${visitsDiff.toFixed(1)}% from ${periodLabel}`;
  }, [isAllTime, visitsDiff, periodLabel]);

  // Get display values based on period
  const displayEarnings = useMemo(() => {
    const cents = isAllTime
      ? allTimeStats?.totalCollectedUsdCents
      : currentStats?.totalCollectedUsdCents;
    return formatPrice({
      price: { usdCents: cents },
      priceType: 'paid',
    }).formattedString;
  }, [isAllTime, allTimeStats, currentStats]);

  const displayOrders = useMemo(() => {
    const count = isAllTime
      ? allTimeStats?.completedOrderCount ?? 0
      : currentStats?.completedOrderCount ?? 0;
    return formatNumber(count);
  }, [isAllTime, allTimeStats, currentStats]);

  const displayVisits = useMemo(() => {
    const views = isAllTime
      ? allTimePageViews?.totalViews ?? 0
      : currentPageViews?.totalViews ?? 0;
    return formatNumber(views);
  }, [isAllTime, allTimePageViews, currentPageViews]);

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
          Pass Performance
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
            label="Total Earnings"
            mainText={displayEarnings}
            subtext={earningsSubtext}
            trend={getTrend(earningsDiff)}
          />
          <PerformanceCard
            label="Total Orders"
            mainText={displayOrders}
            subtext={ordersSubtext}
            trend={getTrend(ordersDiff)}
          />
          <PerformanceCard
            label="Profile Visits"
            mainText={displayVisits}
            subtext={visitsSubtext}
            trend={getTrend(visitsDiff)}
          />
        </div>
      </SkeletonProvider>
    </Card>
  );
}
