'use client';

import {
  CompassIcon,
  TicketIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { useStageAccess } from '@/lib/stage-access-context';

const PROFILE_TABS = [
  {
    value: 'backstage',
    label: 'Backstage',
    path: 'backstage',
    icon: <CompassIcon weight="duotone" className="size-5" />,
    activeIcon: <CompassIcon weight="fill" className="size-5 text-accent-9" />,
  },
  {
    value: 'streams',
    label: 'Streams',
    path: 'streams',
    icon: <VideoCameraIcon weight="duotone" className="size-5" />,
    activeIcon: <VideoCameraIcon weight="fill" className="size-5 text-accent-9" />,
  },
  {
    value: 'passes',
    label: 'Passes',
    path: 'passes',
    icon: <TicketIcon weight="duotone" className="size-5" />,
    activeIcon: <TicketIcon weight="fill" className="size-5 text-accent-9" />,
  },
] as const;

type ProfileTabValue = (typeof PROFILE_TABS)[number]['value'];

interface ProfileTabsProps {
  slug: string;
  stickyHeader?: boolean;
}

export function ProfileHeaderTabs({ slug, stickyHeader }: ProfileTabsProps) {
  const pathname = usePathname();

  const activeTab: ProfileTabValue =
    PROFILE_TABS.find((tab) => pathname.includes(`/${tab.path}`))?.value ??
    'backstage';
    const { data: session } = useSession();
    const { role } = useStageAccess();
    const router = useRouter();
    const isOwner = role === 'owner';
    const isLoggedIn = !!session?.user;
  const tabsToDisplay = [PROFILE_TABS[0], ...(isLoggedIn && isOwner ? [PROFILE_TABS[1]] : []), PROFILE_TABS[2]];

  return (
    <Tabs value={activeTab}>
      <TabsList className="justify-start gap-4 p-0">
        {tabsToDisplay.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            asChild
            onClick={() => {
              router.push(`/${slug}/${tab.path}`);
            }}
            className={cn(
              'bg-transparent cursor-pointer hover:bg-neutral-alpha-3 py-3 ring-offset-transparent rounded-lg shadow-none data-[state=active]:[&>a>svg]:text-accent-9',
              stickyHeader && 'py-5',
            )}
            activeClassName="rounded-none shadow-none border-b-2 border-accent-9 bg-transparent"
          >
            <div
              // href={`/${slug}/${tab.path}`}
              className="flex items-center gap-2 text-neutral-12"
            >
              {activeTab === tab.value ? tab.activeIcon : tab.icon}
              {tab.label}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
