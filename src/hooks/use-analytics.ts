'use client';

import { useEffect, useRef } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { PageViewCountResponseDto } from '@backstage-pass/api';

/**
 * Hook to record a page view for a stage.
 *
 * Features:
 * - Fire-and-forget: Does not block rendering
 * - One-time: Only fires once per component mount
 * - Silent failures: Does not throw on API errors
 *
 * @param stageId - The ID of the stage to record a view for
 *
 * @example
 * ```tsx
 * function BackstagePage() {
 *   const { stage } = useStageAccess();
 *
 *   // Record page view when stage is loaded
 *   useRecordPageView(stage?.id);
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useRecordPageView(stageId: string | undefined) {
  const hasRecorded = useRef(false);

  useEffect(() => {
    // Skip if no stageId or already recorded
    if (!stageId || hasRecorded.current) {
      return;
    }

    // Mark as recorded immediately to prevent duplicate calls
    hasRecorded.current = true;

    // Fire-and-forget: Don't await, don't block
    api
      .analyticsControllerCaptureEventV1(
        { eventType: 'page_view' },
        {
          stageId,
          referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
        }
      )
      .catch(() => {
        // Silently ignore errors - analytics should never break the UX
        // Reset the flag so we can retry on next mount if needed
        // hasRecorded.current = false; // Uncomment to enable retry on error
      });
  }, [stageId]);
}

/**
 * Hook to record a post view.
 * Future implementation placeholder.
 *
 * @param postId - The ID of the post to record a view for
 */
export function useRecordPostView(postId: string | undefined) {
  const hasRecorded = useRef(false);

  useEffect(() => {
    if (!postId || hasRecorded.current) {
      return;
    }

    hasRecorded.current = true;

    // TODO: Implement when post_view event type is supported
    // api.analyticsControllerCaptureEventV1(
    //   { eventType: 'post_view' },
    //   { postId }
    // ).catch(() => {});
  }, [postId]);
}

// ============================================
// Page View Stats Hook
// ============================================

interface UsePageViewStatsParams {
  stageId: string;
  startDate?: string;
  endDate?: string;
}

type UsePageViewStatsOptions = Omit<
  UseQueryOptions<PageViewCountResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

/**
 * Hook to fetch page view statistics for a stage within a date range.
 *
 * @param params - Parameters for the query
 * @param params.stageId - The ID of the stage
 * @param params.startDate - Start date (ISO 8601 format)
 * @param params.endDate - End date (ISO 8601 format)
 * @param options - Additional React Query options
 *
 * @example
 * ```tsx
 * const { data, isLoading } = usePageViewStats({
 *   stageId: 'stage_123',
 *   startDate: '2024-01-01',
 *   endDate: '2024-01-31',
 * });
 * ```
 */
export function usePageViewStats(
  params: UsePageViewStatsParams,
  options?: UsePageViewStatsOptions
) {
  const { stageId, startDate, endDate } = params;

  return useQuery<PageViewCountResponseDto, ApiClientError>({
    queryKey: queryKeys.analytics.pageViews(stageId, { startDate, endDate }),
    queryFn: async () => {
      const { data } = await api.analyticsControllerGetPageViewCountV1({
        stageId,
        startDate: startDate!,
        endDate: endDate!,
      });
      return data.result;
    },
    enabled: !!stageId && !!startDate && !!endDate,
    ...options,
  });
}
