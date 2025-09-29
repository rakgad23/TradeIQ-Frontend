import { useQuery } from '@tanstack/react-query';
import { SourcingAPI } from '../lib/sourcingApi';
import type { RunStatusResp } from '../lib/types';

export function useRunStatus(runId: string, enabled: boolean = true) {
  return useQuery<RunStatusResp, Error>({
    queryKey: ['runStatus', runId],
    queryFn: () => SourcingAPI.getRunStatus(runId),
    enabled: enabled && !!runId,
    refetchInterval: (query) => {
      // Poll every 2 seconds if still running
      if (query.state.data?.status === 'running' || query.state.data?.status === 'queued') {
        return 2000;
      }
      return false;
    },
    refetchIntervalInBackground: true,
    staleTime: 0, // Always consider data stale for real-time updates
  });
}

