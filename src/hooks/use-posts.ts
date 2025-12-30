'use client';

import { useMemo } from 'react';
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys, PostFilters } from '@/lib/query-keys';
import { useSession } from '@/lib/auth-client';
import { useStagePasses } from './use-stages';

// Re-export PostFilters for convenience
export type { PostFilters };
import type {
  PostResponseDto,
  ListPostsResponseDto,
  CreatePostDto,
  UpdatePostDto,
} from '@backstage-pass/api';

// ============================================
// Query Hooks
// ============================================

type UsePostOptions = Omit<
  UseQueryOptions<ListPostsResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function usePost(postId: string, options?: UsePostOptions) {
  return useQuery<ListPostsResponseDto, ApiClientError>({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: async () => {
      const { data } = await api.postsControllerGetPostV1({ postId });
      return data.result;
    },
    enabled: !!postId,
    ...options,
  });
}

type UseStagePostsOptions = Omit<
  UseQueryOptions<PostResponseDto[], ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function useStagePosts(stageId: string, options?: UseStagePostsOptions) {
  return useQuery<PostResponseDto[], ApiClientError>({
    queryKey: queryKeys.posts.list(stageId),
    queryFn: async () => {
      const { data } = await api.postsControllerListPostsV1({ stageId });
      return data.result.posts;
    },
    enabled: !!stageId,
    ...options,
  });
}

// ============================================
// Infinite Query Hook
// ============================================

export function useInfinitePosts(stageId: string, filters?: PostFilters) {
  const { data: session } = useSession();
  const { data: { groundPass } = { groundPass: undefined } } = useStagePasses({
    stageId,
  });

  const isLoggedIn = !!session?.user;

  // Auto-filter to ground pass when logged out and no explicit filter is set
  const effectiveFilters = useMemo(() => {
    if (!isLoggedIn && !filters?.passIds?.length && groundPass) {
      return { ...filters, passIds: [groundPass.id] };
    }
    return filters;
  }, [isLoggedIn, filters, groundPass]);

  return useInfiniteQuery({
    queryKey: queryKeys.posts.infinite(stageId, effectiveFilters),
    queryFn: async ({ pageParam }) => {
      const { data } = await api.postsControllerListPostsV1({
        stageId,
        cursor: pageParam ?? undefined,
        limit: 10,
        passIds: effectiveFilters?.passIds?.length
          ? effectiveFilters.passIds
          : undefined,
        postedBy: effectiveFilters?.postedBy,
      });
      return data.result;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: ListPostsResponseDto) =>
      lastPage.nextCursor as string | null,
    select: (data) => data.pages.flatMap((page) => page.posts),
    enabled: !!stageId,
  });
}

// ============================================
// Mutation Hooks
// ============================================

interface CreatePostVariables {
  stageId: string;
  text: string;
  passIds?: string[];
  assets?: string[];
  scheduledFor?: string;
}

async function createPostApi(
  variables: CreatePostVariables,
): Promise<PostResponseDto> {
  const dto: CreatePostDto = {
    stageId: variables.stageId,
    text: variables.text,
    passIds: variables.passIds,
    assets: variables.assets,
    scheduledFor: variables.scheduledFor,
  };

  const response = await api.postsControllerCreatePostV1(dto);
  return response.data.result;
}

/**
 * Hook for creating a new post
 * Invalidates the infinite posts query on success
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: (_data, variables) => {
      // Invalidate all infinite posts queries for this stage (all filter combinations)
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (
            key[0] === 'posts' &&
            key[1] === 'infinite' &&
            key[2] === variables.stageId
          );
        },
      });
    },
  });

  return {
    createPost: mutation.mutate,
    createPostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

interface DeletePostVariables {
  postId: string;
  stageId: string;
}

/**
 * Hook for deleting a post
 * Invalidates the infinite posts query on success
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId }: DeletePostVariables) => {
      await api.postsControllerDeletePostV1({ postId });
    },
    onSuccess: (_data, variables) => {
      // Invalidate all infinite posts queries for this stage (all filter combinations)
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (
            key[0] === 'posts' &&
            key[1] === 'infinite' &&
            key[2] === variables.stageId
          );
        },
      });
    },
  });

  return {
    deletePost: mutation.mutate,
    deletePostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}

// ============================================
// Update Post Hook
// ============================================

interface UpdatePostVariables {
  postId: string;
  stageId: string;
  data: UpdatePostDto;
}

/**
 * Hook for updating a post
 * Invalidates both the post detail and infinite posts queries on success
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId, data }: UpdatePostVariables) => {
      const response = await api.postsControllerUpdatePostV1({ postId }, data);
      return response.data.result;
    },
    onSuccess: (_data, variables) => {
      // Invalidate post detail query
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(variables.postId),
      });
      // Invalidate all infinite posts queries for this stage
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (
            key[0] === 'posts' &&
            key[1] === 'infinite' &&
            key[2] === variables.stageId
          );
        },
      });
    },
  });

  return {
    updatePost: mutation.mutate,
    updatePostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

// ============================================
// Pin Post Hook
// ============================================

interface PinPostVariables {
  postId: string;
  stageId: string;
}

/**
 * Hook for toggling pin status of a post
 * Only stage staff (owner, admin, moderator) can pin/unpin posts
 */
export function usePinPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId }: PinPostVariables) => {
      const response = await api.postsControllerTogglePinPostV1({ postId });
      return response.data.result;
    },
    onSuccess: (_data, variables) => {
      // Invalidate post detail query
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(variables.postId),
      });
      // Invalidate all infinite posts queries for this stage
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (
            key[0] === 'posts' &&
            key[1] === 'infinite' &&
            key[2] === variables.stageId
          );
        },
      });
    },
  });

  return {
    pinPost: mutation.mutate,
    pinPostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
