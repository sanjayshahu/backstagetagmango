'use client';

import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

/**
 * Calculates text size from a Tailwind size class
 * e.g., "size-16" → extracts 16, calculates text size
 */
function calculateTextSize(sizeClass: string): number {
  const match = sizeClass.match(/size-(\d+\.?\d*)/);
  if (!match) return 14;
  const textPx = Math.round(parseFloat(match[1]) * 1.4);
  return textPx;
}

export interface AvatarComponentProps {
  /** Image URL for the avatar */
  src?: string | null;
  /** Username for generating initials and alt text */
  username?: string;
  /** Tailwind size class (e.g., "size-8", "size-16", "size-24") */
  size?: string;
  /** Additional CSS classes for the root Avatar element */
  className?: string;
  /** Show skeleton loading state */
  loading?: boolean;
}

/**
 * Calculate initials from a username
 * - Splits on spaces, takes first char of each word
 * - Uppercase, max 2 characters
 * - Returns 'AU' (Anonymous User) if no name provided
 */
function getInitials(name?: string): string {
  if (!name || name.trim().length === 0) {
    return 'AU';
  }

  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AvatarComponent({
  src,
  username,
  size = 'size-8',
  className,
  loading,
}: AvatarComponentProps) {
  const initials = getInitials(username);
  const altText = username || 'User avatar';

  return (
    <Avatar loading={loading} className={cn(size, 'shrink-0', className)}>
      <AvatarImage src={src || undefined} alt={altText} />
      <AvatarFallback
        className={cn(
          'font-semibold',
          'bg-linear-to-br from-purple-500 to-purple-700 text-[#fff] shadow-lg'
        )}
        style={{
          fontSize: `${calculateTextSize(size)}px`
        }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

// Export utilities for advanced usage
export { getInitials, calculateTextSize };
