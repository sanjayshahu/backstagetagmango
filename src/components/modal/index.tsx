'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useModalTracking } from '@/lib/modal-tracking-context';
import { cn } from '@/lib/utils';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Drawer, DrawerContent } from '../ui/drawer';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
  /** When false, prevents closing modal via ESC key or clicking outside. Defaults to true. */
  dismissible?: boolean;
  footer?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  fullDrawer?: boolean;
  /** When true, modal is always visible regardless of stack position */
  alwaysVisible?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, Props>(
  ({ showCloseButton = true, dismissible = true, alwaysVisible = false, ...props }, ref) => {
    const isMobile = useIsMobile();
    const { registerModal, unregisterModal, topModalId } = useModalTracking();
    const modalIdRef = useRef<string | null>(null);

    // Register/unregister on open state change
    useEffect(() => {
      if (props.open) {
        modalIdRef.current = registerModal();
        return () => {
          if (modalIdRef.current) {
            unregisterModal(modalIdRef.current);
            modalIdRef.current = null;
          }
        };
      }
      return undefined;
    }, [props.open, registerModal, unregisterModal]);

    // Determine if this modal is visible
    // alwaysVisible overrides stack visibility
    const isVisible = alwaysVisible || modalIdRef.current === topModalId;

    if (!isMobile) {
      return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
          <DialogContent
            ref={ref}
            title={props.title}
            subtitle={props.subtitle}
            className={cn('max-h-[90dvh] overflow-visible', props.className)}
            showCloseButton={showCloseButton}
            onInteractOutside={(e) => {
              if (!dismissible) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={(e) => {
              if (!dismissible) {
                e.preventDefault();
              }
            }}
            style={{ display: isVisible ? undefined : 'none' }}
          >
            <div
              className={cn(
                'scrollbar-hidden max-modal-height w-full overflow-y-auto p-4',
                props.wrapperClassName,
              )}
            >
              {props.children}
            </div>
            {props.footer && (
              <div className="flex-none border-t border-neutral-alpha-3 p-4">
                {props.footer}
              </div>
            )}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={props.open}
        onOpenChange={props.onOpenChange}
        handleOnly={props.fullDrawer}
        dismissible={dismissible}
      >
        <DrawerContent
          ref={ref}
          title={props.title}
          subtitle={props.subtitle}
          className={cn(
            {
              'h-full max-h-none! overflow-visible rounded-none!':
                props.fullDrawer,
            },
            props.className,
          )}
          showCloseButton={showCloseButton}
          fullDrawer={props.fullDrawer}
          onBack={props.onBack}
          style={{ display: isVisible ? undefined : 'none' }}
        >
          <div
            className={cn(
              'scrollbar-hidden overflow-y-auto p-3',
              props.wrapperClassName,
            )}
          >
            {props.children}
          </div>
          {props.footer && (
            <div className="border-t border-neutral-alpha-4 p-3">
              {props.footer}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    );
  },
);

Modal.displayName = 'Modal';

export { Modal };
