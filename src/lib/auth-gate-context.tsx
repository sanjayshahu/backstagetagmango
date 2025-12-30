'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import { getQueryClient } from '@/lib/query-client';
import { Loader2 } from 'lucide-react';
import { Login } from '@/components/login';

interface AuthGateContextValue {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Whether the session is still loading */
  isLoading: boolean;
  /** Whether the user is currently logging out */
  isLoggingOut: boolean;
  /** Opens the login modal - LoginModal fetches stage data internally via URL params */
  openLoginModal: () => void;
  /** Closes the login modal */
  closeLoginModal: () => void;
  /** Logs out the user with loading state */
  logout: () => Promise<void>;
}

const AuthGateContext = createContext<AuthGateContextValue | undefined>(
  undefined,
);

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isAuthenticated = !!session?.user;

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      getQueryClient().clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const openLoginModal = useCallback(() => {
    setLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, []);

  return (
    <AuthGateContext.Provider
      value={{
        isAuthenticated,
        isLoading: isPending,
        isLoggingOut,
        openLoginModal,
        closeLoginModal,
        logout,
      }}
    >
      {children}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
        </div>
      )}
      <Login open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </AuthGateContext.Provider>
  );
}

export function useAuthGate(): AuthGateContextValue {
  const context = useContext(AuthGateContext);
  if (context === undefined) {
    throw new Error('useAuthGate must be used within an AuthGateProvider');
  }
  return context;
}
