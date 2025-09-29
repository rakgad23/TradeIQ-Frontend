import React from 'react';
import { Badge } from './badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { 
  Shield, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Factory,
  Leaf,
  Zap
} from 'lucide-react';
import { cn } from './utils';
import type { SupplierItem } from '../../lib/types';

interface CertificationBadgesProps {
  certifications: SupplierItem['certifications'];
  className?: string;
  maxVisible?: number;
  showExpiry?: boolean;
}

export function CertificationBadges({ 
  certifications, 
  className, 
  maxVisible = 3,
  showExpiry = true 
}: CertificationBadgesProps) {
  if (!certifications || certifications.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No certifications
      </div>
    );
  }

  const visibleCerts = certifications.slice(0, maxVisible);
  const hiddenCount = certifications.length - maxVisible;

  const getCertificationIcon = (type: string) => {
    switch (type) {
      case 'iso':
        return <Award className="w-3 h-3" />;
      case 'quality':
        return <CheckCircle className="w-3 h-3" />;
      case 'safety':
        return <Shield className="w-3 h-3" />;
      case 'environmental':
        return <Leaf className="w-3 h-3" />;
      case 'industry':
        return <Factory className="w-3 h-3" />;
      default:
        return <Zap className="w-3 h-3" />;
    }
  };

  const getCertificationColor = (type: string, verified: boolean, isExpired?: boolean) => {
    if (isExpired) {
      return "bg-red-50 text-red-700 border-red-200";
    }
    
    if (!verified) {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    switch (type) {
      case 'iso':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'quality':
        return "bg-green-50 text-green-700 border-green-200";
      case 'safety':
        return "bg-purple-50 text-purple-700 border-purple-200";
      case 'environmental':
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'industry':
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate || !showExpiry) return false;
    return new Date(expiryDate) < new Date();
  };

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate || !showExpiry) return null;
    
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', days: Math.abs(daysUntilExpiry) };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring', days: daysUntilExpiry };
    }
    
    return null;
  };

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {visibleCerts.map((cert, index) => {
        const expired = isExpired(cert.expiry_date);
        const expiryStatus = getExpiryStatus(cert.expiry_date);
        
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs flex items-center gap-1 px-2 py-1",
                    getCertificationColor(cert.type, cert.verified, expired)
                  )}
                >
                  {getCertificationIcon(cert.type)}
                  <span className="truncate max-w-20">{cert.name}</span>
                  {!cert.verified && (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {expired && (
                    <XCircle className="w-3 h-3" />
                  )}
                  {expiryStatus?.status === 'expiring' && (
                    <Clock className="w-3 h-3" />
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-sm text-gray-600">
                    Type: {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                  </div>
                  <div className="text-sm">
                    Status: {cert.verified ? 'Verified' : 'Unverified'}
                  </div>
                  {cert.expiry_date && (
                    <div className="text-sm">
                      Expires: {new Date(cert.expiry_date).toLocaleDateString()}
                    </div>
                  )}
                  {expiryStatus && (
                    <div className={cn(
                      "text-sm font-medium",
                      expiryStatus.status === 'expired' && "text-red-600",
                      expiryStatus.status === 'expiring' && "text-yellow-600"
                    )}>
                      {expiryStatus.status === 'expired' 
                        ? `Expired ${expiryStatus.days} days ago`
                        : `Expires in ${expiryStatus.days} days`
                      }
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
      
      {hiddenCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-600 border-gray-200"
              >
                +{hiddenCount} more
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <div className="font-medium">Additional Certifications</div>
                {certifications.slice(maxVisible).map((cert, index) => (
                  <div key={index} className="text-sm">
                    {cert.name} ({cert.type})
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

interface CertificationSummaryProps {
  certifications: SupplierItem['certifications'];
  className?: string;
}

export function CertificationSummary({ certifications, className }: CertificationSummaryProps) {
  if (!certifications || certifications.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No certifications
      </div>
    );
  }

  const verifiedCount = certifications.filter(c => c.verified).length;
  const expiredCount = certifications.filter(c => {
    if (!c.expiry_date) return false;
    return new Date(c.expiry_date) < new Date();
  }).length;
  const expiringCount = certifications.filter(c => {
    if (!c.expiry_date) return false;
    const expiry = new Date(c.expiry_date);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  }).length;

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="flex items-center space-x-1">
        <Award className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          {certifications.length} certification{certifications.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {verifiedCount > 0 && (
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">
            {verifiedCount} verified
          </span>
        </div>
      )}
      
      {expiredCount > 0 && (
        <div className="flex items-center space-x-1">
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">
            {expiredCount} expired
          </span>
        </div>
      )}
      
      {expiringCount > 0 && (
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-yellow-600">
            {expiringCount} expiring
          </span>
        </div>
      )}
    </div>
  );
}


