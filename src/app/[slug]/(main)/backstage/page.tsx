'use client';

import { useEffect, Fragment, useCallback, useMemo, useState } from 'react';
import { PostCard } from '@/components/feed/post-card';
import { CreatePostTrigger } from '@/components/feed/create-post-trigger';
import { CreatePostModal } from '@/components/feed/create-post-modal';
import { PostFilters, PostedByFilter } from '@/components/feed/post-filters';
import { useStageAccess } from '@/lib/stage-access-context';
import { useIntersectionObserver, useRecordPageView } from '@/hooks';
import { useInfinitePosts } from '@/hooks/use-posts';
import { useSearchParams, useRouter } from 'next/navigation';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { useSession } from '@/lib/auth-client';
import type { PostResponseDto } from '@backstage-pass/api';
import { mapReactionCountsToSummary } from '@/types/api';
import { EmptyState } from '@/components/empty-state';
import { FileText } from 'lucide-react';

const MOCK_POST: PostResponseDto = {
  id: 'mock_post_1',
  stageId: 'mock_stage_1',
  text: "Just wrapped up an incredible live session with all of you! The energy was unreal. Can't wait to share the recording with premium members tomorrow." as unknown as object,
  isPinned: false,
  pinnedAt: null,
  publishedAt: new Date().toISOString(),
  totalViews: 1250,
  reactionCounts: { '👍': 50, '❤️': 30, '😂': 7 },
  totalComments: 23,
  totalShares: 12,
  createdAt: new Date().toISOString(),
  author: {
    id: 'user_1',
    name: 'Sarah Chen',
    image:
      'https://www.freepik.com/free-photos-vectors/male-avatar' as unknown as object,
    isDeleted: false,
  },
  passes: [{ id: 'pass_ground', name: 'Free Pass', isGroundPass: true }],
  media: [],
};

export default function BackstagePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { stage, isLoading: stageLoading, permissions } = useStageAccess();

  // Record page view for analytics
  useRecordPageView(stage?.id);

  // Modal state
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  // Parse filter values from URL search params
  const selectedPassIds = useMemo(() => {
    const passIdsParam = searchParams.get('passIds');
    return passIdsParam ? passIdsParam.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedPostedBy = useMemo(() => {
    const postedByParam = searchParams.get('postedBy');
    if (postedByParam === 'me' || postedByParam === 'owner') {
      return postedByParam;
    }
    return 'everyone' as PostedByFilter;
  }, [searchParams]);

  // Build filters object for the hook
  const filters = useMemo(
    () => ({
      passIds: selectedPassIds.length > 0 ? selectedPassIds : undefined,
      postedBy: selectedPostedBy,
    }),
    [selectedPassIds, selectedPostedBy],
  );

  const {
    data: postsData,
    isLoading: postsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(stage?.id || '', filters);

  const isLoading = stageLoading || postsLoading;
  // Use real posts data when available, otherwise use mock posts
  const posts = isLoading
    ? Array.from({ length: 5 }, (_, i) => ({
      ...MOCK_POST,
      id: `mock_post_${i}`,
    }))
    : (postsData ?? []);

  // Handle filter changes by updating URL
  const handlePassIdsChange = useCallback(
    (passIds: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (passIds.length > 0) {
        params.set('passIds', passIds.join(','));
      } else {
        params.delete('passIds');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const handlePostedByChange = useCallback(
    (postedBy: PostedByFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      if (postedBy !== 'everyone') {
        params.set('postedBy', postedBy);
      } else {
        params.delete('postedBy');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOpenCreatePost = useCallback(() => {
    if (!stage) return;
    setCreatePostModalOpen(true);
  }, [stage]);

  return (
    <SkeletonProvider loading={isLoading}>
      <div className="space-y-4">
        {/* Create post trigger - only show when logged in, stage is loaded, and user can create posts */}
        {session?.user && stage && permissions.canCreatePosts && (
          <CreatePostTrigger
            onOpenModal={handleOpenCreatePost}
            currentUser={session.user}
          />
        )}

        {/* Post filters */}
        {session?.user && stage && (
          <PostFilters
            selectedPassIds={selectedPassIds}
            selectedPostedBy={selectedPostedBy}
            onPassIdsChange={handlePassIdsChange}
            onPostedByChange={handlePostedByChange}
          />
        )}

        {posts.length === 0 && !isLoading ? (
          <EmptyState
            icon={<FileText className="w-8 h-8 text-muted-foreground" />}
            title="No posts yet"
            description={
              permissions.canCreatePosts
                ? 'Share your first update with your audience.'
                : 'Posts from the creator will appear here.'
            }
            action={
              permissions.canCreatePosts
                ? {
                  label: 'Create your first post',
                  onClick: handleOpenCreatePost,
                }
                : undefined
            }
          />
        ) : (
          posts.map((post, index) => {
            // Place sentinel at 70% mark (triggers when 30% of list remains)
            const sentinelIndex = Math.floor(posts.length * 0.7);
            const showSentinel = index === sentinelIndex && hasNextPage;

            return (
              <Fragment key={post.id}>
                {showSentinel && <div ref={loadMoreRef} />}
                <PostCard
                  isPinned={post.isPinned}
                  pinnedAt={post.pinnedAt}
                  passes={post.passes}
                  postId={post.id}
                  authorId={post.author.id}
                  stageId={post.stageId}
                  author={{
                    name: post.author.name,
                    avatarUrl:
                      (post.author.image as unknown as string) || undefined,
                  }}
                  timestamp={post.publishedAt}
                  content={(post.text as unknown as string) || ''}
                  media={post.media
                    ?.filter((m) => m.type === 'image' || m.type === 'video')
                    .map((m) => ({
                      type: m.type as 'image' | 'video',
                      url: (m.compressedUrl as string | null) || m.url,
                      transcoderConfig: m.transcoderConfig,
                    }))}
                  reactions={mapReactionCountsToSummary(post.reactionCounts)}
                  commentsCount={post.totalComments}
                  userReaction={post.userReaction ?? null}
                  skeletonLoading={isLoading}
                  currentUserName={session?.user.name}
                  currentUserAvatar={session?.user.image ?? undefined}
                />
              </Fragment>
            );
          })
        )}

        {isFetchingNextPage && (
          <div className="py-4 text-center">
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        stageId={stage?.id ?? ''}
        currentUser={session?.user}
      />
    </SkeletonProvider>
  );
}
