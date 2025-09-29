import React from 'react';
import { DollarSign, Package, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from './badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from './utils';
import type { SupplierItem } from '../../lib/types';

interface PriceIndicatorProps {
  pricingInfo: SupplierItem['extraction_data']['pricing_info'];
  className?: string;
  compact?: boolean;
}

export function PriceIndicator({ 
  pricingInfo, 
  className, 
  compact = false 
}: PriceIndicatorProps) {
  if (!pricingInfo || pricingInfo.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No pricing information
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {pricingInfo.map((price, index) => (
          <PriceBadge key={index} price={price} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {pricingInfo.map((price, index) => (
        <PriceItem key={index} price={price} />
      ))}
    </div>
  );
}

interface PriceItemProps {
  price: SupplierItem['extraction_data']['pricing_info'][0];
}

function PriceItem({ price }: PriceItemProps) {
  const getPriceIcon = (type: string) => {
    switch (type) {
      case 'price_point':
        return <DollarSign className="w-4 h-4" />;
      case 'quote_request':
        return <Package className="w-4 h-4" />;
      case 'bulk_discount':
        return <Package className="w-4 h-4" />;
      case 'minimum_order':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getPriceColor = (type: string) => {
    switch (type) {
      case 'price_point':
        return "bg-green-50 text-green-700 border-green-200";
      case 'quote_request':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'bulk_discount':
        return "bg-purple-50 text-purple-700 border-purple-200";
      case 'minimum_order':
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatPrice = (value?: number, currency?: string) => {
    if (!value) return 'Contact for pricing';
    
    const currencySymbol = currency === 'USD' ? '$' : currency || '$';
    return `${currencySymbol}${value.toLocaleString()}`;
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
      <div className={cn("p-2 rounded-lg", getPriceColor(price.type))}>
        {getPriceIcon(price.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(price.value, price.currency)}
          </span>
          <Badge variant="outline" className={cn("text-xs", getPriceColor(price.type))}>
            {price.type.replace('_', ' ')}
          </Badge>
        </div>
        
        {price.context && (
          <div className="text-sm text-gray-600 mt-1">
            {price.context}
          </div>
        )}
      </div>
    </div>
  );
}

interface PriceBadgeProps {
  price: SupplierItem['extraction_data']['pricing_info'][0];
}

function PriceBadge({ price }: PriceBadgeProps) {
  const getAvailabilityIcon = (availability?: string) => {
    switch (availability) {
      case 'in_stock':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'limited':
        return <Clock className="w-3 h-3 text-yellow-500" />;
      case 'out_of_stock':
        return <XCircle className="w-3 h-3 text-red-500" />;
      case 'made_to_order':
        return <Package className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'in_stock':
        return "bg-green-50 text-green-700 border-green-200";
      case 'limited':
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'out_of_stock':
        return "bg-red-50 text-red-700 border-red-200";
      case 'made_to_order':
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatPrice = (value?: number, currency?: string) => {
    if (!value) return 'Quote';
    
    const currencySymbol = currency === 'USD' ? '$' : currency || '$';
    return `${currencySymbol}${value.toLocaleString()}`;
  };

  const getTooltipContent = () => {
    return (
      <div className="space-y-1">
        <div className="font-medium">{price.type.replace('_', ' ')}</div>
        <div className="text-sm">{formatPrice(price.value, price.currency)}</div>
        {price.context && (
          <div className="text-sm text-gray-600">{price.context}</div>
        )}
        {price.availability && (
          <div className="text-sm">
            Availability: {price.availability.replace('_', ' ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "text-xs flex items-center gap-1 px-2 py-1",
              getAvailabilityColor(price.availability)
            )}
          >
            <DollarSign className="w-3 h-3" />
            <span>{formatPrice(price.value, price.currency)}</span>
            {getAvailabilityIcon(price.availability)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface PriceSummaryProps {
  pricingInfo: SupplierItem['extraction_data']['pricing_info'];
  className?: string;
}

export function PriceSummary({ pricingInfo, className }: PriceSummaryProps) {
  if (!pricingInfo || pricingInfo.length === 0) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No pricing available
      </div>
    );
  }

  const pricePoints = pricingInfo.filter(p => p.type === 'price_point' && p.value);
  const quoteRequests = pricingInfo.filter(p => p.type === 'quote_request');
  const inStockItems = pricingInfo.filter(p => p.availability === 'in_stock');
  const limitedStockItems = pricingInfo.filter(p => p.availability === 'limited');

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {pricePoints.length > 0 && (
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {pricePoints.length} price{pricePoints.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      {quoteRequests.length > 0 && (
        <div className="flex items-center space-x-1">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {quoteRequests.length} quote{quoteRequests.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      {inStockItems.length > 0 && (
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">
            {inStockItems.length} in stock
          </span>
        </div>
      )}
      
      {limitedStockItems.length > 0 && (
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-yellow-600">
            {limitedStockItems.length} limited
          </span>
        </div>
      )}
    </div>
  );
}

interface AvailabilityStatusProps {
  availability?: string;
  className?: string;
}

export function AvailabilityStatus({ availability, className }: AvailabilityStatusProps) {
  if (!availability) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        Unknown availability
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_stock':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "In Stock"
        };
      case 'limited':
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Limited Stock"
        };
      case 'out_of_stock':
        return {
          icon: <XCircle className="w-4 h-4" />,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Out of Stock"
        };
      case 'made_to_order':
        return {
          icon: <Package className="w-4 h-4" />,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          label: "Made to Order"
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Unknown"
        };
    }
  };

  const config = getStatusConfig(availability);

  return (
    <div className={cn(
      "flex items-center space-x-2 px-2 py-1 rounded-lg border",
      config.bgColor,
      config.borderColor,
      className
    )}>
      <div className={config.color}>
        {config.icon}
      </div>
      <span className={cn("text-sm font-medium", config.color)}>
        {config.label}
      </span>
    </div>
  );
}


