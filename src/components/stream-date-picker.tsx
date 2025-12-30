'use client';

// ============================================
// Third-party Imports
// ============================================
import { useState, useMemo } from 'react';
import { ChevronRight, Check, Search } from 'lucide-react';

// ============================================
// Local/Project Imports
// ============================================
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Image } from './ui/image';
import { Calendar } from './ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';

// ============================================
// Types & Interfaces
// ============================================
export interface StreamDatePickerProps {
  startDate: Date;
  endDate: Date;
  timezone: string;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onTimezoneChange: (timezone: string) => void;
  className?: string;
}

// ============================================
// Constants
// ============================================
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Common timezones grouped by region
const TIMEZONE_OPTIONS = [
  // Americas
  { value: 'America/New_York', label: 'Eastern Time (ET)', region: 'Americas' },
  { value: 'America/Chicago', label: 'Central Time (CT)', region: 'Americas' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', region: 'Americas' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', region: 'Americas' },
  { value: 'America/Anchorage', label: 'Alaska Time', region: 'Americas' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time', region: 'Americas' },
  { value: 'America/Toronto', label: 'Toronto', region: 'Americas' },
  { value: 'America/Vancouver', label: 'Vancouver', region: 'Americas' },
  { value: 'America/Mexico_City', label: 'Mexico City', region: 'Americas' },
  { value: 'America/Sao_Paulo', label: 'Sao Paulo', region: 'Americas' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires', region: 'Americas' },
  // Europe
  { value: 'Europe/London', label: 'London (GMT/BST)', region: 'Europe' },
  { value: 'Europe/Paris', label: 'Paris (CET)', region: 'Europe' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)', region: 'Europe' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam', region: 'Europe' },
  { value: 'Europe/Madrid', label: 'Madrid', region: 'Europe' },
  { value: 'Europe/Rome', label: 'Rome', region: 'Europe' },
  { value: 'Europe/Moscow', label: 'Moscow', region: 'Europe' },
  { value: 'Europe/Istanbul', label: 'Istanbul', region: 'Europe' },
  // Asia
  { value: 'Asia/Dubai', label: 'Dubai (GST)', region: 'Asia' },
  { value: 'Asia/Kolkata', label: 'India (IST)', region: 'Asia' },
  { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', region: 'Asia' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', region: 'Asia' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', region: 'Asia' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', region: 'Asia' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', region: 'Asia' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)', region: 'Asia' },
  // Oceania
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', region: 'Oceania' },
  { value: 'Australia/Melbourne', label: 'Melbourne', region: 'Oceania' },
  { value: 'Australia/Perth', label: 'Perth (AWST)', region: 'Oceania' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST)', region: 'Oceania' },
  // UTC
  { value: 'UTC', label: 'UTC', region: 'UTC' },
];

// ============================================
// Helper Functions
// ============================================
function getDefaultTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

function getTimezoneDisplay(timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'shortOffset',
      timeZone: timezone,
    });
    const parts = formatter.formatToParts(new Date());
    const offsetPart = parts.find((p) => p.type === 'timeZoneName');
    const offset = offsetPart?.value || 'GMT';

    // Get city name from timezone
    const city = timezone.split('/').pop()?.replace(/_/g, ' ') || timezone;

    return `${offset} ${city}`;
  } catch {
    return timezone;
  }
}

function getHourOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  for (let i = 1; i <= 12; i++) {
    options.push({ value: i.toString(), label: i.toString().padStart(2, '0') });
  }
  return options;
}

function getMinuteOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  for (let i = 0; i < 60; i += 15) {
    options.push({ value: i.toString(), label: i.toString().padStart(2, '0') });
  }
  return options;
}

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
export function StreamDatePicker({
  startDate,
  endDate,
  timezone,
  onStartDateChange,
  onEndDateChange,
  onTimezoneChange,
  className,
}: StreamDatePickerProps) {
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [timeRangePopoverOpen, setTimeRangePopoverOpen] = useState(false);
  const [timezonePopoverOpen, setTimezonePopoverOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState('');

  const hourOptions = useMemo(() => getHourOptions(), []);
  const minuteOptions = useMemo(() => getMinuteOptions(), []);
  const timezoneDisplay = useMemo(() => getTimezoneDisplay(timezone), [timezone]);

  const startTimeValues = get12HourTime(startDate);
  const endTimeValues = get12HourTime(endDate);

  // Filter timezones based on search
  const filteredTimezones = useMemo(() => {
    if (!timezoneSearch) return TIMEZONE_OPTIONS;
    const search = timezoneSearch.toLowerCase();
    return TIMEZONE_OPTIONS.filter(
      (tz) =>
        tz.label.toLowerCase().includes(search) ||
        tz.value.toLowerCase().includes(search) ||
        tz.region.toLowerCase().includes(search)
    );
  }, [timezoneSearch]);

  // Group filtered timezones by region
  const groupedTimezones = useMemo(() => {
    const groups: Record<string, typeof TIMEZONE_OPTIONS> = {};
    filteredTimezones.forEach((tz) => {
      if (!groups[tz.region]) {
        groups[tz.region] = [];
      }
      groups[tz.region].push(tz);
    });
    return groups;
  }, [filteredTimezones]);

  /* ========================================
     Handler: Date selection from calendar
     ======================================== */
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Preserve times when changing date
    const newStartDate = new Date(date);
    newStartDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);

    const newEndDate = new Date(date);
    newEndDate.setHours(endDate.getHours(), endDate.getMinutes(), 0, 0);

    onStartDateChange(newStartDate);
    onEndDateChange(newEndDate);
    setDatePopoverOpen(false);
  };

  /* ========================================
     Handler: Start time changes
     ======================================== */
  const handleStartHourChange = (hourStr: string) => {
    const hour = parseInt(hourStr, 10);
    onStartDateChange(set12HourTime(startDate, hour, startTimeValues.minute, startTimeValues.period));
  };

  const handleStartMinuteChange = (minuteStr: string) => {
    const minute = parseInt(minuteStr, 10);
    onStartDateChange(set12HourTime(startDate, startTimeValues.hour, minute, startTimeValues.period));
  };

  const handleStartPeriodChange = (period: 'AM' | 'PM') => {
    onStartDateChange(set12HourTime(startDate, startTimeValues.hour, startTimeValues.minute, period));
  };

  /* ========================================
     Handler: End time changes
     ======================================== */
  const handleEndHourChange = (hourStr: string) => {
    const hour = parseInt(hourStr, 10);
    onEndDateChange(set12HourTime(endDate, hour, endTimeValues.minute, endTimeValues.period));
  };

  const handleEndMinuteChange = (minuteStr: string) => {
    const minute = parseInt(minuteStr, 10);
    onEndDateChange(set12HourTime(endDate, endTimeValues.hour, minute, endTimeValues.period));
  };

  const handleEndPeriodChange = (period: 'AM' | 'PM') => {
    onEndDateChange(set12HourTime(endDate, endTimeValues.hour, endTimeValues.minute, period));
  };

  /* ========================================
     Handler: Timezone selection
     ======================================== */
  const handleTimezoneSelect = (tz: string) => {
    onTimezoneChange(tz);
    setTimezonePopoverOpen(false);
    setTimezoneSearch('');
  };

  return (
    <div
      className={cn(
        'bg-[rgba(253, 252, 253, 1)] border border-gray-200 rounded-xl',
        className,
      )}
      style={{
        border: '1px solid rgba(234, 231, 236, 1)',
      }}
    >
      {/* ========================================
          SECTION 1: Date Display
          - Month badge (golden) - clickable for date picker
          - Day number
          - Full date text
          ======================================== */}
      <div className="flex items-center gap-4 p-2">
        {/* Date badge - clickable to open calendar */}
        <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              requireAuth={false}
              style={{
                width: 54,
                height: 58,
              }}
              className="flex flex-col overflow-hidden items-center p-0 bg-[rgba(234,231,236,1)] text-[rgba(33,31,38,1)] rounded-lg cursor-pointer hover:opacity-80"
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
                className="w-full text-center text-xs text-[rgba(255,255,255,1)] font-medium uppercase bg-[rgba(184,134,11,1)]"
              >
                {MONTHS[startDate.getMonth()]}
              </div>

              <div className="flex flex-col justify-center items-center h-full">
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                  className="text-2xl font-bold"
                >
                  {startDate.getDate()}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Full date and time display */}
        <div className="flex flex-col">
          <span style={{
            fontWeight: 500,
            fontSize: 14,
          }} className="text-[rgba(33,31,38,1)] text-base font-medium">
            {DAYS[startDate.getDay()]}, {startDate.getDate()}{' '}
            {MONTHS[startDate.getMonth()]}
          </span>

          {/* Time Range - single popover for both start and end */}
          <Popover open={timeRangePopoverOpen} onOpenChange={setTimeRangePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                requireAuth={false}
                className="flex items-center gap-2 cursor-pointer hover:opacity-70 h-auto p-0 hover:bg-transparent"
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                  className="flex items-center gap-0.5 text-[rgba(33,31,38,1)]"
                >
                  <span>{startTimeValues.hour.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span>{startTimeValues.minute.toString().padStart(2, '0')}</span>
                  <span className="ml-0.5">{startTimeValues.period}</span>
                </span>

                <ChevronRight className="size-6 text-[rgba(132,130,142,1)]" />

                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                  className="flex items-center gap-0.5 text-[rgba(33,31,38,1)]"
                >
                  <span>{endTimeValues.hour.toString().padStart(2, '0')}</span>
                  <span>:</span>
                  <span>{endTimeValues.minute.toString().padStart(2, '0')}</span>
                  <span className="ml-0.5">{endTimeValues.period}</span>
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="flex flex-col gap-4">
                {/* Start Time Section */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Start Time</span>
                  <div className="flex items-center gap-2">
                    <Select
                      value={startTimeValues.hour.toString()}
                      onValueChange={handleStartHourChange}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent>
                        {hourOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-muted-foreground">:</span>

                    <Select
                      value={(Math.floor(startTimeValues.minute / 15) * 15).toString()}
                      onValueChange={handleStartMinuteChange}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {minuteOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={startTimeValues.period}
                      onValueChange={(v) => handleStartPeriodChange(v as 'AM' | 'PM')}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="AM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <ChevronRight className="size-4 text-muted-foreground" />
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* End Time Section */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">End Time</span>
                  <div className="flex items-center gap-2">
                    <Select
                      value={endTimeValues.hour.toString()}
                      onValueChange={handleEndHourChange}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent>
                        {hourOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-muted-foreground">:</span>

                    <Select
                      value={(Math.floor(endTimeValues.minute / 15) * 15).toString()}
                      onValueChange={handleEndMinuteChange}
                    >
                      <SelectTrigger className="w-17.5">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {minuteOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={endTimeValues.period}
                      onValueChange={(v) => handleEndPeriodChange(v as 'AM' | 'PM')}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="AM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ========================================
          SECTION 2: Timezone Selector
          ======================================== */}
      <Popover open={timezonePopoverOpen} onOpenChange={(open) => {
        setTimezonePopoverOpen(open);
        if (!open) setTimezoneSearch('');
      }}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            requireAuth={false}
            style={{
              fontWeight: 500,
              fontSize: 14
            }}
            className="flex items-center gap-1.5 text-[rgba(142,140,153,1)] border-t border-gray-100 p-2 w-full hover:bg-gray-50 cursor-pointer z-100 justify-start h-auto rounded-none"
          >
            <Image alt='globe' src={'/icons/globe.svg'} width={24} height={24} />
            <span>{timezoneDisplay}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          {/* Search input */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search timezone..."
                value={timezoneSearch}
                onChange={(e) => setTimezoneSearch(e.target.value)}
                className="pl-8 h-9"
              />
            </div>
          </div>

          {/* Timezone list */}
          <div className="max-h-64 overflow-y-auto p-1">
            {Object.entries(groupedTimezones).map(([region, zones]) => (
              <div key={region}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {region}
                </div>
                {zones.map((tz) => (
                  <Button
                    key={tz.value}
                    type="button"
                    variant="ghost"
                    onClick={() => handleTimezoneSelect(tz.value)}
                    requireAuth={false}
                    className={cn(
                      'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-sm h-auto hover:bg-accent hover:text-accent-foreground',
                      timezone === tz.value && 'bg-accent'
                    )}
                  >
                    <span>{tz.label}</span>
                    {timezone === tz.value && (
                      <Check className="size-4" />
                    )}
                  </Button>
                ))}
              </div>
            ))}
            {filteredTimezones.length === 0 && (
              <div className="px-2 py-4 text-sm text-center text-muted-foreground">
                No timezone found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Export helper for getting default timezone
export { getDefaultTimezone };
