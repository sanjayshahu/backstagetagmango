'use client'
import type { PassResponseDto } from '@backstage-pass/api';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export const PASS_THEME_COLORS = {
  bronze: {
    gradient: ['#CD6A3633', '#CD6A3600'] as const,
    accent: '#CD6A36',
  },
  silver: {
    gradient: ['#3652CD33', '#3652CD00'] as const,
    accent: '#3652CD80',
  },
  gold: {
    gradient: ['#C9A22733', '#C9A22700'] as const,
    accent: '#C9A227',
  },
  charcoal: {
    gradient: ['#40404033', '#40404000'] as const,
    accent: '#404040',
  },
  navy: {
    gradient: ['#2F3F6133', '#2F3F6100'] as const,
    accent: '#2F3F61',
  },
} as const;

export type PassTheme = keyof typeof PASS_THEME_COLORS;

export const PASS_THEME_BASE_IMAGE = 'https://testing.assets.bpasses.com/static/pass-theme-1.jpg';
export const PASS_CARD_BASE_IMAGE = 'https://testing.assets.bpasses.com/static/pass-card-base-image.png'
export const PASS_CARD_VERTICAL_IMAGE = 'https://testing.assets.bpasses.com/static/silver-details-bg.png'

export const PASS_THEMES: PassTheme[] = ['silver', 'bronze', 'charcoal', 'gold', 'navy'];

// Pass type options (UI representation)
export type UIPassType = 'free' | 'one-time' | 'subscription';

export const PASS_TYPES: { value: UIPassType; label: string }[] = [
  { value: 'free', label: 'Free' },
  { value: 'one-time', label: 'One-time' },
  { value: 'subscription', label: 'Subscription' },
];

// Billing cycle options
export type BillingCycle = 'monthly' | 'yearly' | 'quarterly';

export const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'quarterly', label: 'Quarterly' },
];

// Props for PassForm component
export interface PassFormProps {
  mode: 'create' | 'edit';
  stageId: string;
  initialData?: PassResponseDto;
  passId?: string;
}

// Helper functions to map between API and UI types
export function mapApiToUIPassType(passType: string, recurringType: string): UIPassType {
  if (passType === 'free') return 'free';
  if (recurringType === 'recurring') return 'subscription';
  return 'one-time';
}

export function mapDurationToBillingCycle(durationDays: number | null | undefined): BillingCycle {
  if (!durationDays) return 'monthly';
  if (durationDays >= 365) return 'yearly';
  if (durationDays >= 90) return 'quarterly';
  return 'monthly';
}

// Duration days mapping
export const DURATION_DAYS_MAP: Record<BillingCycle, number> = {
  monthly: 30,
  yearly: 365,
  quarterly: 90,
};

export interface PassImageProps {
  theme: PassTheme,
  url?: string
  className?: string
  blur?: boolean
}

export function PassImage({ theme, url = PASS_THEME_BASE_IMAGE, className = '', blur = false }: PassImageProps) {
  return (
    <>
      <div className={cn(`relative ${className}`)}>
        <Image
          src={url}
          alt={theme}
          fill
          preload
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: PASS_THEME_COLORS[theme].accent,
            mixBlendMode: 'color',
            // Add masking properties here using the same image URL
            maskImage: `url('${url}')`,
            maskMode: 'alpha', // Ensure the transparency channel is used
            maskSize: 'cover', // Match the image size
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(0deg, ${PASS_THEME_COLORS[theme].gradient[0]}, ${PASS_THEME_COLORS[theme].gradient[1]})`,
            // Add masking properties here as well
            maskImage: `url('${url}')`,
            maskMode: 'alpha',
            maskSize: 'cover',
          }}
        />
      </div>
      {blur && (
        <>
          <div className="absolute inset-0 backdrop-blur-[50px]" />
          <div className="absolute inset-0 bg-background/10" />
        </>
      )}
    </>

  )
}
