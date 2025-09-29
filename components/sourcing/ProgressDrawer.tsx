import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { useRunStatus } from '../../hooks/useRunStatus';

interface ProgressDrawerProps {
  runId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressDrawer({ runId, isOpen, onClose }: ProgressDrawerProps) {
  const { data: status, isLoading, error } = useRunStatus(runId, isOpen);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    if (!status) return 0;
    
    const totalSteps = 4; // SERP, Extract, Resolve, Rank
    let completedSteps = 0;
    
    if (status.counts.serpUrls > 0) completedSteps++;
    if (status.counts.suppliersFound > 0) completedSteps++;
    if (status.counts.suppliersDeduped > 0) completedSteps++;
    if (status.status === 'completed') completedSteps = totalSteps;
    
    return (completedSteps / totalSteps) * 100;
  };

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Discovery Progress</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (error || !status) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Discovery Progress</SheetTitle>
          </SheetHeader>
          <div className="text-center text-red-500">
            Failed to load progress
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {getStatusIcon(status.status)}
            Discovery Progress
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className={getStatusColor(status.status)}>
              {status.status.toUpperCase()}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="w-full" />
          </div>

          {/* Counts */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {status.counts.serpUrls}
                </div>
                <div className="text-sm text-gray-600">SERP URLs</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {status.counts.suppliersFound}
                </div>
                <div className="text-sm text-gray-600">Suppliers Found</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {status.counts.suppliersDeduped}
                </div>
                <div className="text-sm text-gray-600">Deduplicated</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {status.counts.pagesCrawled}
                </div>
                <div className="text-sm text-gray-600">Pages Crawled</div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {status.lastError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-800">
                <strong>Error:</strong> {status.lastError}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-sm text-gray-600 space-y-1">
            {status.startedAt && (
              <div>Started: {new Date(status.startedAt).toLocaleString()}</div>
            )}
            {status.completedAt && (
              <div>Completed: {new Date(status.completedAt).toLocaleString()}</div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

