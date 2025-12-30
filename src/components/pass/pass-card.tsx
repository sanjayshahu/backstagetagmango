'use client';

import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipProvider } from '../ui/tooltip';
import { PASS_THEME_COLORS, PassImage, PassTheme } from '../passes/utils';
import { Text } from '../ui/text';

export interface PassCardProps {
  name: string;
  description?: string;
  price: string;
  priceType: 'onetime' | 'recurring';
  currency?: string;
  theme?: PassTheme;
  badgeIcon?: React.ReactNode;
  themeImage?: string;
  onJoinPass?: () => void;
  isJoinButtonDisabled?: boolean;
  joinButtonDisabledText?: string;
  joinButtonDisabledTooltip?: string;
  id?: string;
  stageId?: string;
  slug?: string;
}

const MiddleNotchSvg = ({
  fill,
  stroke,
  id,
}: {
  fill: string;
  stroke: string;
  id: string;
}) => (
  <svg
    className="w-full block"
    viewBox="0 0 384 32"
    preserveAspectRatio="none"
    style={{ height: '32px' }}
    fill="none"
  >
    <defs>
      <mask id={`notchMask-${id}`}>
        <rect width="384" height="32" fill="white" />
        {/* Left semi-circle cutout */}
        <circle cx="0" cy="16" r="16" fill="black" />
        {/* Right semi-circle cutout */}
        <circle cx="384" cy="16" r="16" fill="black" />
      </mask>
    </defs>
    {/* Main rectangle with notch cutouts */}
    <rect width="384" height="32" fill={fill} mask={`url(#notchMask-${id})`} />
    {/* Left arc border - smooth semi-circle */}
    <path
      d="M0 0 A16 16 0 0 0 0 32"
      stroke={stroke}
      strokeWidth="1"
      fill="none"
    />
    {/* Right arc border - smooth semi-circle */}
    <path
      d="M384 0 A16 16 0 0 1 384 32"
      stroke={stroke}
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

const BottomZigzagSvg = ({ fill }: { fill: string }) => (
  <svg
    className="w-full block"
    viewBox="0 0 384 11"
    preserveAspectRatio="none"
    style={{ height: '11px' }}
    fill="none"
  >
    <path
      d={`
        M0 0
        L0 0.931
        C0 1.713 0.477 2.396 1.03 2.948
        L6.887 8.79
        C8.448 10.347 10.975 10.347 12.536 8.79
        L18.393 2.948
        C19.954 1.391 22.481 1.391 24.042 2.948
        L29.9 8.791
        C31.462 10.348 33.989 10.348 35.55 8.791
        L41.408 2.948
        C42.969 1.391 45.496 1.391 47.058 2.948
        L52.914 8.79
        C54.475 10.347 57.002 10.347 58.563 8.79
        L64.42 2.948
        C65.981 1.391 68.508 1.391 70.069 2.948
        L75.928 8.791
        C77.489 10.348 80.016 10.348 81.577 8.791
        L87.436 2.948
        C88.997 1.391 91.524 1.391 93.085 2.948
        L98.941 8.79
        C100.503 10.347 103.03 10.347 104.591 8.79
        L110.447 2.948
        C112.008 1.391 114.535 1.391 116.097 2.948
        L121.956 8.791
        C123.517 10.347 126.043 10.347 127.604 8.791
        L133.464 2.948
        C135.025 1.392 137.551 1.392 139.112 2.948
        L144.969 8.79
        C146.53 10.347 149.057 10.347 150.618 8.79
        L156.475 2.948
        C158.036 1.391 160.563 1.391 162.124 2.948
        L167.983 8.791
        C169.545 10.347 172.071 10.347 173.632 8.791
        L179.491 2.948
        C181.053 1.391 183.58 1.391 185.141 2.948
        L190.997 8.79
        C192.558 10.347 195.085 10.347 196.646 8.79
        L202.505 2.948
        C204.066 1.391 206.593 1.391 208.154 2.948
        L214.011 8.79
        C215.572 10.347 218.099 10.347 219.66 8.79
        L225.519 2.948
        C227.08 1.391 229.607 1.391 231.168 2.948
        L237.024 8.79
        C238.586 10.347 241.113 10.347 242.674 8.79
        L248.532 2.948
        C250.094 1.391 252.621 1.391 254.182 2.948
        L260.038 8.79
        C261.599 10.347 264.126 10.347 265.688 8.79
        L271.546 2.948
        C273.107 1.391 275.634 1.391 277.195 2.948
        L283.052 8.79
        C284.613 10.347 287.14 10.347 288.701 8.79
        L294.56 2.948
        C296.121 1.391 298.648 1.391 300.21 2.948
        L306.065 8.79
        C307.627 10.347 310.154 10.347 311.715 8.79
        L317.573 2.948
        C319.134 1.391 321.661 1.391 323.223 2.948
        L329.079 8.79
        C330.64 10.347 333.167 10.347 334.729 8.79
        L340.587 2.948
        C342.148 1.391 344.675 1.391 346.236 2.948
        L352.093 8.79
        C353.654 10.347 356.181 10.347 357.742 8.79
        L363.6 2.948
        C365.161 1.391 367.688 1.391 369.25 2.948
        L375.107 8.79
        C376.668 10.347 379.195 10.347 380.756 8.79
        C382.833 6.719 384 3.906 384 0.973
        L384 0
        Z
      `}
      fill={fill}
    />
  </svg>
);

export function PassCard({
  name,
  description,
  price,
  priceType,
  theme = 'silver',
  isJoinButtonDisabled = false,
  joinButtonDisabledText = 'Join Pass',
  joinButtonDisabledTooltip = 'You are not authorized to join this pass',
  onJoinPass,
}: PassCardProps) {
  const uniqueId = useId();

  const priceLabel = {
    onetime: 'One-time',
    recurring: 'Recurring',
  }[priceType];

  return (
    <div className="w-full flex flex-col max-w-[384px] min-w-[384px]">
      <div
        className="rounded-t-3xl overflow-hidden"
        style={{ backgroundColor: PASS_THEME_COLORS[theme].accent }}
      >

        {/* Theme-specific header */}
        <div className="relative h-56">
          <div className="absolute inset-4 rounded-xl overflow-hidden">
            <PassImage theme={theme} className='absolute inset-0' />
          </div>
        </div>

        {/* Pass details */}
        <div className="px-6 pb-4 min-h-[300px] max-h-[300px] h-[300px]">
          <Text as='h3'
            className="text-2xl font-semibold mb-2 text-static-white"
          >
            {name}
          </Text>

          {description && (
            <Text as='p' className="text-sm leading-relaxed mb-4 text-[#fff] font-normal text-ellipsis wrap-break-word overflow-y-scroll max-h-[200px]">
              {description}
            </Text>
          )}
        </div>
      </div>

      <div className="relative">
        <MiddleNotchSvg
          fill={PASS_THEME_COLORS[theme].accent}
          stroke={PASS_THEME_COLORS[theme].gradient[0]}
          id={uniqueId}
        />

        {/* Dashed line overlay */}
        <div className="absolute top-1/2 left-4 right-4 border-t border-dashed border-[rgba(241,230,253,0.19)] -translate-y-1/2" />
      </div>

      <div>
        {/* Price area */}
        <div className="px-6 py-4" style={{ backgroundColor: PASS_THEME_COLORS[theme].accent }}>
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-2xl font-bold text-static-white"
              // style={{ color: colors.textPrimary }}
              >
                {price ?? 'Free'}
              </p>
              <p className="text-sm text-static-white"
              // style={{ color: colors.textMuted }}
              >
                {priceLabel}
              </p>
            </div>
            {onJoinPass && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={onJoinPass}
                      // disabled={isJoinButtonDisabled}
                      className="text-static-white font-medium px-4 rounded-full border border-accent-9 bg-[linear-gradient(180deg,rgba(255,255,255,0)_50%,var(--color-accent-9,rgba(184,134,11,0.2))_80%),linear-gradient(180deg,rgba(255,255,255,0)_50%,var(--color-neutral-alpha-4,rgba(238,229,248,0.11))_100%),var(--color-accent-9,#B8860B)]"
                      style={{
                        boxShadow: '0 2px 1px -1px var(--Overlays-White-Alpha-9, rgba(255, 255, 255, 0.70)) inset, 0 4px 2px -2px var(--Overlays-White-Alpha-9, rgba(255, 255, 255, 0.70)) inset, 0 0 0 1px var(--Colors-Accent-Accent-9, #B8860B) inset, 0 -2px 1px 0 var(--Colors-Neutral-Neutral-Alpha-3, rgba(235, 234, 248, 0.08)) inset, 0 0 0 1px var(--Colors-Neutral-Neutral-Alpha-4, rgba(238, 229, 248, 0.11)) inset'
                      }}
                    >
                      {isJoinButtonDisabled
                        ? joinButtonDisabledText
                        : 'Join Pass'}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{joinButtonDisabledTooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Zigzag bottom edge */}
        <BottomZigzagSvg fill={PASS_THEME_COLORS[theme].accent} />
      </div>
    </div>
  );
}
