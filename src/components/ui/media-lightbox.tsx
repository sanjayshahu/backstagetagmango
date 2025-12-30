'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import NextImage from 'next/image';
import { Button } from './button';

// ============================================================================
// Types
// ============================================================================

export interface MediaLightboxItem {
    url: string;
    alt?: string;
}

export interface MediaLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    media: MediaLightboxItem[];
    initialIndex?: number;
}

// ============================================================================
// Main Component
// ============================================================================

export function MediaLightbox({
    isOpen,
    onClose,
    media,
    initialIndex = 0,
}: MediaLightboxProps) {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

    // Reset index when opening with new initialIndex
    React.useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    const currentMedia = media[currentIndex];
    const hasMultiple = media.length > 1;

    const goToPrevious = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    }, [media.length]);

    const goToNext = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, [media.length]);

    // Keyboard navigation
    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, goToPrevious, goToNext]);

    if (!currentMedia) return null;

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />
                <DialogPrimitive.Content
                    className="fixed inset-0 z-50 flex items-center justify-center focus:outline-none"
                    onClick={() => {
                        onClose()
                    }}
                >
                    <DialogPrimitive.Title className="sr-only">
                        Image viewer
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="sr-only">
                        Viewing image {currentIndex + 1} of {media.length}
                    </DialogPrimitive.Description>

                    <DialogPrimitive.Close className="size-10 flex items-center justify-center absolute text-black right-4 top-4 bg-neutral-alpha-3 hover:bg-neutral-alpha-6 hover:text-black disabled:pointer-events-none hover:cursor-pointer rounded-full">
                        <X className="size-6" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>

                    {/* Previous button */}
                    {hasMultiple && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                goToPrevious()
                            }}
                            requireAuth={false}
                            className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="size-6" />
                        </Button>
                    )}

                    {/* Image container */}
                    <div className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center">
                        <NextImage
                            src={currentMedia.url}
                            alt={currentMedia.alt || 'Image'}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log('Clicked on Image')
                            }}
                        />
                    </div>

                    {/* Next button */}
                    {hasMultiple && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                goToNext()
                            }}
                            requireAuth={false}
                            className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight className="size-6" />
                        </Button>
                    )}

                    {/* Image counter */}
                    {hasMultiple && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                            {currentIndex + 1} / {media.length}
                        </div>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
