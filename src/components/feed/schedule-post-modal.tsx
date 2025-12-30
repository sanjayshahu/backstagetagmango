'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import { Modal } from '@/components/modal';

interface SchedulePostModalProps {
  open: boolean;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  onClose: () => void;
}

type ViewMode = 'calendar' | 'time';

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

export function SchedulePostModal({
  open,
  value,
  onChange,
  onClose,
}: SchedulePostModalProps) {
  // View mode: 'calendar' or 'time'
  const [viewMode, setViewMode] = React.useState<ViewMode>('calendar');

  // Initialize with provided value or default to tomorrow at 12:00 PM
  const [selectedDate, setSelectedDate] = React.useState<Date>(() => {
    if (value) return new Date(value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow;
  });

  // Reset selectedDate when value changes or modal opens
  React.useEffect(() => {
    if (open) {
      if (value) {
        setSelectedDate(new Date(value));
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0);
        setSelectedDate(tomorrow);
      }
      setViewMode('calendar');
    }
  }, [open, value]);

  const currentTime = get12HourTime(selectedDate);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    // Preserve time when selecting a new date
    const newDate = new Date(date);
    newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
    setSelectedDate(newDate);
  };

  const handleTimeChange = (time: { hour: number; minute: number; period: 'AM' | 'PM' }) => {
    const newDate = set12HourTime(selectedDate, time.hour, time.minute, time.period);
    setSelectedDate(newDate);
  };

  const handleDone = () => {
    // Ensure date is in the future
    const now = new Date();
    if (selectedDate > now) {
      onChange(selectedDate);
    } else {
      // If selected date is in the past, set to minimum valid time
      const minDate = new Date();
      minDate.setMinutes(minDate.getMinutes() + 5);
      onChange(minDate);
    }
    onClose();
  };

  const formatTimeValue = () => {
    return `${currentTime.hour}:${currentTime.minute.toString().padStart(2, '0')} ${currentTime.period}`;
  };

  const formatSubtitle = () => {
    return `${format(selectedDate, 'd MMMM yyyy')}, ${format(selectedDate, 'h:mm a')}, based on your location`;
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={false}
      wrapperClassName="p-0!"
      className="w-full md:w-112.5 rounded-t-3xl! md:rounded-3xl! overflow-hidden p-0!"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-background">
        <div>
          <h3 className="font-semibold text-lg text-mauve-12">Schedule post</h3>
          <p className="text-sm text-mauve-11 mt-1">{formatSubtitle()}</p>
        </div>
        <Button
          onClick={handleDone}
          className="bg-amber-9 hover:bg-amber-10 text-white rounded-full px-6"
        >
          Done
        </Button>
      </div>

      {/* Calendar or Time Picker */}
      <div className="flex justify-center px-6 py-4">
        {viewMode === 'calendar' ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            autoFocus
          />
        ) : (
          <TimePicker
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full"
          />
        )}
      </div>

      {/* Date and Time Toggle Inputs */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        {/* Date Input Field - Click to show calendar */}
        <button
          type="button"
          onClick={() => setViewMode('calendar')}
          className={cn(
            'flex h-15 w-full items-center gap-3 rounded-2xl border px-4 transition-colors cursor-pointer',
            viewMode === 'calendar'
              ? 'border-[rgba(181,129,0,0.5)] bg-[rgba(181,129,0,0.05)]'
              : 'border-mauve-alpha-6 bg-white hover:border-mauve-alpha-8'
          )}
        >
          <CalendarIcon className={cn(
            'size-5 shrink-0',
            viewMode === 'calendar' ? 'text-[rgba(181,129,0,0.96)]' : 'text-mauve-11'
          )} />
          <span className="flex-1 text-base font-medium text-mauve-12 text-left">
            {format(selectedDate, 'd MMM, yyyy')}
          </span>
        </button>

        {/* Time Input Field - Click to show time picker */}
        <button
          type="button"
          onClick={() => setViewMode('time')}
          className={cn(
            'flex h-15 w-full items-center gap-3 rounded-2xl border px-4 transition-colors cursor-pointer',
            viewMode === 'time'
              ? 'border-[rgba(181,129,0,0.5)] bg-[rgba(181,129,0,0.05)]'
              : 'border-mauve-alpha-6 bg-white hover:border-mauve-alpha-8'
          )}
        >
          <Clock className={cn(
            'size-5 shrink-0',
            viewMode === 'time' ? 'text-[rgba(181,129,0,0.96)]' : 'text-mauve-11'
          )} />
          <span className="flex-1 text-base font-medium text-mauve-12 text-left">
            {formatTimeValue()}
          </span>
        </button>
      </div>
    </Modal>
  );
}
