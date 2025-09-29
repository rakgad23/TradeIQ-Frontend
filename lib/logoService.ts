/**
 * Company Logo Service
 * Provides company logos using Clearbit API and fallback options
 */

export interface LogoServiceResponse {
  logoUrl: string | null;
  source: 'clearbit' | 'backend' | 'fallback' | 'none';
  error?: string;
}

export class LogoService {
  private static readonly CLEARBIT_BASE_URL = 'https://logo.clearbit.com';
  private static readonly BACKEND_BASE_URL = '/api/logos';
  private static readonly FALLBACK_LOGO = '/images/default-company-logo.svg';
  
  /**
   * Get company logo URL from multiple sources
   */
  static async getCompanyLogo(domain: string, companyName?: string): Promise<LogoServiceResponse> {
    if (!domain) {
      return { logoUrl: null, source: 'none', error: 'No domain provided' };
    }

    // Clean domain (remove protocol, www, etc.)
    const cleanDomain = this.cleanDomain(domain);
    
    try {
      // Try Clearbit first
      const clearbitUrl = `${this.CLEARBIT_BASE_URL}/${cleanDomain}`;
      const clearbitResponse = await this.testImageUrl(clearbitUrl);
      
      if (clearbitResponse) {
        return { logoUrl: clearbitUrl, source: 'clearbit' };
      }
    } catch (error) {
      console.warn('Clearbit logo failed:', error);
    }

    try {
      // Try backend API
      const backendUrl = `${this.BACKEND_BASE_URL}/${encodeURIComponent(cleanDomain)}`;
      const backendResponse = await this.testImageUrl(backendUrl);
      
      if (backendResponse) {
        return { logoUrl: backendUrl, source: 'backend' };
      }
    } catch (error) {
      console.warn('Backend logo failed:', error);
    }

    // Return fallback
    return { logoUrl: this.FALLBACK_LOGO, source: 'fallback' };
  }

  /**
   * Clean domain name for API calls
   */
  private static cleanDomain(domain: string): string {
    return domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .toLowerCase();
  }

  /**
   * Test if an image URL is accessible
   */
  private static async testImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 3 seconds
      setTimeout(() => resolve(false), 3000);
    });
  }

  /**
   * Generate a fallback logo with company initials
   */
  static generateFallbackLogo(companyName: string, size: number = 40): string {
    const initials = this.getCompanyInitials(companyName);
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];
    
    const colorIndex = companyName.length % colors.length;
    const backgroundColor = colors[colorIndex];
    
    // Create SVG data URL
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="8"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
              fill="white" font-family="system-ui, sans-serif" 
              font-size="${size * 0.4}" font-weight="600">
          ${initials}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Extract company initials from name
   */
  private static getCompanyInitials(name: string): string {
    if (!name) return '?';
    
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    
    return words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  /**
   * Batch fetch logos for multiple companies
   */
  static async batchGetLogos(
    suppliers: Array<{ supplier_id: string; name: string; apex_domain?: string | null }>
  ): Promise<Record<string, LogoServiceResponse>> {
    const results: Record<string, LogoServiceResponse> = {};
    
    // Process in batches of 5 to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < suppliers.length; i += batchSize) {
      const batch = suppliers.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (supplier) => {
        const domain = supplier.apex_domain || this.extractDomainFromName(supplier.name);
        const result = await this.getCompanyLogo(domain, supplier.name);
        return { supplier_id: supplier.supplier_id, result };
      });
      
      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ supplier_id, result }) => {
        results[supplier_id] = result;
      });
      
      // Small delay between batches
      if (i + batchSize < suppliers.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }

  /**
   * Extract domain from company name (fallback)
   */
  private static extractDomainFromName(name: string): string {
    // Simple heuristic: convert company name to potential domain
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .substring(0, 20) + '.com';
  }
}


