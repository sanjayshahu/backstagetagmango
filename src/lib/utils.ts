import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StageAccessContextValue } from './stage-access-context';
import { PassPriceDto } from '@backstage-pass/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice({
  price,
  priceType,
}: {
  price: PassPriceDto | null;
  priceType: 'free' | 'paid';
}) {
  let formattedString = '';

  if (priceType === 'free' || price === null)
    return {
      formattedString: 'Free',
      convertedPrice: 0,
    };

  const convertedPrice = ((price.usdCents ?? price.inrPaise) || 0) / 100;

  formattedString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.inrPaise ? 'INR' : 'USD',
    minimumFractionDigits: 0,
  }).format(convertedPrice);

  return { formattedString, convertedPrice };
}

export const getCoverImageUrlFromStage = (
  stage: StageAccessContextValue['stage'],
) => {
  const image = stage?.image;
  if (typeof image === 'string') return image;
  return '/creator_dp.png';
};

// a function to convert a timestamp to a relative time
export const toRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears}y ago`;
  if (diffWeeks > 0) return `${diffWeeks}w ago`;
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;

  return 'Just now';
};

// convert date into a string like "Dec 26, 2025 • 10:00 PM"
export const toReadableDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const focusComponent = (element: HTMLElement | null) => {
  if (element) element.focus();
};

export const toReadableLargeNumber = (number: number) => {
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return number.toString();
};
