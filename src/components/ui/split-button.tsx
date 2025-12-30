'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const splitButtonVariants = cva(
  'inline-flex items-center rounded-full overflow-hidden transition-all',
  {
    variants: {
      variant: {
        default: 'bg-[#f2eff3]',
        primary: 'bg-[#FFF0D1]',
        secondary: 'bg-[#e8e5ea]',
        outline: 'bg-white border border-[#dbd8e0]',
        accent: 'bg-accent-9',
      },
      size: {
        default: 'h-10',
        sm: 'h-8',
        lg: 'h-12',
      },
      inactive: {
        true: 'bg-neutral-alpha-3',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inactive: false,
    },
  }
);

const iconSectionVariants = cva(
  'flex items-center justify-center border-r transition-colors p-3',
  {
    variants: {
      variant: {
        default: 'border-[#dbd8e0] hover:bg-[#e8e5ea]',
        primary: 'border-[#E8D4A8] hover:bg-[#FFE7B8]',
        secondary: 'border-[#d1cdd6] hover:bg-[#dbd8e0]',
        outline: 'border-[#dbd8e0] hover:bg-[#f2eff3]',
        accent: 'border-white/20 hover:bg-white/10',
      },
      size: {
        default: 'w-10 h-10',
        sm: 'w-8 h-8',
        lg: 'w-12 h-12',
      },
      inactive: {
        true: 'border-neutral-6 text-[#8E8C99] [&_svg]:text-[#8E8C99]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inactive: false,
    },
  }
);

const textSectionVariants = cva(
  'flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'text-[#65636d] hover:bg-[#e8e5ea]',
        primary: 'text-[#65636d] hover:bg-[#FFE7B8]',
        secondary: 'text-[#65636d] hover:bg-[#dbd8e0]',
        outline: 'text-[#65636d] hover:bg-[#f2eff3]',
        accent: 'text-white hover:bg-white/10',
      },
      size: {
        default: 'px-6 h-10 text-sm',
        sm: 'px-3 h-8 text-xs',
        lg: 'px-6 h-12 text-base',
      },
      inactive: {
        true: 'text-[#8E8C99]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inactive: false,
    },
  }
);

export interface SplitButtonProps
  extends VariantProps<typeof splitButtonVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onIconClick?: () => void;
  onTextClick?: () => void;
  onClick?: () => void;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
  disabled?: boolean;
  iconDisabled?: boolean;
  textDisabled?: boolean;
  /** When true, icon section width is auto instead of fixed */
  autoIconWidth?: boolean;
  /** When true, hides the icon button making it look like a normal button */
  hideIcon?: boolean;
}

function SplitButton({
  icon,
  children,
  onIconClick,
  onTextClick,
  onClick,
  variant,
  size,
  inactive,
  iconClassName,
  textClassName,
  className,
  disabled = false,
  iconDisabled = false,
  textDisabled = false,
  autoIconWidth = false,
  hideIcon = false,
}: SplitButtonProps) {
  const handleIconClick = () => {
    if (disabled || iconDisabled) return;
    onIconClick?.();
    if (!onIconClick && onClick) onClick();
  };

  const handleTextClick = () => {
    if (disabled || textDisabled) return;
    onTextClick?.();
    if (!onTextClick && onClick) onClick();
  };

  return (
    <div
      className={cn(
        splitButtonVariants({ variant, size, inactive }),
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {!hideIcon && (
        <button
          type="button"
          onClick={handleIconClick}
          disabled={disabled || iconDisabled}
          className={cn(
            iconSectionVariants({ variant, size, inactive }),
            (disabled || iconDisabled) && 'pointer-events-none',
            autoIconWidth && 'w-auto',
            iconClassName
          )}
        >
          {icon}
        </button>
      )}
      <button
        type="button"
        onClick={handleTextClick}
        disabled={disabled || textDisabled}
        className={cn('h-12',
          textSectionVariants({ variant, size, inactive }),
          (disabled || textDisabled) && 'pointer-events-none',
          textClassName
        )}
      >
        {children}
      </button>
    </div>
  );
}

export { SplitButton, splitButtonVariants };
