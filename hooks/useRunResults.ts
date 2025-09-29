import { useQuery } from '@tanstack/react-query';
import { SourcingAPI } from '../lib/sourcingApi';
import type { RunResultsResp, RunResultsParams, SupplierFilters } from '../lib/types';

export function useRunResults(
  runId: string, 
  params: RunResultsParams & { filters?: SupplierFilters } = {},
  enabled: boolean = true
) {
  return useQuery<RunResultsResp, Error>({
    queryKey: ['runResults', runId, params],
    queryFn: () => SourcingAPI.getRunResults(runId, params),
    enabled: enabled && !!runId,
    staleTime: 30000, // 30 seconds
    retry: (failureCount, error) => {
      // Don't retry on 404 errors (run not found)
      if (error.message.includes('404')) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}