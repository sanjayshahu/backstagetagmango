'use client';

import * as React from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { cn } from '@/lib/utils';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './input-otp';

export interface OTPProps {
  /** Number of OTP slots (default: 6) */
  slots?: number;
  /** Current OTP value */
  value?: string;
  /** Callback when OTP value changes */
  onChange?: (value: string) => void;
  /** Disable the input */
  disabled?: boolean;
  /** Class name for individual slot styling */
  slotClassName?: string;
  /** Class name for the group container */
  groupClassName?: string;
  /** Class name for the root container */
  className?: string;
  /** Show separator after this slot index (e.g., 2 for XXX-XXX format) */
  separatorAfter?: number;
  /** Auto-submit when all slots are filled */
  onComplete?: (value: string) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Auto focus the input */
  autoFocus?: boolean;
}

const sizeClasses = {
  sm: 'w-9 h-9 text-base',
  md: 'w-12 h-12 text-xl',
  lg: 'w-14 h-14 text-2xl',
};

export function OTP({
  slots = 6,
  value,
  onChange,
  disabled = false,
  slotClassName,
  groupClassName,
  className,
  separatorAfter,
  onComplete,
  size = 'md',
  autoFocus = false,
}: OTPProps) {
  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    if (newValue.length === slots && onComplete) {
      onComplete(newValue);
    }
  };

  slotClassName = cn('rounded-2xl border-neutral-6');

  const defaultSlotClass = cn(
    sizeClasses[size],
    'bg-white text-neutral-12 font-mono',
    slotClassName,
  );

  const renderSlots = () => {
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < slots; i++) {
      elements.push(
        <InputOTPSlot key={i} index={i} className={defaultSlotClass} />,
      );

      if (
        separatorAfter !== undefined &&
        i === separatorAfter &&
        i < slots - 1
      ) {
        elements.push(<InputOTPSeparator key={`sep-${i}`} />);
      }
    }

    return elements;
  };

  return (
    <InputOTP
      data-slot="otp"
      maxLength={slots}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={className}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      autoFocus={autoFocus}
    >
      <InputOTPGroup className={cn('gap-2', groupClassName)}>
        {renderSlots()}
      </InputOTPGroup>
    </InputOTP>
  );
}
