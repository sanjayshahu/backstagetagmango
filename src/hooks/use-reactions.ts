'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ReactionUser,
  ReactionSummary,
  ReactionListResponse,
  ReactionCountsDto,
} from '@/types/api';
import type { PostResponseDto, ListPostsResponseDto } from '@backstage-pass/api';
import type { InfiniteData } from '@tanstack/react-query';
import { mapApiReactionToReactionUser } from '@/types/api';
import { queryKeys } from '@/lib/query-keys';
import { api } from '@/lib/api-client';
import { useAuthGate } from '@/lib/auth-gate-context';

// ============================================================================
// API Functions
// ============================================================================

async function fetchReactionList(postId: string): Promise<ReactionListResponse> {
  const response = await api.reactionsControllerListReactionsV1({
    postId,
    limit: 50, // Get more reactions initially
  });

  const apiReactions = response.data.result.reactions;

  // Map API reactions to frontend format
  const reactions = apiReactions.map(mapApiReactionToReactionUser);

  // Build summary from reactions
  const emojiCounts: Record<string, number> = {};
  for (const reaction of reactions) {
    emojiCounts[reaction.emoji] = (emojiCounts[reaction.emoji] || 0) + 1;
  }

  const summary: ReactionSummary[] = Object.entries(emojiCounts).map(
    ([emoji, count]) => ({ emoji, count })
  );

  return {
    reactions,
    summary,
    totalCount: reactions.length,
  };
}

async function addReactionApi(
  postId: string,
  emoji: string
): Promise<{ emoji: string; reactionCounts: ReactionCountsDto }> {
  const response = await api.reactionsControllerCreateReactionV1(
    { postId },
    { emoji: emoji as '👍' | '❤️' | '😂' | '😮' | '😢' | '😡' }
  );

  return {
    emoji: response.data.result.emoji,
    reactionCounts: response.data.result.reactionCounts,
  };
}

async function removeReactionApi(
  postId: string
): Promise<{ reactionCounts: ReactionCountsDto }> {
  const response = await api.reactionsControllerDeleteReactionV1({
    postId,
  });

  return {
    reactionCounts: response.data.result.reactionCounts,
  };
}

// ============================================================================
// Hooks
// ============================================================================

interface UseReactionListOptions {
  enabled?: boolean;
}

export function useReactionList(
  postId: string,
  options: UseReactionListOptions = {}
) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.reactions.list(postId),
    queryFn: () => fetchReactionList(postId),
    enabled: enabled && !!postId,
    staleTime: 60 * 1000, // 1 minute
  });
}

interface AddReactionVariables {
  postId: string;
  emoji: string;
  previousReaction?: string | null;
}

// Type for reaction counts (emoji -> count)
type ReactionCounts = Record<string, number>;

// Helper to update posts in infinite query cache
function updatePostInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  postId: string,
  updater: (post: PostResponseDto) => PostResponseDto
) {
  // Get all infinite posts queries
  const infiniteQueries = queryClient.getQueriesData<InfiniteData<ListPostsResponseDto>>({
    predicate: (query) => {
      const key = query.queryKey;
      return key[0] === 'posts' && key[1] === 'infinite';
    },
  });

  // Update each query that contains this post
  for (const [queryKey, data] of infiniteQueries) {
    if (!data?.pages) continue;

    const updatedPages = data.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.id === postId ? updater(post) : post
      ),
    }));

    queryClient.setQueryData(queryKey, {
      ...data,
      pages: updatedPages,
    });
  }
}

/**
 * Hook for adding/toggling reactions with optimistic updates
 * Returns mutate function and animation helpers
 * Opens login modal if user is not authenticated
 */
