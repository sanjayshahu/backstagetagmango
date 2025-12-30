'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HeaderActions } from './header-action-buttons';
import MainLogo from '../../../public/images/logo/logo.svg'

interface ProfileHeaderTopBarProps {
  isLoggedIn: boolean;
  isSessionPending: boolean;
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function PageHeader({
  isLoggedIn,
  isSessionPending,
  user,
  onLoginClick,
  onLogout,
}: ProfileHeaderTopBarProps) {
  return (
    <header
      className={cn(
        'relative z-200 w-full flex justify-between gap-3 py-3.5 px-6',
      )}
    >
      {/* Left */}
      <Image
        src={MainLogo}
        alt="backpass-logo"
        width={300}
        height={80}
        className="h-6 w-auto"
      />

      {/* Right */}
      <HeaderActions
        isLoggedIn={isLoggedIn}
        isSessionPending={isSessionPending}
        user={user}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        streakCount={30}
      />
    </header>
  );
}
