'use client';

// ============================================
// Third-party Imports
// ============================================
import { useState, useEffect, useMemo, useRef } from 'react';
import { Loader2, Check, Search } from 'lucide-react';
import { toast } from 'sonner';

// ============================================
// Local/Project Imports
// ============================================
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { AvatarComponent } from '@/components/avatar-component';
import { getDefaultTimezone } from '@/components/stream-date-picker';
import {
  SchedulePickerContent,
  getInitialScheduleTimes,
  type ActiveField,
} from '@/components/schedule-modal';
import type { BaseModalProps } from '@/types/modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useStagePasses } from '@/hooks/use-stages';
import { useCreateVideoCall } from '@/hooks/use-video-calls';
import { Modal } from '@/components/modal';
import type { CreateVideoCallDto } from '@backstage-pass/api';
import { BlurryImageEffect } from '@/components/profile/BlurryImageEffect';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  TicketIcon,
  CaretRightIcon,
  GlobeSimpleIcon,
} from '@phosphor-icons/react';

// ============================================
// Constants
// ============================================
const TIMEZONE_OPTIONS = [
  // Americas
  { value: 'America/New_York', label: 'Eastern Time (ET)', region: 'Americas' },
  { value: 'America/Chicago', label: 'Central Time (CT)', region: 'Americas' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', region: 'Americas' },
  {
    value: 'America/Los_Angeles',
    label: 'Pacific Time (PT)',
    region: 'Americas',
  },
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

// ============================================
// Types & Interfaces
// ============================================
export interface StreamData {
  title: string;
  scheduledStartAt: string;
  scheduledEndAt: string;
  timezone: string;
  passIds: string[];
}

export interface CreateStreamModalProps extends BaseModalProps {
  stageId: string;
  creatorAvatar?: string;
  creatorName: string;
  onStreamCreated?: (streamData: StreamData) => void;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Converts a local date to an ISO string in the specified timezone
 * The date object contains the "wall clock" time the user selected,
 * and we need to interpret it as being in the specified timezone
 */
function toISOStringInTimezone(date: Date, timezone: string): string {
  // Get the parts of the date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Create a formatter that will give us the offset for the target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'longOffset',
  });

  // Create a date string in the target timezone and parse the offset
  const parts = formatter.formatToParts(new Date());
  const offsetPart = parts.find((p) => p.type === 'timeZoneName');
  const offsetStr = offsetPart?.value || '+00:00';

  // Parse the offset (e.g., "GMT+05:30" -> "+05:30")
  const offsetMatch = offsetStr.match(/GMT([+-]\d{2}):?(\d{2})?/);
  let offsetHours = 0;
  let offsetMinutes = 0;
  if (offsetMatch) {
    offsetHours = parseInt(offsetMatch[1], 10);
    offsetMinutes = parseInt(offsetMatch[2] || '0', 10);
    if (offsetHours < 0) offsetMinutes = -offsetMinutes;
  }

  // Build the ISO string with the timezone offset
  const pad = (n: number) => n.toString().padStart(2, '0');
  const offsetSign = offsetHours >= 0 ? '+' : '-';
  const absOffsetHours = Math.abs(offsetHours);
  const absOffsetMinutes = Math.abs(offsetMinutes);

  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00${offsetSign}${pad(absOffsetHours)}:${pad(absOffsetMinutes)}`;
}

// ============================================
// Component
// ============================================
export function CreateStreamModal({
  isOpen,
  onClose,
  stageId,
  creatorAvatar,
  creatorName,
  onStreamCreated,
}: CreateStreamModalProps) {
  // View state - 'form' shows the main form, 'schedule' shows the schedule picker
  const [view, setView] = useState<'form' | 'schedule'>('form');

  // Active field in schedule picker
  const [activeField, setActiveField] = useState<ActiveField>('startDate');

  // Fetch passes for this stage
  const { data: { passes = [] } = { passes: [] } } = useStagePasses(

    { stageId, visibility: 'public' },
    { enabled: !!stageId },
  );

  // Form state
  const [title, setTitle] = useState('');
  const [{ startDate, endDate }, setScheduleDates] = useState(
    getInitialScheduleTimes,
  );

  const setStartDate = (date: Date) =>
    setScheduleDates((prev) => {
      // Calculate the current duration between end and start
      const duration = prev.endDate.getTime() - prev.startDate.getTime();
      // Shift endDate to maintain the same duration
      const newEndDate = new Date(date.getTime() + duration);
      return { startDate: date, endDate: newEndDate };
    });
  const setEndDate = (date: Date) =>
    setScheduleDates((prev) => ({ ...prev, endDate: date }));
  const [timezone, setTimezone] = useState('UTC'); // Default to UTC, will be set on client
  const [selectedPassIds, setSelectedPassIds] = useState<string[]>([]);
  const [notifySubscribers, setNotifySubscribers] = useState(true);
  const [timezonePopoverOpen, setTimezonePopoverOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState('');

  // Ref for title input auto-focus
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Reset all states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setView('form');
      setActiveField('startDate');
      setTitle('');
      setScheduleDates(getInitialScheduleTimes());
      setTimezone(getDefaultTimezone());
      setSelectedPassIds([]);
      setNotifySubscribers(true);
      setTimezonePopoverOpen(false);
      setTimezoneSearch('');
    }
  }, [isOpen]);

  // Auto-focus title input when modal opens and form view is active
  useEffect(() => {
    if (isOpen && view === 'form') {
      // Small delay to allow modal animation to complete
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, view]);

  // Filter timezones based on search
  const filteredTimezones = useMemo(() => {
    if (!timezoneSearch) return TIMEZONE_OPTIONS;
    const search = timezoneSearch.toLowerCase();
    return TIMEZONE_OPTIONS.filter(
      (tz) =>
        tz.label.toLowerCase().includes(search) ||
        tz.value.toLowerCase().includes(search) ||
        tz.region.toLowerCase().includes(search),
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

  // Handler: Timezone selection
  const handleTimezoneSelect = (tz: string) => {
    setTimezone(tz);
    setTimezonePopoverOpen(false);
    setTimezoneSearch('');
  };

  // TanStack Query mutation for creating video call
  const { mutate: createVideoCall, isPending } = useCreateVideoCall();

  /* ========================================
     Handler: Submit form
     ======================================== */
  const handleSubmit = () => {
    // Validate title
    if (!title.trim()) {
      toast.error('Please enter a stream title');
      return;
    }

    // Validate passes
    if (selectedPassIds.length === 0) {
      toast.error('Please select at least one pass');
      return;
    }

    // Validate start date is in the future
    const now = new Date();
    if (startDate <= now) {
      toast.error('Start time must be in the future');
      return;
    }

    // Validate end date is after start date
    if (endDate <= startDate) {
      toast.error('End time must be after start time');
      return;
    }

    const videoCallData: CreateVideoCallDto = {
      title: title || 'Untitled Stream',
      scheduledStartAt: toISOStringInTimezone(startDate, timezone),
      scheduledEndAt: toISOStringInTimezone(endDate, timezone),
      passIds: selectedPassIds.length > 0 ? selectedPassIds : undefined,
    };

    createVideoCall(
      { stageId, data: videoCallData },
      {
        onSuccess: (data) => {
          const streamData: StreamData = {
            title: title || 'Untitled Stream',
            scheduledStartAt: toISOStringInTimezone(startDate, timezone),
            scheduledEndAt: toISOStringInTimezone(endDate, timezone),
            timezone,
            passIds: selectedPassIds,
          };
          onStreamCreated?.(streamData);
          onClose(data);
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      showCloseButton={true}
      dismissible={false}
      wrapperClassName="p-0!"
      className="sm:max-w-fit rounded-2xl! overflow-hidden p-0!"
    >
      <div className="relative flex flex-col bg-background w-125">
        {/* ========================================
            Background: Blurred image that extends and fades smoothly
            ======================================== */}
        {/* Blurred background image - covers full modal */}
        <div className="absolute inset-x-0 top-0 z-0">
          <BlurryImageEffect
            className='h-45 w-full'
            src={creatorAvatar}
          />
        </div>


        <div className="relative z-10  m-12">
          {/* ========================================
          CONDITIONAL CONTENT: Form or Schedule Picker
          ======================================== */}
          {view === 'schedule' ? (
            /* ========================================
             SCHEDULE PICKER VIEW
             ======================================== */
            <div className="relative">
              <SchedulePickerContent
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onDone={() => setView('form')}
                activeField={activeField}
                onActiveFieldChange={setActiveField}
              />
            </div>
          ) : (
            /* ========================================
             FORM VIEW
             ======================================== */
            <>
              <div className="relative flex flex-col gap-4">
                {/* ========================================
              SECTION 1: Modal Header with Avatar
              - Avatar positioned left
              - Close button top right
              ======================================== */}
                <div className="relative pb-4">
                  {/* Close button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onClose()}
                      requireAuth={false}
                      className="group absolute top-4 right-4 z-20 bg-neutral-alpha-3 hover:bg-neutral-12 rounded-full p-1.5"
                    >
                      <X className="size-5 text-neutral-12 group-hover:text-neutral-1 transition-colors" />
                    </Button> */}
                    </TooltipTrigger>
                    <TooltipContent className="z-[200] bg-neutral-12">
                      <p className="text-neutral-1">Close</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Avatar with border */}
                  <div className="relative">
                    <AvatarComponent
                      src={creatorAvatar}
                      username={creatorName}
                      size="size-20.5"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {/* ========================================
              SECTION 2: Stream Title Input
              - Left aligned heading style
              - Placeholder text
              ======================================== */}
                  <div className="">
                    <Input
                      ref={titleInputRef}
                      type="text"
                      placeholder="Stream Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                      }}
                      className="bg-transparent shadow-none border-none text-neutral-12 text-2xl p-0 h-auto placeholder:text-neutral-alpha-8 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded-none"
                    />
                  </div>

                  {/* ========================================
              SECTION 3: Date/Time Picker
              - "When will the stream start?" label
              - Clickable card that opens Schedule view
              ======================================== */}
                  <div className="flex flex-col gap-2">
                    <p className="text-neutral-12 font-medium text-sm leading-5">
                      When will the stream start?
                    </p>
                    <div className="w-full h-auto border border-neutral-4 rounded-3xl overflow-hidden">
                      {/* Date/Time Row */}
                      <div
                        onClick={() => setView('schedule')}
                        className="bg-neutral-1 py-2 px-2"
                      >
                        <div className="flex items-center gap-4 w-full">
                          {/* Start Date badge */}
                          <div
                            className="flex flex-1 gap-2 items-center hover:bg-neutral-2 cursor-pointer rounded-xl"
                            onClick={() => setActiveField('startDate')}
                          >
                            <div
                              className="flex flex-col overflow-hidden items-center border border-neutral-6 rounded-2xl"
                              style={{ width: 52, height: 56 }}
                            >
                              <div className="w-full text-center text-xs text-neutral-12 font-medium pt-1.5">
                                {
                                  [
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
                                  ][startDate.getMonth()]
                                }
                              </div>
                              <div className="flex flex-col justify-center items-center flex-1">
                                <span className="text-xl font-bold text-accent-9">
                                  {startDate.getDate()}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-neutral-12 text-sm font-medium">
                                {
                                  [
                                    'Sunday',
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                  ][startDate.getDay()]
                                }
                              </span>
                              <span className="text-neutral-12 text-lg font-semibold">
                                {(() => {
                                  const hour = startDate.getHours();
                                  const min = startDate.getMinutes();
                                  const period = hour >= 12 ? 'PM' : 'AM';
                                  const h = hour % 12 || 12;
                                  return `${String(h).padStart(2, '0')} : ${String(min).padStart(2, '0')} ${period}`;
                                })()}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <CaretRightIcon
                            size={24}
                            className="text-neutral-9 shrink-0"
                            weight="bold"
                          />

                          {/* End Date badge */}
                          <div
                            className="flex flex-1 gap-2 items-center hover:bg-neutral-2 cursor-pointer rounded-xl"
                            onClick={() => setActiveField('endDate')}
                          >
                            <div
                              className="flex flex-col overflow-hidden items-center border border-neutral-6 rounded-2xl"
                              style={{ width: 52, height: 56 }}
                            >
                              <div className="w-full text-center text-xs text-neutral-12 font-medium pt-1.5">
                                {
                                  [
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
                                  ][endDate.getMonth()]
                                }
                              </div>
                              <div className="flex flex-col justify-center items-center flex-1">
                                <span className="text-xl font-bold text-accent-9">
                                  {endDate.getDate()}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-neutral-12 text-sm font-medium">
                                {
                                  [
                                    'Sunday',
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                  ][endDate.getDay()]
                                }
                              </span>
                              <span className="text-neutral-12 text-lg font-semibold">
                                {(() => {
                                  const hour = endDate.getHours();
                                  const min = endDate.getMinutes();
                                  const period = hour >= 12 ? 'PM' : 'AM';
                                  const h = hour % 12 || 12;
                                  return `${String(h).padStart(2, '0')} : ${String(min).padStart(2, '0')} ${period}`;
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timezone Row */}
                      <DropdownMenu
                        open={timezonePopoverOpen}
                        onOpenChange={(open) => {
                          setTimezonePopoverOpen(open);
                          if (!open) setTimezoneSearch('');
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:bg-neutral-2 flex items-center gap-2 px-4 py-3 bg-white w-full transition-colors cursor-pointer border-top border-neutral-4 "
                          >
                            <GlobeSimpleIcon
                              size={20}
                              weight="regular"
                              className="text-neutral-9"
                            />
                            <span className="text-sm font-medium text-neutral-9">
                              {getTimezoneDisplay(timezone)}
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-72 p-0 bg-white z-999"
                          align="start"
                        >
                          {/* Search input */}
                          <div className="p-2 border-b border-neutral-6">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-neutral-9" />
                              <Input
                                placeholder="Search timezone..."
                                value={timezoneSearch}
                                onChange={(e) =>
                                  setTimezoneSearch(e.target.value)
                                }
                                className="pl-8 h-9"
                              />
                            </div>
                          </div>

                          {/* Timezone list */}
                          <div
                            className="p-1 overflow-auto"
                            style={{ maxHeight: '250px' }}
                            onWheel={(e) => e.stopPropagation()}
                          >
                            {Object.entries(groupedTimezones).map(
                              ([region, zones]) => (
                                <div key={region}>
                                  <div className="px-2 py-1.5 text-xs font-semibold text-neutral-9">
                                    {region}
                                  </div>
                                  {zones.map((tz) => (
                                    <button
                                      key={tz.value}
                                      type="button"
                                      onClick={() =>
                                        handleTimezoneSelect(tz.value)
                                      }
                                      className={cn(
                                        'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-sm hover:bg-neutral-3 transition-colors text-left',
                                        timezone === tz.value && 'bg-neutral-3',
                                      )}
                                    >
                                      <span className="text-neutral-12">
                                        {tz.label}
                                      </span>
                                      {timezone === tz.value && (
                                        <Check className="size-4 text-accent-9" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              ),
                            )}
                            {filteredTimezones.length === 0 && (
                              <div className="px-2 py-4 text-sm text-center text-neutral-9">
                                No timezone found
                              </div>
                            )}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* ========================================
              SECTION 4: Pass Selector
              - "Who can access?" label
              - Pass chips with clear button
              ======================================== */}
                  <div className="">
                    <p className="text-neutral-12 font-medium text-base mb-2">
                      Who can access?
                    </p>
                    <>
                      <MultiSelect
                        options={
                          passes?.map((pass) => ({
                            value: pass.id,
                            label: pass.name,
                          })) ?? []
                        }
                        selected={selectedPassIds}
                        onChange={setSelectedPassIds}
                        placeholder="Select"
                        inputContainerClass="rounded-[30px]"
                        icon={
                          <TicketIcon
                            size={18}
                            className="text-neutral-11"
                            weight="regular"
                          />
                        }
                        // maxItemsPerRow={3}
                        filterOutSelected={false}
                        dropdownPosition="top"
                      />
                    </>
                  </div>

                  {/* Notify subscribers toggle */}
                  <div className="flex items-center justify-between bg-neutral-alpha-3 rounded-full h-15 px-4 gap-4">
                    <span className="text-neutral-12 text-base font-normal whitespace-nowrap">
                      Notify subscribers about this workshop
                    </span>
                    <Switch
                      checked={notifySubscribers}
                      onCheckedChange={setNotifySubscribers}
                      className="data-[state=checked]:bg-accent-9"
                    />
                  </div>
                </div>
              </div>

              {/* ========================================
              SECTION 5: Create Button
              ======================================== */}
              <div className="relative z-100 flex flex-col gap-4 py-12">
                {/* Create button */}
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isPending || !title.trim() || selectedPassIds.length === 0}
                  className="w-full h-10 bg-accent-9 hover:bg-accent-10 rounded-full text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    color: 'white',
                  }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-5 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
