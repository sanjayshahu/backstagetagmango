'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { AvatarComponent } from '@/components/avatar-component';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { usePass, useUpdatePass } from '@/hooks/use-stages';
import {
  useOrders,
  useOrderStats,
  downloadOrdersCsv,
} from '@/hooks/use-orders';
import {
  usePassMembers,
  downloadPassMembersCsv,
} from '@/hooks/use-pass-members';
import { useStageAccess } from '@/lib/stage-access-context';
import ProfileCollapsedHeader from '../profile/profile-collapsed-header';
import { PassCard } from '../pass/pass-card';
import { StatsCard } from './passes-stats-card';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { ArrowLeftIcon, DownloadIcon, PencilIcon } from '@phosphor-icons/react';
import { PASS_CARD_VERTICAL_IMAGE, PassImage } from './utils';

// Time filter options
type TimeFilter = 'last7days' | 'last30days' | 'alltime';

const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: 'last7days', label: 'Last 7 days' },
  { key: 'last30days', label: 'Last 30 days' },
  { key: 'alltime', label: 'All time' },
];

function formatDate(date: Date) {
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${month} ${day}, '${year} • ${time}`;
}

function formatPrice(price: { usdCents?: number; inrPaise?: number } | null) {
  if (!price || !price.usdCents) return { amount: '0', label: '' };
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price.usdCents / 100);
  return { amount, label: '' };
}

