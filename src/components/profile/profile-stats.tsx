'use client';

import { toReadableLargeNumber } from "@/lib/utils";

interface ProfileStatsProps {
  subscribersCount: number;
  postsCount: number;
}

export function ProfileStats({
  subscribersCount,
  postsCount,
}: ProfileStatsProps) {
  return (
    <div className="flex items-center justify-end gap-4 relative">
      <div className="flex items-center gap-1">
        <h4 className="font-semibold text-neutral-12">
          {toReadableLargeNumber(subscribersCount)}
        </h4>
        <span className="text-neutral-alpha-11 ">Subscribers</span>
      </div>
      <span className="bg-neutral-alpha-6 h-4 w-px" />
      <div className="flex items-center gap-1">
        <h4 className="font-semibold text-neutral-12">
          {toReadableLargeNumber(postsCount)}
        </h4>
        <span className="text-neutral-alpha-11">Posts</span>
      </div>
    </div>
  );
}
