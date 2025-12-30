'use client';

import { forwardRef, memo } from 'react';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, formatPrice } from '@/lib/utils';
import type { PassResponseDto } from '@backstage-pass/api';
import { DotsVerticalSix } from '../icons/dots-vertical-six';
import { Separator } from '@/components/ui/separator';
import { Text } from '../ui/text';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { PASS_CARD_BASE_IMAGE, PASS_THEME_COLORS, PassImage, PassTheme } from './utils';

// Helper to map API pass to display data
export interface PassDisplayData {
  id: string;
  name: string;
  theme: PassTheme;
  price: string;
  priceType: 'free' | 'one-time' | 'monthly' | 'yearly';
  createdAt: Date;
  members: number;
  membersChange?: string;
  earnings?: number;
  earningsChange?: string;
  memberCount: number;
  visibility: 'hidden' | 'public';
  allowSubscriberPosting: boolean;
}

interface PassCardProps {
  pass: PassDisplayData;
  theme?: 'light' | 'dark';
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewMembers?: (id: string) => void;
  style?: React.CSSProperties;
  // Drag-related props for sortable functionality
  isDragging?: boolean;
  // Listeners go on the drag handle (button) only - from useSortable
  dragHandleListeners?: DraggableSyntheticListeners;
  // Attributes go on the card container for accessibility - from useSortable
  sortableAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

// Helper function to convert API PassResponseDto to PassDisplayData
export function mapPassToDisplayData(
  pass: PassResponseDto,
  stats?: {
    members?: number;
    membersChange?: string;
    earnings?: number;
    earningsChange?: string;
  },
): PassDisplayData {
  // Map API theme to supported themes (fallback to bronze for unsupported)
  const theme: PassTheme = pass.theme;

  // Determine price type from passType and recurringType
  let priceType: PassDisplayData['priceType'] = 'free';
  if (pass.passType === 'paid') {
    if (pass.recurringType === 'recurring') {
      // Check duration to determine monthly/yearly
      const days = pass.durationDays as number | null;
      priceType = days && days >= 365 ? 'yearly' : 'monthly';
    } else {
      priceType = 'one-time';
    }
  }

  // Extract price in USD cents
  const priceObj = pass.price as {
    usdCents?: number;
    inrPaise?: number;
  } | null;
  const formattedPrice = formatPrice({
    price: priceObj,
    priceType: pass.passType,
  });

  return {
    ...pass,
    id: pass.id,
    name: pass.name,
    theme,
    price: formattedPrice.formattedString,
    priceType,
    createdAt: new Date(pass.createdAt),
    members: stats?.members ?? 0,
    membersChange: stats?.membersChange,
    earnings: stats?.earnings,
    earningsChange: stats?.earningsChange,
    memberCount: pass.memberCount || 0,
  };
}

function getPriceLabel(priceType: PassDisplayData['priceType']) {
  switch (priceType) {
    case 'free':
      return '';
    case 'one-time':
      return 'One-time';
    case 'monthly':
      return '/month';
    case 'yearly':
      return '/year';
    default:
      return '';
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// PassCard component with forwardRef for drag-and-drop support
// Uses GPU-accelerated transforms (translate3d) for 60fps animations
export const PassCard = memo(
  forwardRef<HTMLDivElement, PassCardProps>(function PassCard(
    {
      pass,
      onClick,
      onEdit,
      onDelete,
      onViewMembers,
      style,
      isDragging = false,
      dragHandleListeners,
      sortableAttributes,
    },
    ref,
  ) {

    const isFree = pass.priceType === 'free';

    const handleCardClick = (e: React.MouseEvent) => {
      console.log(`[PassCard] ${pass.id} onClick:`, {
        target: (e.target as HTMLElement).tagName,
        targetClass: (e.target as HTMLElement).className,
      });
      // Don't navigate if clicking on interactive elements (buttons, menus, or drag handle)
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('[role="menu"]') ||
        target.closest('[role="button"]')
      ) {
        return;
      }
      onClick?.(pass.id);
    };

    // Debug: Log pointer events
    const handlePointerDown = (e: React.PointerEvent) => {
      console.log(`[PassCard] ${pass.id} onPointerDown:`, {
        target: (e.target as HTMLElement).tagName,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        button: e.button,
        isPrimary: e.isPrimary,
      });
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      // Only log during drag (when button is pressed)
      if (e.buttons > 0) {
        console.log(`[PassCard] ${pass.id} onPointerMove (dragging):`, {
          clientX: e.clientX,
          clientY: e.clientY,
        });
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      console.log(`[PassCard] ${pass.id} onPointerUp`);
    };

    const isPublicPass = pass.visibility === 'public';

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'passes-cards-rounded-cut h-46 overflow-hidden flex w-full rounded-3xl gap-0',
          // GPU-accelerated transform layer for smooth animations
          'will-change-transform',
          // Smooth transition for neighboring items during drag reorder
          'transition-transform duration-250 ease-[cubic-bezier(0.25,1,0.5,1)]',
          // Elevation effect when dragging: scale up + shadow
          isDragging &&
          'scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-50',
          // Hide the original item when using DragOverlay
          isDragging && 'opacity-0',
        )}
        onClick={handleCardClick}
        onPointerDownCapture={handlePointerDown}
        onPointerMoveCapture={handlePointerMove}
        onPointerUpCapture={handlePointerUp}
        // Sortable attributes for accessibility (role, tabIndex, aria-*)
        {...sortableAttributes}
        // Drag listeners on the entire card - drag handle icon is just visual indicator
        {...dragHandleListeners}
      >
        {/* LEFT */}
        <div className="left w-89 relative h-full overflow-hidden border border-neutral-6 border-r-0 rounded-l-3xl">
          <PassImage theme={pass.theme} url={PASS_CARD_BASE_IMAGE} className='absolute inset-0' />
          {/* over content */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-start">
            {/* Drag handle visual indicator */}
            <div className="px-3 py-4 bg-neutral-alpha-3 w-14 flex items-center justify-center cursor-grab touch-none">
              <DotsVerticalSix className="w-5 text-[#fff]" />
            </div>
            <div className="h-full flex items-center px-6 py-3">
              <div className="flex flex-col gap-3 text-[#fff]">
                <h2 className="text-2xl font-semibold  text-[#fff]">
                  {pass.name}
                </h2>
                <h2 className="text-2xl font-semibold text-[#fff]">
                  {pass.price}
                </h2>
                {!isFree && (
                  <span className="text-sm text-[#fff] font-normal leading-5">
                    {getPriceLabel(pass.priceType)}
                  </span>
                )}
                <span className="font-sm font-normal text-[rgba(245,241,255,0.72)]">
                  Created on {formatDate(pass.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex items-center relative px-6 py-4 border border-neutral-6 border-l-0 rounded-r-3xl">
          <div className="flex justify-between gap-3 items-center text-white w-full">
            <div className="space-y-3">
              <h5 className="text-base font-normal text-black">Members</h5>
              <h2 className="text-[28px] font-semibold leading-7 text-black">
                {pass.memberCount}
              </h2>
              {pass.membersChange && (
                <span className="text-sm text-success-10 font-medium flex items-center gap-1">
                  <TrendingUp />
                  {pass.membersChange}
                </span>
              )}
              {pass.allowSubscriberPosting && <TooltipProvider>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2 text-sm rounded-lg bg-neutral-alpha-3 px-2 py-1 text-neutral-11 border border-neutral-5 mt-2">
                      <Text as="span" className="text-xs font-light text-neutral-12"> <Text as="span" className="text-xs font-light text-neutral-11 mr-1"> ✅ </Text>Posting is enabled for users</Text>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Members of this pass can post in the backstage feed.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}
            </div>
            {!isFree && pass.earnings !== undefined && (
              <div className="space-y-3">
                <h5 className="text-base font-normal Earnings">Earnings</h5>
                <h2 className="text-[28px] font-semibold leading-7 Earnings">
                  {pass.price}
                </h2>

                <span className="text-sm text-success-10 font-medium flex items-center gap-1">
                  <TrendingUp />
                  {pass.earningsChange}
                </span>
              </div>
            )}

            {/* Actions menu */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  requireAuth={false}
                  className={cn(
                    'hover:bg-black/10 rounded-full w-10 h-10 border-none outline-none ring-0! [&_svg:not([class*="size-"])]:size-6!',
                  )}
                >
                  <MoreHorizontal className="w-6 h-6 text-black" size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="px-0 space-y-2 bg-neutral-1 border-neutral-3 outline-none rounded-2xl text-black min-w-50"
              >
                <div className="px-3 space-y-2">
                  <DropdownMenuItem
                    onClick={() => onEdit?.(pass.id)}
                    className="hover:bg-neutral-alpha-2 px-3"
                  >
                    Edit pass
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onViewMembers?.(pass.id)}
                    className="hover:bg-neutral-alpha-2 px-3"
                  >
                    View details
                  </DropdownMenuItem>
                </div>

                <Separator className="bg-neutral-alpha-3" />

                <div className="px-3 flex flex-col gap-1">
                  <DropdownMenuItem
                    onClick={() => onDelete?.(pass.id)}
                    className={`hover:bg-neutral-alpha-2 ${isPublicPass && 'text-error-10'} px-3 border-top border-neutral-alpha-3`}
                  >
                    {isPublicPass ? 'Unpublish' : 'Publish'}
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className={cn(
            'absolute top-0 right-0 w-[70%] h-full -z-10',
          )}
          style={{
            background: `linear-gradient(90deg, ${PASS_THEME_COLORS[pass.theme].gradient[0]} 0%, ${PASS_THEME_COLORS[pass.theme].gradient[1]} 100%)`
          }}
        />
      </div>
    );
  }),
);

// ============================================================================
// SORTABLE PASS CARD WRAPPER
// Uses @dnd-kit/sortable for smooth drag-and-drop reordering
// ============================================================================

interface SortablePassCardProps {
  pass: PassDisplayData;
  theme?: 'light' | 'dark';
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewMembers?: (id: string) => void;
}

/**
 * Helper function to construct GPU-accelerated transform string.
 * Uses translate3d() instead of translate() to trigger GPU compositing layer,
 * ensuring 60fps animations without layout thrashing.
 */
function getGpuAcceleratedTransform(
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null,
): string | undefined {
  if (!transform) return undefined;

  const { x, y, scaleX, scaleY } = transform;

  // Use translate3d for GPU acceleration - the Z value of 0 triggers compositing
  // Only include scale if it's not 1 (default) to reduce string length
  if (scaleX !== 1 || scaleY !== 1) {
    return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) scale(${scaleX}, ${scaleY})`;
  }

  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}

/**
 * SortablePassCard - Wrapper component that integrates PassCard with @dnd-kit.
 *
 * Smoothness features:
 * - GPU-accelerated transforms via translate3d()
 * - will-change: transform for browser optimization hints
 * - 250ms cubic-bezier transitions for neighbor displacement
 * - Drag handle on the 6-dot icon for precise control
 * - Keyboard accessible (Tab to focus, Space/Enter to pick up, Arrow keys to move)
 *
 * Usage: Wrap in DndContext + SortableContext in parent component.
 * The parent should handle onDragEnd to persist the new order.
 */
export const SortablePassCard = memo(function SortablePassCard({
  pass,
  theme,
  onClick,
  onEdit,
  onDelete,
  onViewMembers,
}: SortablePassCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: pass.id,
    // Smooth transition when dropping - ensures card animates to final position
    transition: {
      duration: 250,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  // Construct inline styles for the drag transform
  // Using custom GPU-accelerated transform instead of CSS.Transform.toString()
  const computedTransform = getGpuAcceleratedTransform(transform);

  const style: React.CSSProperties = {
    transform: computedTransform,
    transition,
    // Ensure dragging item stays on top during the drag operation
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <PassCard
      ref={setNodeRef}
      pass={pass}
      theme={theme}
      onClick={onClick}
      onEdit={onEdit}
      onDelete={onDelete}
      onViewMembers={onViewMembers}
      style={style}
      isDragging={isDragging}
      // Attributes (role, tabIndex, aria-*) go on the card for accessibility
      sortableAttributes={attributes as React.HTMLAttributes<HTMLDivElement>}
      // Listeners (onPointerDown, onKeyDown) go only on the drag handle
      dragHandleListeners={listeners}
    />
  );
});

/**
 * DragOverlayPassCard - Simplified card for the drag overlay.
 * Shows elevated visual feedback without interactivity.
 */
export const DragOverlayPassCard = memo(function DragOverlayPassCard({
  pass,
  theme,
}: {
  pass: PassDisplayData;
  theme?: 'light' | 'dark';
}) {
  return (
    <div
      className="scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.2)] will-change-transform"
      style={{ cursor: 'grabbing' }}
    >
      <PassCard pass={pass} theme={theme} />
    </div>
  );
});
