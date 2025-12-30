/**
 * Shared utilities for performance dashboard components
 */

export enum FILTER_PERIOD {
  LAST_SEVEN_DAYS = 'SEVEN_DAYS',
  LAST_MONTH = 'LAST_MONTH',
  ALL_TIME = 'ALL_TIME',
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ComparisonDateRanges {
  current: DateRange;
  previous: DateRange;
}

/**
 * Calculate both current and previous date ranges for comparison
 * Current: today - X days → today
 * Previous: today - 2X days → today - X days
 */
export function getComparisonDateRanges(
  period: FILTER_PERIOD
): ComparisonDateRanges | null {
  if (period === FILTER_PERIOD.ALL_TIME) return null;

  const now = new Date();
  const days = period === FILTER_PERIOD.LAST_SEVEN_DAYS ? 7 : 30;

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Current period: today - X days → today
  const currentEndDate = new Date(now);
  currentEndDate.setHours(23, 59, 59, 999);

  const currentStartDate = new Date(now);
  currentStartDate.setDate(currentStartDate.getDate() - days);
  currentStartDate.setHours(0, 0, 0, 0);

  // Previous period: today - 2X days → today - X days
  const previousEndDate = new Date(currentStartDate);
  previousEndDate.setMilliseconds(-1); // End just before current period starts

  const previousStartDate = new Date(now);
  previousStartDate.setDate(previousStartDate.getDate() - days * 2);
  previousStartDate.setHours(0, 0, 0, 0);

  return {
    current: {
      startDate: `${formatDate(currentStartDate)}T00:00:00.000Z`,
      endDate: `${formatDate(currentEndDate)}T23:59:59.999Z`,
    },
    previous: {
      startDate: `${formatDate(previousStartDate)}T00:00:00.000Z`,
      endDate: `${formatDate(previousEndDate)}T23:59:59.999Z`,
    },
  };
}

/**
 * Calculate raw difference between current and previous values
 */
export function calculateDiff(current: number, previous: number): number {
  return current - previous;
}

/**
 * Calculate percentage difference between current and previous values
 */
export function calculatePercentDiff(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Determine trend direction based on difference
 */
export function getTrend(
  diff: number | null
): 'up' | 'down' | 'neutral' | undefined {
  if (diff === null) return undefined;
  if (diff > 0) return 'up';
  if (diff < 0) return 'down';
  return 'neutral';
}

/**
 * Format number with locale-specific separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Get period label for comparison subtext
 */
export function getPeriodLabel(period: FILTER_PERIOD): string {
  if (period === FILTER_PERIOD.LAST_SEVEN_DAYS) return 'previous week';
  if (period === FILTER_PERIOD.LAST_MONTH) return 'previous month';
  return '';
}

/**
 * Filter period options for tabs
 */
export const FILTER_PERIOD_OPTIONS = [
  { value: FILTER_PERIOD.LAST_SEVEN_DAYS, label: 'Last 7 days' },
  { value: FILTER_PERIOD.LAST_MONTH, label: 'Last 30 days' },
  { value: FILTER_PERIOD.ALL_TIME, label: 'All time' },
] as const;
