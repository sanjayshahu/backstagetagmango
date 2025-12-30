'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type {
  StageResponseDto,
  PassResponseDto,
  CreatePassDto,
  UpdatePassDto,
  SubscriptionResponseDto,
} from '@backstage-pass/api';

// ============================================
// Query Hooks
// ============================================

type UseStageOptions = Omit<
  UseQueryOptions<StageResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function useStage(slug: string, options?: UseStageOptions) {
  return useQuery<StageResponseDto, ApiClientError>({
    queryKey: queryKeys.stages.detail(slug),
    queryFn: async () => {
      const { data } = await api.stagesControllerFindBySlugV1({ slug });
      return data.result;
    },
    enabled: !!slug,
    ...options,
  });
}

export type PassVisibilityFilter = 'public' | 'hidden' | 'all';

interface UseStagePassesParams {
  stageId: string;
  visibility?: PassVisibilityFilter;
  onlySubscribed?: boolean;
}

type UseStagePassesOptions = Omit<
  UseQueryOptions<
    { passes: PassResponseDto[]; groundPass: PassResponseDto | undefined },
    ApiClientError
  >,
  'queryKey' | 'queryFn'
>;

export function useStagePasses(
  params: UseStagePassesParams,
  options?: UseStagePassesOptions,
) {
  const { stageId, visibility, onlySubscribed } = params;
  return useQuery<
    { passes: PassResponseDto[]; groundPass: PassResponseDto | undefined },
    ApiClientError
  >({
    queryKey: [
      ...queryKeys.stages.passes(stageId),
      visibility ?? 'all',
      onlySubscribed,
    ],
    queryFn: async () => {
      const { data } = await api.passesControllerListPassesV1({
        stageId,
        visibility,
        onlySubscribed,
      });
      return {
        passes: data.result.filter((p) => !p.isGroundPass),
        groundPass: data.result.find((p) => p.isGroundPass),
      };
    },
    enabled: !!stageId,
    ...options,
  });
}

type UsePassOptions = Omit<
  UseQueryOptions<PassResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function usePass(
  stageId: string,
  passId: string,
  options?: UsePassOptions,
) {
  return useQuery<PassResponseDto, ApiClientError>({
    queryKey: queryKeys.stages.pass(stageId, passId),
    queryFn: async () => {
      const { data } = await api.passesControllerGetPassV1({ stageId, passId });
      return data.result;
    },
    enabled: !!stageId && !!passId,
    ...options,
  });
}
// ============================================
// Mutation Hooks
// ============================================

interface CreatePassVariables {
  stageId: string;
  name: string;
  description?: string;
  passType?: 'free' | 'paid';
  recurringType?: 'onetime' | 'recurring';
  price?: { usdCents?: number; inrPaise?: number };
  durationDays?: number;
  allowSubscriberPosting?: boolean;
  theme?: 'silver' | 'bronze' | 'charcoal' | 'gold' | 'navy';
}

async function createPassApi(
  variables: CreatePassVariables,
): Promise<PassResponseDto> {
  const { stageId, ...dto } = variables;
  const response = await api.passesControllerCreatePassV1(
    { stageId },
    dto as CreatePassDto,
  );
  return response.data.result;
}

/**
 * Hook for creating a new pass
 * Invalidates the passes query on success
 */
