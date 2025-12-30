'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronDown, ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

// ============================================
// Types & Interfaces
// ============================================
export interface ScheduleDrawerProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
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

// ============================================
// Sub-components
// ============================================

interface TimePickerFieldProps {
  value: Date;
  onChange: (date: Date) => void;
  isActive?: boolean;
}

function TimePickerField({ value, onChange, isActive = false }: TimePickerFieldProps) {
  const [periodOpen, setPeriodOpen] = useState(false);
  const timeValues = get12HourTime(value);

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    onChange(set12HourTime(value, timeValues.hour, timeValues.minute, period));
    setPeriodOpen(false);
  };

  return (
    <div
      className={cn(
        'flex flex-1 h-12 items-center gap-1 lg:gap-3 lg:px-4 rounded-full border bg-white/90 px-2',
        isActive ? 'border-[#b8860b]' : 'border-[rgba(1,1,46,0.13)]'
      )}
    >
      <Clock className="size-5 shrink-0 text-[#65636d]" />

      {/* Time display */}
      <div className="flex items-center gap-0.5 flex-1">
        <input
          type="text"
          value={`${timeValues.hour}`}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1 && val <= 12) {
              onChange(set12HourTime(value, val, timeValues.minute, timeValues.period));
            }
          }}
          className="w-6 text-center bg-transparent text-base font-medium text-[#211f26] outline-none"
        />

        <span className="text-[#211f26] font-medium">:</span>

        <input
          type="text"
          value={timeValues.minute.toString().padStart(2, '0')}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 0 && val <= 59) {
              onChange(set12HourTime(value, timeValues.hour, val, timeValues.period));
            }
          }}
          className="w-6 text-center bg-transparent text-base font-medium text-[#211f26] outline-none"
        />
      </div>

      {/* AM/PM Selector */}
      <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            requireAuth={false}
            className="flex items-center gap-1 text-base font-normal text-[#211f26] hover:text-[#b8860b] h-auto p-0 hover:bg-transparent"
          >
            <span>{timeValues.period}</span>
            <ChevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-20 p-1 z-[60]" align="end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handlePeriodChange('AM')}
            requireAuth={false}
            className={cn(
              'w-full rounded-md px-3 py-2 text-left text-sm h-auto justify-start hover:bg-[rgba(181,129,0,0.1)]',
              timeValues.period === 'AM' && 'bg-[rgba(181,129,0,0.1)] font-medium'
            )}
          >
            AM
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handlePeriodChange('PM')}
            requireAuth={false}
            className={cn(
              'w-full rounded-md px-3 py-2 text-left text-sm h-auto justify-start hover:bg-[rgba(181,129,0,0.1)]',
              timeValues.period === 'PM' && 'bg-[rgba(181,129,0,0.1)] font-medium'
            )}
          >
            PM
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ============================================
// Drawer Content Component
// ============================================
interface ScheduleDrawerContentProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onDone: () => void;
}

function ScheduleDrawerContent({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDone,
}: ScheduleDrawerContentProps) {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Preserve times when changing date
    const newStartDate = new Date(date);
    newStartDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);

    const newEndDate = new Date(date);
    newEndDate.setHours(endDate.getHours(), endDate.getMinutes(), 0, 0);

    onStartDateChange(newStartDate);
    onEndDateChange(newEndDate);
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-white">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between px-4 py-4 shrink-0">
        <Button
          type="button"
          variant="ghost"
          onClick={onDone}
          requireAuth={false}
          className="flex items-center gap-1 text-[#211f26] hover:text-[#b8860b] h-auto p-0 hover:bg-transparent"
        >
          <ChevronLeft className="size-5" />
          <span className="text-base font-medium">Schedule stream</span>
        </Button>
        <Button
          onClick={onDone}
          className="h-10 px-4 bg-[#b8860b] hover:bg-[#a67a0a] text-white rounded-full font-medium"
          requireAuth={false}
        >
          Done
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2 pb-8">
        {/* Calendar */}
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={handleDateSelect}
          className="mb-4 self-center w-full flex justify-center"
        />

        {/* Date and Time Fields */}
        <div className="flex flex-col gap-3 pb-6 w-full">
          {/* Date Field */}
          <div className="flex h-12 items-center gap-3 rounded-full border border-[#b8860b] bg-white/90 px-4">
            <CalendarIcon className="size-5 shrink-0 text-[#b8860b] " />
            <span className="flex-1 text-base font-medium text-[#211f26]">
              {formatDateDisplay(startDate)}
            </span>
          </div>

          {/* Time Range Fields */}
          <div className="flex items-center gap-3">
            <TimePickerField
              value={startDate}
              onChange={onStartDateChange}
            />

            <span className="text-sm font-medium text-[#211f26] shrink-0">
              to
            </span>

            <TimePickerField
              value={endDate}
              onChange={onEndDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component - Schedule Drawer
// ============================================
export function ScheduleDrawer({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ScheduleDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (controlledOnOpenChange ?? (() => {})) : setInternalOpen;

  const handleDone = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && (
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent className="bg-white max-h-[90vh]">
        {/* Visually hidden title and description for accessibility */}
        <DrawerTitle className="sr-only">Schedule Stream</DrawerTitle>
        <DrawerDescription className="sr-only">
          Select date and time for your stream
        </DrawerDescription>
        <ScheduleDrawerContent
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onDone={handleDone}
        />
      </DrawerContent>
    </Drawer>
  );
}
