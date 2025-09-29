import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RefreshCw, Building2, Star, TrendingUp } from 'lucide-react';
import { useRunResults } from '../../hooks/useRunResults';
import { SupplierDetailModal } from './SupplierDetailModal';
import { CompanyLogo } from '../ui/CompanyLogo';
import { ContactSummary } from '../ui/ContactInfo';
import { CertificationSummary } from '../ui/CertificationBadges';
import { GeographicSummary } from '../ui/GeographicCoverage';
import { PriceSummary, AvailabilityStatus } from '../ui/PriceIndicator';
import { SupplierActions, BulkActions } from '../ui/SupplierActions';
import type { SupplierItem } from '../../lib/types';

interface SuppliersTableProps {
  runId: string;
}

export function SuppliersTable({ runId }: SuppliersTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<SupplierItem[]>([]);
  
  const { data: results, isLoading, error, refetch } = useRunResults(
    runId, 
    { 
      limit: pageSize, 
      offset: currentPage * pageSize,
      sort: 'rank'
    }
  );

  const handleRefresh = () => {
    refetch();
  };

  const handleViewEvidence = (supplier: SupplierItem) => {
    setSelectedSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleTCA = (supplier: SupplierItem) => {
    // TODO: Implement TCA simulation modal
    console.log('TCA for:', supplier.name);
  };

  const handleSupplierSelect = (supplier: SupplierItem, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSuppliers(prev => [...prev, supplier]);
    } else {
      setSelectedSuppliers(prev => prev.filter(s => s.supplier_id !== supplier.supplier_id));
    }
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === results?.suppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(results?.suppliers || []);
    }
  };

  const handleBulkExport = (format: 'csv' | 'pdf') => {
    // TODO: Implement bulk export functionality
    console.log(`Bulk export ${format} for suppliers:`, selectedSuppliers.map(s => s.supplier_id));
  };

  const handleBulkShare = () => {
    // TODO: Implement bulk share functionality
    console.log('Bulk share for suppliers:', selectedSuppliers.map(s => s.supplier_id));
  };


  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <div className="text-gray-600">Loading supplier results...</div>
              <div className="text-sm text-gray-500">This may take a few moments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load supplier results</h3>
            <p className="text-gray-600 mb-4">
              {error.message.includes('404') 
                ? 'This discovery run was not found. It may have been deleted or the ID is incorrect.'
                : 'There was an error loading the supplier results. Please try again.'}
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.suppliers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-600 mb-4">
              The discovery process may still be running, or no suppliers were found matching your criteria.
            </p>
            <div className="text-sm text-gray-500">
              Check the progress drawer above for more details about the discovery status.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPages = results.total_pages;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Supplier Results ({results.total_suppliers} found)</CardTitle>
          <div className="flex items-center gap-2">
            {selectedSuppliers.length > 0 && (
              <BulkActions
                selectedSuppliers={selectedSuppliers}
                onExport={handleBulkExport}
                onShare={handleBulkShare}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.length === results.suppliers.length && results.suppliers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.suppliers.map((supplier) => (
                <TableRow key={supplier.supplier_id} className="hover:bg-gray-50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.some(s => s.supplier_id === supplier.supplier_id)}
                      onChange={(e) => handleSupplierSelect(supplier, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={supplier.scores.rank <= 3 ? "default" : "outline"}
                        className={supplier.scores.rank <= 3 ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : ""}
                      >
                        #{supplier.scores.rank}
                      </Badge>
                      {supplier.scores.rank <= 3 && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <CompanyLogo
                        domain={supplier.apex_domain}
                        companyName={supplier.name}
                        size={40}
                        className="flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">
                          {supplier.name}
                        </div>
                        {supplier.apex_domain && (
                          <div className="text-sm text-gray-500 truncate">
                            {supplier.apex_domain}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          {supplier.company_size && (
                            <Badge variant="outline" className="text-xs">
                              <Building2 className="w-3 h-3 mr-1" />
                              {supplier.company_size}
                            </Badge>
                          )}
                          {supplier.founded_year && (
                            <span className="text-xs text-gray-500">
                              Est. {supplier.founded_year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <ContactSummary contacts={supplier.contacts} />
                  </TableCell>
                  
                  <TableCell>
                    <CertificationSummary certifications={supplier.certifications} />
                  </TableCell>
                  
                  <TableCell>
                    <GeographicSummary 
                      geographicCoverage={supplier.extraction_data?.geographic_coverage} 
                    />
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <PriceSummary pricingInfo={supplier.extraction_data?.pricing_info} />
                      {supplier.extraction_data?.pricing_info?.[0]?.availability && (
                        <AvailabilityStatus 
                          availability={supplier.extraction_data.pricing_info[0].availability}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {supplier.scores.confidence || supplier.scores.relevance || 0}%
                        </span>
                      </div>
                      {supplier.extraction_data?.product_match && (
                        <div className="text-xs text-gray-500">
                          Match: {supplier.extraction_data.product_match.match_score}%
                        </div>
                      )}
                      {supplier.extraction_data?.confidence_score && (
                        <div className="text-xs text-gray-500">
                          Confidence: {supplier.extraction_data.confidence_score}%
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <SupplierActions
                      supplier={supplier}
                      onViewDetails={handleViewEvidence}
                      onTCA={handleTCA}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, results.total_suppliers)} of {results.total_suppliers} results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Supplier Detail Modal */}
      <SupplierDetailModal
        supplier={selectedSupplier}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedSupplier(null);
        }}
      />
    </Card>
  );
}

