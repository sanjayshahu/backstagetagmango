'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthGate } from '@/lib/auth-gate-context';
import { cn } from '@/lib/utils';
import { Text } from './ui/text';

interface LoggedOutCTAProps {
  /** Scroll threshold in pixels before showing the CTA. @default 300 */
  scrollThreshold?: number;
  className?: string;
}

/**
 * A sticky bottom CTA that shows when user is logged out and has scrolled past threshold.
 * Displays "You're viewing free content. Sign up to continue & engage." message
 * with a "Join for Free" button that opens the login modal.
 *
 * Edge case handling: If the page doesn't have enough content to scroll past the threshold,
 * the CTA will appear after a 1.5 second delay instead.
 */
export function LoggedOutCTA({
  scrollThreshold = 300,
  className,
}: LoggedOutCTAProps) {
  const { openLoginModal } = useAuthGate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let hasShownByTimer = false;

    const canScrollThreshold = () => {
      return (
        document.documentElement.scrollHeight >
        window.innerHeight + scrollThreshold
      );
    };

    const handleScroll = () => {
      if (canScrollThreshold()) {
        setIsVisible(window.scrollY > scrollThreshold);
      }
    };

    const handleResize = () => {
      // Only check scroll visibility, don't touch timer
      if (canScrollThreshold()) {
        handleScroll();
      } else if (!hasShownByTimer && !delayTimer) {
        // Page became too short and no timer running - start one
        delayTimer = setTimeout(() => {
          hasShownByTimer = true;
          setIsVisible(true);
        }, 1500);
      }
    };

    // Initial setup
    if (canScrollThreshold()) {
      handleScroll();
    } else {
      // Start timer for short pages
      delayTimer = setTimeout(() => {
        hasShownByTimer = true;
        setIsVisible(true);
      }, 1500);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (delayTimer) {
        clearTimeout(delayTimer);
      }
    };
  }, [scrollThreshold]);

  return (
    <div
      className={cn(
        'sticky bottom-0 z-40 w-full view-content-cat-gradient',
        'px-4 pb-8 pt-25 pb-safe',
        'transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        className,
      )}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <div className="space-y-2">
          <Text as='h3' className="text-2xl font-bold text-black text-center">
            You're viewing free content.
          </Text>
          <Text as='h6' className="text-sm font-normal text-black text-center">
            Sign up to continue & engage.
          </Text>
        </div>

        <Button
          className="w-full h-12 text-md"
          onClick={openLoginModal}
          requireAuth={false}
        >
          Join for Free
        </Button>
      </div>
    </div>
  );
}
