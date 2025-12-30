'use client';

import { PassCard, type PassCardProps } from '@/components/pass/pass-card';

// ============================================
// Types & Interfaces
// ============================================
export interface PassDetailsProps {
  pass: Omit<PassCardProps, 'onJoinPass'>;
  onJoinPass?: () => void;
}

// ============================================
// Component
// ============================================
export function PassDetails({
  pass,
  onJoinPass,
}: PassDetailsProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop: Full page with gradient background */}
      {/* Mobile: Card only, no background */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-8
          bg-transparent
          md:bg-linear-to-br md:from-[#8B7BAA] md:via-[#9B8ABB] md:to-[#7A6A99]"
      >

        {/* Pass card */}
        <PassCard {...pass} onJoinPass={onJoinPass} />
      </div>
    </div>
  );
}
