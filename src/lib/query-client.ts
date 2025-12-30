'use client';

import {
  QueryClient,
  DefaultOptions,
  MutationCache,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiClientError } from './api-client';
import { AxiosError } from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes (garbage collection)
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: 0,
  },
};

const mutationCache = new MutationCache({
  onError: (error) => {
    let message = '';

    if (error instanceof AxiosError && error.response?.data) {
      const errorResponse = error.response.data;
      message = errorResponse.error || errorResponse.error;
    } else if(error instanceof ApiClientError) {
      message = error.message;
    }

    toast.error(message || DEFAULT_ERROR_MESSAGE);
  },
});

function createQueryClient() {
  return new QueryClient({ defaultOptions, mutationCache });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server: always create a new query client
    return createQueryClient();
  }
  // Browser: reuse client across renders
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}
