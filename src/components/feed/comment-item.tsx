'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AvatarComponent } from '@/components/avatar-component';
import { Text } from '@/components/ui/text';
import { CommentInput } from '@/components/feed/comments-section';
import { useReplies, useDeleteComment } from '@/hooks/use-comments';
import { useStageAccess } from '@/lib/stage-access-context';
import { useSession } from '@/lib/auth-client';
import type { Comment } from '@/types/api';
import { ExpandableText } from '@/components/ui/expandable-text';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

// ============================================================================
// Type Definitions
// ============================================================================

export interface CommentItemProps {
  postId: string;
  comment: Comment;
  onLike?: (commentId: string, parentId?: string) => void;
  onReplySubmit?: (parentId: string, content: string) => void;
  currentUserAvatar?: string;
  currentUserName?: string;
  isSubmittingReply?: boolean;
  level?: number;
  parentCommentId?: string; // For replies - the parent comment's ID
  className?: string;
}

// ============================================================================
// Sub-components
// ============================================================================

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onClick: () => void;
}

function LikeButton({ isLiked, count, onClick }: LikeButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      requireAuth={true}
      className="flex flex-col items-center self-start gap-1.5 w-10 h-auto p-0 hover:bg-transparent"
      aria-label={isLiked ? 'Unlike comment' : 'Like comment'}
    >
      <Heart
        className={cn(
          'size-5 transition-colors',
          isLiked
            ? 'fill-error-10 stroke-error-10'
            : 'fill-none stroke-neutral-12'
        )}
      />
      {count > 0 && (
        <Text className="text-sm font-medium text-neutral-alpha-11">{count}</Text>
      )}
    </Button>
  );
}

interface RepliesToggleProps {
  repliesCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function RepliesToggle({ repliesCount, isExpanded, onToggle }: RepliesToggleProps) {
  if (repliesCount === 0) return null;

  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      requireAuth={false}
      className="gap-1 text-sm self-start text-neutral-alpha-11 hover:text-neutral-12 font-medium h-auto p-0 hover:bg-transparent"
    >
      <div className="w-8 h-px bg-black/15" />
      <span>
        {isExpanded
          ? 'Hide replies'
          : `View ${repliesCount} more ${repliesCount === 1 ? 'reply' : 'replies'}`}
      </span>
    </Button>
  );
}

// ============================================================================
// Main Component
// ============================================================================

