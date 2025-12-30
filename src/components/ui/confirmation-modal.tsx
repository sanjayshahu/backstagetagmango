'use client';

import * as React from 'react';
import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ConfirmationModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal open state changes */
  onOpenChange: (open: boolean) => void;
  /** Title displayed at the top of the modal */
  title: string;
  /** Description or message explaining what the user is confirming */
  description: string;
  /** Text for the confirm button. Defaults to "Confirm" */
  confirmText?: string;
  /** Text for the cancel button. Defaults to "Cancel" */
  cancelText?: string;
  /** Callback when user confirms the action */
  onConfirm: () => void | Promise<void>;
  /** Callback when user cancels. Defaults to closing the modal */
  onCancel?: () => void;
  /** Visual variant of the confirm button */
  variant?: 'default' | 'destructive' | 'warning';
  /** Whether the confirm action is in progress */
  loading?: boolean;
  /** Custom icon to display above the title */
  icon?: React.ReactNode;
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
  icon,
}: ConfirmationModalProps) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  const confirmButtonStyles: Record<typeof variant, string> = {
    default: '',
    destructive: 'bg-error-10 text-white hover:bg-error-11',
    warning: 'bg-warning-10 text-white hover:bg-warning-11',
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  const isLoading = loading || isConfirming;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={false}
      dismissible={!isLoading}
      className="sm:max-w-sm bg-surface"
      wrapperClassName="p-6!"
    >
      <div className="flex flex-col items-center text-center">
        {icon && <div className="mb-4">{icon}</div>}

        <h2 className="text-lg font-semibold text-neutral-12">{title}</h2>

        <p className="mt-2 text-sm text-neutral-11">{description}</p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
            requireAuth={false}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'default' ? 'default' : undefined}
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              'w-full sm:w-auto',
              confirmButtonStyles[variant],
              isLoading && 'opacity-70'
            )}
            requireAuth={false}
          >
            {isLoading ? 'Loading...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
