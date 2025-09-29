import { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { ProgressDrawer } from './ProgressDrawer';
import { SuppliersTable } from './SuppliersTable';
import { useRunStatus } from '../../hooks/useRunStatus';

interface SourcingRunProps {
  runId: string;
  onBackToFinder: () => void;
}

export function SourcingRun({ runId, onBackToFinder }: SourcingRunProps) {
  const [showProgress, setShowProgress] = useState(true);
  const { data: status, isLoading: statusLoading, error: statusError } = useRunStatus(runId);

  const isCompleted = status?.status === 'completed';
  const isRunning = status?.status === 'running' || status?.status === 'queued';
  const isFailed = status?.status === 'failed';

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToFinder}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Finder
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Supplier Discovery Results</h1>
            <p className="text-gray-600">Run ID: {runId}</p>
          </div>
        </div>
        
        {(isRunning || isCompleted || isFailed) && (
          <Button
            variant="outline"
            onClick={() => setShowProgress(!showProgress)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {showProgress ? 'Hide' : 'Show'} Progress
          </Button>
        )}
      </div>

      {/* Progress Drawer */}
      {(isRunning || isCompleted || isFailed) && (
        <ProgressDrawer
          runId={runId}
          isOpen={showProgress}
          onClose={() => setShowProgress(false)}
        />
      )}

      {/* Results Table */}
      <SuppliersTable runId={runId} />

      {/* Status Message */}
      {statusError && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Failed to load discovery status</div>
          <div className="text-sm text-gray-600">{statusError.message}</div>
        </div>
      )}
      
      {statusLoading && (
        <div className="text-center py-8 text-gray-500">
          Loading discovery status...
        </div>
      )}
      
      {isFailed && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Discovery failed</div>
          <div className="text-sm text-gray-600">
            The discovery process encountered an error. Check the progress drawer for details.
          </div>
        </div>
      )}
    </div>
  );
}

