import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { SourcingAPI } from '../../lib/sourcingApi';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

interface APIResponse {
  endpoint: string;
  method: string;
  request: any;
  response: any;
  error: string | null;
  timestamp: string;
}

export function APITester() {
  const [responses, setResponses] = useState<APIResponse[]>([]);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [testRunId, setTestRunId] = useState<string>('');
  const { isAuthenticated, user } = useAuth();

  // Input fields for API testing
  const [testBrand, setTestBrand] = useState('Sony');
  const [testAsins, setTestAsins] = useState('B09XS7JWHH');
  const [testSupplierId, setTestSupplierId] = useState('test-supplier-123');
  const [testMessageType, setTestMessageType] = useState('initial');

  const addResponse = (endpoint: string, method: string, request: any, response: any, error: string | null = null) => {
    const newResponse: APIResponse = {
      endpoint,
      method,
      request,
      response,
      error,
      timestamp: new Date().toISOString()
    };
    setResponses(prev => [newResponse, ...prev]);
  };

  const setLoading = (endpoint: string, loading: boolean) => {
    setIsLoading(prev => ({ ...prev, [endpoint]: loading }));
  };

  const testDiscoverAPI = async () => {
    const endpoint = 'POST /supplier-discovery/discover';
    setLoading(endpoint, true);
    
    try {
      const asinList = testAsins.split(',').map(asin => asin.trim()).filter(asin => asin);
      
      const request = {
        brandId: testBrand,
        asinIds: asinList.length > 0 ? asinList : ['B09XS7JWHH'],
        regions: ['US'],
        requiredCerts: []
      };
      
      console.log('🧪 Testing Discover API with:', request);
      const response = await SourcingAPI.startDiscover(request);
      console.log('✅ Discover API response:', response);
      
      addResponse(endpoint, 'POST', request, response);
      setTestRunId(response.sourcing_run_id);
    } catch (error) {
      console.error('❌ Discover API error:', error);
      const request = {
        brandId: testBrand,
        asinIds: testAsins.split(',').map(asin => asin.trim()).filter(asin => asin),
        regions: ['US'],
        requiredCerts: []
      };
      addResponse(endpoint, 'POST', request, null, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(endpoint, false);
    }
  };

  const testStatusAPI = async () => {
    if (!testRunId) {
      addResponse('GET /supplier-discovery/runs/{id}/status', 'GET', { runId: testRunId }, null, 'No run ID available. Run discover API first.');
      return;
    }

    const endpoint = `GET /supplier-discovery/runs/${testRunId}/status`;
    setLoading(endpoint, true);
    
    try {
      const request = { runId: testRunId };
      console.log('🧪 Testing Status API with:', request);
      const response = await SourcingAPI.getRunStatus(testRunId);
      console.log('✅ Status API response:', response);
      
      addResponse(endpoint, 'GET', request, response);
    } catch (error) {
      console.error('❌ Status API error:', error);
      addResponse(endpoint, 'GET', request, null, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(endpoint, false);
    }
  };

  const testResultsAPI = async () => {
    if (!testRunId) {
      addResponse('GET /supplier-discovery/runs/{id}/results', 'GET', { runId: testRunId }, null, 'No run ID available. Run discover API first.');
      return;
    }

    const endpoint = `GET /supplier-discovery/runs/${testRunId}/results`;
    setLoading(endpoint, true);
    
    try {
      const request = { runId: testRunId, limit: 10, offset: 0, sort: 'rank' };
      console.log('🧪 Testing Results API with:', request);
      const response = await SourcingAPI.getRunResults(testRunId, { limit: 10, offset: 0, sort: 'rank' });
      console.log('✅ Results API response:', response);
      console.log('📊 Results API response structure:', {
        total: response.total,
        itemsCount: response.items?.length || 0,
        items: response.items
      });
      
      addResponse(endpoint, 'GET', request, response);
    } catch (error) {
      console.error('❌ Results API error:', error);
      const request = { runId: testRunId, limit: 10, offset: 0, sort: 'rank' };
      addResponse(endpoint, 'GET', request, null, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(endpoint, false);
    }
  };

  const testTCAAPI = async () => {
    const endpoint = 'POST /supplier-discovery/tca/simulate';
    setLoading(endpoint, true);
    
    try {
      const asinList = testAsins.split(',').map(asin => asin.trim()).filter(asin => asin);
      const primaryAsin = asinList.length > 0 ? asinList[0] : 'B09XS7JWHH';
      
      const request = {
        supplierId: testSupplierId,
        asinId: primaryAsin,
        quantity: 1000,
        region: 'US'
      };
      
      console.log('🧪 Testing TCA API with:', request);
      const response = await SourcingAPI.simulateTCA(request);
      console.log('✅ TCA API response:', response);
      
      addResponse(endpoint, 'POST', request, response);
    } catch (error) {
      console.error('❌ TCA API error:', error);
      const asinList = testAsins.split(',').map(asin => asin.trim()).filter(asin => asin);
      const primaryAsin = asinList.length > 0 ? asinList[0] : 'B09XS7JWHH';
      const request = {
        supplierId: testSupplierId,
        asinId: primaryAsin,
        quantity: 1000,
        region: 'US'
      };
      addResponse(endpoint, 'POST', request, null, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(endpoint, false);
    }
  };

  const testOutreachAPI = async () => {
    const endpoint = 'POST /supplier-discovery/outreach/draft';
    setLoading(endpoint, true);
    
    try {
      const asinList = testAsins.split(',').map(asin => asin.trim()).filter(asin => asin);
      const primaryAsin = asinList.length > 0 ? asinList[0] : 'B09XS7JWHH';
      
      const request = {
        supplierId: testSupplierId,
        asinId: primaryAsin,
        messageType: testMessageType,
        customContext: 'Testing outreach draft generation'
      };
      
      console.log('🧪 Testing Outreach API with:', request);
      const response = await SourcingAPI.draftOutreach(request);
      console.log('✅ Outreach API response:', response);
      
      addResponse(endpoint, 'POST', request, response);
    } catch (error) {
      console.error('❌ Outreach API error:', error);
      const asinList = testAsins.split(',').map(asin => asin.trim()).filter(asin => asin);
      const primaryAsin = asinList.length > 0 ? asinList[0] : 'B09XS7JWHH';
      const request = {
        supplierId: testSupplierId,
        asinId: primaryAsin,
        messageType: testMessageType,
        customContext: 'Testing outreach draft generation'
      };
      addResponse(endpoint, 'POST', request, null, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(endpoint, false);
    }
  };

  const testAllAPIs = async () => {
    await testDiscoverAPI();
    // Wait a bit for the run to be created
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testStatusAPI();
    await testResultsAPI();
    await testTCAAPI();
    await testOutreachAPI();
  };

  const clearResponses = () => {
    setResponses([]);
    setTestRunId('');
  };

  const formatResponse = (response: APIResponse) => {
    const data = response.error ? { error: response.error } : response.response;
    return JSON.stringify(data, null, 2);
  };

  const getStatusBadge = (response: APIResponse) => {
    if (response.error) {
      return <Badge variant="destructive">Error</Badge>;
    }
    return <Badge variant="default">Success</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Supplier Discovery API Tester</span>
            <div className="flex gap-2">
              <Badge variant={isAuthenticated ? "default" : "destructive"}>
                {isAuthenticated ? `Logged in as ${user?.email}` : 'Not authenticated'}
              </Badge>
              <Button variant="outline" size="sm" onClick={clearResponses}>
                Clear All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="testBrand" className="text-sm font-medium">Brand Name</Label>
              <Input
                id="testBrand"
                value={testBrand}
                onChange={(e) => setTestBrand(e.target.value)}
                placeholder="Enter brand (e.g., Apple, Samsung, Nike)"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="testAsins" className="text-sm font-medium">ASINs (comma-separated)</Label>
              <Input
                id="testAsins"
                value={testAsins}
                onChange={(e) => setTestAsins(e.target.value)}
                placeholder="B09XS7JWHH, B12AB34CDEF"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="testSupplierId" className="text-sm font-medium">Supplier ID</Label>
              <Input
                id="testSupplierId"
                value={testSupplierId}
                onChange={(e) => setTestSupplierId(e.target.value)}
                placeholder="test-supplier-123"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="testMessageType" className="text-sm font-medium">Message Type</Label>
              <select
                id="testMessageType"
                value={testMessageType}
                onChange={(e) => setTestMessageType(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-background"
              >
                <option value="initial">Initial</option>
                <option value="followup">Followup</option>
                <option value="negotiation">Negotiation</option>
              </select>
            </div>
          </div>

          {/* Test Controls */}
          <div className="space-y-4">
            {/* Main Discovery APIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                onClick={testDiscoverAPI} 
                disabled={isLoading['POST /supplier-discovery/discover'] || !isAuthenticated}
                className="w-full"
              >
                {isLoading['POST /supplier-discovery/discover'] ? 'Testing...' : 'Test Discover API'}
              </Button>
              
              <Button 
                onClick={testStatusAPI} 
                disabled={isLoading[`GET /supplier-discovery/runs/${testRunId}/status`] || !isAuthenticated}
                className="w-full"
              >
                {isLoading[`GET /supplier-discovery/runs/${testRunId}/status`] ? 'Testing...' : 'Test Status API'}
              </Button>
              
              <Button 
                onClick={testResultsAPI} 
                disabled={isLoading[`GET /supplier-discovery/runs/${testRunId}/results`] || !isAuthenticated}
                className="w-full"
              >
                {isLoading[`GET /supplier-discovery/runs/${testRunId}/results`] ? 'Testing...' : 'Test Results API'}
              </Button>
              
              <Button 
                onClick={testAllAPIs} 
                disabled={Object.values(isLoading).some(loading => loading) || !isAuthenticated}
                className="w-full"
                variant="default"
              >
                Test All APIs
              </Button>
            </div>

            {/* Additional APIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={testTCAAPI} 
                disabled={isLoading['POST /supplier-discovery/tca/simulate'] || !isAuthenticated}
                className="w-full"
                variant="outline"
              >
                {isLoading['POST /supplier-discovery/tca/simulate'] ? 'Testing...' : 'Test TCA Simulation API'}
              </Button>
              
              <Button 
                onClick={testOutreachAPI} 
                disabled={isLoading['POST /supplier-discovery/outreach/draft'] || !isAuthenticated}
                className="w-full"
                variant="outline"
              >
                {isLoading['POST /supplier-discovery/outreach/draft'] ? 'Testing...' : 'Test Outreach Draft API'}
              </Button>
            </div>
          </div>

          {/* Run ID Display */}
          {testRunId && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <strong>Current Run ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded">{testRunId}</code>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Responses */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">API Responses</h3>
        {responses.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No API responses yet. Click a test button above to start testing.
            </CardContent>
          </Card>
        ) : (
          responses.map((response, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-sm font-mono">
                    {response.method} {response.endpoint}
                  </span>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(response)}
                    <span className="text-xs text-gray-500">
                      {new Date(response.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Request */}
                <div>
                  <label className="block text-sm font-medium mb-2">Request:</label>
                  <Textarea
                    value={JSON.stringify(response.request, null, 2)}
                    readOnly
                    className="font-mono text-sm"
                    rows={3}
                  />
                </div>
                
                {/* Response */}
                <div>
                  <label className="block text-sm font-medium mb-2">Response:</label>
                  <Textarea
                    value={formatResponse(response)}
                    readOnly
                    className="font-mono text-sm"
                    rows={response.error ? 3 : 8}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}