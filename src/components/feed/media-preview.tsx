'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { X, Play, Music, Loader2 } from 'lucide-react';
import { CaretLeftIcon, CaretRightIcon, PencilSimple, PencilSimpleIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import type { AssetResponseDto } from '@backstage-pass/api';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  file?: File; // For local preview before upload
  isUploading?: boolean;
}

interface MediaPreviewProps {
  items: MediaItem[];
  onRemove: (id: string) => void;
  onReorder?: (reorderedItems: MediaItem[]) => void;
  onEditClick?: () => void;
}

export function MediaThumbnail({
  item,
  onRemove,
  height = '360px',
}: {
  item: MediaItem;
  onRemove?: () => void;
  height?: string;
}) {
  const isUploading = item.isUploading;

  return (
    <div
      className={`relative group  rounded-2xl overflow-hidden bg-muted w-full`}
      style={{
        height
      }}
    >
      {/* Content based on type */}
      {item.type === 'image' && (
        <>
          {/* Background image filling container */}
          <img
            src={item.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-2xl"
          />
          {/* Overlay with backdrop blur - Figma: backdrop-blur-[25px] bg-black/50 */}
          <div className="absolute h-full rounded-2xl overflow-hidden inset-0 backdrop-blur-[25px] bg-black/50 flex items-center justify-center">
            {/* Inner image container - Figma: h-[232px] object-cover */}
            <div className="w-full h-full">
              <img
                src={item.url}
                alt="Upload preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </>
      )}

      {item.type === 'video' && (
        <>
          {/* Background video filling container */}
          <video
            src={item.url}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-2xl"
            muted
            playsInline
          />
          {/* Overlay with backdrop blur - same as image */}
          <div className="absolute h-full rounded-2xl overflow-hidden inset-0 backdrop-blur-[25px] bg-black/50 flex items-center justify-center">
            {/* Inner video container */}
            <div className="relative w-full h-full">
              <video
                src={item.url}
                className="w-full h-full object-contain"
                muted
                playsInline
              />
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {item.type === 'audio' && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Music className="w-6 h-6 text-primary" />
          </div>
          {item.file && (
            <span className="text-xs text-muted-foreground text-center truncate max-w-full">
              {item.file.name}
            </span>
          )}
        </div>
      )}

      {/* Upload progress overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      )}

      {/* Remove button */}
      {!isUploading && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          requireAuth={false}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 hover:bg-black/80 z-10"
        >
          <X className="w-4 h-4 text-white" />
        </Button>
      )}
    </div>
  );
}

function MediaCarousel({
  items,
  onRemove,
  onEdit,
}: {
  items: MediaItem[];
  onRemove: (id: string) => void;
  onEdit?: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel container */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0">
              <MediaThumbnail item={item} onRemove={() => onRemove(item.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - centered vertically */}
      <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
        <button
          type="button"
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full backdrop-blur-[10px] bg-[#0303037d] flex items-center justify-center pointer-events-auto transition-opacity cursor-pointer"
        >
          <CaretLeftIcon size={24} className="text-neutral-12" weight="regular" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="w-10 h-10 rounded-full backdrop-blur-[10px] bg-[#0303037d] flex items-center justify-center pointer-events-auto transition-opacity cursor-pointer"
        >
          <CaretRightIcon size={24} className="text-neutral-12" weight="regular" />
        </button>
      </div>

      {/* Edit button - top left */}
      {onEdit && (
        <div className="absolute top-4 left-4 z-10">
          <button
            type="button"
            onClick={onEdit}
            className="h-10 px-4 rounded-full bg-neutral-12 flex items-center gap-3 text-neutral-1 font-medium text-base"
          >
            <PencilSimple size={18} weight="regular" />
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export function MediaPreview({
  items,
  onRemove,
  onEditClick,
}: MediaPreviewProps) {
  if (items.length === 0) {
    return null;
  }

  // Use carousel for multiple items, single view for one item
  if (items.length > 1) {
    return (
      <div className="border border-neutral-6 rounded-3xl p-2">
        <MediaCarousel
          items={items}
          onRemove={onRemove}
          onEdit={onEditClick}
        />
      </div>
    );
  }

  // Single item - no carousel needed
  return (
    <div className="border border-neutral-6 rounded-3xl p-2">
      <div className="relative">
        <MediaThumbnail
          item={items[0]}
          onRemove={() => onRemove(items[0].id)}
        />
        {/* Edit button for single item */}
        {onEditClick && (
          <div className="absolute top-4 left-4 z-10">
            <button
              type="button"
              onClick={onEditClick}
              className="h-10 px-4 rounded-full bg-neutral-12 flex items-center gap-3 text-neutral-1 font-medium text-base"
            >
              <PencilSimpleIcon size={18} weight="regular" />
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to create media item from file
export function createMediaItemFromFile(file: File): MediaItem {
  const type = file.type.startsWith('image/')
    ? 'image'
    : file.type.startsWith('video/')
      ? 'video'
      : 'audio';

  return {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    url: URL.createObjectURL(file),
    file,
    isUploading: true,
  };
}

// Helper to create media item from uploaded asset
export function createMediaItemFromAsset(asset: AssetResponseDto): MediaItem {
  return {
    id: asset.id,
    type: asset.type,
    url: asset.compressedUrl ? String(asset.compressedUrl) : asset.url,
    isUploading: false,
  };
}

export type { MediaItem };
