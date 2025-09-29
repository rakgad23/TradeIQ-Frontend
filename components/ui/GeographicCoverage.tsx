import React, { useState } from 'react';
import { MapPin, Globe, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { cn } from './utils';
import type { SupplierItem } from '../../lib/types';

interface GeographicCoverageProps {
  geographicCoverage: SupplierItem['extraction_data']['geographic_coverage'];
  className?: string;
  showMap?: boolean;
  compact?: boolean;
}

export function GeographicCoverage({ 
  geographicCoverage, 
  className, 
  showMap = true,
  compact = false 
}: GeographicCoverageProps) {
  if (!geographicCoverage) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No geographic data
      </div>
    );
  }

  const { countries, regions, cities, shipping_info, coordinates } = geographicCoverage;

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          {countries.length} countr{countries.length !== 1 ? 'ies' : 'y'}
        </span>
        {regions.length > 0 && (
          <span className="text-sm text-gray-500">
            • {regions.length} region{regions.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Countries */}
      {countries.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Countries</span>
            <Badge variant="outline" className="text-xs">
              {countries.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {countries.slice(0, 5).map((country, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {country}
              </Badge>
            ))}
            {countries.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{countries.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Regions */}
      {regions.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Regions</span>
            <Badge variant="outline" className="text-xs">
              {regions.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {regions.slice(0, 3).map((region, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {region}
              </Badge>
            ))}
            {regions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{regions.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Shipping Info */}
      {shipping_info.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Truck className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Shipping</span>
          </div>
          <div className="space-y-1">
            {shipping_info.slice(0, 3).map((info, index) => (
              <div key={index} className="text-sm text-gray-600">
                {info}
              </div>
            ))}
            {shipping_info.length > 3 && (
              <div className="text-sm text-gray-500">
                +{shipping_info.length - 3} more shipping options
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map Preview */}
      {showMap && coordinates && coordinates.length > 0 && (
        <GeographicMapPreview coordinates={coordinates} />
      )}
    </div>
  );
}

interface GeographicMapPreviewProps {
  coordinates: Array<{
    lat: number;
    lng: number;
    city: string;
    country: string;
  }>;
  className?: string;
}

function GeographicMapPreview({ coordinates, className }: GeographicMapPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple map visualization using CSS
  const generateMapPoints = () => {
    if (coordinates.length === 0) return null;

    // Normalize coordinates to fit in a 200x100 container
    const lats = coordinates.map(c => c.lat);
    const lngs = coordinates.map(c => c.lng);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    return coordinates.map((coord, index) => {
      const x = ((coord.lng - minLng) / lngRange) * 180 + 10; // 10px margin
      const y = ((maxLat - coord.lat) / latRange) * 80 + 10; // 10px margin
      
      return (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white shadow-sm cursor-pointer hover:bg-blue-600 transition-colors"
                style={{ left: `${x}px`, top: `${y}px` }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <div className="font-medium">{coord.city}</div>
                <div className="text-gray-600">{coord.country}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    });
  };

  return (
    <Card className={cn("border border-gray-200", className)}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Coverage Map</span>
            <Badge variant="outline" className="text-xs">
              {coordinates.length} locations
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="space-y-3">
            <div className="relative w-full h-20 bg-gray-50 rounded border overflow-hidden">
              {generateMapPoints()}
            </div>
            
            <div className="space-y-1">
              {coordinates.slice(0, 5).map((coord, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{coord.city}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{coord.country}</span>
                </div>
              ))}
              {coordinates.length > 5 && (
                <div className="text-sm text-gray-500">
                  +{coordinates.length - 5} more locations
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface GeographicSummaryProps {
  geographicCoverage: SupplierItem['extraction_data']['geographic_coverage'];
  className?: string;
}

export function GeographicSummary({ geographicCoverage, className }: GeographicSummaryProps) {
  if (!geographicCoverage) {
    return (
      <div className={cn("text-gray-400 text-sm", className)}>
        No geographic data
      </div>
    );
  }

  const { countries, regions, cities, coordinates } = geographicCoverage;

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {countries.length > 0 && (
        <div className="flex items-center space-x-1">
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {countries.length} countr{countries.length !== 1 ? 'ies' : 'y'}
          </span>
        </div>
      )}
      
      {regions.length > 0 && (
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {regions.length} region{regions.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      {coordinates && coordinates.length > 0 && (
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {coordinates.length} location{coordinates.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}


