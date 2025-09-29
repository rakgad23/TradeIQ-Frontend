import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Target, 
  ExternalLink, 
  Globe,
  Building,
  Star,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { CompanyLogo } from '../ui/CompanyLogo';
import { ContactInfo } from '../ui/ContactInfo';
import { CertificationBadges } from '../ui/CertificationBadges';
import { GeographicCoverage } from '../ui/GeographicCoverage';
import { PriceIndicator } from '../ui/PriceIndicator';
import type { SupplierItem } from '../../lib/types';

interface SupplierDetailModalProps {
  supplier: SupplierItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SupplierDetailModal({ supplier, isOpen, onClose }: SupplierDetailModalProps) {
  if (!supplier) return null;

  const extractionData = supplier.extraction_data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <CompanyLogo
              domain={supplier.apex_domain}
              companyName={supplier.name}
              size={48}
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <div className="text-xl font-semibold">{supplier.name}</div>
              {supplier.apex_domain && (
                <div className="text-sm text-gray-500">{supplier.apex_domain}</div>
              )}
            </div>
            <Badge variant="outline" className="ml-auto">
              Rank #{supplier.scores.rank}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Domain</label>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{supplier.apex_domain}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://${supplier.apex_domain}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Roles</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {supplier.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Regions</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {supplier.regions.map((region) => (
                    <Badge key={region} variant="outline" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extraction Data */}
          {extractionData && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Extraction Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Confidence Score */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Confidence Score</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round(extractionData.confidence_score * 100)}%
                        </div>
                        <div className="text-sm text-gray-500">Overall quality</div>
                      </div>
                    </div>

                    {/* Product Match */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Product Match</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {extractionData.product_match.is_match ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-bold">
                            {extractionData.product_match.is_match ? 'Match Found' : 'No Match'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round(extractionData.product_match.match_score * 100)}% relevance
                        </div>
                      </div>
                    </div>

                    {/* Geographic Coverage */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Geographic Coverage</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Countries: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractionData.geographic_coverage.countries.map((country) => (
                              <Badge key={country} variant="outline" className="text-xs">
                                {country}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {extractionData.geographic_coverage.shipping_info.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-500">Shipping Info: </span>
                            <div className="text-sm">
                              {extractionData.geographic_coverage.shipping_info.join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {supplier.contacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {contact.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span>{contact.email}</span>
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-600" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={contact.valid ? "default" : "destructive"}>
                              {contact.valid ? 'Valid' : 'Invalid'}
                            </Badge>
                            <Badge variant="outline">
                              {contact.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Product Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {extractionData.product_match.is_match ? (
                      <>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Product Match Found</span>
                          </div>
                          <div className="text-sm text-green-700">
                            Match Score: {Math.round(extractionData.product_match.match_score * 100)}%
                          </div>
                        </div>

                        {extractionData.product_match.keywords_found.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Keywords Found</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {extractionData.product_match.keywords_found.map((keyword) => (
                                <Badge key={keyword} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {extractionData.product_match.product_categories.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Product Categories</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {extractionData.product_match.product_categories.map((category) => (
                                <Badge key={category} variant="outline" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {extractionData.product_match.brand_mentions.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Brand Mentions</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {extractionData.product_match.brand_mentions.map((brand) => (
                                <Badge key={brand} variant="default" className="text-xs">
                                  {brand}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-800">No Product Match Found</span>
                        </div>
                        <div className="text-sm text-red-700 mt-1">
                          This supplier may not be relevant to your search criteria.
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pricing Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {extractionData.pricing_info.length > 0 ? (
                      <div className="space-y-3">
                        {extractionData.pricing_info.map((pricing, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-medium">
                                {pricing.type === 'price_point' && pricing.value 
                                  ? `$${pricing.value.toFixed(2)}`
                                  : 'Quote Request'
                                }
                              </span>
                            </div>
                            {pricing.context && (
                              <span className="text-sm text-gray-500">{pricing.context}</span>
                            )}
                            <Badge variant="outline">
                              {pricing.type === 'price_point' ? 'Price' : 'Quote'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No pricing information found
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Evidence */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evidence Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {supplier.evidence.map((evidence, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <a 
                        href={evidence.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {evidence.url}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {evidence.source}
                      </Badge>
                      {evidence.snapshot_id && (
                        <Badge variant="secondary">
                          Snapshot
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
