'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  PassCard,
  type PassCardProps,
} from '@/components/pass/pass-card';
import { Text } from '../ui/text';
import { CopySimpleIcon, CheckIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
// import { PASS_THEME_IMAGES } from '../passes/pass-details-view';
import { useParams } from 'next/navigation';
import { useStageAccess } from '@/lib/stage-access-context';
import Link from 'next/link';
import { PASS_CARD_VERTICAL_IMAGE, PassTheme } from '../passes/utils';

// ============================================
// Types & Interfaces
// ============================================
export interface PassCreatedSuccessProps {
  pass: Omit<PassCardProps, 'onJoinPass'>;
  onJoinPass?: () => void;
  onSkip?: () => void;
  isCreator?: boolean;
}

// ============================================
// Theme Background Gradients
// ============================================
const THEME_BACKGROUNDS: Record<PassTheme, string> = {
  silver:
    'linear-gradient(135deg, #8B7BAA 0%, #9B8ABB 25%, #7A6A99 50%, #6B5B8A 75%, #8B7BAA 100%)',
  bronze:
    'linear-gradient(135deg, #C4973A 0%, #D4A74A 25%, #B48720 50%, #A47710 75%, #C4973A 100%)',
  charcoal:
    'linear-gradient(135deg, #4A4A4A 0%, #5A5A5A 25%, #3A3A3A 50%, #2A2A2A 75%, #4A4A4A 100%)',
  gold: 'linear-gradient(135deg, #D4A520 0%, #E4B530 25%, #C49510 50%, #B48500 75%, #D4A520 100%)',
  navy: 'linear-gradient(135deg, #4A5A8A 0%, #5A6A9A 25%, #3A4A7A 50%, #2E3A5C 75%, #4A5A8A 100%)',
};

// ============================================
// Component
// ============================================
export function PassCreatedSuccess({
  pass,
  onJoinPass,
  onSkip,
  isCreator = false,
}: PassCreatedSuccessProps) {
  const [copied, setCopied] = useState(false);
  const theme = pass.theme || 'silver';
  const backgroundGradient = THEME_BACKGROUNDS[theme];
  const { passId } = useParams()
  const { stage } = useStageAccess()

  const domain = window.location.host
  const passUrl = `${domain}/${stage.slug}/passes/${passId}/user/details`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(passUrl);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link');
    }
  };

  const themeImage = PASS_CARD_VERTICAL_IMAGE;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Base gradient background - hidden on mobile */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          background: backgroundGradient,
        }}
      />
      {/* Blurred SVG layer for texture */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: 'url(/BG.svg)',
          filter: 'blur(400px)',
        }}
      />
      {/* Subtle overlay */}
      <div
        className="hidden md:block absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.05)' }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        {!isCreator ? (
          /* Container with dashed border */
          <div className="flex flex-col items-center gap-6 p-6 rounded-2xl w-121">
            {/* Pass card */}
            <PassCard {...pass} theme={theme} onJoinPass={onJoinPass} />

            {/* Skip link */}
            <Button
              variant="ghost"
              onClick={onSkip}
              requireAuth={false}
              className="text-sm font-medium hover:opacity-80 hover:bg-transparent"
              style={{ color: 'rgba(238, 238, 240, 1)' }}
            >
              I will join this later
            </Button>
          </div>
        ) : (
          /* Pass card without container */
          <div className="w-121 flex flex-col justify-center gap-3">
            <div className="flex flex-col justify-center h-full w-full items-center gap-8">
              <Text className="text-static-white">
                🎉 Pass created successfully
              </Text>
              <div className="flex flex-col gap-6 px-12.5">
                <div className="px-[5.5px]">
                  <PassCard
                    {...pass}
                    description={(pass?.description as unknown as string) || ''}
                    themeImage={themeImage}
                    onJoinPass={() => { }}
                    isJoinButtonDisabled={true}
                    joinButtonDisabledText="Join Pass"
                    joinButtonDisabledTooltip="Your subscribers will be redirected to payment page from here"
                  />
                </div>
                <Text className="text-[16px] font-medium">
                  Your pass link is ready to share with your audience
                </Text>
              </div>
            </div>
            <div
              className="flex justify-center bg-static-neutral-alpha-3 rounded-full text-static-neutral-12"
              style={{
                display: 'flex',
                height: '48px',
                padding: '0 4px',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}
            >
              <Text className="px-3 truncate min-w-0 flex-1">https://{passUrl}</Text>
              <button
                onClick={handleCopy}
                className="shrink-0 cursor-pointer"
                style={{
                  display: 'flex',
                  width: '40px',
                  height: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  background: '#EEEEF0',
                }}
              >
                {copied ? (
                  <CheckIcon className="size-6 text-static-neutral-1" />
                ) : (
                  <CopySimpleIcon className="size-6 text-static-neutral-1" />
                )}
              </button>
            </div>

            <div className="text-lg flex justify-center items-center h-12 mt-1 ">
              <Link href={`/${stage.slug}/passes`} className="text-static-neutral-11 hover:text-neutral-12 cursor-pointer">
                I will share this later
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
