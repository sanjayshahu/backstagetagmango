'use client';
import { Login } from '@/components/login';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useSession } from '@/lib/auth-client';
import { useAuthGate } from '@/lib/auth-gate-context';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import MainLogo from '../../../public/images/logo/logo.svg';

export default function ProfileCollapsedHeader() {
  const { data: session, isPending: isSessionPending } = useSession();
  const { logout } = useAuthGate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const user = session?.user;
  const isLoggedIn = !!user;

  return (
    <div className="sticky top-0 w-full h-15 flex items-center justify-between px-6 py-3.5 z-10">
      <div className="flex items-center gap-2.5">
        <Image src={MainLogo} alt="backpass-logo" className="h-6 w-auto" />
      </div>

      <div className="flex items-center gap-3">
        {isSessionPending ? (
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        ) : isLoggedIn && user ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-neutral-4 hover:bg-muted h-8 w-8"
            onClick={() => logout()}
          >
            <LogOut className="w-4 h-4 text-white" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="rounded-full px-3 h-8 text-sm border-foreground/60 text-[#413725] hover:bg-muted"
            onClick={() => setLoginModalOpen(true)}
          >
            Log In
          </Button>
        )}
      </div>

      <Login open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
}
