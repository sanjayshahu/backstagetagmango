'use client';

import { useRouter } from 'next/navigation';
import { Plus, Ticket } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PassPerformance } from './pass-performance';
// Import sortable components from pass-card for DnD functionality
import {
  SortablePassCard,
  DragOverlayPassCard,
  type PassDisplayData,
} from './pass-card';
import { EmptyState } from '@/components/empty-state';
import { Text } from '../ui/text';
import { FunnelSimpleIcon } from '@phosphor-icons/react';

export type PassFilterType = 'active' | 'unpublished';

interface PassesDashboardProps {
  stageId: string;
  slug: string;
  passes: PassDisplayData[];
  isLoading?: boolean;
  filter: PassFilterType;
  onFilterChange: (filter: PassFilterType) => void;
  onPassClick?: (passId: string) => void;
  onEdit?: (passId: string) => void;
  onDelete?: (passId: string) => void;
  onViewMembers?: (passId: string) => void;
  onReorder?: (passIds: string[]) => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export function PassesDashboard({
  stageId,
  slug,
  passes,
  isLoading = false,
  filter,
  onFilterChange,
  onPassClick,
  onEdit,
  onDelete,
  onViewMembers,
  onReorder,
  theme = 'dark',
  className,
}: PassesDashboardProps) {
  const router = useRouter();
  const isDark = theme === 'dark';
  const [activeId, setActiveId] = useState<string | null>(null);

  // Local state for ordered passes - updates immediately on drag for smooth UX
  const [localPasses, setLocalPasses] = useState<PassDisplayData[]>(passes);

  // Track the last reordered IDs to prevent sync from reverting optimistic updates
  const lastReorderedIdsRef = useRef<string | null>(null);

  // Sync local state with props when passes change externally
  // (e.g., filter change, initial load, or after mutation settles)
  const passIdsKey = useMemo(() => passes.map((p) => p.id).join(','), [passes]);
  const localIdsKey = useMemo(
    () => localPasses.map((p) => p.id).join(','),
    [localPasses],
  );

  useEffect(() => {
    // Skip sync if this is our own optimistic reorder that hasn't been confirmed yet
    if (
      lastReorderedIdsRef.current &&
      lastReorderedIdsRef.current === localIdsKey
    ) {
      console.log(
        '[PassesDashboard] Skipping sync - optimistic update in progress:',
        {
          passIdsKey,
          localIdsKey,
          lastReorderedIds: lastReorderedIdsRef.current,
        },
      );

      // If the server response matches our optimistic update, clear the flag
      if (passIdsKey === lastReorderedIdsRef.current) {
        console.log(
          '[PassesDashboard] Server confirmed our order, clearing flag',
        );
        lastReorderedIdsRef.current = null;
      }
      return;
    }

    // Only sync if the passes actually changed (not just a re-render)
    if (passIdsKey !== localIdsKey) {
      console.log('[PassesDashboard] Syncing localPasses with props:', {
        passIdsKey,
        localIdsKey,
      });
      setLocalPasses(passes);
      lastReorderedIdsRef.current = null;
    }
  }, [passIdsKey, localIdsKey, passes]);

  // Extract pass IDs for performance stats filtering (use local order)
  const passIds = localPasses.map((p) => p.id);

  // Find the active pass for drag overlay
  const activePass = activeId
    ? localPasses.find((p) => p.id === activeId)
    : null;

  // DnD sensors for pointer and keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start drag after moving 8px to prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('[PassesDashboard] handleDragStart:', {
      activeId: event.active.id,
      activeData: event.active.data?.current,
      localPassesCount: localPasses.length,
      passIds,
    });
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('[PassesDashboard] handleDragEnd:', {
      activeId: active.id,
      overId: over?.id,
      activeData: active.data?.current,
      overData: over?.data?.current,
    });
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = localPasses.findIndex((p) => p.id === active.id);
      const newIndex = localPasses.findIndex((p) => p.id === over.id);

      console.log('[PassesDashboard] Reordering:', {
        oldIndex,
        newIndex,
        fromPassId: active.id,
        toPassId: over.id,
      });

      if (oldIndex !== -1 && newIndex !== -1) {
        // Update local state immediately for smooth visual feedback
        const newOrder = arrayMove(localPasses, oldIndex, newIndex);
        const newPassIds = newOrder.map((p) => p.id);
        const newIdsKey = newPassIds.join(',');

        // Track this optimistic update to prevent sync from reverting it
        lastReorderedIdsRef.current = newIdsKey;
        console.log('[PassesDashboard] Setting optimistic order:', newIdsKey);

        setLocalPasses(newOrder);

        // Then trigger the API call
        console.log('[PassesDashboard] New order:', newPassIds);
        onReorder?.(newPassIds);
      } else {
        console.warn('[PassesDashboard] Invalid indices:', {
          oldIndex,
          newIndex,
        });
      }
    } else {
      console.log(
        '[PassesDashboard] No reorder needed (same position or no target)',
      );
    }
  };

  const handleDragCancel = () => {
    console.log('[PassesDashboard] handleDragCancel');
    setActiveId(null);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    console.log('[PassesDashboard] handleDragMove:', {
      activeId: event.active.id,
      delta: event.delta,
      overId: event.over?.id,
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log('[PassesDashboard] handleDragOver:', {
      activeId: event.active.id,
      overId: event.over?.id,
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Performance section */}
      <PassPerformance stageId={stageId} passIds={passIds} />

      {/* Passes list section */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Text className={cn('text-2xl font-medium text-black')}>
            Your passes
          </Text>

          {/* Filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                requireAuth={false}
                className={cn(
                  'gap-2 rounded-full px-3 py-2 text-sm text-neutral-12 font-medium ring-0! outline-0!',
                )}
              >
                {filter === 'active' ? 'Active' : 'Unpublished'}
                <FunnelSimpleIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-neutral-1 border-neutral-3 outline-none rounded-2xl text-black p-2 min-w-36"
            >
              <DropdownMenuItem
                onClick={() => onFilterChange('active')}
                className={cn(
                  filter === 'active' && 'font-medium',
                  'hover:bg-neutral-alpha-2 px-3',
                )}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilterChange('unpublished')}
                className={cn(
                  filter === 'unpublished' && 'font-medium',
                  'hover:bg-neutral-alpha-2 px-3',
                )}
              >
                Unpublished
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Pass cards */}
        <div className="space-y-4">
          {isLoading ? (
            <div
              className={cn(
                'flex items-center justify-center py-12',
                isDark ? 'text-gray-400' : 'text-gray-500',
              )}
            >
              Loading passes...
            </div>
          ) : passes.length === 0 ? (
            <EmptyState
              icon={<Ticket className="w-8 h-8 text-muted-foreground" />}
              title="No passes yet"
              description="Create your first pass to offer exclusive content to your subscribers."
              action={{
                label: 'Create pass',
                onClick: () => router.push(`/${slug}/pass`),
                icon: <Plus className="w-4 h-4 mr-2" />,
                className:
                  'mt-4 bg-[#b8860b] hover:bg-[#9a7209] text-white rounded-lg',
              }}
            />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={passIds}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {localPasses.map((pass) => (
                    <SortablePassCard
                      key={pass.id}
                      pass={pass}
                      theme={theme}
                      onClick={onPassClick}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onViewMembers={onViewMembers}
                    />
                  ))}
                </div>
              </SortableContext>

              {/* Drag overlay for smooth drag visualization with elevation effect */}
              <DragOverlay
                dropAnimation={{
                  duration: 250,
                  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {activePass ? (
                  <DragOverlayPassCard pass={activePass} theme={theme} />
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
