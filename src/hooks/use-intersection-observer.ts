'use client';

import { useEffect, useState, useCallback } from 'react';

export interface UseIntersectionObserverOptions {
  /**
   * A number or array of numbers between 0 and 1, indicating the percentage
   * of the target's visibility needed to trigger the callback.
   * @default 0
   */
  threshold?: number | number[];
  /**
   * The element used as the viewport for checking visibility.
   * Must be an ancestor of the target. Defaults to browser viewport if null.
   * @default null
   */
  root?: Element | null;
  /**
   * Margin around the root element. Can have values similar to CSS margin.
   * @default '0px'
   */
  rootMargin?: string;
  /**
   * If true, stops observing once the element becomes visible.
   * Useful for lazy loading images or one-time animations.
   * @default false
   */
  freezeOnceVisible?: boolean;
}

export interface UseIntersectionObserverReturn {
  /**
   * Callback ref to attach to the target element.
   * Use this instead of a regular ref for more flexibility.
   */
  ref: (node: Element | null) => void;
  /**
   * The full IntersectionObserverEntry for advanced use cases.
   * Contains boundingClientRect, intersectionRatio, etc.
   */
  entry: IntersectionObserverEntry | null;
  /**
   * Boolean indicating if the target is currently intersecting.
   * This is the most commonly used value for triggering actions.
   */
  isIntersecting: boolean;
}

/**
 * A React hook that wraps the native IntersectionObserver API.
 *
 * @example
 * ```tsx
 * // Basic infinite scroll
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   rootMargin: '100px',
 * });
 *
 * useEffect(() => {
 *   if (isIntersecting && hasNextPage) {
 *     fetchNextPage();
 *   }
 * }, [isIntersecting, hasNextPage, fetchNextPage]);
 *
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={ref} /> // Sentinel element
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<Element | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // Callback ref pattern for flexibility with conditional rendering
  const ref = useCallback((node: Element | null) => {
    setNode(node);
  }, []);

  useEffect(() => {
    // Skip if no node to observe or already frozen
    if (!node || frozen) return;

    // Check for browser support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, threshold, root, rootMargin, frozen]);

  return {
    ref,
    entry,
    isIntersecting: !!entry?.isIntersecting,
  };
}
