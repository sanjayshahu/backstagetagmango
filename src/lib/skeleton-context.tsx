'use client';

import { createContext, useContext } from 'react';

const SkeletonContext = createContext<boolean>(false);

export function SkeletonProvider({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <SkeletonContext.Provider value={loading}>
      {children}
    </SkeletonContext.Provider>
  );
}

export function useSkeletonLoading(localLoading?: boolean): boolean {
  const contextLoading = useContext(SkeletonContext);
  return localLoading ?? contextLoading;
}
