'use client';

// ============================================
// Third-party Imports
// ============================================
import { useState, useRef, useEffect } from 'react';
import { Ticket } from 'lucide-react';

// ============================================
// Local/Project Imports
// ============================================
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TicketIcon, XIcon } from '@phosphor-icons/react';
import { Text } from './ui/text';

// ============================================
// Types & Interfaces
// ============================================
export interface Pass {
  id: string;
  name: string;
  icon?: string;
}

export interface PassSelectorProps {
  availablePasses: Pass[];
  selectedPasses: Pass[];
  onSelectionChange: (passes: Pass[]) => void;
  className?: string;
  /** Show styled container with border, rounded-full, and surface background */
  showContainer?: boolean;
}

// ============================================
// Component
// ============================================
export function PassSelector({
  availablePasses,
  selectedPasses,
  onSelectionChange,
  className,
  showContainer = false,
}: PassSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ========================================
     Handler: Remove pass from selection
     ======================================== */
  const handleRemovePass = (passId: string) => {
    onSelectionChange(selectedPasses.filter((p) => p.id !== passId));
  };

  /* ========================================
     Handler: Add pass to selection
     ======================================== */
  const handleAddPass = (pass: Pass) => {
    if (!selectedPasses.find((p) => p.id === pass.id)) {
      onSelectionChange([...selectedPasses, pass]);
    }
    setIsDropdownOpen(false);
  };

  // Get passes that haven't been selected yet
  const unselectedPasses = availablePasses.filter(
    (pass) => !selectedPasses.find((p) => p.id === pass.id)
  );

  return (
    <div className={cn('flex-1 relative', className)} ref={dropdownRef}>
      {/* ========================================
          SECTION 1: Selected Passes Chips
          - Display selected passes as removable chips
          - Click anywhere to open dropdown
          ======================================== */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => unselectedPasses.length > 0 && setIsDropdownOpen(!isDropdownOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            unselectedPasses.length > 0 && setIsDropdownOpen(!isDropdownOpen);
          }
        }}
        className={cn(
          'flex flex-wrap items-center gap-2 w-full min-h-[60px] text-left',
          showContainer
            ? 'h-15 rounded-full border border-neutral-alpha-6 bg-white/90 p-1.5'
            : 'rounded-lg border-none bg-white',
          unselectedPasses.length > 0 && 'cursor-pointer'
        )}
      >
        {selectedPasses.map((pass) => (
          <div
            key={pass.id}
            className="flex h-12 px-4 justify-center items-center gap-3 rounded-full border border-neutral-alpha-7 bg-neutral-3 text-neutral-12 text-sm font-medium"
          >
            <TicketIcon color='#65636D' size={18} />
            <Text className='text-neutral-11'>{pass.name}</Text>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePass(pass.id);
              }}
              requireAuth={false}
              className="rounded-full p-0.5 hover:bg-neutral-alpha-4 transition-colors"
            >
              <XIcon color='#65636D' size={18} />
            </Button>
          </div>
        ))}

        {/* Deselect all button - only show when passes are selected */}
        {selectedPasses.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectionChange([]);
            }}
            className="flex h-12 w-12 justify-center items-center rounded-full hover:bg-neutral-alpha-4 transition-colors ml-auto"
            title="Deselect all"
          >
            <XIcon color='#65636D' size={20} />
          </button>
        )}

        {/* Placeholder text when no passes selected */}
        {selectedPasses.length === 0 && (
          <span className="text-gray-400 text-sm m-2.5">Select passes...</span>
        )}

      </div>

      {/* ========================================
          SECTION 2: Dropdown Menu
          - List of unselected passes
          - Click to add
          ======================================== */}
      {isDropdownOpen && unselectedPasses.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-alpha-6 rounded-2xl shadow-lg z-[300] overflow-y-auto max-h-48"
          onClick={(e) => e.stopPropagation()}
        >
          {unselectedPasses.map((pass) => (
            <Button
              key={pass.id}
              type="button"
              variant="ghost"
              onClick={() => handleAddPass(pass)}
              requireAuth={false}
              className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-neutral-12 hover:bg-neutral-alpha-3 transition-colors"
            >
              <Ticket className="size-4 text-neutral-alpha-11" />
              <span>{pass.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
