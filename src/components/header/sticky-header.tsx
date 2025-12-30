'use client';

import { AvatarComponent } from '../avatar-component';
import { HeaderActions } from './header-action-buttons';
import { ProfileHeaderTabs } from './header-tabs';

interface StickyHeaderProps {
  slug: string;
  avatarSrc?: string;
  name?: string;
  isLoggedIn: boolean;
  isSessionPending: boolean;
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
  isHeaderSticky?: boolean;
}

export function StickyHeader({
  slug,
  avatarSrc,
  name,
  isLoggedIn,
  isSessionPending,
  user,
  onLoginClick,
  onLogout,
  isHeaderSticky,
}: StickyHeaderProps) {
  return (
    <header className="w-full z-100 bg-white/60 backdrop-blur-3xl justify-between gap-3 grid grid-cols-3 px-6 h-15">
      <div className="flex items-center gap-3 h-full">
        <AvatarComponent
          src={avatarSrc}
          username={name}
          size="size-8"
          className="shadow-md"
        />

        <h2 className="text-base font-semibold text-neutral-12 truncate">
          {name}
        </h2>
      </div>
      {/* Tabs */}
      <div className="h-full flex justify-center items-center">
        <ProfileHeaderTabs slug={slug} stickyHeader />
      </div>
      <div className="flex justify-end h-full items-center">
        <HeaderActions
          isLoggedIn={isLoggedIn}
          isSessionPending={isSessionPending}
          user={user}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          streakCount={30}
          isStickyHeader={isHeaderSticky}
        />
      </div>
    </header>
  );
}
