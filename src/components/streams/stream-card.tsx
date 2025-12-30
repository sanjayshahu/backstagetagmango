'use client';

import * as React from 'react';

import { ArrowUpRight, Video } from 'lucide-react';

import { AvatarComponent } from '@/components/avatar-component';
import { Button } from '@/components/ui/button';
import {
  getStreamVariant,
  getTimeUntilStart,
  type StreamVariant,
} from '@/hooks/use-video-calls';
import { cn } from '@/lib/utils';
import type { VideoCallResponseDto } from '@backstage-pass/api';

import { StreamCardDropdown } from './stream-card-dropdown';
import { Text } from '../ui/text';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { useMemo } from 'react';

// ============================================
// Type Definitions
// ============================================

export interface StreamCardProps {
  stream: VideoCallResponseDto;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  onJoin?: (id: string) => void;
  onCopyLink?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

// ============================================
// Helper Components
// ============================================

interface DateSectionProps {
  date: Date;
  variant: StreamVariant;
}

function DateSection({ date, variant }: DateSectionProps) {
  const isToday = new Date().toDateString() === date.toDateString();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();

  const isLive = variant === 'live';
  const isLiveSoon = variant === 'liveSoon';
  const hasColoredBackground = isLive || isLiveSoon;

  const bgColor = isLive ? 'bg-red-9' : isLiveSoon ? 'bg-accent-9' : '';

  if (hasColoredBackground) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center min-w-[100px] w-[9.67%] min-h-[100px] shrink-0 self-stretch',
          bgColor,
        )}
      >
        <Text as='span' className="text-white text-base font-normal leading-6 text-center">
          {isToday ? 'Today' : month}
        </Text>
        <Text as='span' className="text-white text-[35px] font-medium leading-10 text-center tracking-tight">
          {day}
        </Text>
      </div>
    );
  }

  // Simple/upcoming/completed card - no background color
  // For upcoming, date is gold; for completed, date is dark
  const dateColor =
    variant === 'completed' ? 'text-neutral-12' : 'text-accent-9';

  return (
    <div className="flex flex-col items-center justify-center w-[100px] w-[9.67%] shrink-0 py-4 px-3">
      <Text as='span' className="text-neutral-12 text-base font-normal leading-6 text-center">
        {month}
      </Text>
      <Text
        as='span'
        className={cn(
          'text-[35px] font-medium leading-10 text-center tracking-tight',
          dateColor,
        )}
      >
        {day}
      </Text>
    </div>
  );
}

interface StatusBadgeProps {
  variant: StreamVariant;
}

function StatusBadge({ variant }: StatusBadgeProps) {
  if (variant === 'live') {
    return (
      <div className="flex items-center gap-0.5 px-1 py-0.5 bg-tomato-9 rounded-xl">
        <div className="w-3 h-3 relative flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-static-white rounded-full animate-pulse" />
        </div>
        <span className="text-[10px] font-medium text-static-white leading-4 tracking-wide">
          LIVE NOW
        </span>
      </div>
    );
  }

  if (variant === 'liveSoon') {
    return (
      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-accent-9 rounded-xl">
        <span className="text-xs font-medium text-static-white leading-4 tracking-wide">
          LIVE SOON
        </span>
      </div>
    );
  }

  if (variant === 'cancelled') {
    return (
      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 rounded-xl">
        <span className="text-xs font-medium text-red-600 leading-4 tracking-wide">
          CANCELLED
        </span>
      </div>
    );
  }

  return null;
}

interface MemberAvatarsProps {
  count: number;
  totalCount?: number;
  attendancePercentage?: number;
  avatars?: string[];
  variant: StreamVariant;
}

