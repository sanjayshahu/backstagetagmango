'use client';

import * as React from 'react';
import { ArrowUp, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AvatarComponent } from '@/components/avatar-component';
import { Text } from '@/components/ui/text';
import { Skeleton } from '@/components/ui/skeleton';
import { CommentItem } from '@/components/feed/comment-item';
import {
  useComments,
  useAddComment,
  useAddReply,
  useLikeComment,
} from '@/hooks/use-comments';
import { useAuthGate } from '@/lib/auth-gate-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';

// ============================================================================
// Type Definitions
// ============================================================================

export interface CommentsSectionProps {
  postId: string;
  currentUserAvatar?: string;
  currentUserName?: string;
  className?: string;
}

// ============================================================================
// Sub-components
// ============================================================================

export interface CommentInputProps {
  avatarUrl?: string;
  avatarFallback?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  showCancel?: boolean;
}

function CommentInput({
  avatarUrl,
  avatarFallback = 'AU',
  onSubmit,
  onCancel,
  isSubmitting = false,
  placeholder = 'Join the conversation...',
  autoFocus = false,
  showCancel = false,
}: CommentInputProps) {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = React.useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
    // Re-focus the textarea after clearing
    // setTimeout(() => inputRef.current?.focus(), 0);
  }, [value, onSubmit]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      // Shift+Enter: default behavior (new line) - no action needed
    },
    [handleSubmit],
  );

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea based on content
  React.useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex gap-2 w-full">
      <div className="flex items-center gap-2 w-full">
        <AvatarComponent src={avatarUrl} username={avatarFallback} size="size-8" className='self-start mt-1' />

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-end gap-2 bg-white/90 border border-neutral-4 rounded-3xl px-1 py-1 pl-2">
            <Textarea
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isSubmitting}
              maxLength={5000}
              rows={1}
              className="flex-1 min-h-1 h-1 max-h-30 scrollbar-hidden self-center resize-none bg-transparent border-none text-base text-neutral-12 placeholder:text-neutral-alpha-11 outline-none focus:ring-0 focus-visible:ring-0 p-1"
            />
            <Button
              onClick={handleSubmit}
              disabled={!value.trim() || isSubmitting}
              className={cn(
                'flex items-center justify-center size-8 rounded-full shrink-0',
                'disabled:text-neutral-950',
                'disabled:bg-gray-5 disabled:cursor-not-allowed',
              )}
              aria-label="Send comment"
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
          <div className="text-xs text-neutral-alpha-11 text-right pr-1">
            {value.length} / 5000
          </div>
        </div>
      </div>
      {showCancel && onCancel && (
        <Button
          variant="ghost"
          onClick={onCancel}
          requireAuth={false}
          className="text-sm self-start text-black hover:text-neutral-8 h-auto p-0 mt-2 hover:bg-transparent"
        >
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
}

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      requireAuth={false}
      className={cn(
        'flex items-center justify-center h-10 px-4',
        'border border-neutral-alpha-7 rounded-full',
        'text-base font-medium text-neutral-12',
      )}
    >
      {isLoading ? 'Loading...' : 'Load more comments'}
    </Button>
  );
}

function CommentsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-2">
          <Skeleton variant="avatar" className="size-8" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

function CommentsSection({
  postId,
  currentUserAvatar,
  currentUserName,
  className,
}: CommentsSectionProps) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useComments(postId);
  const { addComment, isPending: isAddingComment } = useAddComment();
  const { addReply, isPending: isAddingReply } = useAddReply();
  const { likeComment } = useLikeComment();
  const { isAuthenticated, openLoginModal } = useAuthGate();

  const avatarFallback =
    currentUserName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AU';

  const handleAddComment = React.useCallback(
    (content: string) => {
      addComment(postId, content);
    },
    [postId, addComment],
  );

  const handleReplySubmit = React.useCallback(
    (parentId: string, content: string) => {
      addReply(postId, content, parentId);
    },
    [postId, addReply],
  );

  const handleLike = React.useCallback(
    (commentId: string, parentId?: string) => {
      likeComment(postId, commentId, parentId);
    },
    [postId, likeComment],
  );

  const handleLoadMore = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single array
  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {/* Comment Input - for top-level comments */}
      <div className="px-4 py-4">
        {isAuthenticated ? (
          <CommentInput
            avatarUrl={currentUserAvatar}
            avatarFallback={avatarFallback}
            onSubmit={handleAddComment}
            isSubmitting={isAddingComment}
            placeholder="Join the conversation..."
            autoFocus
          />
        ) : (
          <Button
            onClick={openLoginModal}
            className={cn(
              'w-full flex items-center gap-2 h-12 bg-white/90 border border-foreground/15 rounded-full px-4',
              'text-neutral-6 text-base hover:bg-foreground/5 transition-colors',
            )}
          >
            Log in to join the conversation...
          </Button>
        )}
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {isLoading ? (
          <CommentsSkeleton />
        ) : isError ? (
          <Text className="text-sm text-crimson-5">
            Failed to load comments
          </Text>
        ) : comments.length === 0 ? (
          <Text className="text-sm text-neutral-alpha-11">
            No comments yet. Be the first to comment!
          </Text>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                postId={postId}
                comment={comment}
                onLike={handleLike}
                onReplySubmit={handleReplySubmit}
                currentUserAvatar={currentUserAvatar}
                currentUserName={currentUserName}
                isSubmittingReply={isAddingReply}
              />
            ))}

            {/* Load More */}
            {hasNextPage && (
              <div className="pt-4">
                <LoadMoreButton
                  onClick={handleLoadMore}
                  isLoading={isFetchingNextPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { CommentsSection, CommentInput };
