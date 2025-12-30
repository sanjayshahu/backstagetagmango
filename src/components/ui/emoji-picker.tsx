'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export interface EmojiPickerProps {
  /** Callback when an emoji is selected */
  onEmojiSelect: (emoji: EmojiData) => void;
  /** Trigger element for the picker */
  children: React.ReactNode;
  /** Display mode - 'popover' for dropdown, 'modal' for dialog */
  mode?: 'popover' | 'modal';
  /** Show search bar */
  showSearch?: boolean;
  /** Show recently used emojis */
  showRecent?: boolean;
  /** Show skin tone selector */
  showSkinTones?: boolean;
  /** Show category tabs/nav */
  showNavigation?: boolean;
  /** Show preview of selected emoji */
  showPreview?: boolean;
  /** Number of emojis per row */
  perLine?: number;
  /** Maximum number of frequently used emojis to show */
  maxFrequentRows?: number;
  /** Theme - 'light' or 'dark' */
  theme?: 'light' | 'dark';
  /** Custom categories to show (default: all) */
  categories?: string[];
  /** Popover side */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Popover alignment */
  align?: 'start' | 'center' | 'end';
  /** Additional class for popover content */
  contentClassName?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the picker */
  disabled?: boolean;
}

export function EmojiPicker({
  onEmojiSelect,
  children,
  mode = 'popover',
  showSearch = true,
  showRecent = true,
  showSkinTones = true,
  showNavigation = true,
  showPreview = true,
  perLine = 9,
  maxFrequentRows = 2,
  theme = 'light',
  categories,
  side = 'top',
  align = 'end',
  contentClassName,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
}: EmojiPickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Support both controlled and uncontrolled modes
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleEmojiSelect = (emoji: EmojiData) => {
    onEmojiSelect(emoji);
    // handleOpenChange(false);
  };

  const pickerElement = (
    <Picker
      data={data}
      onEmojiSelect={handleEmojiSelect}
      theme={theme}
      searchPosition={showSearch ? 'sticky' : 'none'}
      navPosition={showNavigation ? 'top' : 'none'}
      previewPosition={'none'}
      skinTonePosition={showSkinTones ? 'preview' : 'none'}
      perLine={perLine}
      maxFrequentRows={showRecent ? maxFrequentRows : 0}
      categories={categories}
      set="native"
      autoFocus={true}
    />
  );

  if (mode === 'modal') {
    // Modal mode - can be implemented with Dialog component
    // For now, returns the picker in a portal-like structure
    return (
      <>
        <div onClick={() => !disabled && handleOpenChange(true)}>
          {children}
        </div>
        {open && (
          <div className="fixed inset-0 z-[60]">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => handleOpenChange(false)}
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
              <div
                className="pointer-events-auto bg-white rounded-2xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {pickerElement}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Popover mode (default)
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild disabled={disabled}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className={cn(
          'w-auto p-0 border-0 shadow-lg rounded-2xl overflow-hidden z-1000',
          contentClassName,
        )}
        sideOffset={8}
        onPointerDownOutside={() => {
          // Only close when clicking outside - let the default behavior handle it
        }}
        onInteractOutside={() => {
          // Prevent closing when interacting with elements inside the picker
          // This ensures clicking emojis doesn't close the popover
        }}
        onFocusOutside={(e) => {
          // Prevent closing on focus changes within the picker
          e.preventDefault();
        }}
      >
        {pickerElement}
      </PopoverContent>
    </Popover>
  );
}

/**
 * Hook to manage emoji insertion into a text input/textarea
 *
 * @example
 * ```tsx
 * const { insertEmoji, handleSelectionChange } = useEmojiInsertion(setText, textareaRef);
 *
 * <textarea
 *   ref={textareaRef}
 *   onSelect={handleSelectionChange}
 *   onClick={handleSelectionChange}
 *   onKeyUp={handleSelectionChange}
 * />
 *
 * <EmojiPicker onEmojiSelect={(emoji) => insertEmoji(emoji.native)} />
 * ```
 */
export function useEmojiInsertion(
  setText: React.Dispatch<React.SetStateAction<string>>,
  inputRef: React.RefObject<HTMLTextAreaElement | HTMLInputElement | null>,
) {
  const cursorPositionRef = useRef<number>(0);

  const handleSelectionChange = () => {
    if (inputRef.current) {
      cursorPositionRef.current = inputRef.current.selectionStart ?? 0;
    }
  };

  const insertEmoji = (emoji: string) => {
    setText((prevText) => {
      const position = cursorPositionRef.current;
      const before = prevText.slice(0, position);
      const after = prevText.slice(position);
      const newText = before + emoji + after;

      // Update cursor position for next insertion
      cursorPositionRef.current = position + emoji.length;

      // Schedule cursor restoration after React updates the textarea
      setTimeout(() => {
        if (inputRef.current) {
          const newPosition = position + emoji.length;
          inputRef.current.setSelectionRange(newPosition, newPosition);
          inputRef.current.focus();
        }
      }, 0);

      return newText;
    });
  };

  return {
    insertEmoji,
    handleSelectionChange,
    cursorPosition: cursorPositionRef.current,
  };
}

export default EmojiPicker;
