'use client';

import { useCallback, useMemo, useState } from 'react';

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Search,
  Users,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import ProfileCollapsedHeader from '@/components/profile/profile-collapsed-header';
import { AvatarComponent } from '@/components/avatar-component';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useVideoCall, useVideoCallMembers } from '@/hooks';
import { useStageAccess } from '@/lib/stage-access-context';
import { cn } from '@/lib/utils';
import { PassImage, PassTheme } from '@/components/passes/utils';
import { Text } from '@/components/ui/text';

// ============================================
// Types
// ============================================

interface AttendeeData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  passName: string;
  passCount?: number;
  status: 'attended' | 'missed';
}

type FilterType = 'all' | 'attended' | 'missed';

// ============================================
// Components
// ============================================

interface StatCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'success' | 'error';
}

function StatCard({ label, value, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default:
      'bg-[var(--color-mauve-3)] border-[var(--color-mauve-8)] text-[var(--color-neutral-12)]',
    success:
      'bg-[var(--color-success-3)] border-[var(--color-success-8)] text-[var(--color-success-10)]',
    error:
      'bg-[var(--color-error-3)] border-[var(--color-error-8)] text-[var(--color-error-10)]',
  };

  const labelStyles = {
    default: 'text-[var(--color-neutral-12)]',
    success: 'text-[var(--color-success-10)]',
    error: 'text-[var(--color-error-10)]',
  };

  return (
    <div
      className={cn(
        'flex-1 flex flex-col gap-2 p-4 rounded-3xl border',
        variantStyles[variant],
      )}
    >
      <p className={cn('text-base', labelStyles[variant])}>{label}</p>
      <p
        className={cn(
          'text-[28px] font-semibold leading-9',
          labelStyles[variant],
        )}
      >
        {value}
      </p>
    </div>
  );
}

interface StatusBadgeProps {
  status: 'attended' | 'missed';
}

function StatusBadge({ status }: StatusBadgeProps) {
  const isAttended = status === 'attended';
  return (
    <span
      className={cn(
        'px-2.5 py-1 rounded-full text-sm font-medium',
        isAttended
          ? 'bg-[rgba(0,164,51,0.1)] text-[rgba(0,113,63,0.87)]'
          : 'bg-[rgba(220,62,66,0.1)] text-[#dc3e42]',
      )}
    >
      {isAttended ? 'Attended' : 'Missed'}
    </span>
  );
}

interface LinkedPassCardProps {
  pass: { id: string; name: string, theme: PassTheme };
}

function LinkedPassCard({ pass }: LinkedPassCardProps) {
  return (
    <div className="flex gap-3 items-center rounded-lg w-full">
      <div className="relative w-17.5 h-12.5 rounded-xl overflow-hidden shrink-0">
        <PassImage theme={pass.theme} className='absolute inset-0' />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Text as='p' className="text-lg font-medium text-[var(--color-neutral-12)] truncate">
          {pass.name}
        </Text>
      </div>
    </div>
  );
}

