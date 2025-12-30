'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys, VideoCallFilters } from '@/lib/query-keys';
import type {
  VideoCallResponseDto,
  JoinVideoCallResponseDto,
  ListVideoCallsResponseDto,
  ListVideoCallMembersResponseDto,
  CreateVideoCallDto,
  VideoCallStatsResponseDto,
} from '@backstage-pass/api';

// Re-export VideoCallFilters for convenience
export type { VideoCallFilters };

// ============================================
// Query Hooks
// ============================================

/**
 * Hook to fetch a single video call by ID
 */
export function useVideoCall(stageId: string, callId: string) {
  return useQuery<VideoCallResponseDto, ApiClientError>({
    queryKey: queryKeys.videoCalls.detail(stageId, callId),
    queryFn: async () => {
      const { data } = await api.videoCallsControllerGetVideoCallV1({
        stageId,
        callId,
      });
      return data.result;
    },
    enabled: !!stageId && !!callId,
  });
}

/**
 * Hook to fetch video calls for a stage (non-paginated)
 */
export function useVideoCalls(stageId: string, filters?: VideoCallFilters) {
  return useQuery<VideoCallResponseDto[], ApiClientError>({
    queryKey: queryKeys.videoCalls.list(stageId, filters),
    queryFn: async () => {
      const { data } = await api.videoCallsControllerListVideoCallsV1({
        stageId,
        filter: filters?.filter,
        status: filters?.status,
        scheduledTimeLessThan: filters?.scheduledTimeLessThan,
        limit: 50,
      });
      return data.result.videoCalls;
    },
    enabled: !!stageId,
  });
}

// ============================================
// Infinite Query Hook
// ============================================

/**
 * Hook to fetch video calls with infinite scroll pagination
 */
export function useInfiniteVideoCalls(
  stageId: string,
  filters?: VideoCallFilters,
) {
  return useInfiniteQuery<ListVideoCallsResponseDto, ApiClientError>({
    queryKey: queryKeys.videoCalls.infinite(stageId, filters),
    queryFn: async ({ pageParam }) => {
      const { data } = await api.videoCallsControllerListVideoCallsV1({
        stageId,
        filter: filters?.filter,
        status: filters?.status,
        scheduledTimeLessThan: filters?.scheduledTimeLessThan,
        cursor: pageParam as string | undefined,
        limit: 20,
      });
      return data.result;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!stageId,
  });
}

// ============================================
// Video Call Members Hook
// ============================================

/**
 * Hook to fetch video call members/attendees with infinite scroll
 */
export function useVideoCallMembers(
  stageId: string,
  callId: string,
  options?: {
    mode?: 'all' | 'attended' | 'missed';
    search?: string;
    limit?: number;
  }
) {
  const mode = options?.mode ?? 'all';
  const search = options?.search;
  const limit = options?.limit ?? 20;

  return useInfiniteQuery<ListVideoCallMembersResponseDto, ApiClientError>({
    queryKey: queryKeys.videoCalls.members(stageId, callId, mode, search),
    queryFn: async ({ pageParam }) => {
      const { data } = await api.videoCallsControllerGetVideoCallMembersV1({
        stageId,
        callId,
        mode,
        search,
        limit,
        cursor: pageParam as string | undefined,
      });
      return data.result;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!stageId && !!callId,
  });
}

// ============================================
// Video Call Stats Hook
// ============================================

/**
 * Hook to fetch video call statistics for a stage within a date range
 */
export function useVideoCallStats(
  params: { stageId: string; startDate?: string; endDate?: string },
  options?: { enabled?: boolean }
) {
  const hasDateRange = !!params.startDate && !!params.endDate;

  return useQuery<VideoCallStatsResponseDto, ApiClientError>({
    queryKey: queryKeys.videoCalls.stats(params.stageId, {
      startDate: params.startDate,
      endDate: params.endDate,
    }),
    queryFn: async () => {
      const { data } = await api.videoCallsControllerGetVideoCallStatsV1({
        stageId: params.stageId,
        startDate: params.startDate!,
        endDate: params.endDate!,
      });
      return data.result;
    },
    enabled: (options?.enabled ?? true) && !!params.stageId && hasDateRange,
  });
}

// ============================================
// Mutation Hooks
// ============================================

/**
 * Hook for joining a video call
 * Returns the join URL and whether user is host
 */
export function useJoinVideoCall() {
  return useMutation<
    JoinVideoCallResponseDto,
    ApiClientError,
    { stageId: string; callId: string }
  >({
    mutationFn: async ({ stageId, callId }) => {
      const { data } = await api.videoCallsControllerJoinVideoCallV1({
        stageId,
        callId,
      });
      return data.result;
    },
  });
}

/**
 * Hook for creating a video call
 */
export function useCreateVideoCall() {
  const queryClient = useQueryClient();

  return useMutation<
    VideoCallResponseDto,
    ApiClientError,
    { stageId: string; data: CreateVideoCallDto }
  >({
    mutationFn: async ({ stageId, data }) => {
      const response = await api.videoCallsControllerCreateVideoCallV1(
        { stageId },
        data,
      );
      return response.data.result;
    },
    onSuccess: (_data, variables) => {
      // Invalidate all video call queries for this stage
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === 'videoCalls' && key.includes(variables.stageId);
        },
      });
    },
  });
}

/**
 * Hook for cancelling a video call
 */
export function useCancelVideoCall() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiClientError, { stageId: string; callId: string }>(
    {
      mutationFn: async ({ stageId, callId }) => {
        await api.videoCallsControllerDeleteVideoCallV1({
          stageId,
          callId,
        });
      },
      onSuccess: (_data, variables) => {
        // Invalidate all video call queries for this stage
        // Query keys: ['videoCalls', 'infinite', stageId, filters] or ['videoCalls', 'list', stageId, filters]
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;
            // Check if it's a videoCalls query and contains the stageId
            return (
              key[0] === 'videoCalls' &&
              key.includes(variables.stageId)
            );
          },
        });
      },
    },
  );
}

// ============================================
// Helper Functions
// ============================================

export type StreamVariant =
  | 'live'
  | 'liveSoon'
  | 'upcoming'
  | 'completed'
  | 'cancelled';

/**
 * Determine the display variant for a video call based on its status and schedule
 */
export function getStreamVariant(stream: VideoCallResponseDto): StreamVariant {
  if (stream.status === 'live') return 'live';
  if (stream.status === 'cancelled') return 'cancelled';
  if (stream.status === 'ended') return 'completed';

  // Check if starting soon (within 30 minutes)
  const now = new Date();
  const startTime = new Date(stream.scheduledStartAt);
  const minutesUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60);

  if (minutesUntilStart <= 30 && minutesUntilStart > 0) return 'liveSoon';
  return 'upcoming';
}

/**
 * Format relative time until stream starts
 */
export function getTimeUntilStart(scheduledStartAt: string): string {
  const now = new Date();
  const startTime = new Date(scheduledStartAt);
  const diffMs = startTime.getTime() - now.getTime();

  if (diffMs <= 0) return 'Starting now';

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${minutes} min`;
}

/**
 * Check if a stream is joinable (live or within 5 minutes of start)
 */
export function isStreamJoinable(stream: VideoCallResponseDto): boolean {
  if (stream.status === 'live') return true;
  if (stream.status !== 'scheduled') return false;

  const now = new Date();
  const startTime = new Date(stream.scheduledStartAt);
  const minutesUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60);

  return minutesUntilStart <= 5;
}
