'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { PassResponseDto } from '@backstage-pass/api';
import { formatPrice } from '@/lib/utils';
// import { PASS_THEME_COLORS } from '@/lib/pass-utils';
import { format } from 'date-fns';

// ============================================
// Types
// ============================================
export interface UserPassCardProps {
  pass: PassResponseDto;
  slug: string;
}

// type ThemeKey = keyof typeof PASS_THEME_COLORS;

function getPriceType(pass: PassResponseDto): string {
  if (pass.passType === 'free') return '';

  if (pass.recurringType === 'recurring') {
    const days = pass.durationDays as number | null;
    return days && days >= 365 ? '/year' : '/month';
  }

  return 'One-time';
}

// ============================================
// Main Component
// ============================================
export function UserPassCard({ pass, slug }: UserPassCardProps) {
  const router = useRouter();

  const priceObj = pass.price as {
    usdCents?: number;
    inrPaise?: number;
  } | null;
  const isFree = pass.passType === 'free' || !priceObj?.usdCents;
  const priceDisplay = formatPrice({price: priceObj, priceType: pass.passType}).formattedString;
  const priceType = getPriceType(pass);
  const description = (pass.description as unknown as string) || '';

  // Get accent color from pass theme
  // const themeKey = (pass.theme as ThemeKey) || 'charcoal';
  // const tintColor = PASS_THEME_COLORS[themeKey]?.accent || PASS_THEME_COLORS.charcoal.accent;

  const handleViewPass = () => {
    router.push(`/${slug}/passes/${pass.id}/user/details`);
  };

  return (
    <div
      className="relative overflow-hidden h-49.5"
      style={{ minWidth: '300px' }}
    >
      {/* Background container with color tint - uses SVG as mask to respect transparency */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          // backgroundColor: tintColor,
          maskImage: 'url(/images/user-pass-card.svg)',
          WebkitMaskImage: 'url(/images/user-pass-card.svg)',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />

      {/* Background SVG image with blend */}
      <img
        src="/images/user-pass-card.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full px-[15.6px] py-4 pb-4 z-10">
        {/* Top section: Name and Description */}
        <div className="space-y-2 pr-12">
          <h3 className="text-xl font-semibold text-static-white leading-7 tracking-[-0.016px] line-clamp-1">
            {pass.name}
          </h3>
          {description && (
            <p className="text-xs text-static-white leading-4 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Bottom section: Price and Action */}
        <div className="flex items-end justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-static-white leading-[30px] tracking-[-0.024px]">
              {priceDisplay}
            </span>
            {!isFree && priceType && (
              <span className="text-xs text-static-white leading-4">
                {priceType}
              </span>
            )}
          </div>

          {pass.subscription ? (
            <div className='flex flex-col text-static-white text-sm'>
              <span className='font-normal'>Purchased on</span>
              <span className='font-semibold text-[14px]'>
                {format(new Date(pass.subscription.createdAt), "do MMM, yyyy")}
              </span>
            </div>
          ) : (
            <Button
              onClick={handleViewPass}
              className="h-8 px-3 rounded-full bg-static-neutral-12 text-static-neutral-1 text-sm font-medium hover:bg-static-white transition-colors"
              requireAuth={false}
            >
              View Pass
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
