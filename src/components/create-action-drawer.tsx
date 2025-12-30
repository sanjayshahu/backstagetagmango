'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Image } from './ui/image';

interface CreateActionDrawerProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ActionItemProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  onClick?: () => void;
}

function ActionItem({ icon, iconBgColor, title, description, onClick }: ActionItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      requireAuth={false}
      className="flex items-center gap-4 w-full p-3 h-auto rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left justify-start"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span style={{
          color: 'rgba(33, 31, 38, 1)'
        }} className="text-base font-semibold">
          {title}
        </span>
        <span style={{
          color: 'rgba(4, 0, 17, 0.61)',
          fontWeight: 400
        }} className="text-xs">
          {description}
        </span>
      </div>
    </Button>
  );
}

export function CreateActionDrawer({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: CreateActionDrawerProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const params = useParams<{ slug: string }>();

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (controlledOnOpenChange ?? (() => {})) : setInternalOpen;
  const stage = params.slug;

  const handleCreateStream = () => {
    setOpen(false);
    // Navigate to stream page with dummy pass ID
    router.push(`/${stage}/stream-mobile`);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && (
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent className="bg-white dark:bg-zinc-900">
        <div className="px-4 pb-8 space-y-1">
          <ActionItem
            icon={<Image alt='post feeds' src={'/icons/newspaper.svg'} height={24} width={24} className="w-6 h-6 text-green-600" />}
            iconBgColor="bg-[rgba(230,246,235,1)]"
            title="Post on Feed"
            description="Share with everyone in your community"
          />
          <ActionItem
            icon={<Image alt='post feeds' src={'/icons/video_camera.svg'} height={24} width={24} className="w-6 h-6 text-green-600" />}
            iconBgColor="bg-[rgba(230,244,254,1)]"
            title="Create Stream"
            description="Create group video call slots"
            onClick={handleCreateStream}
          />
          <ActionItem
            icon={<Image alt='post feeds' src={'/icons/ticket_filled.svg'} height={24} width={24} className="w-6 h-6 text-green-600" />}
            iconBgColor="bg-[rgba(254,235,236,1)]"
            title="Create Pass"
            description="Sell access to exclusive content, challenges, or benefits"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
