'use client';

import * as React from 'react';
import { Modal } from '../modal';
import { AvatarComponent } from '../avatar-component';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Text } from '../ui/text';
import { Skeleton } from '../ui/skeleton';

import { useReactionList, filterReactionsByEmoji } from '@/hooks/use-reactions';
import type { ReactionUser } from '@/types/api';

interface ReactionsDetailsModalProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// -----------------------------------------------------------------------------
// Skeleton
// -----------------------------------------------------------------------------

function ReactionSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="avatar" className="size-10" />
            <Skeleton variant="text" className="h-4 w-32" />
          </div>
          <Skeleton variant="text" className="h-7 w-7" />
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// User Row
// -----------------------------------------------------------------------------

function ReactionUserRow({ user }: { user: ReactionUser }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <AvatarComponent
          src={user.userAvatar}
          username={user.userName}
          size="size-10"
        />

        <Text className="text-sm font-medium text-neutral-12 truncate">
          {user.userName || 'Anonymous User'}
        </Text>
      </div>

      <span className="text-[28px] leading-9">{user.emoji}</span>
    </li>
  );
}

// -----------------------------------------------------------------------------
// Main Modal
// -----------------------------------------------------------------------------

export function ReactionsDetailsModal({
  postId,
  open,
  onOpenChange,
}: ReactionsDetailsModalProps) {
  const { data, isLoading } = useReactionList(postId, {
    enabled: open,
  });

  const reactions = data?.reactions ?? [];
  const summary = data?.summary ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Reactions"
      className="overflow-hidden bg-white dark:bg-[#1A191B]"
      wrapperClassName="p-0"
    >
      <Tabs defaultValue="all" className="w-full">
        {/* ------------------------------------------------------------------ */}
        {/* Tabs Header */}
        {/* ------------------------------------------------------------------ */}
        <TabsList className="w-full justify-start gap-2 px-4 mt-4 pb-4">
          <TabsTrigger
            value="all"
            className=" 
      h-9 
      flex items-center gap-1
      px-3
      rounded-full
      text-neutral-12
      data-[state=active]:bg-neutral-12
      data-[state=active]:text-white cursor-pointer
    "
            activeClassName="bg-transparent shadow-none rounded-none"
          >
            All {totalCount}
          </TabsTrigger>

          {summary.map((item) => (
            <TabsTrigger
              key={item.emoji}
              value={item.emoji}
              className="
        h-9 
        flex items-center gap-1
        px-3
        rounded-full cursor-pointer
        text-neutral-12
        data-[state=active]:bg-neutral-12
        data-[state=active]:text-white
      "
              activeClassName="bg-transparent shadow-none rounded-none"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-base font-medium">{item.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ------------------------------------------------------------------ */}
        {/* All Reactions */}
        {/* ------------------------------------------------------------------ */}
        <TabsContent
          value="all"
          className="bg-neutral-2 px-4 py-3 max-h-[60vh] overflow-y-auto"
        >
          {isLoading ? (
            <ReactionSkeleton />
          ) : reactions.length === 0 ? (
            <Text className="text-sm text-neutral-6">No reactions yet</Text>
          ) : (
            <ul className="space-y-3">
              {reactions.map((user) => (
                <ReactionUserRow
                  key={`${user.userId}-${user.emoji}`}
                  user={user}
                />
              ))}
            </ul>
          )}
        </TabsContent>

        {/* ------------------------------------------------------------------ */}
        {/* Emoji Filtered Tabs */}
        {/* ------------------------------------------------------------------ */}
        {summary.map((item) => {
          const filtered = filterReactionsByEmoji(reactions, item.emoji);

          return (
            <TabsContent
              key={item.emoji}
              value={item.emoji}
              className="bg-neutral-2 px-4 py-3 max-h-[60vh] overflow-y-auto"
            >
              {isLoading ? (
                <ReactionSkeleton />
              ) : filtered.length === 0 ? (
                <Text className="text-sm text-neutral-6">No reactions yet</Text>
              ) : (
                <ul className="space-y-3">
                  {filtered.map((user) => (
                    <ReactionUserRow
                      key={`${user.userId}-${user.emoji}`}
                      user={user}
                    />
                  ))}
                </ul>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </Modal>
  );
}
