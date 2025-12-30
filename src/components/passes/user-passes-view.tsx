'use client';

import { Ticket } from 'lucide-react';
import type { PassResponseDto } from '@backstage-pass/api';

import { UserPassCard } from './user-pass-card';
import { EmptyState } from '@/components/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

// ============================================
// Types
// ============================================
export interface UserPassesViewProps {
  passes: PassResponseDto[];
  slug: string;
  isLoading?: boolean;
}

// ============================================
// Loading Skeleton
// ============================================
function PassCardSkeleton() {
  return <Skeleton className="h-48 w-full rounded-2xl" />;
}

// ============================================
// Main Component
// ============================================
export function UserPassesView({
  passes,
  slug,
  isLoading = false,
}: UserPassesViewProps) {
  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <PassCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show empty state if no passes
  if (!passes || passes.length === 0) {
    return (
      <EmptyState
        icon={<Ticket className="w-8 h-8 text-muted-foreground" />}
        title="No passes available"
        description="This creator hasn't published any passes yet. Check back later!"
      />
    );
  }

  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
    <defs>
      <mask id="ticket-mask">
        <rect width="100%" height="100%" fill="white" />

        <circle cx="0" cy="50%" r="14" fill="black" />

        <circle cx="100%" cy="50%" r="14" fill="black" />
      </mask>
    </defs>
  </svg>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {passes.map((pass) => (
        <UserPassCard key={pass.id} pass={pass} slug={slug} />
      ))}
    </div>
  );
}
