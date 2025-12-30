'use client';

import { useMemo } from 'react';
import { VideoCallResponseDto } from '@backstage-pass/api';
import { AvatarComponent } from '../avatar-component';
import { useInfiniteVideoCalls, useJoinVideoCall } from '@/hooks';
import { useStageAccess } from '@/lib/stage-access-context';
import { Button } from '../ui/button';
import { Video } from 'lucide-react';
import { Badge } from '../ui/badge';
import { LiveBadgeIcon } from '../icons/live-badge';
import { BlurryImageEffect } from './BlurryImageEffect';
import { cn, getCoverImageUrlFromStage } from '@/lib/utils';

export function JoinCallCards() {
  const { stage } = useStageAccess();

  // Calculate 24 hours from now for API filter
  const next24Hours = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date.toISOString();
  }, []);

  const { data: upcomingWorkshopsData } = useInfiniteVideoCalls(
    stage?.id ?? '',
    {
      filter: 'upcoming',
      scheduledTimeLessThan: next24Hours,
    },
  );

  // Flatten all workshops from paginated data and filter out ended ones
  const now = new Date();
  const allWorkshops =
    upcomingWorkshopsData?.pages?.flatMap((page) => page.videoCalls ?? []) ??
    [];

  const activeWorkshops = allWorkshops.filter((workshop) => {
    const scheduledEnd = new Date(workshop.scheduledEndAt);
    return scheduledEnd > now;
  });


  return (
    <div>
      {activeWorkshops.map((workshop) => {
        return <CallDetailsCard workshop={workshop} />
      })}
    </div>
  )
}

interface WorkshopCardProps {
  workshop: VideoCallResponseDto;
}

function CallDetailsCard({
  workshop
}: WorkshopCardProps) {
  const { stage, role } = useStageAccess();
  const isOwner = role === 'owner';

  const { mutate: joinCall, isPending: isJoining } = useJoinVideoCall();

  // Calculate if join button should be enabled
  const now = new Date();
  const scheduledStart = new Date(workshop.scheduledStartAt);
  const scheduledEnd = new Date(workshop.scheduledEndAt);
  const fifteenMinsBefore = new Date(scheduledStart.getTime() - 15 * 60 * 1000);

  const isJoinEnabled = isOwner
    ? now >= fifteenMinsBefore && now <= scheduledEnd // Owners: 15 mins before to end
    : now >= scheduledStart && now <= scheduledEnd; // Users: start to end

  const handleJoinCall = () => {
    if (!stage?.id) return;

    joinCall(
      { stageId: stage.id, callId: workshop.id },
      {
        onSuccess: (data) => {
          window.open(data.joinUrl, '_blank');
        },
      },
    );
  };

  const authorImage =
    typeof workshop.author?.image === 'string'
      ? workshop.author.image
      : undefined;

  const coverImageUrl = getCoverImageUrlFromStage(stage);

  const callStatus: 'live now' | 'live soon' =
    new Date(workshop.scheduledStartAt) <= new Date() ? 'live now' : 'live soon';

  const startTime = new Date(workshop.scheduledStartAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const endTime = new Date(workshop.scheduledEndAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-3xl border border-neutral-4 p-3 mb-4">
      {/* Background blur */}
      <div className="absolute inset-0 -z-10">
        <BlurryImageEffect src={coverImageUrl} blur={60} />
      </div>

      {/* Left content */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative ml-2 flex items-center justify-center">
          <AvatarComponent
            src={authorImage}
            username={workshop.author?.name}
            size="size-16"
          />

          {/* Status badge */}
          <Badge
            className={cn(
              'absolute bottom-0 left-1/2 z-10 -translate-x-1/2',
              'flex items-center gap-1 rounded-full px-1 py-0.5',
              'h-4.5 text-[10px] font-medium leading-none text-[#fff]',
              callStatus === 'live now' ? 'bg-tomato-9' : 'bg-accent-9',
            )}
          >
            {callStatus === 'live now' && <LiveBadgeIcon className="size-3" />}
            {callStatus === 'live now' ? 'LIVE NOW' : 'LIVE SOON'}
          </Badge>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h5 className="text-base font-medium text-black">{workshop.title}</h5>

          <div className="flex items-center gap-2 text-sm text-black">
            <span>{startTime}</span>
            <span>–</span>
            <span>{endTime}</span>

            {callStatus === 'live soon' && (
              <>
                <span>•</span>
                <span className="text-sm font-medium text-accent-9">
                  Starts soon
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Join button */}
      <Button
        className="min-w-20 gap-1"
        disabled={!isJoinEnabled || isJoining}
        loading={isJoining}
        onClick={handleJoinCall}
      >
        <Video size={16} />
        {'Join'}
      </Button>
    </div>
  );
}
