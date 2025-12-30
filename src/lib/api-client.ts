import { Api, HttpClient } from '@backstage-pass/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const httpClient = new HttpClient({
  baseURL: API_URL,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          // Serialize arrays as comma-separated values
          if (value.length > 0) {
            searchParams.set(key, value.join(','));
          }
        } else {
          searchParams.set(key, String(value));
        }
      });
      return searchParams.toString();
    },
  },
});

const apiClient = new Api(httpClient);

// Export namespaced methods for cleaner usage
// e.g., api.stagesControllerFindBySlugV1() instead of api.api.stagesControllerFindBySlugV1()
export const api = apiClient.api;
export const ping = apiClient.ping;

// Error class for React Query error handling
export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error?: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
