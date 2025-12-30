'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api, ApiClientError } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { ListPassMembersResponseDto } from '@backstage-pass/api';

// ============================================
// Pass Members List Hook
// ============================================

interface UsePassMembersParams {
  passId: string;
  cursor?: string;
  limit?: number;
  search?: string;
}

type UsePassMembersOptions = Omit<
  UseQueryOptions<ListPassMembersResponseDto, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export function usePassMembers(
  params: UsePassMembersParams,
  options?: UsePassMembersOptions
) {
  const { passId, ...query } = params;

  return useQuery<ListPassMembersResponseDto, ApiClientError>({
    queryKey: queryKeys.passMembers.list(passId, query),
    queryFn: async () => {
      const { data } = await api.subscriptionsControllerListPassMembersV1({
        passId,
        ...query,
      });
      return data.result;
    },
    enabled: !!passId,
    ...options,
  });
}

// ============================================
// CSV Download Helper
// ============================================

export async function downloadPassMembersCsv(
  passId: string,
  search?: string
): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const params = new URLSearchParams();
  if (search) {
    params.set('search', search);
  }
  const queryString = params.toString();
  const url = `${apiUrl}/api/v1/passes/${passId}/members/csv${queryString ? `?${queryString}` : ''}`;

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
  link.download = `pass-members-${passId}-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}