function MemberAvatars({
  count,
  totalCount,
  attendancePercentage,
  avatars = [],
  variant,
}: MemberAvatarsProps) {
  const displayAvatars = avatars.slice(0, 3);
  const placeholderCount = Math.max(0, 3 - displayAvatars.length);
  const isCompleted = variant === 'completed';

  return (
    <div className="flex flex-col gap-1 items-start justify-end">
      {/* Stacked Avatars */}
      <div className="flex items-center pr-2">
        {displayAvatars.map((url, i) => (
          <AvatarComponent
            key={i}
            src={url}
            username="User"
            size="size-8"
            className="border border-mauve-3 -mr-2 last:mr-0"
          />
        ))}
        {placeholderCount > 0 &&
          Array.from({ length: Math.min(placeholderCount, 3) }).map((_, i) => (
            <AvatarComponent
              key={`placeholder-${i}`}
              username="User"
              size="size-8"
              className="border border-mauve-3 -mr-2 last:mr-0"
            />
          ))}
      </div>

      {/* Member Count */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0.5">
          <Text as='span' className="text-base font-bold text-neutral-12 leading-6">
            {count}
          </Text>
          {isCompleted && totalCount ? (
            <>
              <Text as='span' className="text-base font-normal text-neutral-alpha-11 leading-6">
                /
              </Text>
              <Text as='span' className="text-base font-normal text-neutral-alpha-11 leading-6">
                {totalCount}
              </Text>
            </>
          ) : (
            <Text as='span' className="text-base font-normal text-neutral-alpha-11 leading-6 ml-1.5">
              Members
            </Text>
          )}
        </div>

        {/* Attendance Badge - only for completed */}
        {isCompleted && attendancePercentage !== undefined && (
          <div className="flex items-center px-2 py-1 bg-success-alpha-3 rounded-full">
            <Text as='span' className="text-xs font-medium text-success-alpha-11 leading-4 tracking-wide">
              {attendancePercentage}% attended
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

interface ActionSectionProps {
  variant: StreamVariant;
  hasJoinUrl: boolean;
  timeUntilStart?: string;
  onJoin?: () => void;
  onRecording?: () => void;
}

function ActionSection({
  variant,
  hasJoinUrl,
  timeUntilStart,
  onJoin,
  onRecording,
}: ActionSectionProps) {
  if (variant === 'cancelled') {
    return null;
  }

  if (variant === 'completed') {
    return (
      <Button
        variant="ghost"
        onClick={onRecording}
        requireAuth={false}
        className="flex items-center gap-2 px-4 h-10 text-base font-normal text-blue-11 hover:bg-blue-11/10 rounded-full"
      >
        <span>Recording</span>
        <ArrowUpRight className="w-[18px] h-[18px]" />
      </Button>
    );
  }

  if (variant === 'live') {
    return (
      <Button
        variant="solid"
        onClick={onJoin}
        className="flex items-center gap-3 px-6 py-0 h-10 bg-neutral-12 hover:bg-[#3a3840] text-white text-base font-medium rounded-full"
      >
        <Video className="w-[18px] h-[18px]" fill="currentColor" />
        <span className='text-white'>
          Join Stream
        </span>
      </Button>
    );
  }

  if (variant === 'liveSoon') {
    return (
      <Button
        variant="solid"
        onClick={onJoin}
        disabled={!hasJoinUrl}
        className="flex items-center gap-3 px-6 py-0 h-10 bg-neutral-12 hover:bg-[#3a3840] text-white text-base font-medium rounded-full"
      >
        <Video className="w-[18px] h-[18px]" fill="currentColor" />
        <span>Join stream</span>
      </Button>
    );
  }

  // Upcoming variant - no action button
  return null;
}

// ============================================
// Main Component
// ============================================

export function StreamCard({
  stream,
  onEdit,
  onCancel,
  onJoin,
  onCopyLink,
  onViewDetails,
  className,
}: StreamCardProps) {
  const variant = getStreamVariant(stream);
  const scheduledDate = new Date(stream.scheduledStartAt);
  const timeUntilStart = getTimeUntilStart(stream.scheduledStartAt);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const startTime = formatTime(scheduledDate);
  const endTime = formatTime(new Date(stream.scheduledEndAt));

  const handleJoin = React.useCallback(() => {
    onJoin?.(stream.id);
  }, [onJoin, stream.id]);

  const handleRecording = React.useCallback(() => {
    // TODO: Implement recording playback
    console.log('View recording for stream:', stream.id);
  }, [stream.id]);

  // Card styles based on variant
  const isLive = variant === 'live';
  const isLiveSoon = variant === 'liveSoon';

  const cardStyles = cn(
    'flex items-center overflow-hidden rounded-3xl',
    {
      // Live: red border and gradient
      'border border-red-9 bg-gradient-to-r from-red-3 to-white': isLive,
      // Live Soon: gold border and gradient
      'border border-accent-9 bg-gradient-to-r from-accent-3 to-white':
        isLiveSoon,
      // Simple/Upcoming/Completed: plain white with subtle border
      'border border-[rgba(1,1,46,0.13)] bg-white': !isLive && !isLiveSoon,
    },
    className,
  );

  // Mock data for completed streams - in real implementation, get from stream object
  const isCompleted = variant === 'completed';
  const attendedCount = stream.totalAttended;
  const totalCount = stream.totalMembers;

  const attendancePercentage = useMemo(() => {
    return isCompleted && totalCount > 0
      ? Math.round((attendedCount / totalCount) * 100)
      : undefined;
  }, [isCompleted, attendedCount, totalCount]);

  return (
    <div className={cardStyles}>
      {/* Date Section */}
      <DateSection date={scheduledDate} variant={variant} />

      {/* Content Section */}
      <div className="flex flex-1 justify-between items-center py-4 max-w-[90.33%]">
        <div
          className={cn(
            'flex flex-col gap-2 items-start pl-4 pr-12 w-[46.87%]',
            !isLive && !isLiveSoon && 'border-l border-neutral-alpha-4',
          )}
        >
          <div className="flex flex-col gap-2 items-start justify-center w-full">
            {/* Status Badge */}
            <StatusBadge variant={variant} />

            {/* Title */}
            <Tooltip delayDuration={1500}>
              <TooltipTrigger className='w-full text-left truncate'>
                <Text as='h3'
                  className={cn(
                    'text-xl font-semibold text-neutral-12 leading-7 tracking-tight w-fit max-w-[calc(100%-4px-12px)] text-ellipsis overflow-hidden',
                    variant === 'cancelled' && 'text-muted-foreground line-through',
                  )}
                >
                  {stream.title}
                </Text>
              </TooltipTrigger>
              <TooltipContent align="start">
                <Text className='text-white'>{stream.title}</Text>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Time */}
          <Text as='span' className="text-base font-normal text-neutral-12 leading-6">
            {startTime} - {endTime}
          </Text>
        </div>

        {/* Members Section */}
        <div className="shrink-0">
          <MemberAvatars
            count={isCompleted ? attendedCount : totalCount}
            totalCount={isCompleted ? totalCount : undefined}
            attendancePercentage={attendancePercentage}
            variant={variant}
          />
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-2.5 ml-auto px-4 shrink-0 w-[25.39%] justify-end">
          <ActionSection
            variant={variant}
            hasJoinUrl={stream.hasJoinUrl}
            timeUntilStart={timeUntilStart}
            onJoin={handleJoin}
            onRecording={handleRecording}
          />

          <StreamCardDropdown
            streamId={stream.id}
            onEdit={onEdit}
            onCancel={onCancel}
            onCopyLink={onCopyLink}
            onViewDetails={onViewDetails}
            isLive={isLive}
          />
        </div>
      </div>
    </div>
  );
}
