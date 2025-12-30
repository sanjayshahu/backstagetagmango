'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type {
  ListOrdersResponseDto,
  OrderStatsResponseDto,
} from '@backstage-pass/api';

// ============================================
// Orders List Hook
// ============================================

// Order status type
type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

interface UseOrdersParams {
  stageId: string;
  cursor?: string;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  passIds?: string[];
  status?: OrderStatus[];
}

type UseOrdersOptions = Omit<
  UseQueryOptions<ListOrdersResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function useOrders(params: UseOrdersParams, options?: UseOrdersOptions) {
  const { stageId, ...query } = params;

  return useQuery<ListOrdersResponseDto, ApiClientError>({
    queryKey: queryKeys.orders.list(stageId, query),
    queryFn: async () => {
      const { data } = await api.ordersControllerListOrdersV1({
        stageId,
        ...query,
      });
      return data.result;
    },
    enabled: !!stageId,
    ...options,
  });
}

// ============================================
// Order Stats Hook
// ============================================

interface UseOrderStatsParams {
  stageId: string;
  startDate?: string;
  endDate?: string;
  passIds?: string[];
}

type UseOrderStatsOptions = Omit<
  UseQueryOptions<OrderStatsResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function useOrderStats(
  params: UseOrderStatsParams,
  options?: UseOrderStatsOptions
) {
  const { stageId, ...query } = params;

  return useQuery<OrderStatsResponseDto, ApiClientError>({
    queryKey: queryKeys.orders.stats(stageId, query),
    queryFn: async () => {
      const { data } = await api.ordersControllerGetOrderStatsV1({
        stageId,
        ...query,
      });
      return data.result;
    },
    enabled: !!stageId,
    ...options,
  });
}

// ============================================
// CSV Download Helper
// ============================================

interface DownloadOrdersCsvParams {
  stageId: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  passIds?: string[];
  status?: OrderStatus[];
}

export async function downloadOrdersCsv(
  params: DownloadOrdersCsvParams
): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set('search', params.search);
  if (params.startDate) searchParams.set('startDate', params.startDate);
  if (params.endDate) searchParams.set('endDate', params.endDate);
  if (params.passIds?.length) searchParams.set('passIds', params.passIds.join(','));
  if (params.status?.length) searchParams.set('status', params.status.join(','));

  const queryString = searchParams.toString();
  const url = `${apiUrl}/api/v1/stages/${params.stageId}/orders/csv${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to download CSV');
  }

  // Create download link
  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `orders-${params.stageId}-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}
