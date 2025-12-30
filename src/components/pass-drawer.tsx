'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Pass {
  id: string;
  name: string;
  price?: { usdCents?: number; inrPaise?: number } | null;
  isGroundPass?: boolean;
}

export interface PassDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePasses?: Pass[];
  selectedPassIds: string[];
  onSelectionChange: (passIds: string[]) => void;
}

function formatPrice(pass: Pass): string {
  if (pass.isGroundPass || !pass.price) {
    return 'Free';
  }
  if (pass.price.usdCents) {
    return `$${pass.price.usdCents}`;
  }
  if (pass.price.inrPaise) {
    return `₹${pass.price.inrPaise / 100}`;
  }
  return 'Free';
}

export function PassDrawer({
  open,
  onOpenChange,
  availablePasses,
  selectedPassIds,
  onSelectionChange,
}: PassDrawerProps) {
  const passes = availablePasses ?? [];
  const [localSelection, setLocalSelection] = useState<string[]>(selectedPassIds);

  // Sync local selection when drawer opens or external selection changes
  useEffect(() => {
    if (open) {
      setLocalSelection(selectedPassIds);
    }
  }, [open, selectedPassIds]);

  const handleTogglePass = (passId: string) => {
    setLocalSelection((prev) => {
      if (prev.includes(passId)) {
        return prev.filter((id) => id !== passId);
      }
      return [...prev, passId];
    });
  };

  const handleSelectAll = () => {
    if (localSelection.length === passes.length) {
      setLocalSelection([]);
    } else {
      setLocalSelection(passes.map((p) => p.id));
    }
  };

  const handleClose = () => {
    onSelectionChange(localSelection);
    onOpenChange(false);
  };

  // Handle drawer close from any source (drag, click outside, etc.)
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Save selection when drawer closes
      onSelectionChange(localSelection);
    }
    onOpenChange(isOpen);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-[90vh] rounded-t-[20px] bg-white">
        {/* Drag handle */}
        {/* <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gray-300" /> */}

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClose}
            requireAuth={false}
            className="rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="size-6 text-gray-900" />
          </Button>

          <DrawerTitle className="text-lg font-semibold text-gray-900">
            Passes
          </DrawerTitle>

          {localSelection.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClose}
              requireAuth={false}
              className="rounded-full bg-[rgba(32,0,56,0.13)] hover:bg-[rgba(32,0,56,0.2)]"
            >
              <Check className="size-5" style={{ color: 'rgba(33, 31, 38, 1)' }} strokeWidth={2.5} />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleSelectAll}
              requireAuth={false}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 px-2"
            >
              Select All
            </Button>
          )}
        </div>

        {/* Pass list */}
        <div className="pb-8 overflow-y-auto">
          {passes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <p className="text-sm text-gray-500">No passes available</p>
            </div>
          ) : (
          <div className="space-y-2">
            {passes.map((pass) => {
              const isSelected = localSelection.includes(pass.id);
              return (
                <Button
                  key={pass.id}
                  type="button"
                  variant="ghost"
                  onClick={() => handleTogglePass(pass.id)}
                  requireAuth={false}
                  className={cn(
                    'flex items-center w-full h-auto p-3 justify-start rounded-none',
                    isSelected ? 'bg-[rgba(48,0,64,0.06)]' : 'hover:bg-gray-50'
                  )}
                >
                  {/* Pass icon */}
                  <div className="size-14 rounded-xl bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400 flex items-center justify-center mr-4 overflow-hidden">
                    <div className="relative size-8">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
                        <path
                          d="M16 4L20 12L28 14L22 20L24 28L16 24L8 28L10 20L4 14L12 12L16 4Z"
                          fill="rgba(99, 102, 241, 0.8)"
                          stroke="rgba(79, 70, 229, 1)"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M16 8L18.5 13L24 14.5L20 18.5L21 24L16 21.5L11 24L12 18.5L8 14.5L13.5 13L16 8Z"
                          fill="rgba(129, 140, 248, 0.6)"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Pass info */}
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 text-base">{pass.name}</p>
                    <p className="text-gray-500 text-sm">{formatPrice(pass)}</p>
                  </div>

                  {/* Checkbox */}
                  <div
                    className={cn(
                      'size-6 rounded-md flex items-center justify-center transition-colors bg-[rgba(32,0,56,0.13)]'
                    )}
                  >
                    {isSelected && <Check className="size-4" style={{ color: 'rgba(33, 31, 38, 1)' }} strokeWidth={3} />}
                  </div>
                </Button>
              );
            })}
          </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
