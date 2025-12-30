'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BellIcon } from '@phosphor-icons/react';
import UserInfoPopover from '../profile/user-info-popover';

interface HeaderActionsProps {
  isLoggedIn: boolean;
  isSessionPending: boolean;
  user?: any;
  onLoginClick: () => void;
  onLogout: () => void;
  streakCount?: number;
  isStickyHeader?: boolean;
}

export function HeaderActions({
  isLoggedIn,
  isSessionPending,
  user,
  onLoginClick,
  onLogout,
  streakCount = 0,
  isStickyHeader,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {isLoggedIn && user && (
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <Button
            variant="icon"
            size="icon"
            className={cn(
              'size-8',
              isStickyHeader
                ? 'border-neutral-alpha-8 text-neutral-12'
                : 'border-[rgba(245,241,255,0.72)] text-[#fff]',
            )}
            onClick={() => {
              console.log('notification clicked');
            }}
          >
            <BellIcon className="size-4" />
          </Button>
        </div>
      )}

      {/* Auth State */}
      {isSessionPending ? (
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      ) : isLoggedIn && user ? (
        <UserInfoPopover user={user} onLogout={onLogout} />
      ) : (
        <Button
          onClick={onLoginClick}
          className={cn(
            'border h-8 hover:bg-transparent bg-transparent ',
            isStickyHeader
              ? 'border-accent-12 text-accent-12'
              : 'border-[rgba(245,241,255,0.72)] text-[#F6E1BC]',
          )}
        >
          Log In
        </Button>
      )}
    </div>
  );
}
