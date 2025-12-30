'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn, toReadableDateTime, toReadableLargeNumber, toRelativeTime } from '@/lib/utils';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { AvatarComponent } from '@/components/avatar-component';
import { Image } from '@/components/ui/image';
import {
  ReactionPills,
  REACTION_EMOJIS,
} from '@/components/feed/reaction-pills';
import { CommentsSection } from '@/components/feed/comments-section';
import {
  MuxVideoPlayer,
  type TranscoderConfig,
} from '@/components/video/mux-video-player';
import { Card, CardSection } from '../ui/card';
import { ExpandableText } from '@/components/ui/expandable-text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useAddReaction, useRemoveReaction } from '@/hooks/use-reactions';
import { MediaLightbox } from '@/components/ui/media-lightbox';
import { ReactionsDetailsModal } from './reaction-details-modal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { PostPassDto } from '@backstage-pass/api';
import { Text } from '../ui/text';
import { GlobeHemisphereWestIcon, PushPinIcon } from '@phosphor-icons/react';
import { useStageAccess } from '@/lib/stage-access-context';
import { PostCardActionDropdown } from './post-action-dropdown';
import { CreatePostModal } from './create-post-modal';

// ============================================================================
// Constants
// ============================================================================

type ReactionEmoji = (typeof REACTION_EMOJIS)[number];

// ============================================================================
// Type Definitions
// ============================================================================

export interface PostCardAuthor {
  name: string;
  avatarUrl?: string;
  avatarFallback?: string;
}

export interface PostCardReaction {
  emoji: string;
  count: number;
}

export interface PostCardMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  transcoderConfig?: TranscoderConfig | null;
}

export interface PostCardActions {
  onCommentClick?: () => void | Promise<void>;
}

export interface PostCardProps {
  postId: string;
  authorId: string;
  stageId: string;
  author: PostCardAuthor;
  timestamp: string;
  content: string;
  media?: PostCardMedia[];
  reactions: PostCardReaction[];
  commentsCount: number;
  userReaction?: string | null;
  actions?: PostCardActions;
  skeletonLoading?: boolean;
  showComments?: boolean;
  currentUserAvatar?: string;
  currentUserName?: string;
  className?: string;
  passes: PostPassDto[];
  isPinned?: boolean;
  pinnedAt?: string | object | null;
}

// ============================================================================
// Sub-components
// ============================================================================

interface MediaSectionProps {
  media: PostCardMedia[];
  onImageClick?: (imageIndex: number) => void;
}

