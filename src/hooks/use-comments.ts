'use client';

import { useCallback, useRef } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import type { Comment, CommentsResponse } from '@/types/api';

// Page size for pagination
const PAGE_SIZE = 10;
import { mapApiCommentToComment, mapApiCommentsToResponse } from '@/types/api';
import { queryKeys } from '@/lib/query-keys';
import { api } from '@/lib/api-client';
import { useAuthGate } from '@/lib/auth-gate-context';
import { useSession } from '@/lib/auth-client';

// ============================================================================
// API Functions
// ============================================================================

async function fetchComments(
  postId: string,
  cursor?: string,
  limit = 20
): Promise<CommentsResponse> {
  const response = await api.commentsControllerListCommentsV1({
    postId,
    cursor,
    limit,
  });

  return mapApiCommentsToResponse(response.data.result);
}

async function addCommentApi(
  postId: string,
  content: string,
  parentId?: string
): Promise<Comment> {
  const response = await api.commentsControllerCreateCommentV1(
    { postId },
    { text: content, parentId }
  );

  return mapApiCommentToComment(response.data.result);
}

async function likeCommentApi(
  postId: string,
  commentId: string
): Promise<{ liked: boolean; totalLikes: number }> {
  const response = await api.commentsControllerToggleLikeV1({
    postId,
    commentId,
  });

  return response.data.result;
}

async function fetchReplies(
  postId: string,
  commentId: string,
  cursor?: string,
  limit = 20
): Promise<CommentsResponse> {
  const response = await api.commentsControllerListRepliesV1({
    postId,
    commentId,
    cursor,
    limit,
  });

  return mapApiCommentsToResponse(response.data.result);
}

// ============================================================================
// Hooks
// ============================================================================

interface UseCommentsOptions {
  enabled?: boolean;
}

export function useComments(postId: string, options: UseCommentsOptions = {}) {
  const { enabled = true } = options;

  return useInfiniteQuery({
    queryKey: queryKeys.comments.list(postId),
    queryFn: ({ pageParam }) => fetchComments(postId, pageParam, PAGE_SIZE),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: enabled && !!postId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

interface AddCommentVariables {
  postId: string;
  content: string;
  parentId?: string;
}

/**
 * Hook for adding comments
 * Opens login modal if user is not authenticated
 */
export function useAddComment() {
  const queryClient = useQueryClient();
  const { isAuthenticated, openLoginModal } = useAuthGate();
  const { data: session } = useSession()

  const mutation = useMutation({
    mutationFn: ({ postId, content, parentId }: AddCommentVariables) =>
      addCommentApi(postId, content, parentId),
    onMutate: async ({ postId, content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.list(postId),
      });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<
        InfiniteData<CommentsResponse>
      >(queryKeys.comments.list(postId));

      // Optimistically add the comment
      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        author: {
          id: session?.user.id ?? 'your_id',
          name: session?.user.name ?? 'You',
          avatarUrl: session?.user.image ?? '',
        },
        content,
        timestamp: 'Just now',
        likesCount: 0,
        isLiked: false,
        repliesCount: 0,
      };

      // Update infinite query data - prepend to first page
      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        queryKeys.comments.list(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                // Prepend to first page
                return {
                  ...page,
                  comments: [optimisticComment, ...page.comments],
                  totalCount: page.totalCount + 1,
                };
              }
              return page;
            }),
          };
        }
      );

      return { previousData };
    },
    onError: (_err, { postId }, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.list(postId),
          context.previousData
        );
      }
    },
    onSettled: (_data, _error, { postId }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.list(postId),
      });
    },
  });

  const addComment = useCallback(
    (postId: string, content: string, parentId?: string) => {
      // Gate: open login modal if not authenticated
      if (!isAuthenticated) {
        openLoginModal();
        return;
      }
      mutation.mutate({ postId, content, parentId });
    },
    [mutation, isAuthenticated, openLoginModal]
  );

  return {
    addComment,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}