function CommentItem({
  postId,
  comment,
  onLike,
  onReplySubmit,
  currentUserAvatar,
  currentUserName,
  isSubmittingReply = false,
  level = 0,
  parentCommentId,
  className,
}: CommentItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(level === 0);
  const [isReplying, setIsReplying] = React.useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const isPending = comment.id.startsWith('temp-');

  // Delete comment functionality
  const { data: session } = useSession();
  const { role } = useStageAccess();
  const { deleteComment, isPending: isDeleting } = useDeleteComment();

  const isOwnComment = session?.user?.id === comment.author.id;
  const isStaff = role === 'owner' || role === 'admin' || role === 'moderator';
  const canDelete = isOwnComment || isStaff;
  const isDeleted = comment.content === '[deleted]';

  // Fetch replies when expanded (React Query caches data)
  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    hasNextPage: hasMoreReplies,
    fetchNextPage: fetchMoreReplies,
    isFetchingNextPage: isLoadingMoreReplies,
  } = useReplies(postId, comment.id, {
    enabled: isExpanded && level === 0 && comment.repliesCount > 0,
  });

  const handleLike = React.useCallback(() => {
    onLike?.(comment.id, parentCommentId);
  }, [comment.id, onLike, parentCommentId]);

  const handleReplyClick = React.useCallback(() => {
    setIsReplying(true);
  }, []);

  const handleReplySubmit = React.useCallback(
    (content: string) => {
      onReplySubmit?.(comment.id, content);
      setIsReplying(false);
    },
    [comment.id, onReplySubmit]
  );

  const handleCancelReply = React.useCallback(() => {
    setIsReplying(false);
  }, []);

  const toggleReplies = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleDeleteClick = React.useCallback(() => {
    setShowDeleteConfirmation(true);
  }, []);

  const handleConfirmDelete = React.useCallback(() => {
    deleteComment({
      postId,
      commentId: comment.id,
      parentCommentId,
    });
  }, [deleteComment, postId, comment.id, parentCommentId]);

  // Get replies from API response or optimistic updates (flatten pages)
  const replies =
    repliesData?.pages.flatMap((page) => page.comments) ??
    comment.replies ??
    [];
  const hasReplies = replies.length > 0 || comment.repliesCount > 0;
  const showNestedReplies = isExpanded && replies.length > 0;
  const canReply = level === 0; // Only top-level comments can have replies

  return (
    <div className={cn('flex flex-col gap-2 w-full', isPending && 'opacity-50', className)}>
      {/* Content */}
      <div className="flex justify-between flex-1 min-w-0 overflow-hidden">
        <div className='flex gap-2'>
          {/* Avatar */}
          <AvatarComponent
            src={comment.author.avatarUrl}
            username={comment.author.name}
            size="size-8"
          />

          <div className="flex flex-col gap-1">
            {/* Header: Name & Timestamp */}
            <div className="flex items-center gap-1">
              <Text className="text-sm font-semibold ">
                {comment.author.name && comment.author.name.length > 0 ? comment.author.name : 'Anonymous User'}
              </Text>
              <Text className="text-xs text-neutral-alpha-11">{comment.timestamp}</Text>
            </div>

            {/* Body: Content, Reply, Like */}
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-2">
                <ExpandableText content={comment.content} maxLines={3} className='text-neutral-12' />

                {/* Reply & Delete Buttons */}
                <div className="flex items-center gap-3">
                  {/* Reply Button - only for top-level comments */}
                  {canReply && !isReplying && (
                    <Button
                      variant="ghost"
                      onClick={handleReplyClick}
                      requireAuth={false}
                      className="text-sm font-medium text-neutral-alpha-11 hover:text-neutral-12 w-fit h-auto p-0"
                    >
                      Reply
                    </Button>
                  )}
                  {/* Delete Button - for comment owner or staff */}
                  {canDelete && !isDeleted && (
                    <Button
                      variant="ghost"
                      onClick={handleDeleteClick}
                      disabled={isDeleting}
                      requireAuth={false}
                      className="text-sm font-medium text-neutral-alpha-11 hover:text-red-9 w-fit h-auto p-0"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Replies */}
            {isExpanded && isLoadingReplies && (
              <div className="pt-3">
                <Text className="text-sm text-neutral-alpha-11">Loading replies...</Text>
              </div>
            )}
          </div>
        </div>

        {/* Actions: Like */}
        <LikeButton
          isLiked={comment.isLiked}
          count={comment.likesCount}
          onClick={handleLike}
        />
      </div>
      {/* Inline Reply Input */}
      {isReplying && (
        <div className="pl-10 max-w-[calc(100%-40px)]">
          <CommentInput
            avatarUrl={currentUserAvatar}
            avatarFallback={currentUserName}
            onSubmit={handleReplySubmit}
            onCancel={handleCancelReply}
            isSubmitting={isSubmittingReply}
            placeholder="Write a reply..."
            autoFocus
          />
        </div>
      )}

      <div className='ml-10'>
        {/* Replies Toggle */}
        {hasReplies && (
          <RepliesToggle
            repliesCount={replies.length > 0 ? replies.length : comment.repliesCount}
            isExpanded={isExpanded}
            onToggle={toggleReplies}
          />
        )}
        {/* Nested Replies */}
        {showNestedReplies && (
          <div className="flex flex-col gap-5 pt-5">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                postId={postId}
                comment={reply}
                onLike={onLike}
                level={level + 1}
                parentCommentId={comment.id}
              />
            ))}

            {/* Load More Replies */}
            {hasMoreReplies && (
              <Button
                variant="ghost"
                onClick={() => fetchMoreReplies()}
                disabled={isLoadingMoreReplies}
                requireAuth={false}
                className="gap-1 text-sm self-start text-neutral-alpha-11 font-medium h-auto p-0 hover:bg-transparent"
              >
                <div className="w-8 h-px bg-black/15" />
                <span>
                  {isLoadingMoreReplies ? 'Loading...' : 'Load more replies'}
                </span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export { CommentItem };
