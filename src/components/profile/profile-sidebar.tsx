'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { AvatarComponent } from '@/components/avatar-component';
import { useStageAccess } from '@/lib/stage-access-context';
import { useInfiniteVideoCalls } from '@/hooks/use-video-calls';
import type { VideoCallResponseDto } from '@backstage-pass/api';
import { cn } from '@/lib/utils';
import { LockIcon } from '../icons/lock';
import { Text } from '../ui/text';
import { useAuthGate } from '@/lib/auth-gate-context';
import { useSession } from '@/lib/auth-client';

interface ProfileSidebarProps {
  slug: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getRelativeDate(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ProfileSidebar({ slug }: ProfileSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  // Hide workshop section on passes page
  const isPassesPage = pathname === `/${slug}/passes`;

  if (isPassesPage) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <Text
          as="h3"
          className="font-semibold text-sm text-neutral-12"
          loading={false}
        >
          Upcoming Streams
        </Text>
        {isLoggedIn ? <WorkshopWidget /> : <ExploreNewChallengesCard />}
      </div>
      <div className="flex flex-col gap-3">
        <Text
          as="h3"
          className="font-semibold text-sm text-neutral-12"
          loading={false}
        >
          Explore New Challenges
        </Text>
        <ExploreNewChallengesCard />
      </div>
    </div>
  );
}

const WorkshopWidget = () => {
  const { stage } = useStageAccess();
  // Calculate time boundaries: 24hrs to 72hrs from now
  const { after24Hours, before72Hours } = useMemo(() => {
    const now = new Date();
    return {
      after24Hours: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      before72Hours: new Date(now.getTime() + 72 * 60 * 60 * 1000),
    };
  }, []);
  // Fetch upcoming workshops within 72 hours
  const { data: upcomingWorkshopsData } = useInfiniteVideoCalls(
    stage?.id ?? '',
    {
      filter: 'upcoming',
      scheduledTimeLessThan: before72Hours.toISOString(),
    },
  );

  // Filter to only workshops between 24-72 hours
  const workshopsIn24To72Hours = useMemo(() => {
    const allWorkshops =
      upcomingWorkshopsData?.pages?.flatMap((page) => page.videoCalls ?? []) ??
      [];

    return allWorkshops.filter((workshop) => {
      const startTime = new Date(workshop.scheduledStartAt);
      return startTime >= after24Hours && startTime <= before72Hours;
    });
  }, [upcomingWorkshopsData, after24Hours, before72Hours]);
  return (
    <div className="gap-2">
      {workshopsIn24To72Hours.length > 0 ? (
        workshopsIn24To72Hours.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))
      ) : (
        <Text as="p" className="text-sm text-black">
          No upcoming streams scheduled
        </Text>
      )}
    </div>
  );
};

interface WorkshopCardProps {
  workshop: VideoCallResponseDto;
}

function WorkshopCard({ workshop }: WorkshopCardProps) {
  const { isAuthenticated, openLoginModal } = useAuthGate();
  const locked = !isAuthenticated;

  const startDate = new Date(workshop.scheduledStartAt);

  const dayOfWeek = startDate
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase();

  const dayNumber = startDate.getDate();

  const startTime = formatTime(startDate);
  const endTime = formatTime(new Date(workshop.scheduledEndAt));
  const relativeDate = getRelativeDate(startDate);

  const authorImage =
    typeof workshop.author?.image === 'string'
      ? workshop.author.image
      : undefined;

  return (
    <div
      className={cn(
        'relative flex gap-3 items-center rounded-3xl border border-neutral-4 p-3 overflow-hidden',
        locked && 'cursor-pointer',
      )}
      onClick={() => {
        if (locked) {
          openLoginModal();
        }
      }}
    >
      {/* Main content */}
      <div
        className={cn(
          'flex gap-3 items-center w-full transition-all',
          locked && 'blur-sm',
        )}
      >
        {/* Avatar with date badge */}
        <div className="flex flex-col items-center pb-4">
          <AvatarComponent
            src={authorImage}
            username={workshop.author?.name}
            size="size-12"
            className="-mb-4"
          />

          <div className="z-10 -mb-4 rounded-xl bg-neutral-9 px-1 py-0.5 text-[10px] font-medium text-white">
            {dayOfWeek} {dayNumber}
          </div>
        </div>

        {/* Workshop details */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-black">{workshop.title}</h5>
          <div className="flex items-center gap-2 text-xs text-black">
            <span>
              {startTime} - {endTime}
            </span>
            <span>•</span>
            <span>{relativeDate}</span>
          </div>
        </div>
      </div>

      {/* Locked overlay */}
      {locked && <LockedOverlay />}
    </div>
  );
}

function ExploreNewChallengesCard() {
  const { isAuthenticated, openLoginModal } = useAuthGate();
  const locked = !isAuthenticated;
  return (
    <div
      className={cn(
        'relative flex gap-3 items-center rounded-3xl border border-neutral-4 p-3 overflow-hidden',
        locked && 'cursor-pointer',
      )}
      onClick={() => {
        if (locked) openLoginModal();
      }}
    >
      {/* Workshop details */}
      <div className="space-y-2">
        <h5 className="font-semibold text-base text-black">
          The Full Body Fitness Challenge
        </h5>
        <div className="flex items-center gap-2 text-xs text-black">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-6 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <AvatarComponent
              src="https://github.com/shadcn.png"
              username="shadcn"
              size="size-6"
            />
            <AvatarComponent
              src="https://github.com/maxleiter.png"
              username="maxleiter"
              size="size-6"
            />
            <AvatarComponent
              src="https://github.com/evilrabbit.png"
              username="evilrabbit"
              size="size-6"
            />
          </div>
          <h6 className="text-xs font-normal text-black">
            <span className="font-bold">85+ </span>participants
          </h6>
        </div>
      </div>
      {/* Locked overlay */}
      {locked && <LockedOverlay />}
    </div>
  );
}

interface LockedOverlayProps {
  label?: string;
}

function LockedOverlay({ label = 'Join to Unlock' }: LockedOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center border-neutral-4 bg-[rgba(255,255,255,0.36)] dark:bg-[rgba(0,0,0,0.36)]"
      style={{
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium">
        <LockIcon className="text-black" />
        <span className="text-black font-semibold text-sm">{label}</span>
      </div>
    </div>
  );
}
