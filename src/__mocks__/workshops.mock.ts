/**
 * ARCHIVED MOCK DATA - DO NOT USE IN PRODUCTION
 *
 * This file contains mock workshop/call data that was previously used for development.
 * It is kept for reference and potential future testing purposes.
 */

import type { VideoCallResponseDto } from '@backstage-pass/api';

/**
 * Dummy workshop data for profile sidebar
 */
export const DUMMY_WORKSHOP: VideoCallResponseDto = {
  id: 'dummy-1',
  stageId: '',
  status: 'scheduled',
  hasJoinUrl: false,
  createdAt: '',
  passes: [],
  title: 'Sample Workshop',
  scheduledStartAt: new Date().toISOString(),
  scheduledEndAt: new Date(Date.now() + 3600 * 1000).toISOString(), // +1 hour
  author: {
    id: '',
    name: 'John Doe',
    image: '' as unknown as object,
  },
  totalMembers: 0,
  totalAttended: 0,
  promoSubscribersImages: [],
};

/**
 * Dummy call data for join call card
 */
export const DummyCallData: VideoCallResponseDto = {
  id: 'dummy-call',
  stageId: '',
  status: 'scheduled',
  hasJoinUrl: false,
  createdAt: '',
  passes: [],
  title: 'Sample Live Workshop',
  scheduledStartAt: new Date().toISOString(),
  scheduledEndAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1 hour
  author: {
    id: '',
    name: 'John Doe',
    image: '' as unknown as object,
  },
  totalMembers: 0,
  totalAttended: 0,
  promoSubscribersImages: [],
};
