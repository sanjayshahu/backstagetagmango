// app/backstagepass/layout.tsx
import React from 'react';
import { StageAccessProvider } from '@/lib/stage-access-context';

export default function BackstagePassLayout({ children }: { children: React.ReactNode }) {
  return (
    <StageAccessProvider slug="backstagepass">
      <div className="min-h-screen bg-neutral-50 p-6">
        {children}
      </div>
    </StageAccessProvider>
  );
}