/**
 * Hook for adding replies to comments
 * Updates the replies cache for proper optimistic updates
 */
export function useAddReply() {
  const queryClient = useQueryClient();
  const { isAuthenticated, openLoginModal } = useAuthGate();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: ({ postId, content, parentId }: AddCommentVariables) =>
      addCommentApi(postId, content, parentId),
    onMutate: async ({ postId, content, parentId }) => {
      if (!parentId) return;

      // Cancel outgoing refetches for replies
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.replies(postId, parentId),
      });

      // Snapshot previous value
      const previousReplies = queryClient.getQueryData<
        InfiniteData<CommentsResponse>
      >(queryKeys.comments.replies(postId, parentId));

      // Create optimistic reply
      const optimisticReply: Comment = {
        id: `temp-${Date.now()}`,
        author: {
          id: session?.user.id ?? 'your_id',
          name: session?.user.name ?? 'You',
          avatarUrl: session?.user.image ?? '',
        },
        content,
        timestamp: 'Just now',
        likesCount: 0,
        isLiked: false,
        repliesCount: 0,
      };

      // Update replies cache - prepend to first page
      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        queryKeys.comments.replies(postId, parentId),
        (old) => {
          if (!old) {
            // Create initial infinite data structure
            return {
              pages: [
                {
                  comments: [optimisticReply],
                  hasMore: false,
                  totalCount: 1,
                },
              ],
              pageParams: [undefined],
            };
          }
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  comments: [optimisticReply, ...page.comments],
                  totalCount: page.totalCount + 1,
                };
              }
              return page;
            }),
          };
        }
      );

      // Also update repliesCount in the main comments list
      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        queryKeys.comments.list(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              comments: page.comments.map((c) =>
                c.id === parentId
                  ? { ...c, repliesCount: c.repliesCount + 1 }
                  : c
              ),
            })),
          };
        }
      );

      return { previousReplies, postId, parentId };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousReplies && context.postId && context.parentId) {
        queryClient.setQueryData(
          queryKeys.comments.replies(context.postId, context.parentId),
          context.previousReplies
        );
      }
    },
    onSettled: (_data, _error, { postId, parentId }) => {
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.replies(postId, parentId),
        });
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.list(postId),
      });
    },
  });

  const addReply = useCallback(
    (postId: string, content: string, parentId: string) => {
      if (!isAuthenticated) {
        openLoginModal();
        return;
      }
      mutation.mutate({ postId, content, parentId });
    },
    [mutation, isAuthenticated, openLoginModal]
  );

  return {
    addReply,
    isPending: mutation.isPending,
  };
}

interface LikeCommentVariables {
  postId: string;
  commentId: string;
  parentId?: string; // For replies - to update the replies cache
}

/**
 * Hook for liking/unliking comments
 * Opens login modal if user is not authenticated
 */