function EmptyAttendeesState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-[rgba(20,0,53,0.15)] rounded-3xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-[var(--color-neutral-12)]">
          Attendee tracking coming soon
        </p>
        <p className="text-sm text-muted-foreground max-w-md">
          Attendee data will be available here once the stream has ended.
        </p>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function StreamDetailsPage() {
  const params = useParams<{ slug: string; streamId: string }>();
  const router = useRouter();
  const { stage, isLoading: stageLoading } = useStageAccess();

  // Fetch real stream data
  const {
    data: streamData,
    isLoading: streamLoading,
    error,
  } = useVideoCall(stage?.id || '', params.streamId);

  // State for attendees
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch attendees from API
  const { data: membersData } = useVideoCallMembers(
    stage?.id || '',
    params.streamId,
    {
      mode: filter === 'all' ? 'all' : filter,
      search: searchQuery.trim() || undefined,
      limit: 100, // Fetch more to handle client-side pagination
    }
  );

  const isLoading = stageLoading || streamLoading;

  // Map API response to AttendeeData format
  const attendees: AttendeeData[] = useMemo(() => {
    if (!membersData?.pages) return [];
    return membersData.pages.flatMap((page) =>
      page.members.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        avatar: typeof m.image === 'string' ? m.image : undefined,
        passName: m.passes[0]?.name || 'Unknown',
        status: m.attended ? 'attended' : 'missed',
      }))
    );
  }, [membersData]);

  // Determine stream status
  const isCompleted = streamData?.status === 'ended';

  // Filter is now done by API, but we still need local filtering for search
  const filteredAttendees = useMemo(() => {
    // API already handles filter and search, so just return attendees
    return attendees;
  }, [attendees]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttendees.length / itemsPerPage),
  );
  const paginatedAttendees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAttendees.slice(start, start + itemsPerPage);
  }, [filteredAttendees, currentPage, itemsPerPage]);

  // Handlers
  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleDownloadCSV = useCallback(() => {
    const headers = ['Name', 'Email', 'Pass', 'Status'];
    const rows = filteredAttendees.map((a) => [
      a.name,
      a.email,
      a.passName,
      a.status.charAt(0).toUpperCase() + a.status.slice(1),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `stream-attendees-${params.streamId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filteredAttendees, params.streamId]);

  // Format date and time
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#b8860b] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !streamData) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <ProfileCollapsedHeader />
        <div className="flex items-center justify-center h-[calc(100vh-60px)]">
          <div className="text-center">
            <p className="text-xl font-medium text-[var(--color-neutral-12)]">
              Stream Not Found
            </p>
            <p className="text-[rgba(4,0,17,0.61)] mt-2">
              The stream you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have access.
            </p>
            <Button
              onClick={() => router.push(`/${params.slug}/streams`)}
              className="mt-4 bg-[#b8860b] hover:bg-[#9a7209] text-white rounded-full"
            >
              Back to Streams
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <ProfileCollapsedHeader />

      {/* Main Content */}
      <div className="flex gap-12 justify-center max-w-[1056px] px-4 mx-auto pt-3 pb-16">
        {/* Left Column */}
        <div className="w-[62.5%] flex flex-col gap-6">
          {/* Back Button + Title */}
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full hover:bg-[rgba(48,0,64,0.06)]"
            >
              <ArrowLeft className="w-6 h-6 text-[var(--color-neutral-12)]" />
            </Button>
            <h1 className="text-2xl font-medium text-[var(--color-neutral-12)]">
              Stream Details
            </h1>
          </div>

          {/* Stats Cards - Only for completed streams */}
          {isCompleted && (
            <div className="flex gap-4">
              <StatCard
                label="Total Attendees"
                value={attendees.length}
                variant="default"
              />
              <StatCard
                label="Attended"
                value={attendees.filter((a) => a.status === 'attended').length}
                variant="success"
              />
              <StatCard
                label="Missed"
                value={attendees.filter((a) => a.status === 'missed').length}
                variant="error"
              />
            </div>
          )}

          {/* Search + Download CSV */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-12" />
                <Input
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 h-10 rounded-full"
                  disabled={attendees.length === 0}
                />
              </div>
              <Button
                variant="outline"
                onClick={handleDownloadCSV}
                className="h-10 rounded-full border-[rgba(4,0,17,0.61)] gap-3"
                disabled={attendees.length === 0}
              >
                Download CSV
                <Download className="w-[18px] h-[18px]" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                onClick={() => handleFilterChange('all')}
                className={cn(
                  'h-8 px-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50',
                  filter === 'all'
                    ? 'bg-[var(--color-neutral-12)] text-white'
                    : 'bg-[rgba(48,0,64,0.06)] text-[var(--color-neutral-12)] hover:bg-[rgba(48,0,64,0.1)]',
                )}
              >
                All
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleFilterChange('attended')}
                className={cn(
                  'h-8 px-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50',
                  filter === 'attended'
                    ? 'bg-neutral-12 text-white'
                    : 'bg-[rgba(48,0,64,0.06)] text-neutral-12 hover:bg-[rgba(48,0,64,0.1)]',
                )}
              >
                Attended
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleFilterChange('missed')}
                className={cn(
                  'h-8 px-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50',
                  filter === 'missed'
                    ? 'bg-neutral-12 text-white'
                    : 'bg-[rgba(48,0,64,0.06)] text-neutral-12 hover:bg-[rgba(48,0,64,0.1)]',
                )}
              >
                Missed
              </Button>
            </div>
          </div>

          {/* Table or Empty State */}
          {attendees.length === 0 ? (
            <EmptyAttendeesState />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="border border-neutral-alpha-6 rounded-3xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-alpha-2 hover:bg--neutral-alpha-2 border-neutral-alpha-4">
                      <TableHead className="p-4 text-sm font-medium text-neutral-12">
                        Member
                      </TableHead>
                      <TableHead className="p-4 text-sm font-medium text-neutral-12">
                        Pass
                      </TableHead>
                      <TableHead className="p-4 text-sm font-medium text-neutral-12 w-[118px]">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAttendees.map((attendee) => (
                      <TableRow
                        key={attendee.id}
                        className="border-t border-neutral-alpha-4"
                      >
                        <TableCell className="p-4">
                          <div className="flex gap-2 items-start">
                            <AvatarComponent
                              src={attendee.avatar}
                              username={attendee.name}
                              size="size-10"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-[var(--color-neutral-12)]">
                                {attendee.name}
                              </p>
                              <p className="text-sm text-[rgba(4,0,17,0.61)]">
                                {attendee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="p-4">
                          <p className="text-sm font-medium text-[var(--color-neutral-12)]">
                            {attendee.passName}
                            {attendee.passCount && (
                              <span className="text-[rgba(4,0,17,0.61)] ml-2">
                                +{attendee.passCount}
                              </span>
                            )}
                          </p>
                        </TableCell>
                        <TableCell className="p-4">
                          <StatusBadge status={attendee.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex gap-2 items-center justify-end w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full border border-[rgba(20,0,53,0.15)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(48,0,64,0.06)]"
                >
                  <ChevronLeft className="w-6 h-6 text-[#05001d]" />
                </Button>

                {Array.from(
                  { length: Math.min(3, totalPages) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'w-8 h-8 rounded-full text-sm',
                      currentPage === page
                        ? 'border border-[rgba(2,0,8,0.88)] text-[var(--color-neutral-12)]'
                        : 'border border-[rgba(20,0,53,0.15)] text-[var(--color-neutral-12)] hover:bg-[rgba(48,0,64,0.06)]',
                    )}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-full border border-[rgba(16,0,51,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(48,0,64,0.06)]"
                >
                  <ChevronRight className="w-6 h-6 text-[var(--color-neutral-12)]" />
                </Button>

                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-auto px-3 rounded-full border-[rgba(4,0,17,0.61)] gap-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10/page</SelectItem>
                    <SelectItem value="20">20/page</SelectItem>
                    <SelectItem value="50">50/page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex-1 flex flex-col max-w-[32.81%] gap-6 items-center ">
          <div className="w-full bg-white border border-[rgba(1,1,46,0.13)] rounded-3xl p-2 sticky top-19">
            {/* Date/Time Card */}
            <div className="bg-neutral-3 border border-[var(--color-neutral-3)] rounded-2xl p-6 flex flex-col gap-2">
              <p className="text-2xl font-medium text-[var(--color-neutral-12)]">
                {formatDate(streamData.scheduledStartAt)}
              </p>
              <p className="text-base text-[var(--color-neutral-12)]">
                {formatTime(streamData.scheduledStartAt)} -{' '}
                {formatTime(streamData.scheduledEndAt)}
              </p>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col gap-6">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-[var(--color-neutral-12)]">
                {streamData.title}
              </h2>

              {/* Linked Passes */}
              {streamData.passes && streamData.passes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-[var(--color-neutral-12)]">
                    Linked Passes
                  </p>
                  <div className="flex flex-col gap-3">
                    {streamData.passes.map((pass) => (
                      <LinkedPassCard key={pass.id} pass={{ ...pass, theme: 'navy' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Recording Button - Only for completed streams */}
              {isCompleted && streamData.joinUrl && (
                <Button
                  onClick={() => window.open(streamData.joinUrl, '_blank')}
                  className="w-full h-10 rounded-full bg-[rgba(0,143,245,0.1)] text-[#0d74ce] hover:bg-[rgba(0,143,245,0.15)] gap-2"
                >
                  Recording
                  <ExternalLink className="w-[18px] h-[18px]" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
