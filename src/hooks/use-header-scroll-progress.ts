'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollPositionOptions {
  /** Scroll distance to trigger collapse (default: 150) */
  threshold?: number;
  /** Whether scroll tracking is enabled (default: true). Set to false to pause updates. */
  enabled?: boolean;
}

interface ScrollPositionState {
  /** Current scroll position (virtual or real) */
  scrollY: number;
  /** Whether header should be collapsed */
  isCollapsed: boolean;
  /** 0-1 progress for smooth interpolation */
  progress: number;
  /** Scroll direction */
  direction: 'up' | 'down' | null;
}

/**
 * Hook for tracking scroll position with virtual scroll during header collapse.
 * Prevents actual page scroll until header is fully collapsed to avoid feedback loops.
 *
 * @example
 * ```tsx
 * const { isCollapsed, progress } = useHeaderScrollProgress({ threshold: 150 });
 *
 * // Use progress for smooth CSS interpolation
 * style={{ opacity: 1 - progress }}
 * ```
 */
export function useHeaderScrollProgress(
  options: ScrollPositionOptions = {}
): ScrollPositionState {
  const { threshold = 150, enabled = true } = options;

  const [state, setState] = useState<ScrollPositionState>({
    scrollY: 0,
    isCollapsed: false,
    progress: 0,
    direction: null,
  });

  const virtualScroll = useRef(0);
  const isVirtualMode = useRef(true);
  const touchStartY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);

  const updateState = useCallback(
    (delta: number) => {
      const direction = delta > 0 ? 'down' : delta < 0 ? 'up' : null;
      if (direction) {
        lastDirection.current = direction;
      }

      // Update virtual scroll (clamped between 0 and threshold)
      virtualScroll.current = Math.max(
        0,
        Math.min(threshold, virtualScroll.current + delta)
      );

      const progress = virtualScroll.current / threshold;
      const isCollapsed = virtualScroll.current >= threshold;

      // Switch to real scroll mode when fully collapsed
      if (isCollapsed && delta > 0) {
        isVirtualMode.current = false;
      }

      setState((prev) => {
        if (
          prev.progress === progress &&
          prev.isCollapsed === isCollapsed &&
          prev.direction === lastDirection.current
        ) {
          return prev;
        }
        return {
          scrollY: virtualScroll.current,
          isCollapsed,
          progress,
          direction: lastDirection.current,
        };
      });
    },
    [threshold]
  );

  useEffect(() => {
    // Skip event listeners when disabled (e.g., when modal is open)
    if (!enabled) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      // Re-enter virtual mode when at top of page and scrolling up
      if (!isVirtualMode.current && window.scrollY <= 0 && e.deltaY < 0) {
        isVirtualMode.current = true;
        virtualScroll.current = threshold;
      }

      if (isVirtualMode.current) {
        e.preventDefault();
        updateState(e.deltaY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY; // Inverted: swipe up = positive delta
      touchStartY.current = touchY;

      // Re-enter virtual mode when at top of page and scrolling up
      if (!isVirtualMode.current && window.scrollY <= 0 && deltaY < 0) {
        isVirtualMode.current = true;
        virtualScroll.current = threshold;
      }

      if (isVirtualMode.current) {
        e.preventDefault();
        updateState(deltaY);
      }
    };

    const handleScroll = () => {
      if (!isVirtualMode.current) {
        const scrollY = window.scrollY;

        // When scrolled back to top, re-enter virtual mode
        if (scrollY <= 0) {
          isVirtualMode.current = true;
          virtualScroll.current = threshold; // Start from collapsed state
        }

        // Keep header collapsed during real scrolling
        setState((prev) => {
          if (prev.progress === 1 && prev.isCollapsed) {
            return prev;
          }
          return {
            scrollY: threshold + scrollY,
            isCollapsed: true,
            progress: 1,
            direction: lastDirection.current,
          };
        });
      }
    };

    // wheel and touchmove need { passive: false } to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, updateState, enabled]);

  return state;
}
