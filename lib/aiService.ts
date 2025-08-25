import { api } from './api';

export interface ChatResponse {
  response: string;
  conversation_id: string;
  suggestions?: string[];
}

export class AIService {
  static async chatWithAgent(message: string, conversationId?: string): Promise<ChatResponse> {
    const requestData = {
      message,
      conversation_id: conversationId
    };
    
    console.log('🔍 AIService.chatWithAgent - Request:', {
      url: '/ai-agent/chat',
      data: requestData,
      timestamp: new Date().toISOString()
    });

    try {
      // Create a direct axios request without auth for testing
      const response = await fetch(`${api.defaults.baseURL}/ai-agent/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('✅ AIService.chatWithAgent - Success:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      
      return data;
    } catch (error: any) {
      console.error('❌ AIService.chatWithAgent - Error:', {
        message: error.message,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  static async getSuggestions(): Promise<string[]> {
    console.log('🔍 AIService.getSuggestions - Request:', {
      url: '/ai-agent/suggestions',
      method: 'GET',
      timestamp: new Date().toISOString()
    });

    try {
      // Create a direct fetch request without auth for testing
      const response = await fetch(`${api.defaults.baseURL}/ai-agent/suggestions`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('✅ AIService.getSuggestions - Success:', {
        status: response.status,
        statusText: response.statusText,
        data: data,
        suggestions: data.suggestions
      });
      
      return data.suggestions || [];
    } catch (error: any) {
      console.error('❌ AIService.getSuggestions - Error:', {
        message: error.message,
        timestamp: new Date().toISOString()
      });
      
      return [];
    }
  }
} 