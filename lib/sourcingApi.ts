import { api } from './api';
import type {
  DiscoverRequest,
  DiscoverResponse,
  RunStatusResp,
  RunResultsResp,
  RunResultsParams,
  TCASimulationRequest,
  TCASimulationResponse,
  OutreachDraftRequest,
  OutreachDraftResponse
} from './types';

export class SourcingAPI {
  // Start a new sourcing discovery run
  static async startDiscover(payload: DiscoverRequest): Promise<DiscoverResponse> {
    console.log('🌐 SourcingAPI.startDiscover called with payload:', payload);
    try {
      const response = await api.post<DiscoverResponse>('/supplier-discovery/discover', payload);
      console.log('✅ SourcingAPI.startDiscover response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.startDiscover error:', error);
      throw error;
    }
  }

  // Start a supplier search from SupplierAgent
  static async startAgentSearch(query: string, regions: string[] = ["US", "UK", "EU"], maxSuppliers: number = 50): Promise<DiscoverResponse> {
    console.log('🌐 SourcingAPI.startAgentSearch called with:', { query, regions, maxSuppliers });
    try {
      const response = await api.post<DiscoverResponse>('/supplier-discovery/agent-search', {
        query,
        regions,
        max_suppliers: maxSuppliers
      });
      console.log('✅ SourcingAPI.startAgentSearch response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.startAgentSearch error:', error);
      throw error;
    }
  }

  // Get run status with polling
  static async getRunStatus(runId: string): Promise<RunStatusResp> {
    const response = await api.get<RunStatusResp>(`/supplier-discovery/runs/${runId}/status`);
    return response.data;
  }

  // Get run results with pagination and sorting
  static async getRunResults(
    runId: string, 
    params: RunResultsParams = {}
  ): Promise<RunResultsResp> {
    const searchParams = new URLSearchParams();
    
    if (params.limit) searchParams.set('page_size', params.limit.toString());
    if (params.offset) searchParams.set('page', Math.floor(params.offset / (params.limit || 20)) + 1).toString();
    if (params.sort) searchParams.set('sort_by', params.sort);
    
    const queryString = searchParams.toString();
    const url = `/api/supplier-discovery/results/${runId}${queryString ? `?${queryString}` : ''}`;
    
    console.log('🌐 SourcingAPI.getRunResults called with:', { runId, params, url });
    
    try {
      const response = await api.get<RunResultsResp>(url);
      console.log('✅ SourcingAPI.getRunResults response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.getRunResults error:', error);
      throw error;
    }
  }

  // Simulate TCA (Total Cost Analysis)
  static async simulateTCA(payload: TCASimulationRequest): Promise<TCASimulationResponse> {
    console.log('🌐 SourcingAPI.simulateTCA called with payload:', payload);
    try {
      const response = await api.post<TCASimulationResponse>('/supplier-discovery/tca/simulate', payload);
      console.log('✅ SourcingAPI.simulateTCA response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.simulateTCA error:', error);
      throw error;
    }
  }

  // Draft outreach email
  static async draftOutreach(payload: OutreachDraftRequest): Promise<OutreachDraftResponse> {
    console.log('🌐 SourcingAPI.draftOutreach called with payload:', payload);
    try {
      const response = await api.post<OutreachDraftResponse>('/supplier-discovery/outreach/draft', payload);
      console.log('✅ SourcingAPI.draftOutreach response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.draftOutreach error:', error);
      throw error;
    }
  }

  // Test ImportYeti connector
  static async testImportYeti(query: string = "Apple Inc"): Promise<any> {
    console.log('🌐 SourcingAPI.testImportYeti called with query:', query);
    try {
      const response = await api.get(`/supplier-discovery/importyeti/test-public?query=${encodeURIComponent(query)}`);
      console.log('✅ SourcingAPI.testImportYeti response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ SourcingAPI.testImportYeti error:', error);
      throw error;
    }
  }

  // Merge suppliers (Day-3+ feature)
  static async mergeSuppliers(supplierId: string, mergeData: any): Promise<void> {
    await api.post(`/suppliers/${supplierId}/merge`, mergeData);
  }
}
