import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Plus, Search, TestTube } from 'lucide-react';
import { SourcingAPI } from '../../lib/sourcingApi';
import { REGIONS, CERTIFICATIONS } from '../../lib/types';
import { useToast } from '../ui/use-toast';
import { useAuth } from '../../context/AuthContext';

interface SourcingFinderProps {
  onRunCreated: (runId: string) => void;
}

export function SourcingFinder({ onRunCreated }: SourcingFinderProps) {
  const [brand, setBrand] = useState('');
  const [asins, setAsins] = useState<string[]>(['']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['US']);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingImportYeti, setIsTestingImportYeti] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  console.log('🔍 SourcingFinder rendered with:', {
    isAuthenticated,
    user: user?.email,
    brand,
    asins,
    selectedRegions,
    selectedCerts,
    isSubmitting
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔘 Submit button clicked via form submission!');
    console.log('🚀 Starting supplier discovery with data:', {
      brand: brand.trim(),
      asins: asins.filter(asin => asin.trim()),
      regions: selectedRegions,
      certs: selectedCerts,
      isAuthenticated,
      user: user?.email
    });
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use supplier discovery",
        variant: "destructive"
      });
      return;
    }
    
    if (!brand.trim()) {
      toast({
        title: "Brand Required",
        description: "Please enter a brand name",
        variant: "destructive"
      });
      return;
    }

    const validAsins = asins.filter(asin => asin.trim());
    if (validAsins.length === 0) {
      toast({
        title: "ASINs Required",
        description: "Please enter at least one ASIN",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        brandId: brand.trim(),
        asinIds: validAsins,
        regions: selectedRegions,
        requiredCerts: selectedCerts
      };
      
      console.log('📤 Sending API request with payload:', payload);
      
      const response = await SourcingAPI.startDiscover(payload);
      
      console.log('✅ API response received:', response);
      
      toast({
        title: "Discovery Started",
        description: "Supplier discovery is now running in the background"
      });
      
      onRunCreated(response.sourcing_run_id);
    } catch (error) {
      console.error('❌ API request failed:', error);
      toast({
        title: "Error",
        description: `Failed to start supplier discovery: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAsin = () => {
    setAsins([...asins, '']);
  };

  const removeAsin = (index: number) => {
    if (asins.length > 1) {
      setAsins(asins.filter((_, i) => i !== index));
    }
  };

  const updateAsin = (index: number, value: string) => {
    const newAsins = [...asins];
    newAsins[index] = value;
    setAsins(newAsins);
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev => 
      prev.includes(cert) 
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    );
  };

  const testImportYeti = async () => {
    console.log('🧪 Testing ImportYeti connector...');
    setIsTestingImportYeti(true);
    
    try {
      // Use brand name as test query if provided, otherwise default
      const query = brand.trim() || "Apple Inc";
      
      console.log('🔍 Testing ImportYeti with query:', query);
      
      const result = await SourcingAPI.testImportYeti(query);
      
      console.log('✅ ImportYeti test result:', result);
      
      toast({
        title: "ImportYeti Test Complete",
        description: result.success 
          ? `Found ${result.documents_found || 0} documents`
          : `Test failed: ${result.error || result.message || 'Unknown error'}`,
        variant: result.success ? "default" : "destructive"
      });
      
    } catch (error) {
      console.error('❌ ImportYeti test error:', error);
      toast({
        title: "ImportYeti Test Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsTestingImportYeti(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Supplier Discovery
            {!isAuthenticated && (
              <Badge variant="destructive" className="ml-2">
                Login Required
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Brand Name</label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand name (e.g., Sony, Apple)"
                required
              />
            </div>

            {/* ASINs Input */}
            <div>
              <label className="block text-sm font-medium mb-2">ASINs</label>
              <div className="space-y-2">
                {asins.map((asin, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={asin}
                      onChange={(e) => updateAsin(index, e.target.value)}
                      placeholder="Enter ASIN (e.g., B09XS7JWHH)"
                      className="flex-1"
                    />
                    {asins.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeAsin(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAsin}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add ASIN
                </Button>
              </div>
            </div>

            {/* Regions */}
            <div>
              <label className="block text-sm font-medium mb-2">Target Regions</label>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(region => (
                  <Badge
                    key={region}
                    variant={selectedRegions.includes(region) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRegion(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium mb-2">Required Certifications (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map(cert => (
                  <Badge
                    key={cert}
                    variant={selectedCerts.includes(cert) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCert(cert)}
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !isAuthenticated}
              className="w-full"
            >
              {!isAuthenticated 
                ? "Please Log In to Start Discovery" 
                : isSubmitting 
                  ? "Starting Discovery..." 
                  : "Start Supplier Discovery"
              }
            </Button>

            {/* ImportYeti Test Button */}
            <Button
              type="button"
              variant="outline"
              onClick={testImportYeti}
              disabled={isTestingImportYeti}
              className="w-full"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {isTestingImportYeti 
                ? "Testing ImportYeti..." 
                : "Test ImportYeti Connector"
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}