export function useAddReaction() {
  const queryClient = useQueryClient();
  const { isAuthenticated, openLoginModal } = useAuthGate();
  const [animatingEmoji, setAnimatingEmoji] = React.useState<string | null>(null);
  const [animationStartPosition, setAnimationStartPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: ({ postId, emoji }: AddReactionVariables) =>
      addReactionApi(postId, emoji),
    onMutate: async ({ postId, emoji, previousReaction }) => {
      // Start animation
      setAnimatingEmoji(emoji);

      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.reactions.list(postId),
      });
      await queryClient.cancelQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === 'posts' && key[1] === 'infinite';
        },
      });

      // Snapshot current data for rollback
      const infiniteQueries = queryClient.getQueriesData<InfiniteData<ListPostsResponseDto>>({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === 'posts' && key[1] === 'infinite';
        },
      });

      // Optimistically update the post
      updatePostInCache(queryClient, postId, (post) => {
        const currentCounts = (post.reactionCounts || {}) as ReactionCounts;
        const newCounts = { ...currentCounts };

        // Decrement previous reaction if user had one
        if (previousReaction && newCounts[previousReaction]) {
          newCounts[previousReaction] = Math.max(0, newCounts[previousReaction] - 1);
          if (newCounts[previousReaction] === 0) {
            delete newCounts[previousReaction];
          }
        }

        // Increment new reaction
        newCounts[emoji] = (newCounts[emoji] || 0) + 1;

        return {
          ...post,
          userReaction: emoji as PostResponseDto['userReaction'],
          reactionCounts: newCounts,
        };
      });

      return { emoji, postId, previousReaction, previousQueries: infiniteQueries };
    },
    onSuccess: (_data, { postId }) => {
      // Invalidate reaction list for this post
      queryClient.invalidateQueries({
        queryKey: queryKeys.reactions.list(postId),
      });

      // Also invalidate posts to refresh with server data
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.all,
      });

      // Animation completes via setTimeout
      setTimeout(() => {
        setAnimatingEmoji(null);
        setAnimationStartPosition(null);
      }, 400);
    },
    onError: (_error, _variables, context) => {
      // Roll back to previous data
      if (context?.previousQueries) {
        for (const [queryKey, data] of context.previousQueries) {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        }
      }
      setAnimatingEmoji(null);
      setAnimationStartPosition(null);
    },
  });

  const react = React.useCallback(
    (
      postId: string,
      emoji: string,
      startPosition?: { x: number; y: number },
      previousReaction?: string | null
    ) => {
      // Gate: open login modal if not authenticated
      if (!isAuthenticated) {
        openLoginModal();
        return;
      }
      if (startPosition) {
        setAnimationStartPosition(startPosition);
      }
      mutation.mutate({ postId, emoji, previousReaction });
    },
    [mutation, isAuthenticated, openLoginModal]
  );

  return {
    react,
    isPending: mutation.isPending,
    animatingEmoji,
    animationStartPosition,
  };
}

interface RemoveReactionVariables {
  postId: string;
  currentReaction?: string | null;
}

/**
 * Hook for removing reactions with optimistic updates
 * Opens login modal if user is not authenticated
 */
export function useRemoveReaction() {
  const queryClient = useQueryClient();
  const { isAuthenticated, openLoginModal } = useAuthGate();

  const mutation = useMutation({
    mutationFn: ({ postId }: RemoveReactionVariables) =>
      removeReactionApi(postId),
    onMutate: async ({ postId, currentReaction }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.reactions.list(postId),
      });
      await queryClient.cancelQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === 'posts' && key[1] === 'infinite';
        },
      });

      // Snapshot current data for rollback
      const infiniteQueries = queryClient.getQueriesData<InfiniteData<ListPostsResponseDto>>({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === 'posts' && key[1] === 'infinite';
        },
      });

      // Optimistically update the post
      updatePostInCache(queryClient, postId, (post) => {
        const currentCounts = (post.reactionCounts || {}) as ReactionCounts;
        const newCounts = { ...currentCounts };

        // Decrement the current reaction
        const reactionToRemove = currentReaction || post.userReaction;
        if (reactionToRemove && newCounts[reactionToRemove]) {
          newCounts[reactionToRemove] = Math.max(0, newCounts[reactionToRemove] - 1);
          if (newCounts[reactionToRemove] === 0) {
            delete newCounts[reactionToRemove];
          }
        }

        return {
          ...post,
          userReaction: null,
          reactionCounts: newCounts,
        };
      });

      return { postId, currentReaction, previousQueries: infiniteQueries };
    },
    onSuccess: (_data, { postId }) => {
      // Invalidate reaction list for this post
      queryClient.invalidateQueries({
        queryKey: queryKeys.reactions.list(postId),
      });

      // Also invalidate posts to refresh with server data
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.all,
      });
    },
    onError: (_error, _variables, context) => {
      // Roll back to previous data
      if (context?.previousQueries) {
        for (const [queryKey, data] of context.previousQueries) {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        }
      }
    },
  });

  const removeReaction = React.useCallback(
    (postId: string, currentReaction?: string | null) => {
      // Gate: open login modal if not authenticated
      if (!isAuthenticated) {
        openLoginModal();
        return;
      }
      mutation.mutate({ postId, currentReaction });
    },
    [mutation, isAuthenticated, openLoginModal]
  );

  return {
    removeReaction,
    isPending: mutation.isPending,
  };
}

// ============================================================================
// Helper to get filtered reactions by emoji
// ============================================================================

export function filterReactionsByEmoji(
  reactions: ReactionUser[],
  emoji: string | null
): ReactionUser[] {
  if (!emoji) return reactions;
  return reactions.filter((r) => r.emoji === emoji);
}