function getDateRange(filter: TimeFilter): {
  startDate?: string;
  endDate?: string;
} {
  const now = new Date();
  const endDate = now.toISOString();

  switch (filter) {
    case 'last7days': {
      const start = new Date(now);
      start.setDate(start.getDate() - 7);
      return { startDate: start.toISOString(), endDate };
    }
    case 'last30days': {
      const start = new Date(now);
      start.setDate(start.getDate() - 30);
      return { startDate: start.toISOString(), endDate };
    }
    case 'alltime':
      return {};
  }
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface ComparisonDateRanges {
  current: DateRange;
  previous: DateRange;
}

/**
 * Calculate both current and previous date ranges for comparison
 * Current: today - X days → today
 * Previous: today - 2X days → today - X days
 */
function getComparisonDateRanges(
  filter: TimeFilter
): ComparisonDateRanges | null {
  if (filter === 'alltime') return null;

  const now = new Date();
  const days = filter === 'last7days' ? 7 : 30;

  const formatDateISO = (date: Date) => date.toISOString().split('T')[0];

  // Current period: today - X days → today
  const currentEndDate = new Date(now);
  currentEndDate.setHours(23, 59, 59, 999);

  const currentStartDate = new Date(now);
  currentStartDate.setDate(currentStartDate.getDate() - days);
  currentStartDate.setHours(0, 0, 0, 0);

  // Previous period: today - 2X days → today - X days
  const previousEndDate = new Date(currentStartDate);
  previousEndDate.setMilliseconds(-1);

  const previousStartDate = new Date(now);
  previousStartDate.setDate(previousStartDate.getDate() - days * 2);
  previousStartDate.setHours(0, 0, 0, 0);

  return {
    current: {
      startDate: `${formatDateISO(currentStartDate)}T00:00:00.000Z`,
      endDate: `${formatDateISO(currentEndDate)}T23:59:59.999Z`,
    },
    previous: {
      startDate: `${formatDateISO(previousStartDate)}T00:00:00.000Z`,
      endDate: `${formatDateISO(previousEndDate)}T23:59:59.999Z`,
    },
  };
}

export function PassDetailsView() {
  const params = useParams();
  const slug = params.slug as string;
  const passId = params.passId as string;
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('last7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageSizeOptions = [10, 20, 50];
  const [isDownloadingCsv, setIsDownloadingCsv] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const router = useRouter();

  // Get stage from context
  const { stage } = useStageAccess();

  // Fetch pass details
  const { data: pass, isLoading: isPassLoading } = usePass(
    stage?.id ?? '',
    passId,
    { enabled: !!stage?.id && !!passId },
  );

  // Update pass mutation
  const { updatePass, isPending: isUpdating } = useUpdatePass();

  // Calculate date range based on time filter
  const dateRange = useMemo(() => getDateRange(timeFilter), [timeFilter]);

  // Comparison date ranges for stats comparison
  const comparisonDateRanges = useMemo(
    () => getComparisonDateRanges(timeFilter),
    [timeFilter]
  );

  const isAllTime = timeFilter === 'alltime';

  // Fetch orders for current pass (only completed orders)
  const { data: ordersData, isLoading: isOrdersLoading } = useOrders(
    {
      stageId: stage?.id ?? '',
      search: searchQuery || undefined,
      limit: 6,
      cursor,
      passIds: [passId],
      status: ['completed'],
      ...dateRange,
    },
    { enabled: !!stage?.id && !!passId },
  );

  // Fetch stats for current pass (only for paid passes)
  const { data: stats } = useOrderStats(
    {
      stageId: stage?.id ?? '',
      passIds: [passId],
      ...dateRange,
    },
    { enabled: !!stage?.id && !!passId },
  );

  // Fetch previous period stats for comparison
  const { data: previousStats } =
    useOrderStats(
      {
        stageId: stage?.id ?? '',
        passIds: [passId],
        startDate: comparisonDateRanges?.previous.startDate,
        endDate: comparisonDateRanges?.previous.endDate,
      },
      {
        enabled:
          !!stage?.id && !!passId && !isAllTime && !!comparisonDateRanges,
      }
    );

  // Determine if this is a free pass
  const isFreePass = pass?.passType === 'free';

  // Fetch members for free passes
  const { data: membersData, isLoading: isMembersLoading } = usePassMembers(
    {
      passId,
      search: searchQuery || undefined,
      limit: 6,
      cursor,
    },
    { enabled: !!passId && isFreePass },
  );

  // Unified data for display
  const isDataLoading = isFreePass ? isMembersLoading : isOrdersLoading;

  // Normalize display data
  const displayData = useMemo(() => {
    if (isFreePass && membersData) {
      return membersData.members.map((member) => ({
        ...member,
        date: new Date(member.joinedAt),
      }));
    }
    if (!isFreePass && ordersData) {
      return ordersData.orders.map((order) => ({
        ...order,
        ...order.subscriber,
        date: new Date(order.createdAt),
      }));
    }
    return [];
  }, [isFreePass, membersData, ordersData]);

  // Paginate display data
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return displayData.slice(startIndex, startIndex + itemsPerPage);
  }, [displayData, currentPage, itemsPerPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPages,
        );
      }
    }
    return pages;
  };

  // Reset cursor and page when filters change
  const handleTimeFilterChange = (newFilter: TimeFilter) => {
    setTimeFilter(newFilter);
    setCursor(undefined);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCursor(undefined);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Handle CSV download
  const handleDownloadCsv = async () => {
    if (!passId) return;
    setIsDownloadingCsv(true);
    try {
      if (isFreePass) {
        // Use the pass members CSV endpoint for free passes
        await downloadPassMembersCsv(passId, searchQuery || undefined);
      } else {
        // For paid passes, use the orders CSV endpoint
        await downloadOrdersCsv({
          stageId: stage?.id ?? '',
          search: searchQuery || undefined,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          passIds: [passId],
          status: ['completed'],
        });
      }
    } catch (error) {
      console.error('Failed to download CSV:', error);
    } finally {
      setIsDownloadingCsv(false);
    }
  };

  // Check if pass is currently hidden (unpublished)
  const isHidden = pass?.visibility === 'hidden';

  // Handle publish/unpublish button click
  const handleToggleVisibilityClick = () => {
    setConfirmModalOpen(true);
  };

  // Handle confirmed publish/unpublish
  const handleConfirmToggle = () => {
    if (!stage?.id || !passId) return;

    const newVisibility = isHidden ? 'public' : 'hidden';

    updatePass(
      {
        stageId: stage.id,
        passId,
        data: { visibility: newVisibility },
      },
      {
        onSuccess: () => {
          toast.success(
            newVisibility === 'public'
              ? 'Pass published successfully'
              : 'Pass unpublished successfully',
          );
          setConfirmModalOpen(false);
        },
      },
    );
  };

  // Handle edit pass - navigate to edit page with passId
  const handleEditPass = () => {
    if (!stage?.id || !passId) return;

    router.push(`/${slug}/pass?passId=${passId}`);
  };

  // Format price info
  const priceInfo = formatPrice(
    pass?.price as { usdCents?: number; inrPaise?: number } | null,
  );

  const earnings =
    formatPrice({
      usdCents: stats?.totalCollectedUsdCents,
    }).amount || '$0';

  const totalMembers = pass?.memberCount ?? 0;

  const theme = pass?.theme ?? 'silver';

  // Helper to determine trend direction
  const getTrend = useCallback(
    (diff: number | null): 'up' | 'down' | 'neutral' | undefined => {
      if (diff === null) return undefined;
      if (diff > 0) return 'up';
      if (diff < 0) return 'down';
      return 'neutral';
    },
    []
  );

  // Period label for subtexts
  const periodLabel = useMemo(() => {
    if (timeFilter === 'last7days') return 'previous week';
    if (timeFilter === 'last30days') return 'previous month';
    return '';
  }, [timeFilter]);

  // Calculate diffs
  const earningsDiff = useMemo(() => {
    if (isAllTime || !stats || !previousStats) return null;
    return (
      (stats.totalCollectedUsdCents ?? 0) -
      (previousStats.totalCollectedUsdCents ?? 0)
    );
  }, [isAllTime, stats, previousStats]);

  const membersDiff = useMemo(() => {
    if (isAllTime || !stats || !previousStats) return null;
    return (
      (stats.completedOrderCount ?? 0) -
      (previousStats.completedOrderCount ?? 0)
    );
  }, [isAllTime, stats, previousStats]);

  // Format subtexts
  const earningsSubtext = useMemo(() => {
    if (isAllTime) return undefined;
    if (earningsDiff === null) return undefined;
    if (earningsDiff === 0) return `No change from ${periodLabel}`;
    const prefix = earningsDiff > 0 ? '+' : '';
    const formatted = formatPrice({
      usdCents: Math.abs(earningsDiff),
    }).amount;
    return `${prefix}${earningsDiff > 0 ? '' : '-'}${formatted} from ${periodLabel}`;
  }, [isAllTime, earningsDiff, periodLabel]);

  const membersSubtext = useMemo(() => {
    if (isAllTime) return undefined;
    if (isFreePass) return undefined; // Free passes don't have comparison
    if (membersDiff === null) return undefined;
    if (membersDiff === 0) return `No change from ${periodLabel}`;
    const prefix = membersDiff > 0 ? '+' : '';
    return `${prefix}${membersDiff} members from ${periodLabel}`;
  }, [isAllTime, isFreePass, membersDiff, periodLabel]);

  // Loading state
  if (isPassLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-black">Loading pass details...</p>
      </div>
    );
  }

  return (
    <div
      className={cn('h-full min-h-screen bg-[#030303] relative')}
    >
      <ProfileCollapsedHeader />
      <PassImage theme={theme} className='absolute inset-0' blur />
      {/* Main Container */}
      <div className="w-full max-w-250 mx-auto flex gap-12 mt-3 relative z-10">
        <div className="flex-1 min-w-0 pb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-between">

              <Link
                href={`/${slug}/passes`}
                className="text-static-neutral-12 hover:text-static-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeftIcon className="size-5" />
                  <h1 className="text-2xl font-semibold text-static-white">
                    Pass Details
                  </h1>
                </div>
              </Link>

              {/* Time Filter Tabs */}
              <div className="flex items-center ml-auto gap-2">
                {TIME_FILTERS.map((filter) => (
                  <Button
                    key={filter.key}
                    variant="ghost"
                    onClick={() => handleTimeFilterChange(filter.key)}
                    requireAuth={false}
                    className={cn(
                      'px-5 py-2.5 text-sm font-medium rounded-full',
                      timeFilter === filter.key
                        ? 'bg-static-neutral-12 text-static-neutral-1 hover:bg-static-white'
                        : 'text-static-neutral-12 hover:text-static-white hover:bg-transparent',
                    )}
                    style={
                      timeFilter !== filter.key
                        ? { background: 'rgba(235, 234, 248, 0.08)' }
                        : undefined
                    }
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
            <div
              className={cn(
                'grid gap-4',
                isFreePass ? 'grid-cols-1' : 'grid-cols-2',
              )}
            >
              {/* Total Earnings – only for paid pass */}
              {!isFreePass && (
                <StatsCard
                  title="Total Earnings"
                  value={earnings}
                  subtitle={earningsSubtext}
                  trend={getTrend(earningsDiff)}
                />
              )}

              {/* Total Members */}
              <StatsCard
                title="Total Members"
                value={totalMembers}
                subtitle={membersSubtext}
                trend={getTrend(membersDiff)}
              />
            </div>

            {/* Search and Download */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-static-neutral-alpha-11" />
                <Input
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-[rgba(255,255,255,0.05)] placeholder:text-base placeholder:font-normal placeholder:text-[rgba(245,241,255,0.72)] border-[rgba(255,255,255,0.1)] text-static-white h-10 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-[#EEEEF0]"
                />
              </div>
              <Button
                variant="outline"
                requireAuth={false}
                onClick={handleDownloadCsv}
                disabled={isDownloadingCsv}
                className="border-[#EEEEF0] text-[#EEEEF0]"
              >
                {isDownloadingCsv ? 'Downloading...' : 'Download CSV'}
                <DownloadIcon className="size-4 ml-2" />
              </Button>
            </div>

            {/* Members Table */}
            <div
              className="overflow-hidden"
              style={{
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Table Header */}
              <div
                className="grid grid-cols-2 border-b border-[rgba(255,255,255,0.1)]"
                style={{ background: 'rgba(235, 234, 248, 0.08)' }}
              >
                <span className="text-[#fff] text-sm font-medium p-4">
                  Member
                </span>
                <span className="text-[#fff] text-sm font-medium p-4">
                  Date & Time
                </span>
              </div>

              {/* TODO : Need to use shadcn table */}
              {/* Table Body */}
              <div>
                {isDataLoading ? (
                  <div className="py-12 text-center">
                    <p className="text-white/50">Loading members...</p>
                  </div>
                ) : paginatedData.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-[rgba(245,241,255,0.72)]">
                      {isFreePass
                        ? 'No members yet for this pass'
                        : 'No orders yet for this pass'}
                    </p>
                  </div>
                ) : (
                  paginatedData.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        'grid grid-cols-2 items-center',
                        index !== paginatedData.length - 1 &&
                        'border-b border-[rgba(238,229,248,0.11)]',
                      )}
                    >
                      {/* Member Info */}
                      <div className="flex items-center gap-3 p-4 min-w-0">
                        <AvatarComponent
                          username={item.name}
                          size="size-10"
                          className="shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-[#fff] font-medium truncate cursor-default">
                                {item.name}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {item.name}
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-static-neutral-alpha-11 text-sm font-normal truncate cursor-default">
                                {item.email}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {item.email}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <p className="text-[#fff] text-sm p-4">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end">
                <Pagination>
                  <PaginationContent className="gap-2">
                    {/* Previous Button - Icon Only */}
                    <PaginationItem>
                      <button
                        onClick={() =>
                          currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                        disabled={currentPage === 1}
                        className={cn(
                          'flex items-center justify-center h-8 w-8 rounded-full border bg-transparent transition-colors border-[rgba(241,230,253,0.19)]',
                          currentPage === 1
                            ? ' text-[rgba(234,230,253,0.43)] cursor-not-allowed'
                            : ' text-[rgba(245,241,255,0.72)] hover:bg-white/10',
                        )}
                        aria-label="Go to previous page"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    </PaginationItem>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                      page === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis className="h-8 w-8 text-[rgba(245,241,255,0.72)]" />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            className={cn(
                              'flex items-center justify-center h-8 w-8 p-0 rounded-full bg-transparent text-[#fff] text-sm font-medium hover:bg-white/10 border',
                              currentPage === page
                                ? 'border-static-neutral-alpha-12'
                                : 'border-[rgba(241,230,253,0.19)]',
                            )}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    {/* Next Button - Icon Only */}
                    <PaginationItem>
                      <button
                        onClick={() =>
                          currentPage < totalPages &&
                          setCurrentPage(currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                        className={cn(
                          'flex items-center justify-center h-8 w-8 rounded-full border bg-transparent transition-colors border-[rgba(241,230,253,0.19)]',
                          currentPage === totalPages
                            ? ' text-[rgba(234,230,253,0.43)] cursor-not-allowed'
                            : ' text-[rgba(245,241,255,0.72)] hover:bg-white/10',
                        )}
                        aria-label="Go to next page"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </PaginationItem>

                    {/* Page Size Selector */}
                    <PaginationItem>
                      <Select
                        value={String(itemsPerPage)}
                        onValueChange={handlePageSizeChange}
                      >
                        <SelectTrigger className="ring-0 h-8 w-auto gap-2 rounded-full border-[rgba(245,241,255,0.72)] bg-transparent text-[#EEEEF0] text-sm font-medium px-3 hover:bg-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                              {size}/page
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Pass Preview */}
        <div className="w-fit shrink-0 pb-6">
          <div className="sticky top-10 md:px-0 px-5.5">
            <PassCard
              {...pass}
              price={priceInfo.amount}
              priceType={pass?.recurringType || 'onetime'}
              name={pass?.name || ''}
              description={(pass?.description as unknown as string) || ''}
              themeImage={PASS_CARD_VERTICAL_IMAGE}
              onJoinPass={() => { }}
              isJoinButtonDisabled={true}
              joinButtonDisabledText="Join Pass"
              joinButtonDisabledTooltip="Your subscribers will be redirected to payment page from here"
            />
            {/* Action Buttons - Outside the card */}
            <div className="grid grid-cols-2 gap-3 justify-between pt-5.5 min-w-full">
              <Button
                variant="outline"
                requireAuth={false}
                onClick={handleEditPass}
                className="border-[#fff] text-[#fff] md:min-w-full md:max-w-full max-w-fit  gap-3 py-0 px-4"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit pass
              </Button>
              <Button
                variant="outline"
                requireAuth={false}
                onClick={handleToggleVisibilityClick}
                disabled={isUpdating}
                className={cn(
                  'flex-1 h-11 bg-transparent disabled:opacity-50 md:min-w-full md:max-w-full max-w-fit',
                  isHidden
                    ? 'text-[rgba(61,214,140,1)] hover:bg-[rgba(61,214,140,0.1)] hover:text-[rgba(61,214,140,1)]'
                    : 'text-[rgba(255,149,146,1)] hover:bg-[rgba(255,149,146,0.1)] hover:text-[rgba(255,149,146,1)]',
                )}
                style={{
                  border: isHidden
                    ? '1px solid rgba(61, 214, 140, 1)'
                    : '1px solid rgba(255, 149, 146, 1)',
                }}
              >
                {isUpdating
                  ? isHidden
                    ? 'Publishing...'
                    : 'Unpublishing...'
                  : isHidden
                    ? 'Publish'
                    : 'Unpublish'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Publish/Unpublish confirmation modal */}
      <ConfirmationModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title={isHidden ? 'Publish Pass' : 'Unpublish Pass'}
        description={
          isHidden
            ? `Are you sure you want to publish "${pass?.name ?? 'this pass'}"? This will make the pass visible to your audience.`
            : `Are you sure you want to unpublish "${pass?.name ?? 'this pass'}"? This will hide the pass from your audience.`
        }
        confirmText={isHidden ? 'Publish' : 'Unpublish'}
        cancelText="Cancel"
        variant={isHidden ? 'default' : 'destructive'}
        loading={isUpdating}
        onConfirm={handleConfirmToggle}
        icon={
          !isHidden ? (
            <div className="flex size-12 items-center justify-center rounded-full bg-error-3">
              <AlertTriangle className="size-6 text-error-9" />
            </div>
          ) : undefined
        }
      />
    </div>
  );
}
