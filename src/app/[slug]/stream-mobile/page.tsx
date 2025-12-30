'use client';

// ============================================
// Third-party Imports
// ============================================
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { X, Loader2, Ticket, ChevronRight, Search, Check } from 'lucide-react';
import Image from 'next/image';

// ============================================
// Local/Project Imports
// ============================================
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarComponent } from '@/components/avatar-component';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getDefaultTimezone } from '@/components/stream-date-picker';
import { ScheduleDrawer } from '@/components/schedule-drawer';
import { PassDrawer, type Pass } from '@/components/pass-drawer';
import { api } from '@/lib/api-client';
import type { CreateVideoCallDto } from '@backstage-pass/api';
import { useStagePasses } from '@/hooks';
import { useStageAccess } from '@/lib/stage-access-context';
// import ProfileCollapsedHeader from '@/components/profile/profile-collapsed-header';

// ============================================
// Helper Functions
// ============================================

/**
 * Converts a local date to an ISO string in the specified timezone
 * The date object contains the "wall clock" time the user selected,
 * and we need to interpret it as being in the specified timezone
 */
function toISOStringInTimezone(date: Date, timezone: string): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

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

  const parts = formatter.formatToParts(new Date());
  const offsetPart = parts.find((p) => p.type === 'timeZoneName');
  const offsetStr = offsetPart?.value || '+00:00';

  const offsetMatch = offsetStr.match(/GMT([+-]\d{2}):?(\d{2})?/);
  let offsetHours = 0;
  let offsetMinutes = 0;
  if (offsetMatch) {
    offsetHours = parseInt(offsetMatch[1], 10);
    offsetMinutes = parseInt(offsetMatch[2] || '0', 10);
    if (offsetHours < 0) offsetMinutes = -offsetMinutes;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const offsetSign = offsetHours >= 0 ? '+' : '-';
  const absOffsetHours = Math.abs(offsetHours);
  const absOffsetMinutes = Math.abs(offsetMinutes);

  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00${offsetSign}${pad(absOffsetHours)}:${pad(absOffsetMinutes)}`;
}

// ============================================
// Timezone Data
// ============================================
const TIMEZONES = [
  {
    value: 'Pacific/Honolulu',
    label: 'Honolulu',
    offset: 'GMT-10:00',
    region: 'Pacific',
  },
  {
    value: 'America/Anchorage',
    label: 'Anchorage',
    offset: 'GMT-09:00',
    region: 'America',
  },
  {
    value: 'America/Los_Angeles',
    label: 'Los Angeles',
    offset: 'GMT-08:00',
    region: 'America',
  },
  {
    value: 'America/Denver',
    label: 'Denver',
    offset: 'GMT-07:00',
    region: 'America',
  },
  {
    value: 'America/Chicago',
    label: 'Chicago',
    offset: 'GMT-06:00',
    region: 'America',
  },
  {
    value: 'America/New_York',
    label: 'New York',
    offset: 'GMT-05:00',
    region: 'America',
  },
  {
    value: 'America/Sao_Paulo',
    label: 'São Paulo',
    offset: 'GMT-03:00',
    region: 'America',
  },
  {
    value: 'Atlantic/Azores',
    label: 'Azores',
    offset: 'GMT-01:00',
    region: 'Atlantic',
  },
  {
    value: 'Europe/London',
    label: 'London',
    offset: 'GMT+00:00',
    region: 'Europe',
  },
  {
    value: 'Europe/Paris',
    label: 'Paris',
    offset: 'GMT+01:00',
    region: 'Europe',
  },
  {
    value: 'Europe/Berlin',
    label: 'Berlin',
    offset: 'GMT+01:00',
    region: 'Europe',
  },
  {
    value: 'Africa/Cairo',
    label: 'Cairo',
    offset: 'GMT+02:00',
    region: 'Africa',
  },
  {
    value: 'Europe/Moscow',
    label: 'Moscow',
    offset: 'GMT+03:00',
    region: 'Europe',
  },
  { value: 'Asia/Dubai', label: 'Dubai', offset: 'GMT+04:00', region: 'Asia' },
  {
    value: 'Asia/Karachi',
    label: 'Karachi',
    offset: 'GMT+05:00',
    region: 'Asia',
  },
  {
    value: 'Asia/Kolkata',
    label: 'Kolkata',
    offset: 'GMT+05:30',
    region: 'Asia',
  },
  { value: 'Asia/Dhaka', label: 'Dhaka', offset: 'GMT+06:00', region: 'Asia' },
  {
    value: 'Asia/Bangkok',
    label: 'Bangkok',
    offset: 'GMT+07:00',
    region: 'Asia',
  },
  {
    value: 'Asia/Singapore',
    label: 'Singapore',
    offset: 'GMT+08:00',
    region: 'Asia',
  },
  { value: 'Asia/Tokyo', label: 'Tokyo', offset: 'GMT+09:00', region: 'Asia' },
  {
    value: 'Australia/Sydney',
    label: 'Sydney',
    offset: 'GMT+11:00',
    region: 'Australia',
  },
  {
    value: 'Pacific/Auckland',
    label: 'Auckland',
    offset: 'GMT+13:00',
    region: 'Pacific',
  },
];

// ============================================
// Component
// ============================================

export default function CreateStreamPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  console.log('Stage slug:', slug);

  // Get stage data from context
  const { stage: stageData } = useStageAccess();

  const stageId = stageData?.id || '';

  // Form state
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setHours(22, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setHours(23, 0, 0, 0);
    return date;
  });
  const [timezone, setTimezone] = useState('UTC');
  const [selectedPassIds, setSelectedPassIds] = useState<string[]>([]);
  const [isPassDrawerOpen, setIsPassDrawerOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [timezonePopoverOpen, setTimezonePopoverOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState('');
  // const [notifySubscribers, setNotifySubscribers] = useState(true);

  // Fetch passes for this stage
  const { data: {passes = []} = {passes: []} } = useStagePasses(
    { stageId, visibility: 'public' },
    { enabled: !!stageId },
  );

  // Map API passes to Pass type for PassSelector
  const availablePasses: Pass[] =
    passes?.map((pass) => ({
      id: pass.id,
      name: pass.name,
    })) ?? [];

  // Get selected passes as Pass objects
  const selectedPasses = useMemo(() => {
    return availablePasses.filter((p) => selectedPassIds.includes(p.id));
  }, [availablePasses, selectedPassIds]);

  // Filter timezones based on search
  const filteredTimezones = useMemo(() => {
    if (!timezoneSearch) return TIMEZONES;
    const search = timezoneSearch.toLowerCase();
    return TIMEZONES.filter(
      (tz) =>
        tz.label.toLowerCase().includes(search) ||
        tz.offset.toLowerCase().includes(search) ||
        tz.region.toLowerCase().includes(search),
    );
  }, [timezoneSearch]);

  // Group filtered timezones by region
  const groupedTimezones = useMemo(() => {
    return filteredTimezones.reduce(
      (acc, tz) => {
        if (!acc[tz.region]) acc[tz.region] = [];
        acc[tz.region].push(tz);
        return acc;
      },
      {} as Record<string, typeof TIMEZONES>,
    );
  }, [filteredTimezones]);

  // Get display text for selected timezone
  const timezoneDisplay = useMemo(() => {
    const tz = TIMEZONES.find((t) => t.value === timezone);
    return tz ? `${tz.offset} ${tz.label}` : timezone;
  }, [timezone]);

  // Handle timezone selection
  const handleTimezoneSelect = (value: string) => {
    setTimezone(value);
    setTimezonePopoverOpen(false);
    setTimezoneSearch('');
  };

  // Set timezone on client side to avoid hydration mismatch
  useEffect(() => {
    setTimezone(getDefaultTimezone());
  }, []);

  // TanStack Query mutation for creating video call
  const mutation = useMutation({
    mutationFn: async (data: CreateVideoCallDto) => {
      const response = await api.videoCallsControllerCreateVideoCallV1(
        { stageId },
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });

  const handleSubmit = () => {
    const videoCallData: CreateVideoCallDto = {
      title: title || 'Untitled Stream',
      scheduledStartAt: toISOStringInTimezone(startDate, timezone),
      scheduledEndAt: toISOStringInTimezone(endDate, timezone),
      passIds: selectedPassIds.length > 0 ? selectedPassIds : undefined,
    };

    mutation.mutate(videoCallData);
  };

  const handleClose = () => {
    router.back();
  };

  const creatorAvatar =  stageData.owner.image || '/creator_dp.png';
  const creatorName = 'Creator';

  return (
    <div className="min-h-screen">
      {/* <ProfileCollapsedHeader /> */}
      <div className="min-h-screen bg-gray-50 flex items-start justify-center">
        <div className="relative h-screen flex flex-col gap-12 bg-white w-full max-w-full overflow-hidden shadow-2xl">
          {/* Background: Blurred image that extends and fades smoothly */}
          <div
            className="absolute inset-0 scale-150"
            style={{
              backgroundImage: `url(${creatorAvatar})`,
              backgroundSize: 'cover',
              backgroundPosition: '-63px -299px',
              filter: 'blur(35px)',
              opacity: 0.7,
            }}
          />
          {/* Gradient overlay - fades to white in upper portion */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.9) 35%, rgba(255, 255, 255, 1) 45%)',
            }}
          />

          <div className="relative flex flex-col gap-4">
            {/* SECTION 1: Header with Close and Create buttons */}
            <div className="relative p-4 pb-0">
              {/* Header row with close and create buttons */}
              <div className="flex items-center justify-between mb-4">
                {/* Close button - left */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="group bg-[rgba(48,0,64,0.06)] hover:bg-[rgba(33,31,38,1)] rounded-full p-1.5 h-auto w-auto"
                >
                  <X className="size-5 text-[rgba(33,31,38,1)] group-hover:text-[rgba(253,252,253,1)] transition-colors" />
                </Button>

                {/* Create button - right */}
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={mutation.isPending}
                  className="h-9 px-6 bg-[rgba(184,134,11,1)] hover:bg-[#B8921F] text-white rounded-full text-sm font-medium shadow-md"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
              </div>

              {/* Avatar */}
              <div className="px-3 pt-2">
                <AvatarComponent
                  src={creatorAvatar}
                  username={creatorName}
                  size="size-20.5"
                  className="ring-4 ring-white/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 px-3 pb-24">
              {/* ========================================
          SECTION 2: Stream Title Input
          - Left aligned heading style
          - Placeholder text
          ======================================== */}
              <div className="">
                <Input
                  type="text"
                  placeholder="Stream Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                  }}
                  className="bg-transparent shadow-none border-none text-[rgba(33,31,38,1)] text-2xl p-0 h-auto placeholder:text-[rgba(8,0,49,0.27)] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* ========================================
          SECTION 3: Date/Time Picker
          - "When will the stream start?" label
          - Clickable card that opens Schedule drawer
          ======================================== */}
              <div className="flex flex-col gap-2">
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: '20px',
                  }}
                  className="text-[rgba(33,31,38,1)]"
                >
                  When will the stream start?
                </p>

                {/* Combined Date/Time + Timezone Card */}
                <div className="w-full bg-[rgba(253,252,253,1)] border border-[rgba(234,231,236,1)] rounded-[24px] py-2 flex flex-col gap-2">
                  {/* Date/Time Section - Clickable */}
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setIsScheduleDrawerOpen(true)}
                    className="w-full pl-2 pr-8 text-left hover:bg-gray-50/50 h-auto justify-start"
                  >
                    <div className="flex items-center gap-3">
                      {/* Date badge */}
                      <div
                        className="flex flex-col overflow-hidden items-center bg-[rgba(234,231,236,1)] text-[rgba(33,31,38,1)] rounded-[16px]"
                        style={{ width: 54, height: 58 }}
                      >
                        <div
                          className="w-full text-center text-white pt-0.5"
                          style={{
                            fontWeight: 500,
                            fontSize: 12,
                            lineHeight: '16px',
                            backgroundColor: 'rgba(184,134,11,1)',
                          }}
                        >
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
                        <div className="flex flex-1 items-center justify-center">
                          <span
                            className="text-[rgba(33,31,38,1)]"
                            style={{
                              fontWeight: 700,
                              fontSize: 24,
                              lineHeight: '30px',
                            }}
                          >
                            {startDate.getDate()}
                          </span>
                        </div>
                      </div>

                      {/* Date and time info */}
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[rgba(33,31,38,1)]"
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: '20px',
                          }}
                        >
                          {
                            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
                              startDate.getDay()
                            ]
                          }
                          , {startDate.getDate()}{' '}
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
                        </span>
                        <span
                          className="text-[rgba(33,31,38,1)] flex items-center gap-2"
                          style={{
                            fontSize: 18,
                            fontWeight: 600,
                            lineHeight: '26px',
                          }}
                        >
                          {(() => {
                            const startHour = startDate.getHours();
                            const startMin = startDate.getMinutes();
                            const startPeriod = startHour >= 12 ? 'PM' : 'AM';
                            const startH = startHour % 12 || 12;

                            const endHour = endDate.getHours();
                            const endMin = endDate.getMinutes();
                            const endPeriod = endHour >= 12 ? 'PM' : 'AM';
                            const endH = endHour % 12 || 12;

                            return (
                              <>
                                <span>
                                  {startH} : {String(startMin).padStart(2, '0')}{' '}
                                  {startPeriod}
                                </span>
                                <ChevronRight className="size-6 text-[rgba(132,130,142,1)]" />
                                <span>
                                  {endH} : {String(endMin).padStart(2, '0')}{' '}
                                  {endPeriod}
                                </span>
                              </>
                            );
                          })()}
                        </span>
                      </div>
                    </div>
                  </Button>

                  {/* Separator */}
                  <div className="w-full h-px bg-[rgba(32,0,54,0.09)]" />

                  {/* Timezone Selector */}
                  <Popover
                    open={timezonePopoverOpen}
                    onOpenChange={(open) => {
                      setTimezonePopoverOpen(open);
                      if (!open) setTimezoneSearch('');
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        type="button"
                        className="flex items-center gap-1.5 px-2 w-full hover:bg-gray-50/50 h-auto justify-start"
                      >
                        <Image
                          alt="globe"
                          src="/icons/globe.svg"
                          width={24}
                          height={24}
                        />
                        <span
                          className="text-[rgba(142,140,153,1)]"
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: '20px',
                          }}
                        >
                          {timezoneDisplay}
                        </span>
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
                        {Object.entries(groupedTimezones).map(
                          ([region, zones]) => (
                            <div key={region}>
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                {region}
                              </div>
                              {zones.map((tz) => (
                                <Button
                                  key={tz.value}
                                  variant="ghost"
                                  type="button"
                                  onClick={() => handleTimezoneSelect(tz.value)}
                                  className={cn(
                                    'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground h-auto',
                                    timezone === tz.value && 'bg-accent',
                                  )}
                                >
                                  <span>{tz.label}</span>
                                  {timezone === tz.value && (
                                    <Check className="size-4" />
                                  )}
                                </Button>
                              ))}
                            </div>
                          ),
                        )}
                        {filteredTimezones.length === 0 && (
                          <div className="px-2 py-4 text-sm text-center text-muted-foreground">
                            No timezone found
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Schedule Drawer */}
                <ScheduleDrawer
                  open={isScheduleDrawerOpen}
                  onOpenChange={setIsScheduleDrawerOpen}
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                />
              </div>

              {/* ========================================
          SECTION 4: Pass Selector
          - "Who can access?" label
          - Pass chips with clear button
          - Opens drawer on click
          ======================================== */}
              <div className="">
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  className="text-[rgba(33,31,38,1)] mb-3"
                >
                  Who can access?
                </p>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsPassDrawerOpen(true)}
                  style={{
                    border: '1px solid rgba(234,231,236,1)',
                  }}
                  className="relative flex items-center justify-between rounded-[12px] p-3 w-full text-left hover:bg-gray-50 h-auto"
                >
                  <div className="flex flex-wrap items-center gap-2 flex-1">
                    {selectedPasses.length > 0 ? (
                      selectedPasses.map((pass) => (
                        <div
                          style={{
                            border: '1px solid rgba(200, 128, 0, 0.5)',
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                          key={pass.id}
                          className="flex items-center gap-2.5 bg-[#C9A227]/10 text-[rgba(141,101,0,1)] px-3 py-1.5 rounded-full"
                        >
                          <Ticket size={16} />
                          <span>{pass.name}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Select passes...
                      </span>
                    )}
                  </div>
                  <ChevronRight className="size-5 text-gray-400 ml-2 shrink-0" />
                </Button>
              </div>
              {/* <PassSelector availablePasses={availablePasses} onSelectionChange={onSelectionChange} /> */}

              {/* Pass Drawer */}
              <PassDrawer
                open={isPassDrawerOpen}
                onOpenChange={setIsPassDrawerOpen}
                availablePasses={availablePasses}
                selectedPassIds={selectedPassIds}
                onSelectionChange={setSelectedPassIds}
              />

              {/* ========================================
              SECTION 5: Notify Toggle & Create Button
              ======================================== */}
              <div className="relative z-100 flex flex-col gap-4 px-8 py-8">
                {/* Notify subscribers toggle */}
                {/* <div className="flex items-center justify-between bg-[rgba(234,231,236,0.5)] rounded-2xl px-4 py-3">
                  <span
                    className="text-[rgba(33,31,38,1)]"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Notify subscribers about this workshop
                  </span>
                  <Switch
                    checked={notifySubscribers}
                    onCheckedChange={setNotifySubscribers}
                    className="data-[state=checked]:bg-[rgba(184,134,11,1)]"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
