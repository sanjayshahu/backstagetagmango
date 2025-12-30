'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileTabsProps {
  slug: string;
}

export function ProfileTabs({ slug }: ProfileTabsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isBackstage =
    pathname === `/${slug}` || pathname === `/${slug}/backstage`;
  const isPasses = pathname === `/${slug}/passes`;

  const tabs = [
    {
      id: 'backstage',
      label: 'Backstage',
      icon: '✏️',
      href: `/${slug}/backstage`,
      isActive: isBackstage,
    },
    {
      id: 'passes',
      label: 'Passes',
      icon: '🎟️',
      href: `/${slug}/passes`,
      isActive: isPasses,
    },
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex gap-6 md:gap-8" aria-label="Profile navigation">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => router.push(tab.href)}
            requireAuth={false}
            className={cn(
              'flex items-center gap-2 py-3 border-b-2 text-sm md:text-base font-medium h-auto rounded-none px-0 hover:bg-transparent',
              tab.isActive
                ? 'border-amber-500 text-neutral-4'
                : 'border-transparent text-muted-foreground hover:text-neutral-4'
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
