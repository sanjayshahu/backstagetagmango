'use client';

import { useCallback, useMemo, useEffect, useState } from 'react';
import { Video, Plus, AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { StreamCard } from '@/components/streams/stream-card';
import {
  StreamFilters,
  type StreamFilterType,
} from '@/components/streams/stream-filters';
import { CreateStreamModal } from '@/components/streams/modal/create-stream-modal';
import { useStageAccess } from '@/lib/stage-access-context';
import {
  useStagePasses,
  useInfiniteVideoCalls,
  useJoinVideoCall,
  useCancelVideoCall,
  useIntersectionObserver,
} from '@/hooks';
import { SkeletonProvider } from '@/lib/skeleton-context';
import { toast } from 'sonner';
import type { VideoCallResponseDto } from '@backstage-pass/api';
import { EmptyState } from '@/components/empty-state';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { StreamPerformance } from '@/components/streams/stream-performance';

// ============================================
// Mock Stream for Loading State
// ============================================

const MOCK_STREAM: VideoCallResponseDto = {
  id: 'mock_stream_1',
  stageId: 'mock_stage_1',
  title: 'Weekly Q&A Session',
  description: 'Join us for our weekly Q&A!' as unknown as object,
  scheduledStartAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  scheduledEndAt: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
  status: 'scheduled',
  hasJoinUrl: false,
  createdAt: new Date().toISOString(),
  author: {
    id: 'user_1',
    name: 'Creator Name',
    image: null as unknown as object,
    isDeleted: false,
  },
  passes: [],
  totalMembers: 0,
  totalAttended: 0,
  promoSubscribersImages: [],
};

// ============================================
// Main Component
// ============================================

export default function StreamsPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    stage,
    isLoading: stageLoading,
    role,
    permissions,
  } = useStageAccess();
  const isStageOwner = role === 'owner';
  const canCreateStreams = permissions.canCreateStreams;
  useStagePasses({ stageId: stage.id }); // Pre-fetch passes for modal

  // Redirect non-staff users to root page
  useEffect(() => {
    if (!stageLoading && role !== 'owner' && role !== 'admin' && role !== 'moderator') {
      router.push('/');
    }
  }, [stageLoading, role, router]);

  // Modal state
  const [createStreamModalOpen, setCreateStreamModalOpen] = useState(false);
  const [cancelConfirmModalOpen, setCancelConfirmModalOpen] = useState(false);
  const [streamToCancel, setStreamToCancel] = useState<string | null>(null);

  // Get filter from URL or default to 'upcoming'
  const currentFilter = useMemo(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'past') return 'past' as StreamFilterType;
    return 'upcoming' as StreamFilterType;
  }, [searchParams]);

  // Fetch video calls with filter (infinite query)
  const {
    data: videoCallsData,
    isLoading: videoCallsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVideoCalls(stage?.id || '', { filter: currentFilter });

  // Mutations
  const joinVideoCall = useJoinVideoCall();
  const cancelVideoCall = useCancelVideoCall();

  const isLoading = stageLoading || videoCallsLoading;

  // Flatten pages to get all video calls
  const streams = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 3 }, (_, i) => ({
        ...MOCK_STREAM,
        id: `mock_stream_${i}`,
      }));
    }
    return videoCallsData?.pages.flatMap((page) => page.videoCalls) ?? [];
  }, [isLoading, videoCallsData]);

  // Infinite scroll observer
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle filter changes by updating URL
  const handleFilterChange = useCallback(
    (filter: StreamFilterType) => {
      const params = new URLSearchParams(searchParams.toString());
      if (filter !== 'upcoming') {
        params.set('filter', filter);
      } else {
        params.delete('filter');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  // Handlers
  const handleOpenCreateStream = useCallback(() => {
    if (!stage) return;
    setCreateStreamModalOpen(true);
  }, [stage]);

  const handleJoinStream = useCallback(
    async (streamId: string) => {
      if (!stage) return;

      try {
        const result = await joinVideoCall.mutateAsync({
          stageId: stage.id,
          callId: streamId,
        });

        // Open join URL in new tab
        window.open(result.joinUrl, '_blank');
      } catch (error) {
        // don't toast it will create multiple 
        // toast.error('Failed to join stream. Please try again.');
      }
    },
    [stage, joinVideoCall],
  );

  const handleEditStream = useCallback((streamId: string) => {
    // TODO: Implement edit stream modal
    toast.info('Edit stream functionality coming soon!');
  }, []);

  // Open cancel confirmation modal
  const handleCancelStreamClick = useCallback((streamId: string) => {
    setStreamToCancel(streamId);
    setCancelConfirmModalOpen(true);
  }, []);

  // Get the stream being cancelled
  const streamBeingCancelled = streamToCancel
    ? streams.find((s) => s.id === streamToCancel)
    : null;

  // Confirm cancel stream
  const handleConfirmCancelStream = useCallback(async () => {
    if (!stage || !streamToCancel) return;

    try {
      await cancelVideoCall.mutateAsync({
        stageId: stage.id,
        callId: streamToCancel,
      });
      toast.success('Stream cancelled successfully');
      setCancelConfirmModalOpen(false);
      setStreamToCancel(null);
    } catch (error) {
      toast.error('Failed to cancel stream. Please try again.');
    }
  }, [stage, streamToCancel, cancelVideoCall]);

  const handleCopyLink = useCallback(
    async (streamId: string) => {
      const url = `${window.location.origin}/${params.slug}/streams/${streamId}`;
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Stream link copied to clipboard');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    },
    [params.slug],
  );

  const handleViewDetails = useCallback(
    (streamId: string) => {
      router.push(`/${params.slug}/streams/${streamId}`);
    },
    [params.slug, router],
  );

  const creatorImage = stage.owner?.image || '';
  const creatorName = stage.owner.name;

  return (
    <SkeletonProvider loading={isLoading}>
      <div className="flex-col items-center space-y-4">
        {/* Analytics Section - Only for owners */}
        {isStageOwner && <StreamPerformance stageId={stage.id} />}

        {/* Header with Create Button and Filters */}
        <div className="flex items-center justify-between">
          <StreamFilters
            activeFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Streams List */}
        {streams.length === 0 && !isLoading ? (
          <EmptyState
            icon={<Video className="w-8 h-8 text-muted-foreground" />}
            title={
              currentFilter === 'upcoming'
                ? 'No upcoming streams'
                : 'No completed streams'
            }
            description={
              currentFilter === 'upcoming'
                ? 'Schedule a live stream to connect with your audience in real-time.'
                : 'Completed streams and recordings will appear here.'
            }
            action={
              currentFilter === 'upcoming' && canCreateStreams
                ? {
                  label: 'Schedule a stream',
                  onClick: handleOpenCreateStream,
                  icon: <Plus className="w-4 h-4 mr-2" />,
                  className:
                    'mt-4 bg-[#b8860b] hover:bg-[#9a7209] text-white rounded-lg',
                }
                : undefined
            }
          />
        ) : (
          <div className="space-y-4">
            {streams.map((stream, index) => {
              // Place sentinel at 70% mark (triggers when 30% of list remains)
              const sentinelIndex = Math.floor(streams.length * 0.7);
              const showSentinel = index === sentinelIndex && hasNextPage;

              return (
                <div key={stream.id}>
                  {showSentinel && <div ref={loadMoreRef} />}
                  <StreamCard
                    stream={stream}
                    onEdit={handleEditStream}
                    onCancel={handleCancelStreamClick}
                    onJoin={handleJoinStream}
                    onCopyLink={handleCopyLink}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              );
            })}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="py-4 text-center">
            <span className="text-sm text-muted-foreground">
              Loading more...
            </span>
          </div>
        )}
      </div>

      {/* Create Stream Modal */}
      <CreateStreamModal
        isOpen={createStreamModalOpen}
        onClose={() => setCreateStreamModalOpen(false)}
        stageId={stage?.id ?? ''}
        creatorName={creatorName || 'Creator'}
        creatorAvatar={creatorImage}
      />

      {/* Cancel Stream Confirmation Modal */}
      <ConfirmationModal
        open={cancelConfirmModalOpen}
        onOpenChange={setCancelConfirmModalOpen}
        title="Cancel Stream"
        description={`Are you sure you want to cancel "${streamBeingCancelled?.title ?? 'this stream'}"? This action cannot be undone.`}
        confirmText="Cancel Stream"
        cancelText="Keep Stream"
        variant="destructive"
        loading={cancelVideoCall.isPending}
        onConfirm={handleConfirmCancelStream}
        icon={
          <div className="flex size-12 items-center justify-center rounded-full bg-error-3">
            <AlertTriangle className="size-6 text-error-9" />
          </div>
        }
      />
    </SkeletonProvider>
  );
}
