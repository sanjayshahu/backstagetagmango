'use client';

import { Button } from '@/components/ui/button';
import { AvatarComponent } from '@/components/avatar-component';

interface CreatePostTriggerProps {
  onOpenModal: () => void;
  currentUser?: {
    name?: string | null;
    image?: string | null;
  };
}

export function CreatePostTrigger({
  onOpenModal,
  currentUser,
}: CreatePostTriggerProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onOpenModal}
      className="w-full flex items-center gap-3 px-4 py-3 h-auto bg-white rounded-3xl border border-neutral-4 hover:bg-accent/50 cursor-pointer text-left justify-start"
    >
      <AvatarComponent
        src={currentUser?.image}
        username={currentUser?.name ?? undefined}
        size="size-10"
      />
      <span className="text-muted text-neutral-12 text-base font-normal flex-1">
        What&apos;s on your mind?
      </span>
    </Button>
  );
}
