/**
 * ARCHIVED MOCK DATA - DO NOT USE IN PRODUCTION
 *
 * This file contains mock video call data that was previously used for development.
 * It is kept for reference and potential future testing purposes.
 */

import type { VideoCallResponseDto } from '@backstage-pass/api';

/**
 * Simulate network latency for mock data
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate mock video call data for a specific variant
 */
export function createMockVideoCall(
  id: string,
  title: string,
  status: 'scheduled' | 'live' | 'ended' | 'cancelled',
  scheduledStartAt: Date,
  scheduledEndAt: Date,
  options?: {
    actualStartAt?: Date;
    actualEndAt?: Date;
    hasJoinUrl?: boolean;
  }
): VideoCallResponseDto {
  return {
    id,
    stageId: 'mock_stage_1',
    title,
    description: { text: `Description for ${title}` } as unknown as object,
    scheduledStartAt: scheduledStartAt.toISOString(),
    scheduledEndAt: scheduledEndAt.toISOString(),
    actualStartAt: options?.actualStartAt
      ? ({ value: options.actualStartAt.toISOString() } as unknown as object)
      : undefined,
    actualEndAt: options?.actualEndAt
      ? ({ value: options.actualEndAt.toISOString() } as unknown as object)
      : undefined,
    status,
    hasJoinUrl: options?.hasJoinUrl ?? status === 'live',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      id: 'mock_user_1',
      name: 'Sarah Chen',
      image: null as unknown as object,
    },
    passes: [
      { id: 'mock_pass_ground', name: 'Free Pass' },
      { id: 'mock_pass_premium', name: 'Premium Pass' },
    ],
    totalMembers: 150,
    totalAttended: 42,
    promoSubscribersImages: [],
  };
}

/**
 * Generate mock streams for all variants
 */
export function generateMockStreams(): {
  live: VideoCallResponseDto[];
  liveSoon: VideoCallResponseDto[];
  upcoming: VideoCallResponseDto[];
  completed: VideoCallResponseDto[];
  cancelled: VideoCallResponseDto[];
} {
  const now = new Date();

  // Live streams (started 20-40 min ago)
  const live: VideoCallResponseDto[] = [
    createMockVideoCall(
      'vc_live_1',
      'Live Q&A: Building Your First App',
      'live',
      new Date(now.getTime() - 25 * 60 * 1000),
      new Date(now.getTime() + 35 * 60 * 1000),
      {
        actualStartAt: new Date(now.getTime() - 23 * 60 * 1000),
        hasJoinUrl: true,
      }
    ),
    createMockVideoCall(
      'vc_live_2',
      'Live Workshop: Design Systems Deep Dive',
      'live',
      new Date(now.getTime() - 40 * 60 * 1000),
      new Date(now.getTime() + 20 * 60 * 1000),
      {
        actualStartAt: new Date(now.getTime() - 38 * 60 * 1000),
        hasJoinUrl: true,
      }
    ),
  ];

  // Live soon streams (starting in 5-25 min)
  const liveSoon: VideoCallResponseDto[] = [
    createMockVideoCall(
      'vc_soon_1',
      'Starting Soon: TypeScript Patterns',
      'scheduled',
      new Date(now.getTime() + 10 * 60 * 1000),
      new Date(now.getTime() + 70 * 60 * 1000),
      { hasJoinUrl: true }
    ),
    createMockVideoCall(
      'vc_soon_2',
      'Starting Soon: React Performance Tips',
      'scheduled',
      new Date(now.getTime() + 20 * 60 * 1000),
      new Date(now.getTime() + 80 * 60 * 1000),
      { hasJoinUrl: true }
    ),
  ];

  // Upcoming streams (tomorrow to next month)
  const upcoming: VideoCallResponseDto[] = [
    createMockVideoCall(
      'vc_upcoming_1',
      'Weekly Community Call',
      'scheduled',
      new Date(now.getTime() + 24 * 60 * 60 * 1000),
      new Date(now.getTime() + 25 * 60 * 60 * 1000),
      { hasJoinUrl: false }
    ),
    createMockVideoCall(
      'vc_upcoming_2',
      'AMA with Industry Expert',
      'scheduled',
      new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      { hasJoinUrl: false }
    ),
    createMockVideoCall(
      'vc_upcoming_3',
      'Monthly Retrospective',
      'scheduled',
      new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      { hasJoinUrl: false }
    ),
    createMockVideoCall(
      'vc_upcoming_4',
      'Advanced CSS Architecture Workshop',
      'scheduled',
      new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000),
      { hasJoinUrl: false }
    ),
  ];

  // Completed streams (ended 1-14 days ago)
  const completed: VideoCallResponseDto[] = [
    createMockVideoCall(
      'vc_completed_1',
      'Recording: Introduction to GraphQL',
      'ended',
      new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      {
        actualStartAt: new Date(
          now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000
        ),
        actualEndAt: new Date(
          now.getTime() - 2 * 24 * 60 * 60 * 1000 + 58 * 60 * 1000
        ),
      }
    ),
    createMockVideoCall(
      'vc_completed_2',
      'Recording: CSS Architecture Best Practices',
      'ended',
      new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      {
        actualStartAt: new Date(
          now.getTime() - 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000
        ),
        actualEndAt: new Date(
          now.getTime() - 7 * 24 * 60 * 60 * 1000 + 85 * 60 * 1000
        ),
      }
    ),
    createMockVideoCall(
      'vc_completed_3',
      'Recording: State Management Patterns',
      'ended',
      new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 + 75 * 60 * 1000),
      {
        actualStartAt: new Date(
          now.getTime() - 10 * 24 * 60 * 60 * 1000 + 1 * 60 * 1000
        ),
        actualEndAt: new Date(
          now.getTime() - 10 * 24 * 60 * 60 * 1000 + 72 * 60 * 1000
        ),
      }
    ),
  ];

  // Cancelled streams
  const cancelled: VideoCallResponseDto[] = [
    createMockVideoCall(
      'vc_cancelled_1',
      'Cancelled: Technical Workshop',
      'cancelled',
      new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      { hasJoinUrl: false }
    ),
  ];

  return { live, liveSoon, upcoming, completed, cancelled };
}

// Generate mock data once
export const MOCK_STREAMS = generateMockStreams();
