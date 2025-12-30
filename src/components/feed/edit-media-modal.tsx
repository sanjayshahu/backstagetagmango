'use client';

import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Play, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modal';
import { MediaThumbnail, type MediaItem } from './media-preview';
import { useSession } from '@/lib/auth-client';
import { BlurryImageEffect } from '../profile/BlurryImageEffect';

interface EditMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: MediaItem[];
  onDone: (reorderedItems: MediaItem[]) => void;
  onRemove: (id: string) => void;
}

interface SortableItemProps {
  item: MediaItem;
  onRemove: (id: string) => void;
}

function SortableItem({ item, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden ${isDragging ? 'opacity-0' : ''
        }`}
      {...attributes}
      {...listeners}
    >
      <MediaGridItem item={item} onRemove={onRemove} showRemove={!isDragging} />
    </div>
  );
}

function MediaGridItem({
  item,
  onRemove,
  showRemove = false,
  isDragOverlay = false,
}: {
  item: MediaItem;
  onRemove?: (id: string) => void;
  showRemove?: boolean;
  isDragOverlay?: boolean;
}) {
  return (
    <div
      className={`relative h-45 w-full rounded-2xl overflow-hidden bg-muted ${isDragOverlay ? 'shadow-2xl ring-2 ring-accent-9' : ''
        }`}
    >
      {/* Content based on type */}
      {item.type === 'image' && (
        <div className="w-full h-full">
          <MediaThumbnail
            item={{ ...item, isUploading: false }}
            height="180px"
          />
        </div>
      )}

      {item.type === 'video' && (
        <>
          {/* Background video */}
          <video
            src={item.url}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            muted
            playsInline
          />
          {/* Overlay with backdrop blur */}
          {/* <div className="absolute inset-0 backdrop-blur-[25px] bg-black/50 flex flex-col items-center justify-center gap-1"> */}
          {/* Play icon */}
          <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
          {/* </div> */}
        </>
      )}

      {item.type === 'audio' && (
        <div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          {item.file && (
            <span className="text-xs text-white/80 text-center truncate max-w-full px-2">
              {item.file.name}
            </span>
          )}
        </div>
      )}

      {/* Remove button */}
      {showRemove && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-opacity z-10"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}

export function EditMediaModal({
  open,
  onOpenChange,
  items,
  onDone,
  onRemove,
}: EditMediaModalProps) {
  const [localItems, setLocalItems] = useState<MediaItem[]>(items);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data: userData } = useSession();

  // Sync local items when modal opens with new items
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleRemove = (id: string) => {
    setLocalItems((items) => items.filter((item) => item.id !== id));
    onRemove(id);
  };

  const handleDone = () => {
    onDone(localItems);
    onOpenChange(false);
  };

  const activeItem = activeId
    ? localItems.find((item) => item.id === activeId)
    : null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={false}
      wrapperClassName="p-0!"
      className="min-w-264 rounded-3xl! overflow-hidden p-0!"
    >
      <div className="relative bg-background">
        {/* Cover image background */}
        <div className="absolute inset-x-0 top-0 overflow-hidden rounded-t-3xl">
          <BlurryImageEffect
            src={userData?.user.image ?? '/creator_dp.png'}
            className="w-full h-45"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl leading-7 tracking-[-0.016px] text-neutral-12">
              Edit media
            </h2>
            <Button
              type="button"
              onClick={handleDone}
              className="h-12 rounded-full px-6 text-lg font-medium leading-6.5 tracking-[-0.04px] bg-accent-9 hover:bg-accent-10 text-[#fff]"
            >
              Done
            </Button>
          </div>

          {/* Media Grid with Drag & Drop */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={localItems.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-3 gap-3">
                {localItems.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeItem ? (
                <MediaGridItem item={activeItem} isDragOverlay />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </Modal>
  );
}
