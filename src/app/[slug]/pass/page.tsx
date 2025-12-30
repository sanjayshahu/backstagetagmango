'use client';

import { useEffect } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useStageAccess } from '@/lib/stage-access-context';
import { usePass } from '@/hooks/use-stages';
import { SkeletonProvider } from '@/lib/skeleton-context';
import ProfileCollapsedHeader from '@/components/profile/profile-collapsed-header';
import { PassForm } from '@/components/passes/pass-form';
import { Text } from '@/components/ui/text';

export default function PassPage() {
  const searchParams = useSearchParams();
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  // Get passId from query params - if present, we're in edit mode
  const passId = searchParams.get('passId');
  const mode = passId ? 'edit' : 'create';

  // Get stage from context
  const { stage, isLoading: stageLoading, permissions } = useStageAccess();

  // Redirect non-staff users to passes list
  useEffect(() => {
    if (!stageLoading && !permissions.canCreatePasses) {
      router.push(`/${slug}/passes`);
    }
  }, [stageLoading, permissions.canCreatePasses, router, slug]);

  // Fetch pass data only in edit mode
  const { data: pass, isLoading: passLoading } = usePass(
    stage?.id ?? '',
    passId ?? '',
    { enabled: mode === 'edit' && !!stage?.id && !!passId }
  );

  // Show loading state while fetching required data
  const isLoading = stageLoading || (mode === 'edit' && passLoading);

  // In edit mode, wait for pass data to load
  if (mode === 'edit' && !pass && !passLoading && stage?.id) {
    // Pass not found - could redirect or show error
    return (
      <div className="relative h-screen overflow-hidden bg-neutral-1 dark:bg-neutral-12">
        <ProfileCollapsedHeader />
        <div className="relative z-10 flex h-[calc(100vh-60px)] items-center justify-center">
          <Text className="text-neutral-alpha-11">Pass not found</Text>
        </div>
      </div>
    );
  }

  return (
    <SkeletonProvider loading={isLoading}>
      <div className="overflow-scroll">
        <ProfileCollapsedHeader />
        <PassForm
          mode={mode}
          stageId={stage?.id ?? ''}
          initialData={pass}
          passId={passId ?? undefined}
        />
      </div>
    </SkeletonProvider>
  );
}
