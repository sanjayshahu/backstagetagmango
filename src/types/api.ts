// Re-export all types from generated SDK
export type {
  // Stage types
  StageResponseDto,
  StageOwnerDto,

  // Pass types
  PassResponseDto,
  CreatePassDto,
  UpdatePassDto,
  PassPriceDto,

  // Post types
  PostResponseDto,
  PostAuthorDto,
  PostPassDto,
  PostMediaDto,
  ListPostsResponseDto,
  CreatePostDto,
  ReactionCountsDto,

  // Comment types (from generated SDK)
  CommentResponseDto,
  CommentAuthorDto,
  CreateCommentDto,
  ListCommentsResponseDto,
  ToggleLikeResponseDto,
  CommentLikeUserDto,
  ListCommentLikesResponseDto,

  // Reaction types (from generated SDK)
  ReactionResponseDto,
  ReactionUserDto,
  CreateReactionDto,
  CreateReactionResponseDto,
  DeleteReactionResponseDto,
  ListReactionsResponseDto,

  // Subscription types
  SubscriptionResponseDto,

  // Error types
  ApiErrorResponseDto,
} from '@backstage-pass/api';

// Type aliases for convenience
import type {
  StageResponseDto,
  PassResponseDto,
  PostResponseDto,
  ApiErrorResponseDto,
  CommentResponseDto,
  ListCommentsResponseDto,
  ReactionResponseDto,
  ReactionCountsDto,
} from '@backstage-pass/api';

export type Stage = StageResponseDto;
export type StagePass = PassResponseDto;
export type Post = PostResponseDto;
export type ApiError = ApiErrorResponseDto;

// ============================================================================
// Allowed Emojis (matches API)
// ============================================================================

export const ALLOWED_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '😡'] as const;
export type AllowedEmoji = (typeof ALLOWED_EMOJIS)[number];

// ============================================================================
// Comment Types (frontend-compatible)
// ============================================================================

export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
  repliesCount: number;
  replies?: Comment[];
}

export interface CommentsResponse {
  comments: Comment[];
  nextCursor?: string;
  hasMore: boolean;
  totalCount: number;
}

// ============================================================================
// Reaction Types (frontend-compatible)
// ============================================================================

export interface ReactionUser {
  userId: string;
  userName: string;
  userAvatar?: string;
  emoji: string;
}

export interface ReactionSummary {
  emoji: string;
  count: number;
}

export interface ReactionListResponse {
  reactions: ReactionUser[];
  summary: ReactionSummary[];
  totalCount: number;
}

// ============================================================================
// Type Mapping Utilities
// ============================================================================

/**
 * Convert API CommentResponseDto to frontend Comment type
 */
export function mapApiCommentToComment(apiComment: CommentResponseDto): Comment {
  return {
    id: apiComment.id,
    author: {
      id: apiComment.author.id,
      name: apiComment.author.name,
      avatarUrl: (apiComment.author.image as unknown as string) || undefined,
    },
    content: apiComment.text,
    timestamp: formatTimestamp(apiComment.createdAt),
    likesCount: apiComment.totalLikes,
    isLiked: apiComment.isLikedByMe,
    repliesCount: apiComment.repliesCount,
    replies: undefined, // Replies are fetched separately
  };
}

/**
 * Convert API ListCommentsResponseDto to frontend CommentsResponse type
 */
export function mapApiCommentsToResponse(
  apiResponse: ListCommentsResponseDto,
  totalCount?: number
): CommentsResponse {
  return {
    comments: apiResponse.comments.map(mapApiCommentToComment),
    nextCursor: apiResponse.nextCursor as string | undefined,
    hasMore: apiResponse.hasMore,
    totalCount: totalCount ?? apiResponse.comments.length,
  };
}

/**
 * Convert API ReactionResponseDto to frontend ReactionUser type
 */
export function mapApiReactionToReactionUser(
  apiReaction: ReactionResponseDto
): ReactionUser {
  return {
    userId: apiReaction.user.id,
    userName: apiReaction.user.name,
    userAvatar: (apiReaction.user.image as unknown as string) || undefined,
    emoji: apiReaction.emoji,
  };
}

/**
 * Convert ReactionCountsDto to ReactionSummary array
 */
export function mapReactionCountsToSummary(
  counts: ReactionCountsDto
): ReactionSummary[] {
  const summary: ReactionSummary[] = [];
  const entries = Object.entries(counts) as [string, number | undefined][];

  for (const [emoji, count] of entries) {
    if (count && count > 0) {
      summary.push({
        emoji,
        count,
      });
    }
  }

  return summary;
}

/**
 * Format ISO timestamp to display string
 */
function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
