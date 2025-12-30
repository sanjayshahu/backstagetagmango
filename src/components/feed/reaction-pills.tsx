'use client';

import * as React from 'react';
import { Smile } from 'lucide-react';

import { cn, toReadableLargeNumber } from '@/lib/utils';
import { Button } from '../ui/button';

// ============================================================================
// Constants
// ============================================================================

const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '😡'] as const;
export type ReactionEmoji = (typeof REACTION_EMOJIS)[number];

// Long press duration in ms
const LONG_PRESS_DURATION = 500;

// ============================================================================
// Type Definitions
// ============================================================================

export interface ReactionData {
  emoji: string;
  count: number;
}

export interface ReactionPillsProps {
  reactions: ReactionData[];
  userReaction?: string | null;
  totalCount: number;
  onReact?: (emoji: string, position: { x: number; y: number }) => void;
  onUnreact?: () => void;
  onOpenReactionList?: () => void;
  className?: string;
}

// ============================================================================
// Animation Styles
// ============================================================================

const ANIMATION_STYLES = `
  @keyframes fly-to-pill {
    0% {
      opacity: 1;
      transform: translate(var(--start-x), var(--start-y)) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5 - 20px)) scale(1.3);
    }
    100% {
      opacity: 1;
      transform: translate(var(--end-x), var(--end-y)) scale(1);
    }
  }

  @keyframes emoji-highlight-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(190, 124, 0, 0.6);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(190, 124, 0, 0.3);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(190, 124, 0, 0);
    }
  }

  @keyframes picker-bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.08);
      opacity: 1;
    }
    70% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes emoji-bounce {
    0% {
      transform: scale(0) translateY(10px);
      opacity: 0;
    }
    60% {
      transform: scale(1.1) translateY(-2px);
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

// ============================================================================
// Sub-components
// ============================================================================

interface EmojiButtonProps {
  emoji: string;
  index: number;
  onSelect: (emoji: string, rect: DOMRect) => void;
}

function EmojiButton({ emoji, index, onSelect }: EmojiButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = React.useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      onSelect(emoji, rect);
    }
  }, [emoji, onSelect]);

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      className="flex items-center justify-center size-6 rounded-full bg-transparent hover:bg-transparentm transition-all duration-200 hover:scale-135"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
      aria-label={`React with ${emoji}`}
    >
      <span className="text-2xl leading-none select-none">{emoji}</span>
    </Button>
  );
}

interface ReactionPickerProps {
  isOpen: boolean;
  onSelect: (emoji: string, rect: DOMRect) => void;
  onClose: () => void;
  toggleButtonRef?: React.RefObject<HTMLDivElement | null>;
}

function ReactionPicker({
  isOpen,
  onSelect,
  onClose,
  toggleButtonRef,
}: ReactionPickerProps) {
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !toggleButtonRef?.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className={cn(
        'absolute bottom-full left-0 mb-2 z-50 h-15.5',
        'flex items-center gap-2 p-2',
        'bg-neutral-1 border border-neutral-3 rounded-full',
        'shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08),0px_12px_32px_-16px_rgba(48,0,64,0.06)]',
        'animate-[picker-bounce-in_250ms_ease-out_forwards]',
        'origin-bottom-left',
      )}
      role="menu"
      aria-label="Reaction picker"
    >
      {REACTION_EMOJIS.map((emoji, index) => (
        <div
          key={emoji}
          className="animate-[emoji-bounce_300ms_ease-out_forwards] bg-neutral-3 rounded-full size-[46px] flex items-center justify-center"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <EmojiButton emoji={emoji} index={index} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}

interface SmileyButtonProps {
  onClick: () => void;
}

function SmileyButton({ onClick }: SmileyButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="icon"
      className="size-8"
      aria-label="Add reaction"
    >
      <Smile className="size-4 text-neutral-4 stroke-black" />
    </Button>
  );
}

interface ReactionsCountPillProps {
  reactions: ReactionData[];
  userReaction?: string | null;
  totalCount: number;
  isAnimatingEmoji?: boolean;
  onClick: () => void;
  onLongPress: () => void;
}

function ReactionsCountPill({
  reactions,
  userReaction,
  totalCount,
  isAnimatingEmoji,
  onClick,
  onLongPress,
}: ReactionsCountPillProps) {
  const longPressTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = React.useRef(false);

  // Sort reactions to put user's reaction first
  const sortedReactions = React.useMemo(() => {
    if (!userReaction) return reactions;

    const sorted = [...reactions];
    sorted.sort((a, b) => {
      if (a.emoji === userReaction) return -1;
      if (b.emoji === userReaction) return 1;
      return 0;
    });
    return sorted;
  }, [reactions, userReaction]);

  // Get unique emojis to display (max 5)
  const displayEmojis = sortedReactions.slice(0, 5).map((r) => r.emoji);

  const handleTouchStart = React.useCallback(() => {
    isLongPressRef.current = false;
    longPressTimeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress();
    }, LONG_PRESS_DURATION);
  }, [onLongPress]);

  const handleTouchEnd = React.useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    // Only trigger onClick if it wasn't a long press
    if (!isLongPressRef.current) {
      onClick();
    }
  }, [onClick]);

  const handleMouseDown = React.useCallback(() => {
    isLongPressRef.current = false;
    longPressTimeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress();
    }, LONG_PRESS_DURATION);
  }, [onLongPress]);

  const handleMouseUp = React.useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  const handleClick = React.useCallback(() => {
    // Only trigger if it wasn't a long press
    if (!isLongPressRef.current) {
      onClick();
    }
  }, [onClick]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        'flex items-center gap-0.5 h-8 px-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors',
        userReaction,
      )}
      aria-label={userReaction ? 'Remove your reaction' : 'View all reactions'}
    >
      {displayEmojis.map((emoji, i) => {
        const isUserEmoji = emoji === userReaction;
        const isFirstUserEmoji = isUserEmoji && i === 0;

        return (
          <div
            key={`${emoji}-${i}`}
            className={cn(
              'text-base leading-6 flex items-center justify-center',
              isFirstUserEmoji &&
              'size-6 rounded-full bg-accent-3 border border-accent-alpha-8',
              isFirstUserEmoji &&
              isAnimatingEmoji &&
              'animate-[emoji-highlight-pulse_500ms_ease-out]',
            )}
          >
            {emoji}
          </div>
        );
      })}
      <div className="text-sm font-medium text-black ml-0.5">{toReadableLargeNumber(totalCount)}</div>
    </Button>
  );
}

interface FlyingEmojiProps {
  emoji: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
}

function FlyingEmoji({
  emoji,
  startX,
  startY,
  endX,
  endY,
  onComplete,
}: FlyingEmojiProps) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed z-100 text-2xl leading-none pointer-events-none"
      style={
        {
          left: startX,
          top: startY,
          '--start-x': '0px',
          '--start-y': '0px',
          '--end-x': `${endX - startX}px`,
          '--end-y': `${endY - startY}px`,
          animation: 'fly-to-pill 400ms ease-out forwards',
        } as React.CSSProperties
      }
    >
      {emoji}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

function ReactionPills({
  reactions,
  userReaction,
  totalCount,
  onReact,
  onUnreact,
  onOpenReactionList,
  className,
}: ReactionPillsProps) {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [flyingEmoji, setFlyingEmoji] = React.useState<{
    emoji: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [isAnimatingEmoji, setIsAnimatingEmoji] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const countPillRef = React.useRef<HTMLDivElement>(null);
  const smileyButtonRef = React.useRef<HTMLDivElement>(null);

  const closePicker = React.useCallback(() => {
    setIsPickerOpen(false);
  }, []);

  const handleSmileyClick = React.useCallback(() => {
    setIsPickerOpen((prev) => !prev);
  }, []);

  const handleSelectEmoji = React.useCallback(
    (emoji: string, pickerEmojiRect: DOMRect) => {
      closePicker();

      // Calculate animation positions
      const startX = pickerEmojiRect.left + pickerEmojiRect.width / 2 - 12;
      const startY = pickerEmojiRect.top + pickerEmojiRect.height / 2 - 12;

      // Target is the count pill position
      let endX = startX;
      let endY = startY + 50;

      if (countPillRef.current) {
        const pillRect = countPillRef.current.getBoundingClientRect();
        endX = pillRect.left + 12;
        endY = pillRect.top + pillRect.height / 2 - 12;
      } else if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        endX = containerRect.left + 40;
        endY = containerRect.top + 16 - 12;
      }

      // Start flying animation
      setFlyingEmoji({ emoji, startX, startY, endX, endY });

      // Trigger the reaction callback with position
      onReact?.(emoji, { x: startX, y: startY });
    },
    [closePicker, onReact],
  );

  const handleFlyingComplete = React.useCallback(() => {
    setFlyingEmoji(null);
    setIsAnimatingEmoji(true);

    // Reset animation state after it completes
    setTimeout(() => {
      setIsAnimatingEmoji(false);
    }, 500);
  }, []);

  const handleCountPillClick = React.useCallback(() => {
    if (userReaction) {
      // User has reacted - unreact
      onUnreact?.();
    } else {
      // User has not reacted - open reaction list
      onOpenReactionList?.();
    }
  }, [userReaction, onUnreact, onOpenReactionList]);

  const handleCountPillLongPress = React.useCallback(() => {
    // Always open reaction list on long press
    onOpenReactionList?.();
  }, [onOpenReactionList]);

  const hasReactions = totalCount > 0;
  const showSmileyButton = !userReaction;

  return (
    <>
      <style>{ANIMATION_STYLES}</style>

      <div
        ref={containerRef}
        className={cn('relative flex items-center gap-1', className)}
      >
        {/* Reaction Picker */}
        <ReactionPicker
          isOpen={isPickerOpen}
          onSelect={handleSelectEmoji}
          onClose={closePicker}
          toggleButtonRef={smileyButtonRef}
        />

        {/* Reactions Count Pill */}
        {hasReactions && (
          <div ref={countPillRef}>
            <ReactionsCountPill
              reactions={reactions}
              userReaction={userReaction}
              totalCount={totalCount}
              isAnimatingEmoji={isAnimatingEmoji}
              onClick={handleCountPillClick}
              onLongPress={handleCountPillLongPress}
            />
          </div>
        )}

        {/* Smiley Button - shown when user has NOT reacted */}
        {showSmileyButton && (
          <div ref={smileyButtonRef}>
            <SmileyButton onClick={handleSmileyClick} />
          </div>
        )}
      </div>

      {/* Flying Emoji Animation */}
      {flyingEmoji && (
        <FlyingEmoji
          emoji={flyingEmoji.emoji}
          startX={flyingEmoji.startX}
          startY={flyingEmoji.startY}
          endX={flyingEmoji.endX}
          endY={flyingEmoji.endY}
          onComplete={handleFlyingComplete}
        />
      )}
    </>
  );
}

export { ReactionPills, REACTION_EMOJIS };
