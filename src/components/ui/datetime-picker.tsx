'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './button';

// ============================================
// Types & Interfaces
// ============================================
export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  datePlaceholder?: string;
  timePlaceholder?: string;
}

// ============================================
// Helper Functions
// ============================================
function get12HourTime(date: Date): { hour: number; minute: number; period: 'AM' | 'PM' } {
  let hour = date.getHours();
  const minute = date.getMinutes();
  const period: 'AM' | 'PM' = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return { hour, minute, period };
}

function set12HourTime(date: Date, hour: number, minute: number, period: 'AM' | 'PM'): Date {
  const newDate = new Date(date);
  let hours = hour;
  if (period === 'PM' && hour !== 12) {
    hours += 12;
  } else if (period === 'AM' && hour === 12) {
    hours = 0;
  }
  newDate.setHours(hours, minute, 0, 0);
  return newDate;
}

// ============================================
// Component
// ============================================
export function DateTimePicker({
  value,
  onChange,
  disabled = false,
  className,
  datePlaceholder = 'Select date',
  timePlaceholder = '12:00',
}: DateTimePickerProps) {
  const [dateOpen, setDateOpen] = React.useState(false);
  const [periodOpen, setPeriodOpen] = React.useState(false);

  const currentTime = value ? get12HourTime(value) : null;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      setDateOpen(false);
      return;
    }

    // Preserve time when selecting a new date
    if (value) {
      date.setHours(value.getHours(), value.getMinutes(), 0, 0);
    } else {
      // Default to 12:00 PM for new dates
      date.setHours(12, 0, 0, 0);
    }
    onChange?.(date);
    setDateOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) return;

    const timeValue = e.target.value;
    const [hourStr, minuteStr] = timeValue.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) return;

    const { period } = get12HourTime(value);
    onChange?.(set12HourTime(value, hour, minute, period));
  };

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    if (!value) return;

    const { hour, minute } = get12HourTime(value);
    onChange?.(set12HourTime(value, hour, minute, period));
    setPeriodOpen(false);
  };

  const formatTimeValue = () => {
    if (!currentTime) return timePlaceholder;
    return `${currentTime.hour}:${currentTime.minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Date Input Field */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            type="button"
            className={cn(
              'flex h-11 w-full items-center gap-2.5 rounded-xl border border-[rgba(1,1,46,0.13)] bg-[#f2eff3] px-3 text-left transition-colors',
              'hover:bg-[#eae7eb] focus:outline-none focus:ring-2 focus:ring-[rgba(181,129,0,0.5)]',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-[#65636d]" />
            <span
              className={cn(
                'flex-1 text-sm font-medium',
                value ? 'text-[rgba(4,0,17,0.61)]' : 'text-[rgba(4,0,17,0.4)]'
              )}
            >
              {value ? format(value, 'd MMM, yyyy') : datePlaceholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Time Input Field */}
      <div
        className={cn(
          'flex h-11 w-full items-center gap-2.5 rounded-xl border border-[rgba(1,1,46,0.13)] bg-white/90 px-3',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <Clock className="size-4 shrink-0 text-[#65636d]" />
        <input
          type="text"
          value={formatTimeValue()}
          onChange={handleTimeChange}
          disabled={disabled || !value}
          placeholder={timePlaceholder}
          className={cn(
            'flex-1 bg-transparent text-sm font-medium text-[#211f26] outline-none placeholder:text-[rgba(4,0,17,0.4)]',
            (!value || disabled) && 'cursor-not-allowed'
          )}
        />

        {/* AM/PM Selector */}
        <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
          <PopoverTrigger asChild disabled={disabled || !value}>
            <Button
              type="button"
              className={cn(
                'flex items-center gap-1 text-sm font-normal text-[#211f26]',
                'hover:text-[rgba(181,129,0,0.96)] focus:outline-none',
                (!value || disabled) && 'cursor-not-allowed opacity-50'
              )}
            >
              <span>{currentTime?.period ?? 'PM'}</span>
              <ChevronDown className="size-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-20 p-1" align="end">
            <button
              type="button"
              onClick={() => handlePeriodChange('AM')}
              className={cn(
                'w-full rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-[rgba(181,129,0,0.1)]',
                currentTime?.period === 'AM' && 'bg-[rgba(181,129,0,0.1)] font-medium'
              )}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => handlePeriodChange('PM')}
              className={cn(
                'w-full rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-[rgba(181,129,0,0.1)]',
                currentTime?.period === 'PM' && 'bg-[rgba(181,129,0,0.1)] font-medium'
              )}
            >
              PM
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
