'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Button } from '@/components/ui/button';

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
  darkMode?: boolean;
}

/* ------------------------- Utility for formatting price ------------------------- */
function formatPrice(pass: Pass): string {
  if (pass.isGroundPass || !pass.price) return 'Free';
  if (pass.price.usdCents) return `$${pass.price.usdCents}`;
  if (pass.price.inrPaise) return `₹${pass.price.inrPaise / 100}`;
  return 'Free';
}

/* ------------------------- Custom Drawer Components ------------------------- */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/50', className)} {...props} />
  )
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & { open?: boolean }
>(({ className, children, open = false, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed top-0 right-0 z-50 h-screen w-[600px] flex flex-col border bg-neutral-3 transform transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : 'translate-x-full',
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

/* ------------------------- PassDrawer Component ------------------------- */
export function PassDrawer({
  open,
  onOpenChange,
  availablePasses,
  selectedPassIds,
  onSelectionChange,
  darkMode = false,
}: PassDrawerProps) {
  const passes = availablePasses ?? [];
  const [localSelection, setLocalSelection] = useState<string[]>(selectedPassIds);

  useEffect(() => {
    if (open) setLocalSelection(selectedPassIds);
  }, [open, selectedPassIds]);

  const handleTogglePass = (passId: string) => {
    setLocalSelection(prev => (prev.includes(passId) ? prev.filter(id => id !== passId) : [...prev, passId]));
  };

  const handleSelectAll = () => {
    if (localSelection.length === passes.length) setLocalSelection([]);
    else setLocalSelection(passes.map(p => p.id));
  };

  const handleClose = () => {
    onSelectionChange(localSelection);
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onSelectionChange(localSelection);
    onOpenChange(isOpen);
  };

  const bgClass = darkMode ? 'bg-black text-white' : 'bg-white text-black';
  const hoverClass = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent open={open} className={bgClass}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Button type="button" variant="ghost" size="icon" onClick={handleClose} className="rounded-full hover:bg-gray-400">
            <ChevronLeft className={cn('size-6', darkMode ? 'text-white' : 'text-gray-900')} />
          </Button>
          <h2 className={cn('text-lg font-semibold', darkMode ? 'text-white' : 'text-gray-900')}>Passes</h2>
          {localSelection.length > 0 ? (
            <Button type="button" variant="ghost" size="icon" onClick={handleClose} className={cn('rounded-full bg-[rgba(32,0,56,0.13)]', hoverClass)}>
              <Check className="size-5" style={{ color: darkMode ? 'white' : 'rgba(33,31,38,1)' }} strokeWidth={2.5} />
            </Button>
          ) : (
            <Button type="button" variant="ghost" onClick={handleSelectAll} className={cn('text-sm font-medium px-2', darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600')}>
              Select All
            </Button>
          )}
        </div>

        {/* Pass List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {passes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>No passes available</p>
            </div>
          ) : (
            passes.map(pass => {
              const isSelected = localSelection.includes(pass.id);
              return (
                <Button
                  key={pass.id}
                  type="button"
                  variant="ghost"
                  onClick={() => handleTogglePass(pass.id)}
                  className={cn(
                    'flex items-center w-full h-auto p-3 justify-start rounded-none',
                    isSelected ? (darkMode ? 'bg-gray-800' : 'bg-[rgba(48,0,64,0.06)]') : hoverClass
                  )}
                >
                  <div className="flex-1 text-left">
                    <p className={cn('font-medium text-base', darkMode ? 'text-white' : 'text-gray-900')}>{pass.name}</p>
                    <p className={cn('text-sm', darkMode ? 'text-gray-300' : 'text-gray-500')}>{formatPrice(pass)}</p>
                  </div>
                  {isSelected && <Check className="size-5" style={{ color: darkMode ? 'white' : 'rgba(33,31,38,1)' }} strokeWidth={2.5} />}
                </Button>
              );
            })
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
