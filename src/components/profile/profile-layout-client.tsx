'use client';

import { usePathname } from 'next/navigation';

import { LoggedOutCTA } from '@/components/logged-out-cta';
import { useSession } from '@/lib/auth-client';
import { useStageAccess } from '@/lib/stage-access-context';
import { cn, getCoverImageUrlFromStage } from '@/lib/utils';
import { BlurryImageEffect } from './BlurryImageEffect';
import { JoinCallCards } from './join-call-cards';
import { ProfileHeaderV2 } from './profile-headerV2';
import { ProfileSidebar } from './profile-sidebar';

interface ProfileLayoutClientProps {
  slug: string;
  children: React.ReactNode;
}

export function ProfileLayoutClient({
  slug,
  children,
}: ProfileLayoutClientProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const { stage } = useStageAccess();
  const coverImageUrl = getCoverImageUrlFromStage(stage);

  const isPassesPage = pathname === `/${slug}/passes`;
  const isPassDetailsPage = pathname.startsWith(`/${slug}/passes/`);
  const isStreamsPage = pathname.includes(`streams`);
  const showSidebar = !isPassesPage && !isPassDetailsPage;
  const isFeedsPage = pathname.includes('backstage');

  return (
    <div className="relative min-h-screen bg-[#F7F6FC] dark:bg-[#030303]">
      {/* Background Image - translates up and off-screen as user scrolls */}
      <div className={cn('w-full h-85 top-0 left-0 z-1 absolute')}>
        <BlurryImageEffect src={coverImageUrl} className="w-full h-full" />
      </div>

      <ProfileHeaderV2 slug={slug} />

      {/* Main Content Area */}
      <main className="relative z-40 mx-auto py-6 max-w-264 px-4">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Content Area */}
          <section className="relative min-w-0 flex-1">
            {isFeedsPage && (
              <JoinCallCards />
            )}
            {children}
            {!isLoggedIn && <LoggedOutCTA scrollThreshold={300} />}
          </section>

          {/* Desktop Sidebar */}
          {showSidebar && !isStreamsPage && (
            <aside className="hidden w-80 shrink-0 lg:block">
              <div className="sticky top-20">
                <ProfileSidebar slug={slug} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
