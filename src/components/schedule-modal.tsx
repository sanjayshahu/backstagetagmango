'use client';

import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { TimePicker } from '@/components/ui/time-picker';

// ============================================
// Types & Interfaces
// ============================================
export type ActiveField = 'startDate' | 'startTime' | 'endDate' | 'endTime';

export interface SchedulePickerContentProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onDone: () => void;
  activeField: ActiveField;
  onActiveFieldChange: (field: ActiveField) => void;
}

// ============================================
// Constants
// ============================================
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

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

function formatDateDisplay(date: Date): string {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

/**
 * Get rounded initial times for scheduling
 * - Rounds current time UP to the next hour
 * - End time is 1 hour after start time
 * Example: 2:45 → Start: 3:00, End: 4:00
 * Example: 3:02 → Start: 4:00, End: 5:00
 */
export function getInitialScheduleTimes(): { startDate: Date; endDate: Date } {
  const now = new Date();

  // Round up to next hour
  const startDate = new Date(now);
  if (now.getMinutes() > 0 || now.getSeconds() > 0) {
    startDate.setHours(now.getHours() + 1, 0, 0, 0);
  } else {
    startDate.setMinutes(0, 0, 0);
  }

  // End time is 1 hour after start
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);

  return { startDate, endDate };
}

// ============================================
// Main Component - Renders inline (for use inside modal)
// ============================================
export function SchedulePickerContent({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDone,
  activeField,
  onActiveFieldChange,
}: SchedulePickerContentProps) {
  // Determine if we're editing start or end based on active field
  const isEditingStart = activeField === 'startDate' || activeField === 'startTime';
  const isDateView = activeField === 'startDate' || activeField === 'endDate';
  const activeDate = isEditingStart ? startDate : endDate;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Use current activeField to determine which date to update
    const isStart = activeField === 'startDate' || activeField === 'startTime';
    const currentDate = isStart ? startDate : endDate;
    const onChange = isStart ? onStartDateChange : onEndDateChange;

    // Preserve time when changing date
    const newDate = new Date(date);
    newDate.setHours(currentDate.getHours(), currentDate.getMinutes(), 0, 0);
    onChange(newDate);
  };

  const handleTimeChange = (time: { hour: number; minute: number; period: 'AM' | 'PM' }) => {
    // Use current activeField to determine which date to update
    const isStart = activeField === 'startDate' || activeField === 'startTime';
    const currentDate = isStart ? startDate : endDate;
    const onChange = isStart ? onStartDateChange : onEndDateChange;

    const newDate = set12HourTime(currentDate, time.hour, time.minute, time.period);
    onChange(newDate);
  };

  const activeTime = get12HourTime(activeDate);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onDone}
          requireAuth={false}
          className="flex items-center gap-1 text-neutral-12 hover:text-accent-9 h-auto p-0 hover:bg-transparent"
        >
          <ChevronLeft className="size-5" />
          <span className="text-base font-medium">Schedule stream</span>
        </Button>
        <div className="w-17.5" /> {/* Spacer to balance the header */}
        <Button
          onClick={onDone}
          className="h-10 px-4 bg-accent-9 hover:bg-accent-10 text-[#fff] rounded-full font-medium"
          requireAuth={false}
        >
          Done
        </Button>
      </div>

      {/* Content */}
      <div className="lg:pb-0 pb-12 overflow-y-auto flex-1 flex flex-col">
        {/* Calendar or Time Picker */}
        <div className="w-full bg-white group/calendar flex justify-center rounded-3xl border border-neutral-6 mb-4">
          {isDateView ? (
            <Calendar
              mode="single"
              selected={activeDate}
              onSelect={handleDateSelect}
              className="self-center border-none"
              disabled={{ before: new Date() }}
            />
          ) : (
            <div className="p-6 w-full">
              <TimePicker
                value={activeTime}
                onChange={handleTimeChange}
                className="border-none"
              />
            </div>
          )}
        </div>

        {/* Date and Time Fields - shows active date (start or end) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Date Field */}
          <button
            type="button"
            onClick={() => onActiveFieldChange(isEditingStart ? 'startDate' : 'endDate')}
            className={cn(
              'flex h-15 items-center gap-3 rounded-full border bg-white/90 px-4 transition-colors',
              isDateView ? 'border-accent-9' : 'border-neutral-alpha-6'
            )}
          >
            <CalendarIcon className={cn(
              'size-5 shrink-0',
              isDateView ? 'text-accent-9' : 'text-neutral-11'
            )} />
            <span className="flex-1 text-left text-base font-medium text-neutral-12">
              {formatDateDisplay(activeDate)}
            </span>
          </button>

          {/* Time Field */}
          <button
            type="button"
            onClick={() => onActiveFieldChange(isEditingStart ? 'startTime' : 'endTime')}
            className={cn(
              'flex h-15 items-center gap-3 rounded-full border bg-white/90 px-4 transition-colors',
              !isDateView ? 'border-accent-9' : 'border-neutral-alpha-6'
            )}
          >
            <Clock className={cn(
              'size-5 shrink-0',
              !isDateView ? 'text-accent-9' : 'text-neutral-11'
            )} />
            <span className="flex-1 text-left text-base font-medium text-neutral-12">
              {activeTime.hour.toString().padStart(2, '0')}:{activeTime.minute.toString().padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-base text-neutral-12">
                {activeTime.period}
              </span>
              <ChevronsUpDown className="size-4 text-neutral-12" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
