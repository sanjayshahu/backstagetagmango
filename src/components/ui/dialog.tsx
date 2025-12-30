import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, X } from 'lucide-react';
import * as React from 'react';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-background/70',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
    subtitle?: string;
    showCloseButton?: boolean;
    onBack?: () => void;
  }
>(
  (
    {
      className,
      title,
      subtitle,
      children,
      showCloseButton = true,
      onBack,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        autoFocus={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'fixed left-[50%] top-[50%] z-999 flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col rounded-3xl shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 border border-neutral-alpha-3 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-hidden sm:max-w-md focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        {title ? (
          <DialogHeader>
            <div className="flex items-center gap-3">
              {onBack && <ChevronLeft className="size-5" />}
              <DialogTitle>{title}</DialogTitle>
            </div>
            {subtitle ? (
              <DialogDescription>{subtitle}</DialogDescription>
            ) : (
              <DialogDescription className="sr-only">
                Dialog content
              </DialogDescription>
            )}
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Modal</DialogTitle>
        )}

        {children}

        {showCloseButton && (
          <DialogPrimitive.Close className="size-10 flex items-center justify-center absolute text-black right-4 top-4 bg-neutral-alpha-3 hover:bg-neutral-alpha-6 hover:text-black disabled:pointer-events-none hover:cursor-pointer rounded-full">
            <X className="size-6" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'space-y-1 border-b border-neutral-alpha-4 py-4 pl-6 pr-10',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'word-break-break text-base font-semibold text-black leading-none tracking-tight md:text-xl',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
