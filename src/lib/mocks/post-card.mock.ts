import { PostCardProps } from '@/components/feed/post-card';

export const mockPostCard: PostCardProps = {
  postId: 'post-1',
  authorId: 'author-1',
  stageId: 'stage-1',

  author: {
    name: 'John Doe',
    avatarUrl: '',
  },

  timestamp: new Date().toISOString(),

  content:
    'This is a dummy subscriber-only post. Used purely for UI development.',

  media: [],

  reactions: [
    { emoji: '🔥', count: 3 },
    { emoji: '❤️', count: 7 },
  ],

  commentsCount: 2,

  userReaction: null,

  passes: [
    {
      id: 'pass-1',
      name: 'Gold Pass',
      isGroundPass: false,
    } as any, // ✔ acceptable for UI-only assignment
  ],

  isPinned: false,
};