export function useCreatePass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPassApi,
    onSuccess: (_data, variables) => {
      // Invalidate passes list for this stage
      queryClient.invalidateQueries({
        queryKey: queryKeys.stages.passes(variables.stageId),
      });
    },
  });

  return {
    createPass: mutation.mutate,
    createPassAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

interface UpdatePassVariables {
  stageId: string;
  passId: string;
  data: UpdatePassDto;
}

async function updatePassApi(
  variables: UpdatePassVariables,
): Promise<PassResponseDto> {
  const { stageId, passId, data } = variables;
  const response = await api.passesControllerUpdatePassV1(
    { stageId, passId },
    data,
  );
  return response.data.result;
}

/**
 * Hook for updating a pass
 * Invalidates the passes query and pass detail on success
 */
export function useUpdatePass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePassApi,
    onSuccess: (_data, variables) => {
      // Invalidate passes list for this stage
      queryClient.invalidateQueries({
        queryKey: queryKeys.stages.passes(variables.stageId),
      });
      // Invalidate the specific pass
      queryClient.invalidateQueries({
        queryKey: queryKeys.stages.pass(variables.stageId, variables.passId),
      });
    },
  });

  return {
    updatePass: mutation.mutate,
    updatePassAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

// ============================================
// Join Pass Hook
// ============================================

type JoinPassResult =
  | { type: 'subscription'; data: SubscriptionResponseDto }
  | { type: 'redirect'; url: string };

async function joinPassApi(passId: string): Promise<JoinPassResult> {
  const response = await api.subscriptionsControllerJoinPassV1({ passId });
  const result = response.data.result;

  if (result.type === 'redirect') {
    return { type: 'redirect', url: result.url! };
  }

  return { type: 'subscription', data: result.data! };
}

interface DeletePassVariables {
  stageId: string;
  passId: string;
}

async function deletePassApi(variables: DeletePassVariables): Promise<void> {
  const { stageId, passId } = variables;
  await api.passesControllerDeletePassV1({ stageId, passId });
}

/**
 * Hook for deleting a pass
 * Invalidates the passes query on success
 */
export function useDeletePass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePassApi,
    onSuccess: (_data, variables) => {
      // Invalidate passes list for this stage
      queryClient.invalidateQueries({
        queryKey: queryKeys.stages.passes(variables.stageId),
      });
    },
  });

  return {
    deletePass: mutation.mutate,
    deletePassAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

interface ReorderPassesVariables {
  stageId: string;
  passIds: string[];
}

async function reorderPassesApi(
  variables: ReorderPassesVariables,
): Promise<void> {
  const { stageId, passIds } = variables;
  await api.passesControllerReorderPassesV1({ stageId }, { passIds });
}

/**
 * Hook for reordering passes with optimistic updates
 * Updates UI immediately and reverts on error
 */
export function useReorderPasses(
  stageId: string,
  visibility?: PassVisibilityFilter,
) {
  const queryClient = useQueryClient();
  const queryKey = [...queryKeys.stages.passes(stageId), visibility ?? 'all'];

  const mutation = useMutation({
    mutationFn: reorderPassesApi,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousPasses =
        queryClient.getQueryData<PassResponseDto[]>(queryKey);

      // Optimistically update the cache
      if (previousPasses) {
        const passMap = new Map(previousPasses.map((p) => [p.id, p]));
        const reorderedPasses = variables.passIds
          .map((id) => passMap.get(id))
          .filter((p): p is PassResponseDto => p !== undefined);
        queryClient.setQueryData(queryKey, reorderedPasses);
      }

      return { previousPasses };
    },
    onError: (_error, _variables, context) => {
      // Revert to previous state on error
      if (context?.previousPasses) {
        queryClient.setQueryData(queryKey, context.previousPasses);
      }
    },
    onSettled: () => {
      // Refetch after mutation settles
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    reorderPasses: mutation.mutate,
    reorderPassesAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

/**
 * Hook for joining/subscribing to a pass
 * - Free passes: Creates subscription immediately
 * - Paid passes: Returns redirect URL to Stripe payment
 */
export function useJoinPass() {
  const queryClient = useQueryClient();

  const mutation = useMutation<JoinPassResult, ApiClientError, string>({
    mutationFn: joinPassApi,
    onSuccess: (result) => {
      if (result.type === 'subscription') {
        // Invalidate user subscriptions
        queryClient.invalidateQueries({
          queryKey: queryKeys.subscriptions.all,
        });
        // Invalidate stage passes to update subscription status
        queryClient.invalidateQueries({
          queryKey: queryKeys.stages.passes(result.data.stageId),
        });
      }
    },
  });

  return {
    joinPass: mutation.mutate,
    joinPassAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  };
}
