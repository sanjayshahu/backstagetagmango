'use client';

import * as React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

export interface MuxTranscoderConfig {
    assetId: string;
    playbackId?: string;
    status: 'preparing' | 'ready' | 'errored';
    uploadId?: string;
    duration?: number;
    aspectRatio?: string;
    resolution?: { width: number; height: number };
    errorMessage?: string;
    createdAt?: string;
    readyAt?: string;
}

export interface TranscoderConfig {
    mux?: MuxTranscoderConfig;
}

export interface MuxVideoPlayerProps {
    /** The transcoder configuration containing MUX playback info */
    transcoderConfig?: TranscoderConfig | null;
    /** Fallback video URL for direct playback (S3 URL) */
    fallbackUrl?: string;
    /** Accessible label for the video */
    ariaLabel?: string;
    /** Additional CSS classes */
    className?: string;
    /** Whether to autoplay (default: false) */
    autoPlay?: boolean;
    /** Whether to mute by default (default: false) */
    muted?: boolean;
    /** Whether to loop the video (default: false) */
    loop?: boolean;
    /** Poster image URL */
    poster?: string;
    /** Accent color for player controls */
    accentColor?: string;
}

// ============================================================================
// Main Component
// ============================================================================

export function MuxVideoPlayer({
    transcoderConfig,
    fallbackUrl,
    ariaLabel = 'Video',
    className,
    autoPlay = false,
    muted = false,
    loop = false,
    poster,
    accentColor = '#8B5CF6',
}: MuxVideoPlayerProps) {
    const muxConfig = transcoderConfig?.mux;

    // Determine video source
    const isReady = muxConfig?.status === 'ready' && muxConfig?.playbackId;
    const isErrored = muxConfig?.status === 'errored';
    const hasFallback = Boolean(fallbackUrl);

    // No video source available
    if (!isReady && !hasFallback) {
        return (
            <div
                className={cn(
                    'relative w-full aspect-4/3 bg-black rounded-lg overflow-hidden flex items-center justify-center',
                    className
                )}
            >
                <span className="text-sm text-white/60">Video unavailable</span>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'relative w-full aspect-4/3 bg-black rounded-lg overflow-hidden',
                className
            )}
        >
            {/* Error indicator overlay */}
            {isErrored && (
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-1 bg-red-500/80 rounded text-xs text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>Processing failed</span>
                </div>
            )}

            {/* MUX Player - uses playbackId when ready, src for fallback */}
            {isReady ? (
                <MuxPlayer
                    playbackId={muxConfig.playbackId}
                    streamType="on-demand"
                    accentColor={accentColor}
                    thumbnailTime={0}
                    poster={poster}
                    className="w-full h-full"
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    aria-label={ariaLabel}
                />
            ) : (
                <MuxPlayer
                    src={fallbackUrl}
                    streamType="on-demand"
                    accentColor={accentColor}
                    poster={poster}
                    className="w-full h-full"
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    aria-label={ariaLabel}
                />
            )}
        </div>
    );
}
