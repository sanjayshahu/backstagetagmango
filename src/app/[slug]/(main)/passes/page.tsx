'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PassesDashboard, PassFilterType } from '@/components/passes/passes-dashboard';
import { mapPassToDisplayData } from '@/components/passes/pass-card';
import { UserPassesView } from '@/components/passes/user-passes-view';
import { useStageAccess } from '@/lib/stage-access-context';
import { useStagePasses, useDeletePass, useReorderPasses, PassVisibilityFilter } from '@/hooks/use-stages';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { toast } from 'sonner';

// Map UI filter to API visibility parameter
function filterToVisibility(filter: PassFilterType): PassVisibilityFilter {
  return filter === 'active' ? 'public' : 'hidden';
}

export default function PassesPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [filter, setFilter] = useState<PassFilterType>('active');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passToDelete, setPassToDelete] = useState<string | null>(null);

  // Get stage from context
  const { stage, isLoading: isStageLoading, role } = useStageAccess();
  const isOwner = role === 'owner';

  // Delete mutation
  const { deletePass, isPending: isDeleting } = useDeletePass();

  // For owners: use the filter-based visibility
  // Reorder mutation (needs visibility for query key matching)
  // For users: always fetch public passes only
  const visibility = isOwner ? filterToVisibility(filter) : 'public';

  // Fetch passes with appropriate visibility
  const { data: { passes = [] } = { passes: [] }, isLoading: isPassesLoading } = useStagePasses(
    { stageId: stage?.id ?? '', visibility },
    { enabled: !!stage?.id }
  );

  // Reorder mutation
  const { reorderPasses } = useReorderPasses(
    stage?.id ?? '',
    visibility
  );

  // Map API passes to display data (for owner view)
  const displayPasses = passes?.map((pass) => mapPassToDisplayData(pass)) ?? [];

  const isLoading = isStageLoading || isPassesLoading;
  const theme = 'light';

  const handlePassClick = (passId: string) => {
    router.push(`/${slug}/passes/${passId}/creator/details`);
  };

  const handleEdit = useCallback((passId: string) => {
    router.push(`/${slug}/pass?passId=${passId}`);
  }, [router, slug]);

  const handleDeleteClick = useCallback((passId: string) => {
    setPassToDelete(passId);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!passToDelete || !stage?.id) return;

    deletePass(
      { stageId: stage.id, passId: passToDelete },
      {
        onSuccess: () => {
          toast.success('Pass deleted successfully');
          setDeleteDialogOpen(false);
          setPassToDelete(null);
        },
        onError: () => {
          // Error toast is handled by mutation cache in query-client.ts
        },
      }
    );
  }, [passToDelete, stage?.id, deletePass]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setPassToDelete(null);
  }, []);

  const handleViewMembers = useCallback((passId: string) => {
    // Skip for now - placeholder
    handlePassClick(passId)
  }, []);

  const handleReorder = useCallback((passIds: string[]) => {
    if (!stage?.id) return;

    reorderPasses(
      { stageId: stage.id, passIds },
      {
        onError: () => {
          toast.error('Failed to reorder passes');
        },
      }
    );
  }, [stage?.id, reorderPasses]);

  // Render user view for non-owners
  if (!isOwner) {
    return (
      <div className="mt-6">
        <UserPassesView
          passes={passes ?? []}
          slug={slug}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Get the pass being deleted for the confirmation dialog
  const passToDeleteObj = passToDelete
    ? passes?.find((p) => p.id === passToDelete)
    : null;
  const passToDeleteName = passToDeleteObj?.name ?? 'this pass';
  const isPublished = passToDeleteObj?.visibility === 'public';

  // Render owner/creator view
  return (
    <>
      <PassesDashboard
        stageId={stage?.id ?? ''}
        slug={slug}
        passes={displayPasses}
        isLoading={isLoading}
        filter={filter}
        onFilterChange={setFilter}
        onPassClick={handlePassClick}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onViewMembers={handleViewMembers}
        onReorder={handleReorder}
        theme={theme}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          title={isPublished ? 'Unpublish Pass' : 'Publish Pass'}
          className="bg-neutral-1"
          showCloseButton={false}
        >
          <div className="px-6 py-4">
            <Text className="text-neutral-11">
              Are you sure you want to {isPublished ? 'unpublish' : 'publish'}{' '}
              <strong>{passToDeleteName}</strong>?
            </Text>
          </div>
          <DialogFooter className="border-t border-neutral-alpha-4 px-6 py-4">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              disabled={isDeleting}
              requireAuth={false}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              requireAuth={false}
              className={isPublished
                ? 'bg-error-10 text-white hover:bg-error-11'
                : 'bg-success-10 text-white hover:bg-success-11'}
            >
              {isDeleting
                ? (isPublished ? 'Unpublishing...' : 'Publishing...')
                : (isPublished ? 'Unpublish' : 'Publish')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
