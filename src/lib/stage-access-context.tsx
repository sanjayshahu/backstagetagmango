'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import {
  useSession,
  SessionStageRole,
  ExtendedSessionData,
} from '@/lib/auth-client';
import { useStage, useStagePasses } from '@/hooks/use-stages';

// Role type alias for convenience
export type Role = SessionStageRole;

// Stage type
interface Stage {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  subscribersCount: number;
  postsCount: number;
  owner: {
    id: string;
    name: string;
    image: string | null;
  };
}

// Simplified subscribed pass type
interface SubscribedPass {
  id: string;
  name: string;
  passType: 'free' | 'paid';
  isGroundPass: boolean;
  allowSubscriberPosting: boolean;
}

// Permissions type
interface StagePermissions {
  canViewPosts: boolean;
  canCreatePosts: boolean;
  canViewStreams: boolean;
  canCreateStreams: boolean;
  canViewChallenges: boolean;
  canCreateChallenges: boolean;
  canCreatePasses: boolean;
}

// New context value structure
interface StageAccessContextValue {
  stage: Stage;
  role: Role | null;
  subscribedPasses: SubscribedPass[];
  permissions: StagePermissions;
  isLoading: boolean;
}

const StageAccessContext = createContext<StageAccessContextValue | undefined>(
  undefined
);

// Default stage for loading state
const DEFAULT_STAGE: Stage = {
  id: '',
  name: '',
  slug: '',
  description: null,
  image: null,
  subscribersCount: 0,
  postsCount: 0,
  owner: {
    id: '',
    name: '',
    image: null,
  },
};

export function StageAccessProvider({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { data: session, isPending: sessionPending } = useSession();

  // Cast session to ExtendedSessionData to access stages array
  const extendedSession = session as ExtendedSessionData | null;

  // Fetch stage data
  const { data: stageData, isLoading: stageLoading } = useStage(slug);

  // Find current stage access from session
  const stageAccess = useMemo(() => {
    if (!extendedSession?.stages || !stageData) return null;
    return (
      extendedSession.stages.find((s) => s.stageId === stageData.id) ?? null
    );
  }, [extendedSession?.stages, stageData]);

  // Get role directly from session
  const role = stageAccess?.role ?? null;

  // Only fetch subscribed passes for subscribers (not members)
  const isStageSubscriber = role === 'subscriber';

  const { data: { passes: passesData = [] } = { passes: [] }, isLoading: passesLoading } = useStagePasses(
    {
      stageId: stageData?.id ?? '',
      onlySubscribed: isStageSubscriber ? true : undefined,
    },
    { enabled: !!stageData?.id && isStageSubscriber }
  );

  // Map passes to subscribedPasses - no client-side filtering needed
  const subscribedPasses: SubscribedPass[] = useMemo(() => {
    if (!passesData) return [];
    return passesData.map((pass) => ({
      id: pass.id,
      name: pass.name,
      passType: pass.passType,
      isGroundPass: pass.isGroundPass,
      allowSubscriberPosting: pass.allowSubscriberPosting,
    }));
  }, [passesData]);

  const value = useMemo(() => {
    // Map stage data to our interface
    const stage: Stage = stageData
      ? {
          id: stageData.id,
          name: stageData.name,
          slug: stageData.slug,
          description: stageData.description as string | null,
          image: stageData.image as string | null,
          subscribersCount: stageData.subscribersCount,
          postsCount: stageData.postsCount,
          owner: {
            id: stageData.owner.id,
            name: stageData.owner.name,
            image: (stageData.owner.image as string | null) ?? null,
          },
        }
      : DEFAULT_STAGE;

    // Check if user is staff (owner, admin, or moderator)
    const isStaff =
      role === 'owner' || role === 'admin' || role === 'moderator';

    // Use allowedToPostOnFeed from session for permissions
    const permissions: StagePermissions = {
      canViewPosts: true,
      canViewStreams: true,
      canViewChallenges: true,
      canCreatePosts: stageAccess?.allowedToPostOnFeed ?? false,
      canCreateStreams: isStaff,
      canCreateChallenges: role === 'owner',
      canCreatePasses: isStaff,
    };

    return {
      stage,
      role,
      subscribedPasses,
      permissions,
      isLoading:
        sessionPending || stageLoading || (isStageSubscriber && passesLoading),
    };
  }, [
    stageData,
    stageAccess,
    role,
    subscribedPasses,
    sessionPending,
    stageLoading,
    passesLoading,
    isStageSubscriber,
  ]);

  return (
    <StageAccessContext.Provider value={value}>
      {children}
    </StageAccessContext.Provider>
  );
}

export function useStageAccess(): StageAccessContextValue {
  const context = useContext(StageAccessContext);
  if (context === undefined) {
    throw new Error(
      'useStageAccess must be used within a StageAccessProvider'
    );
  }
  return context;
}

// Export types for consumers
export type {
  Stage,
  SubscribedPass,
  StagePermissions,
  StageAccessContextValue,
};
