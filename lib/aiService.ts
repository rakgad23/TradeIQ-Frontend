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
    // Debug: Check if token exists
    const token = localStorage.getItem('access_token');
    console.log('🔍 AIService.chatWithAgent - Token Check:', {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
      timestamp: new Date().toISOString()
    });
    
    console.log('�� AIService.chatWithAgent - Request:', {
      url: '/ai-agent/chat',
      data: requestData,
      timestamp: new Date().toISOString()
    });

    try {
      // Use the authenticated api instance instead of fetch
      const response = await api.post('/ai-agent/chat', requestData);
      
      console.log('✅ AIService.chatWithAgent - Success:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      
      return response.data;
    } catch (error: any) {
      console.error('❌ AIService.chatWithAgent - Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
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
      // Use the authenticated api instance instead of fetch
      const response = await api.get('/ai-agent/suggestions');
      
      console.log('✅ AIService.getSuggestions - Success:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        suggestions: response.data.suggestions
      });
      
      return response.data.suggestions || [];
    } catch (error: any) {
      console.error('❌ AIService.getSuggestions - Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        timestamp: new Date().toISOString()
      });
      
      return [];
    }
  }
}