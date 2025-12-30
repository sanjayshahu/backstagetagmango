'use client';

import * as React from 'react';
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from '@ncdai/react-wheel-picker';
import '@ncdai/react-wheel-picker/style.css';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value?: { hour: number; minute: number; period: 'AM' | 'PM' };
  onChange?: (value: { hour: number; minute: number; period: 'AM' | 'PM' }) => void;
  className?: string;
}

const HOUR_OPTIONS: WheelPickerOption<number>[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString().padStart(2, '0'),
}));

const MINUTE_OPTIONS: WheelPickerOption<number>[] = Array.from({ length: 12 }, (_, i) => ({
  value: i * 5,
  label: (i * 5).toString().padStart(2, '0'),
}));

const PERIOD_OPTIONS: WheelPickerOption<'AM' | 'PM'>[] = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
];

function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [internalValue, setInternalValue] = React.useState<{
    hour: number;
    minute: number;
    period: 'AM' | 'PM';
  }>(() => {
    if (value) return value;
    const now = new Date();
    const hours = now.getHours();
    return {
      hour: hours === 0 ? 12 : hours > 12 ? hours - 12 : hours,
      minute: Math.floor(now.getMinutes() / 5) * 5,
      period: hours >= 12 ? 'PM' : 'AM',
    };
  });

  const currentValue = value ?? internalValue;

  const handleChange = React.useCallback(
    (newValue: { hour: number; minute: number; period: 'AM' | 'PM' }) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  const wheelClassNames = {
    optionItem: 'text-sm font-normal text-neutral-11',
    highlightWrapper: 'bg-accent-alpha-9 rounded-[12px]',
    highlightItem: 'text-sm font-medium text-[#fff]',
  };

  return (
    <WheelPickerWrapper
      className={cn(
        'time-picker-wrapper',
        'inline-flex w-auto! gap-0 rounded-[24px] border border-neutral-6 bg-white p-3',
        className,
      )}
    >
      <WheelPicker
        options={HOUR_OPTIONS}
        value={currentValue.hour}
        onValueChange={(hour) => handleChange({ ...currentValue, hour })}
        infinite
        classNames={wheelClassNames}
      />

      <div className="flex w-6 items-center justify-center">
        <span className="text-sm font-medium text-neutral-11">:</span>
      </div>

      <WheelPicker
        options={MINUTE_OPTIONS}
        value={currentValue.minute}
        onValueChange={(minute) => handleChange({ ...currentValue, minute })}
        infinite
        classNames={wheelClassNames}
      />

      <div className="w-3" />

      <WheelPicker
        options={PERIOD_OPTIONS}
        value={currentValue.period}
        onValueChange={(period) => handleChange({ ...currentValue, period })}
        infinite={false}
        classNames={wheelClassNames}
      />
    </WheelPickerWrapper>
  );
}

export { TimePicker };
export type { TimePickerProps };
