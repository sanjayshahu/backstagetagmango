'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/modal';
import { cn } from '@/lib/utils';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDescription: string;
  onSave: (description: string) => void;
}

const MAX_LENGTH = 500;

export function DescriptionModal({
  isOpen,
  onClose,
  initialDescription,
  onSave,
}: DescriptionModalProps) {
  const [description, setDescription] = useState(initialDescription);

  // Sync description with initialDescription when modal opens
  useEffect(() => {
    if (isOpen) {
      setDescription(initialDescription);
    }
  }, [isOpen, initialDescription]);

  const handleDone = () => {
    onSave(description);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showCloseButton={true}
      className="max-w-fit sm:max-w-fit items-center"
      wrapperClassName="p-0! w-[520px]"
    >
      <div className="flex w-full max-w-[600px] flex-col overflow-hidden rounded-3xl border border-static-mauve-alpha-3 bg-static-neutral-1">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-4 p-5">
          <Text
            as="h2"
            className="text-xl font-semibold text-static-neutral-12"
          >
            Pass Description
          </Text>
        </div>

        {/* Editor */}
        <div className="flex min-h-[280px] flex-col bg-static-neutral-1 p-3">
          <Textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, MAX_LENGTH))
            }
            placeholder="Describe what members will get with this pass..."
            className="min-h-[240px] flex-1 resize-none border-0 bg-transparent text-base leading-6 text-static-neutral-12 placeholder:text-static-neutral-alpha-9 focus:outline-none"
          />
          <Text as="p" className="mt-3 text-right text-sm text-static-neutral-alpha-9">
            {description.length}/{MAX_LENGTH}
          </Text>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-neutral-4 px-4 py-3">
          <Button
            disabled={!description.trim().length}
            onClick={handleDone}
            requireAuth={true}
            className={cn(
              'h-10 rounded-full px-4 text-base font-medium',
              'bg-neutral-12 text-neutral-1 hover:bg-neutral-11',
            )}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
