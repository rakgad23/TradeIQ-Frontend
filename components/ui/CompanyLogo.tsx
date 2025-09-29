import React, { useState, useEffect } from 'react';
import { LogoService, LogoServiceResponse } from '../../lib/logoService';
import { cn } from './utils';

interface CompanyLogoProps {
  domain?: string | null;
  companyName: string;
  size?: number;
  className?: string;
  showFallback?: boolean;
}

export function CompanyLogo({ 
  domain, 
  companyName, 
  size = 40, 
  className,
  showFallback = true 
}: CompanyLogoProps) {
  const [logoData, setLogoData] = useState<LogoServiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      if (!domain && !companyName) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setImageError(false);
      
      try {
        const result = await LogoService.getCompanyLogo(domain || '', companyName);
        setLogoData(result);
      } catch (error) {
        console.error('Failed to fetch logo:', error);
        setLogoData({ logoUrl: null, source: 'none', error: 'Failed to fetch' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, [domain, companyName]);

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackLogo = () => {
    if (!showFallback) return null;
    return LogoService.generateFallbackLogo(companyName, size);
  };

  if (isLoading) {
    return (
      <div 
        className={cn(
          "animate-pulse bg-gray-200 rounded-lg flex items-center justify-center",
          className
        )}
        style={{ width: size, height: size }}
      >
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  // Show fallback if no logo or image failed to load
  if (!logoData?.logoUrl || imageError) {
    const fallbackUrl = getFallbackLogo();
    if (!fallbackUrl) {
      return (
        <div 
          className={cn(
            "bg-gray-100 rounded-lg flex items-center justify-center text-gray-400",
            className
          )}
          style={{ width: size, height: size }}
        >
          <span className="text-xs font-medium">
            {companyName.substring(0, 2).toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <img
        src={fallbackUrl}
        alt={`${companyName} logo`}
        className={cn("rounded-lg object-cover", className)}
        style={{ width: size, height: size }}
        onError={handleImageError}
      />
    );
  }

  return (
    <div className="relative">
      <img
        src={logoData.logoUrl}
        alt={`${companyName} logo`}
        className={cn("rounded-lg object-cover", className)}
        style={{ width: size, height: size }}
        onError={handleImageError}
      />
      
      {/* Source indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
          {logoData.source.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

interface CompanyLogoBatchProps {
  suppliers: Array<{ 
    supplier_id: string; 
    name: string; 
    apex_domain?: string | null 
  }>;
  size?: number;
  className?: string;
}

export function CompanyLogoBatch({ suppliers, size = 40, className }: CompanyLogoBatchProps) {
  const [logoData, setLogoData] = useState<Record<string, LogoServiceResponse>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      setIsLoading(true);
      try {
        const results = await LogoService.batchGetLogos(suppliers);
        setLogoData(results);
      } catch (error) {
        console.error('Failed to fetch batch logos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (suppliers.length > 0) {
      fetchLogos();
    }
  }, [suppliers]);

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        {suppliers.slice(0, 3).map((_, index) => (
          <div
            key={index}
            className={cn(
              "animate-pulse bg-gray-200 rounded-lg",
              className
            )}
            style={{ width: size, height: size }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      {suppliers.slice(0, 3).map((supplier) => (
        <CompanyLogo
          key={supplier.supplier_id}
          domain={supplier.apex_domain}
          companyName={supplier.name}
          size={size}
          className={className}
        />
      ))}
      {suppliers.length > 3 && (
        <div
          className={cn(
            "bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs font-medium",
            className
          )}
          style={{ width: size, height: size }}
        >
          +{suppliers.length - 3}
        </div>
      )}
    </div>
  );
}


