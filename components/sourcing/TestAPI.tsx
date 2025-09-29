import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SourcingAPI } from '../../lib/sourcingApi';
import { useAuth } from '../../context/AuthContext';

export function TestAPI() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const testAPI = async () => {
    setIsLoading(true);
    setResult('Testing API...');
    
    try {
      console.log('🧪 Testing API with sample data');
      
      const response = await SourcingAPI.startDiscover({
        brandId: 'Sony',
        asinIds: ['B09XS7JWHH'],
        regions: ['US'],
        requiredCerts: []
      });
      
      console.log('✅ API Test successful:', response);
      setResult(`✅ Success! Run ID: ${response.sourcing_run_id}`);
    } catch (error) {
      console.error('❌ API Test failed:', error);
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User:</strong> {user?.email || 'None'}</p>
        </div>
        
        <Button 
          onClick={testAPI} 
          disabled={isLoading || !isAuthenticated}
          className="w-full"
        >
          {isLoading ? 'Testing...' : 'Test Supplier Discovery API'}
        </Button>
        
        {result && (
          <div className="p-3 bg-gray-100 rounded text-sm">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