export function useLikeComment() {
  const queryClient = useQueryClient();
  const { isAuthenticated, openLoginModal } = useAuthGate();
  // Track which comment IDs have pending like requests
  const pendingLikesRef = useRef<Set<string>>(new Set());

  const mutation = useMutation({
    mutationFn: ({ postId, commentId }: LikeCommentVariables) =>
      likeCommentApi(postId, commentId),
    onMutate: async ({ postId, commentId, parentId }) => {
      // Track this comment as having a pending like request
      pendingLikesRef.current.add(commentId);

      // Cancel queries for main comments list
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.list(postId),
      });

      const previousData = queryClient.getQueryData<
        InfiniteData<CommentsResponse>
      >(queryKeys.comments.list(postId));

      // Also cancel and snapshot replies cache if liking a reply
      let previousReplies: InfiniteData<CommentsResponse> | undefined;
      if (parentId) {
        await queryClient.cancelQueries({
          queryKey: queryKeys.comments.replies(postId, parentId),
        });
        previousReplies = queryClient.getQueryData<
          InfiniteData<CommentsResponse>
        >(queryKeys.comments.replies(postId, parentId));
      }

      // Helper to update comment likes (optimistic toggle)
      const updateCommentLikes = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            const newIsLiked = !comment.isLiked;
            return {
              ...comment,
              isLiked: newIsLiked,
              likesCount: newIsLiked
                ? comment.likesCount + 1
                : Math.max(0, comment.likesCount - 1),
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateCommentLikes(comment.replies),
            };
          }
          return comment;
        });
      };

      // Update main comments list cache
      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        queryKeys.comments.list(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              comments: updateCommentLikes(page.comments),
            })),
          };
        }
      );

      // Also update replies cache if liking a reply
      if (parentId) {
        queryClient.setQueryData<InfiniteData<CommentsResponse>>(
          queryKeys.comments.replies(postId, parentId),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                comments: updateCommentLikes(page.comments),
              })),
            };
          }
        );
      }

      return { previousData, previousReplies, parentId };
    },
    onSuccess: (data, { postId, commentId, parentId }) => {
      // Update with actual server values
      const updateWithServerValues = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLiked: data.liked,
              likesCount: data.totalLikes,
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateWithServerValues(comment.replies),
            };
          }
          return comment;
        });
      };

      // Update main comments list cache
      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        queryKeys.comments.list(postId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              comments: updateWithServerValues(page.comments),
            })),
          };
        }
      );

      // Also update replies cache if liking a reply
      if (parentId) {
        queryClient.setQueryData<InfiniteData<CommentsResponse>>(
          queryKeys.comments.replies(postId, parentId),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                comments: updateWithServerValues(page.comments),
              })),
            };
          }
        );
      }
    },
    onError: (_err, { postId }, context) => {
      // Rollback main comments list cache
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.list(postId),
          context.previousData
        );
      }
      // Rollback replies cache if applicable
      if (context?.previousReplies && context.parentId) {
        queryClient.setQueryData(
          queryKeys.comments.replies(postId, context.parentId),
          context.previousReplies
        );
      }
    },
    onSettled: (_data, _error, { commentId }) => {
      // Remove from pending set when request completes (success or error)
      pendingLikesRef.current.delete(commentId);
    },
  });

  const likeComment = useCallback(
    (postId: string, commentId: string, parentId?: string) => {
      // Gate: open login modal if not authenticated
      if (!isAuthenticated) {
        openLoginModal();
        return;
      }
      // Skip if this comment already has a pending like request
      if (pendingLikesRef.current.has(commentId)) {
        return;
      }
      mutation.mutate({ postId, commentId, parentId });
    },
    [mutation, isAuthenticated, openLoginModal]
  );

  return {
    likeComment,
    isPending: mutation.isPending,
  };
}

// ============================================================================
// Replies Hook
// ============================================================================

interface UseRepliesOptions {
  enabled?: boolean;
}

export function useReplies(
  postId: string,
  commentId: string,
  options: UseRepliesOptions = {}
) {
  const { enabled = true } = options;

  return useInfiniteQuery({
    queryKey: queryKeys.comments.replies(postId, commentId),
    queryFn: ({ pageParam }) =>
      fetchReplies(postId, commentId, pageParam, PAGE_SIZE),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: enabled && !!postId && !!commentId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// ============================================================================
// Delete Comment Hook
// ============================================================================

interface DeleteCommentVariables {
  postId: string;
  commentId: string;
  parentCommentId?: string; // For replies
}

/**
 * Hook for deleting comments
 * Comment owner can delete their own comments
 * Staff (owner/admin/moderator) can delete any comment
 */
export function useDeleteComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId, commentId }: DeleteCommentVariables) => {
      await api.commentsControllerDeleteCommentV1({ postId, commentId });
    },
    onSuccess: (_data, variables) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.list(variables.postId),
      });
      // If it's a reply, also invalidate replies
      if (variables.parentCommentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.replies(
            variables.postId,
            variables.parentCommentId
          ),
        });
      }
    },
  });

  return {
    deleteComment: mutation.mutate,
    deleteCommentAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
