'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { CaretDownIcon, CheckIcon, XIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/stores/useTheme';

// Minimum width for search input
const MIN_INPUT_WIDTH = 70;
// Gap between elements (gap-1.5 = 6px)
const GAP_SIZE = 6;
// Fixed width for "+N" indicator
const PLUS_N_WIDTH = 60;
// Minimum width for each chip
const CHIP_MIN_WIDTH = 100;
// Extra padding for input (left + right padding)
const INPUT_PADDING = 20;

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelected?: number;
  inputContainerClass?: string;
  filterOutSelected?: boolean;
  /** Icon to show in chips and dropdown items. Pass a fully styled React element. */
  icon?: React.ReactNode;
  /** Position of the dropdown relative to the input. Defaults to "bottom". */
  dropdownPosition?: 'top' | 'bottom';
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select passes...',
  className,
  disabled = false,
  maxSelected,
  inputContainerClass = '',
  filterOutSelected = true,
  icon,
  dropdownPosition = 'bottom',
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chipsContainerRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [measuredTextWidth, setMeasuredTextWidth] = React.useState(0);
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value),
  );

  // State for layout calculations
  const [visibleChipsCount, setVisibleChipsCount] = React.useState(
    selectedOptions.length,
  );
  const [chipWidth, setChipWidth] = React.useState<number | null>(null);

  // Measure actual text width using hidden span
  React.useEffect(() => {
    if (measureRef.current) {
      setMeasuredTextWidth(measureRef.current.offsetWidth);
    }
  }, [inputValue]);

  // Calculate dynamic input width based on measured text width
  const inputWidth = Math.max(
    MIN_INPUT_WIDTH,
    measuredTextWidth + INPUT_PADDING,
  );

  // Calculate visible chips and chip width based on container space
  React.useEffect(() => {
    if (!chipsContainerRef.current) {
      setVisibleChipsCount(selectedOptions.length);
      setChipWidth(null);
      return;
    }

    const calculateLayout = () => {
      const container = chipsContainerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const selectedCount = selectedOptions.length;

      // No chips selected - nothing to calculate
      if (selectedCount === 0) {
        setVisibleChipsCount(0);
        setChipWidth(null);
        return;
      }

      // Available space for chips = total - input - gap before input
      const availableForChips = containerWidth - inputWidth - GAP_SIZE;

      if (availableForChips <= 0) {
        setVisibleChipsCount(0);
        setChipWidth(null);
        return;
      }

      // Calculate max chips that can fit at minimum width (without +N)
      const maxChipsWithoutPlusN = Math.floor(
        (availableForChips + GAP_SIZE) / (CHIP_MIN_WIDTH + GAP_SIZE),
      );

      if (selectedCount <= maxChipsWithoutPlusN) {
        // All chips fit - no "+N" needed
        // Calculate width so chips expand to fill available space
        const totalGaps = (selectedCount - 1) * GAP_SIZE;
        const widthPerChip = Math.floor(
          (availableForChips - totalGaps) / selectedCount,
        );

        setVisibleChipsCount(selectedCount);
        setChipWidth(widthPerChip);
      } else {
        // Need "+N" - recalculate with "+N" space reserved
        const availableWithPlusN = availableForChips - PLUS_N_WIDTH - GAP_SIZE;

        // Calculate max chips that can fit at minimum width (with +N reserved)
        const maxChipsWithPlusN = Math.max(
          0,
          Math.floor(
            (availableWithPlusN + GAP_SIZE) / (CHIP_MIN_WIDTH + GAP_SIZE),
          ),
        );

        if (maxChipsWithPlusN === 0) {
          // No chips fit, show only "+N"
          setVisibleChipsCount(0);
          setChipWidth(null);
        } else {
          // Calculate width so visible chips expand to fill available space
          const totalGaps = (maxChipsWithPlusN - 1) * GAP_SIZE;
          const widthPerChip = Math.floor(
            (availableWithPlusN - totalGaps) / maxChipsWithPlusN,
          );

          setVisibleChipsCount(maxChipsWithPlusN);
          setChipWidth(widthPerChip);
        }
      }
    };

    calculateLayout();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateLayout);
    resizeObserver.observe(chipsContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [selectedOptions.length, inputWidth]);

  // Calculate hidden count based on visible chips
  const hiddenCount = selectedOptions.length - visibleChipsCount;

  const handleUnselect = React.useCallback(
    (value: string) => {
      onChange(selected.filter((s) => s !== value));
    },
    [onChange, selected],
  );

  const handleClearAll = React.useCallback(() => {
    onChange([]);
  }, [onChange]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '' && selected.length > 0) {
            onChange(selected.slice(0, -1));
          }
        }
        if (e.key === 'Escape') {
          input.blur();
          setOpen(false);
        }
      }
    },
    [onChange, selected],
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((s) => s !== value));
      } else {
        if (maxSelected && selected.length >= maxSelected) {
          return;
        }
        onChange([...selected, value]);
      }
      setInputValue('');
    },
    [onChange, selected, maxSelected],
  );

  const filteredOptions = options
    .filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !option.disabled,
    )
    .filter((option) =>
      filterOutSelected ? !selected.includes(option.value) : true,
    );

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <CommandPrimitive
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn('relative overflow-visible', className)}
    >
      {/* Input Container */}
      <div
        className={cn(
          `flex items-center gap-4 border border-neutral-alpha-6 pr-2 pl-4 ${selectedOptions.length ? 'p-1.5' : ' py-2'} min-h-15`,
          disabled && 'cursor-not-allowed opacity-50',
          inputContainerClass,
        )}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
            setOpen(true);
          }
        }}
        style={
          isDarkTheme
            ? { background: 'rgba(0, 0, 0, 0.25)' }
            : { background: 'rgba(255, 255, 255, 0.90)' }
        }
      >
        {/* Selected Items */}
        <div
          ref={chipsContainerRef}
          className="flex flex-1 flex-nowrap items-center gap-1.5 overflow-hidden"
        >
          {selectedOptions.slice(0, visibleChipsCount).map((option) => (
            <div
              key={option.value}
              data-chip
              className="flex max-h-12 min-h-12 w-fit items-center gap-3 rounded-full border border-neutral-alpha-7 bg-neutral-3 px-4 shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                  handleUnselect(option.value);
                }
              }}
              style={{
                maxWidth: chipWidth ?? undefined,
                minWidth: CHIP_MIN_WIDTH,
              }}
            >
              {icon && <span className="shrink-0">{icon}</span>}
              <span className="text-base font-medium text-neutral-11 truncate">
                {option.label}
              </span>
              <XIcon size={18} className="outline-none focus:ring-0 shrink-0 text-neutral-11" weight="regular" />
            </div>
          ))}

          {/* "+N" indicator */}
          {hiddenCount > 0 && (
            <div
              className="flex h-12 items-center justify-center rounded-full bg-neutral-alpha-3 shrink-0 border border-neutral-alpha-7"
              style={{ width: PLUS_N_WIDTH }}
            >
              <span className="text-base font-medium text-neutral-11">
                +{hiddenCount}
              </span>
            </div>
          )}

          {/* Hidden span to measure text width */}
          <span
            ref={measureRef}
            className="absolute invisible whitespace-pre text-base"
            aria-hidden="true"
          >
            {inputValue || ''}
          </span>

          {/* Search Input */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onFocus={() => setOpen(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            disabled={disabled}
            className="shrink-0 bg-transparent p-0 text-base text-neutral-12 outline-none placeholder:text-neutral-alpha-9 placeholder:text-base placeholder:font-medium"
            style={{ width: inputWidth }}
          />
        </div>

        <div className="h-8 w-8 flex justify-center items-center">
          {/* Clear All Button */}
          {selected.length > 0 ? (
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              disabled={disabled}
            >
              <XIcon size={16} className="text-neutral-12" weight="regular" />
            </button>
          ) : (
            <CaretDownIcon
              size={16}
              className={cn(
                'shrink-0 text-neutral-11 transition-transform',
                open && 'rotate-180',
              )}
              weight="bold"
            />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && filteredOptions.length > 0 && (
        <div
          className={cn(
            'absolute z-50 w-full rounded-xl border border-neutral-alpha-6 bg-surface p-1 shadow-lg',
            dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          <CommandPrimitive.List className="max-h-64 overflow-auto">
            {filteredOptions.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <CommandPrimitive.Item
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-base text-neutral-12 outline-none',
                    'hover:bg-neutral-alpha-3 my-1',
                    isSelected && 'bg-neutral-alpha-4',
                  )}
                >
                  {icon}
                  <span className="flex-1">{option.label}</span>
                  {isSelected && (
                    <CheckIcon
                      size={18}
                      color="var(--color-neutral-11)"
                      weight="bold"
                    />
                  )}
                </CommandPrimitive.Item>
              );
            })}
          </CommandPrimitive.List>
        </div>
      )}

      {/* Empty State */}
      {open && inputValue && filteredOptions.length === 0 && (
        <div
          className={cn(
            'absolute z-50 w-full rounded-xl border border-neutral-alpha-6 bg-surface p-4 text-center text-sm text-neutral-11 shadow-lg',
            dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          No results found.
        </div>
      )}
    </CommandPrimitive>
  );
}
