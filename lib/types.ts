// Supplier Discovery Types
export type RunStatus = "queued" | "running" | "completed" | "failed";

export interface RunStatusResp {
  run_id: string;
  session_id: string;
  status: RunStatus;
  progress_percent: number;
  current_step: string;
  message: string;
  started_at: string | null;
  completed_at: string | null;
  estimated_remaining: number | null;
  last_update: string;
  counts: {
    serpUrls: number;
    pagesCrawled: number;
    suppliersFound: number;
    suppliersDeduped: number;
  };
  last_error: string | null;
}

export interface SupplierItem {
  supplier_id: string;
  name: string;
  apex_domain: string | null;
  logo_url?: string;
  company_size?: "startup" | "small" | "medium" | "large" | "enterprise";
  founded_year?: number;
  roles: string[];
  regions: string[];
  contacts: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
    type: "sales" | "support" | "general";
    valid: boolean;
    verified: boolean;
  }[];
  certifications: Array<{
    name: string;
    type: "iso" | "industry" | "safety" | "quality" | "environmental";
    verified: boolean;
    expiry_date?: string;
  }>;
  scores: {
    rank: number;
    confidence?: number;
    relevance?: number;
    quality?: number;
    reliability?: number;
  };
  evidence: {
    url: string;
    snapshot_id?: string;
    source: "serp" | "crawl";
  }[];
  extraction_data?: {
    product_match: {
      is_match: boolean;
      match_score: number;
      keywords_found: string[];
      product_categories: string[];
      brand_mentions: string[];
    };
    pricing_info: Array<{
      type: "price_point" | "quote_request" | "bulk_discount" | "minimum_order";
      value?: number;
      currency?: string;
      context?: string;
      availability?: "in_stock" | "limited" | "out_of_stock" | "made_to_order";
    }>;
    geographic_coverage: {
      countries: string[];
      regions: string[];
      cities: string[];
      shipping_info: string[];
      coordinates?: Array<{
        lat: number;
        lng: number;
        city: string;
        country: string;
      }>;
    };
    confidence_score: number;
  };
  found_at: string;
  last_updated?: string;
}

export interface RunResultsResp {
  run_id: string;
  total_suppliers: number;
  page: number;
  page_size: number;
  total_pages: number;
  suppliers: SupplierItem[];
  filters_applied: Record<string, any>;
  search_metadata: Record<string, any>;
}

export interface DiscoverRequest {
  brandId: string;
  asinIds: string[];
  regions?: string[];
  requiredCerts?: string[];
}

export interface DiscoverResponse {
  run_id: string;
  session_id: string;
  status: string;
  message: string;
  estimated_duration: number;
}

export interface RunResultsParams {
  limit?: number;
  offset?: number;
  sort?: string;
}

// TCA (Total Cost Analysis) Types
export interface TCASimulationRequest {
  supplierId: string;
  unitCost: number;
  shippingMode: "air" | "ocean" | "ground";
  incoterm: "EXW" | "FOB" | "DDP";
  costPerUnit: number;
  dutyPercent: number;
  storageMonths: number;
}

export interface TCASimulationResponse {
  supplierId: string;
  totalCost: number;
  breakdown: {
    unitCost: number;
    shipping: number;
    duty: number;
    storage: number;
    fees: number;
  };
  margin: {
    percentage: number;
    amount: number;
  };
  passFail: boolean;
  threshold: number;
}

// Outreach Types
export interface OutreachDraftRequest {
  supplierId: string;
  brandId: string;
  asinIds: string[];
  tone?: "concise" | "professional" | "friendly";
}

export interface OutreachDraftResponse {
  subject: string;
  body: string;
}

// Filter Types
export interface SupplierFilters {
  roles: string[];
  regions: string[];
  minRank: number;
  certs: string[];
  search: string;
}

// Constants
export const REGIONS = [
  "US", "UK", "DE", "FR", "IT", "ES", "CA", "AU", "JP", "IN", "BR", "MX"
] as const;

export const CERTIFICATIONS = [
  "ISO9001", "ISO14001", "ISO45001", "UL", "CE", "FCC", "RoHS", "REACH"
] as const;

export const ROLES = [
  "manufacturer", "distributor", "wholesaler", "retailer", "oem", "authorized"
] as const;