function MediaSection({ media, onImageClick }: MediaSectionProps) {
  if (!media || media.length === 0) {
    return null;
  }

  // Get the index in the images-only array for lightbox navigation
  const getImageIndex = (mediaIndex: number): number => {
    let imageIndex = 0;
    for (let i = 0; i < mediaIndex; i++) {
      if (media[i].type === 'image') {
        imageIndex++;
      }
    }
    return imageIndex;
  };

  // Single item - no carousel needed
  if (media.length === 1) {
    const item = media[0];
    return (
      <div className="mt-4 relative overflow-hidden rounded-lg aspect-4/3 bg-neutral-3">
        {item.type === 'image' ? (
          <Button
            variant="ghost"
            onClick={() => onImageClick?.(0)}
            requireAuth={false}
            className="w-full h-full cursor-pointer p-0 rounded-none hover:bg-transparent"
            aria-label="View image fullscreen"
          >
            <Image
              src={item.url}
              alt={item.alt || 'Media'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </Button>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MuxVideoPlayer
              transcoderConfig={item.transcoderConfig}
              fallbackUrl={item.url}
              ariaLabel={item.alt || 'Video'}
            />
          </div>
        )}
      </div>
    );
  }

  // Multiple items - use carousel
  return (
    <div className="mt-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {media.map((item, index) => (
            <CarouselItem key={index} className="pl-2">
              <div className="relative overflow-hidden rounded-lg aspect-4/3 bg-neutral-3">
                {item.type === 'image' ? (
                  <Button
                    variant="ghost"
                    onClick={() => onImageClick?.(getImageIndex(index))}
                    requireAuth={true}
                    className="w-full h-full cursor-pointer p-0 rounded-none hover:bg-transparent"
                    aria-label={`View image ${index + 1} fullscreen`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt || `Media ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </Button>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MuxVideoPlayer
                      transcoderConfig={item.transcoderConfig}
                      fallbackUrl={item.url}
                      ariaLabel={item.alt || `Video ${index + 1}`}
                    />
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}

interface CommentsCountProps {
  count: number;
  onClick?: () => void;
}

function CommentsCount({ count, onClick }: CommentsCountProps) {
  if (count === 0) {
    return null;
  }

  return (
    <Button
      variant="link"
      onClick={onClick}
      requireAuth={false}
      className="text-sm text-neutral-12 hover:no-underline p-0 h-auto"
    >
      {toReadableLargeNumber(count)} {count === 1 ? 'Comment' : 'Comments'}
    </Button>
  );
}

// ============================================================================
// Main Component
// ============================================================================

function PostCard({
  postId,
  authorId,
  stageId,
  author,
  timestamp,
  content,
  media,
  reactions,
  commentsCount,
  userReaction,
  actions,
  skeletonLoading = false,
  showComments = false,
  currentUserAvatar,
  currentUserName,
  className,
  passes,
  isPinned,
  pinnedAt,
}: PostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(showComments);
  const [isReactionListOpen, setIsReactionListOpen] = React.useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const { subscribedPasses } = useStageAccess();
  const subscribedPassIdSet = new Set(passes.map(pass => pass.id));
  const filteredPasses = subscribedPasses.filter(pass => subscribedPassIdSet.has(pass.id));
  const isPublicPost = passes.some(pass => pass.isGroundPass);
  // Filter only images for lightbox
  const imageMedia = React.useMemo(
    () => (media || []).filter((m) => m.type === 'image'),
    [media],
  );

  // Internal reaction state management
  const addReaction = useAddReaction();
  const { removeReaction } = useRemoveReaction();

  const handleCommentClick = React.useCallback(() => {
    setIsCommentsOpen((prev) => !prev);
    actions?.onCommentClick?.();
  }, [actions]);

  const handleReact = React.useCallback(
    (emoji: string) => {
      addReaction.react(postId, emoji, undefined, userReaction);
    },
    [addReaction, postId, userReaction],
  );

  const handleUnreact = React.useCallback(() => {
    removeReaction(postId, userReaction);
  }, [removeReaction, postId, userReaction]);

  const handleOpenReactionList = React.useCallback(() => {
    setIsReactionListOpen(true);
  }, []);

  const handleImageClick = React.useCallback((imageIndex: number) => {
    setLightboxIndex(imageIndex);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = React.useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const totalReactionCount = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <SkeletonProvider loading={skeletonLoading}>
      <Card
        className={cn(
          'flex flex-col rounded-3xl border border-neutral-4 bg-white',
          className,
        )}
      >
        <CardSection className='flex justify-between p-4'>
          <CardSection className='flex-col'>
            {isPinned && (
              <CardSection className="flex items-center mb-3">
                <TooltipProvider>
                  <Tooltip delayDuration={1000}>
                    <TooltipTrigger className="flex items-center gap-1">
                      <PushPinIcon className="size-4 text-neutral-11" />
                      <Text className="text-xs text-neutral-alpha-11 font-normal">
                        Pinned
                      </Text>
                    </TooltipTrigger>
                    <TooltipContent>
                      Pinned on {toReadableDateTime(pinnedAt as string)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardSection>
            )}
            {/* Profile Header */}
            <CardSection className="flex items-start gap-2">
              <AvatarComponent
                src={author.avatarUrl}
                username={author.name}
                size="size-12"
              />
              <CardSection className="flex flex-col justify-center gap-1 min-h-12 flex-1">
                <Text as="h3" className="text-base font-semibold text-neutral-12">
                  {author.name && author.name.length > 0
                    ? author.name
                    : 'Anonymous User'}
                </Text>
                <div className="flex items-center gap-1">
                  <Tooltip delayDuration={1000}>
                    <TooltipTrigger>
                      <Text className="text-xs text-neutral-alpha-11 font-normal">
                        {toRelativeTime(timestamp)}
                      </Text>
                    </TooltipTrigger>
                    <TooltipContent>{toReadableDateTime(timestamp)}</TooltipContent>
                  </Tooltip>
                  <Text className="text-xs text-neutral-alpha-11 font-normal">
                    {' • '}
                  </Text>
                  <Tooltip delayDuration={1000}>
                    <TooltipTrigger>
                      {isPublicPost ? (
                        <GlobeHemisphereWestIcon weight="fill" className="size-3 text-neutral-alpha-11" />

                      ) : (<Text className="text-xs text-neutral-alpha-11 font-normal">
                        Posted in {filteredPasses[0]?.name}{' '}
                        {filteredPasses.length > 1 ? `+${filteredPasses.length - 1}` : ''}
                      </Text>)}

                    </TooltipTrigger>
                    <TooltipContent>
                      {isPublicPost ? 'This post is visible to all followers' : filteredPasses.map((pass: PostPassDto) => pass.name).join(', ')}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardSection>
            </CardSection>
          </CardSection>
          <PostCardActionDropdown postId={postId} authorId={authorId} stageId={stageId} isPinned={isPinned} onEdit={() => setIsEditModalOpen(true)} />
        </CardSection>

        {/* Content */}
        <CardSection className="px-4 pb-4">
          <ExpandableText
            content={content}
            maxLines={10}
            textClassName="text-mauve-12"
          />
          {media && media.length > 0 && (
            <MediaSection media={media} onImageClick={handleImageClick} />
          )}
        </CardSection>

        {/* Activity Bar */}
        <CardSection className="flex flex-row justify-between px-4 py-3">
          <div className="flex items-center gap-1">
            <ReactionPills
              reactions={reactions}
              userReaction={userReaction}
              totalCount={totalReactionCount}
              onReact={handleReact}
              onUnreact={handleUnreact}
              onOpenReactionList={handleOpenReactionList}
            />
            <Button
              variant="icon"
              size="icon"
              onClick={handleCommentClick}
              aria-label={'View comments'}
              className="size-8"
            >
              <MessageCircle className="size-4 text-neutral-12" />
            </Button>
          </div>
          <CommentsCount count={commentsCount} onClick={handleCommentClick} />
        </CardSection>

        {/* Comments Section */}
        {isCommentsOpen && (
          <CommentsSection
            postId={postId}
            currentUserAvatar={currentUserAvatar}
            currentUserName={currentUserName}
          />
        )}
      </Card>

      <ReactionsDetailsModal
        postId={postId}
        open={isReactionListOpen}
        onOpenChange={setIsReactionListOpen}
      />

      {/* Media Lightbox */}
      {imageMedia.length > 0 && (
        <MediaLightbox
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          media={imageMedia.map((m) => ({ url: m.url, alt: m.alt }))}
          initialIndex={lightboxIndex}
        />
      )}

      {/* Edit Post Modal */}
      <CreatePostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        stageId={stageId}
        currentUser={{
          name: author.name,
          image: author.avatarUrl,
        }}
        isEditMode={true}
        postData={{
          id: postId,
          text: content,
          passes: passes,
          media: (media || []).map(m => ({
            id: m.url,
            type: m.type,
            url: m.url,
            thumbnailUrl: null,
          })),
        }}
        onSuccess={() => setIsEditModalOpen(false)}
      />
    </SkeletonProvider>
  );
}

export { PostCard };
export type { ReactionEmoji };
