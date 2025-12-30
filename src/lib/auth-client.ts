import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';

/**
 * Roles a user can have in a stage.
 */
export type SessionStageRole = 'owner' | 'admin' | 'moderator' | 'subscriber';

/**
 * Stage access information included in session data.
 */
export interface SessionStageAccess {
  stageId: string;
  stageName: string;
  stageSlug: string;
  role: SessionStageRole;
  allowedToPostOnFeed: boolean;
}

/**
 * Extended session data with stage access info.
 * This augments the default Better Auth session with custom fields.
 */
export interface ExtendedSessionData {
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
  };
  stages: SessionStageAccess[];
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [emailOTPClient()],
});

export const { signIn, signOut, signUp, useSession, getSession, emailOtp } =
  authClient;

/**
 * Get session with extended stage access data.
 * Use this instead of getSession() when you need stage information.
 */
export async function getExtendedSession(): Promise<ExtendedSessionData | null> {
  const session = await getSession();
  if (!session.data) return null;
  // The API returns stages in the session response via customSession plugin
  return session.data as unknown as ExtendedSessionData;
}
