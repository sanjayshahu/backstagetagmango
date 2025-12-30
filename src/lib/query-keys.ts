/**
 * Filter parameters for posts queries
 */
export interface PostFilters {
  passIds?: string[];
  postedBy?: 'everyone' | 'owner' | 'me';
}

/**
 * Filter parameters for video calls queries
 */
export interface VideoCallFilters {
  status?: 'scheduled' | 'live' | 'ended' | 'cancelled';
  filter?: 'upcoming' | 'past';
  passIds?: string[];
  scheduledTimeLessThan?: string;
}

/**
 * Type-safe query key factory
 * Usage: queryKeys.stages.all, queryKeys.stages.detail('slug')
 */
export const queryKeys = {
  stages: {
    all: ['stages'] as const,
    lists: () => [...queryKeys.stages.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.stages.lists(), filters] as const,
    details: () => [...queryKeys.stages.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.stages.details(), slug] as const,
    passes: (stageId: string) =>
      [...queryKeys.stages.detail(stageId), 'passes'] as const,
    pass: (stageId: string, passId: string) =>
      [...queryKeys.stages.passes(stageId), passId] as const,
    members: (stageId: string) =>
      [...queryKeys.stages.detail(stageId), 'members'] as const,
  },

  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (stageId: string, filters?: Record<string, unknown>) =>
      [...queryKeys.posts.lists(), stageId, filters] as const,
    infinite: (stageId: string, filters?: PostFilters) =>
      [...queryKeys.posts.all, 'infinite', stageId, filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (postId: string) => [...queryKeys.posts.details(), postId] as const,
  },

  users: {
    all: ['users'] as const,
    current: () => [...queryKeys.users.all, 'current'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (userId: string) => [...queryKeys.users.details(), userId] as const,
    subscriptions: (userId: string) =>
      [...queryKeys.users.detail(userId), 'subscriptions'] as const,
  },

  subscriptions: {
    all: ['subscriptions'] as const,
    lists: () => [...queryKeys.subscriptions.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.subscriptions.lists(), filters] as const,
    details: () => [...queryKeys.subscriptions.all, 'detail'] as const,
    detail: (subscriptionId: string) =>
      [...queryKeys.subscriptions.details(), subscriptionId] as const,
  },

  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    list: (postId: string) => [...queryKeys.comments.lists(), postId] as const,
    replies: (postId: string, commentId: string) =>
      [...queryKeys.comments.list(postId), 'replies', commentId] as const,
  },

  reactions: {
    all: ['reactions'] as const,
    lists: () => [...queryKeys.reactions.all, 'list'] as const,
    list: (postId: string) => [...queryKeys.reactions.lists(), postId] as const,
  },

  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (stageId: string, filters?: Record<string, unknown>) =>
      [...queryKeys.orders.lists(), stageId, filters] as const,
    stats: (stageId: string, filters?: Record<string, unknown>) =>
      [...queryKeys.orders.all, 'stats', stageId, filters] as const,
  },

  passMembers: {
    all: ['passMembers'] as const,
    lists: () => [...queryKeys.passMembers.all, 'list'] as const,
    list: (passId: string, filters?: Record<string, unknown>) =>
      [...queryKeys.passMembers.lists(), passId, filters] as const,
  },
  videoCalls: {
    all: ['videoCalls'] as const,
    lists: () => [...queryKeys.videoCalls.all, 'list'] as const,
    list: (stageId: string, filters?: VideoCallFilters) =>
      [...queryKeys.videoCalls.lists(), stageId, filters] as const,
    infinite: (stageId: string, filters?: VideoCallFilters) =>
      [...queryKeys.videoCalls.all, 'infinite', stageId, filters] as const,
    details: () => [...queryKeys.videoCalls.all, 'detail'] as const,
    detail: (stageId: string, callId: string) =>
      [...queryKeys.videoCalls.details(), stageId, callId] as const,
    members: (
      stageId: string,
      callId: string,
      mode?: string,
      search?: string
    ) =>
      [
        ...queryKeys.videoCalls.all,
        'members',
        stageId,
        callId,
        { mode, search },
      ] as const,
    stats: (
      stageId: string,
      filters?: { startDate?: string; endDate?: string }
    ) => [...queryKeys.videoCalls.all, 'stats', stageId, filters] as const,
  },

  analytics: {
    all: ['analytics'] as const,
    pageViews: (stageId: string, filters?: Record<string, unknown>) =>
      [...queryKeys.analytics.all, 'pageViews', stageId, filters] as const,
  },
} as const;

// Type helpers for query keys
export type QueryKeys = typeof queryKeys;
export type StageQueryKeys = QueryKeys['stages'];
export type PostQueryKeys = QueryKeys['posts'];
export type UserQueryKeys = QueryKeys['users'];
export type SubscriptionQueryKeys = QueryKeys['subscriptions'];
export type CommentQueryKeys = QueryKeys['comments'];
export type ReactionQueryKeys = QueryKeys['reactions'];
export type OrderQueryKeys = QueryKeys['orders'];
export type PassMembersQueryKeys = QueryKeys['passMembers'];
export type VideoCallQueryKeys = QueryKeys['videoCalls'];
export type AnalyticsQueryKeys = QueryKeys['analytics'];
