import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { 
  Send, 
  Target, 
  Eye, 
  DollarSign, 
  AlertTriangle, 
  Zap,
  Sparkles,
  TrendingUp,
  ShoppingCart,
  FileText,
  Paperclip,
  Image,
  Mic,
  Plus,
  X,
  Bot,
  User,
  Loader2
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { AIService, ChatResponse } from "../lib/aiService";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  aiResponse?: ChatResponse;
}

const quickActions = [
  {
    icon: Target,
    title: "Buy Box Tracking",
    description: "Monitor Buy Box status for your products",
    color: "blue",
    badge: "Real-time"
  },
  {
    icon: Eye,
    title: "Competitor Monitor",
    description: "Track competitor prices and strategies",
    color: "purple",
    badge: "24/7"
  },
  {
    icon: DollarSign,
    title: "Repricing Rules",
    description: "Create automated pricing strategies",
    color: "green",
    badge: "Auto"
  },
  {
    icon: AlertTriangle,
    title: "Dispute Handling",
    description: "Manage account health and disputes",
    color: "red",
    badge: "Urgent"
  },
  {
    icon: Zap,
    title: "Automation Hub",
    description: "Set up business automation workflows",
    color: "yellow",
    badge: "Smart"
  },
  {
    icon: FileText,
    title: "Report Generator",
    description: "Create custom analytics reports",
    color: "indigo",
    badge: "Custom"
  }
];

const colorClasses = {
  blue: "border-blue-200/50 hover:border-blue-400/80 hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-blue-100/60 group-hover:text-blue-700 hover:shadow-xl hover:shadow-blue-500/25 hover:glow-blue",
  purple: "border-purple-200/50 hover:border-purple-400/80 hover:bg-gradient-to-br hover:from-purple-50/80 hover:to-purple-100/60 group-hover:text-purple-700 hover:shadow-xl hover:shadow-purple-500/25",
  green: "border-green-200/50 hover:border-green-400/80 hover:bg-gradient-to-br hover:from-green-50/80 hover:to-green-100/60 group-hover:text-green-700 hover:shadow-xl hover:shadow-green-500/25 hover:glow-green",
  red: "border-red-200/50 hover:border-red-400/80 hover:bg-gradient-to-br hover:from-red-50/80 hover:to-red-100/60 group-hover:text-red-700 hover:shadow-xl hover:shadow-red-500/25 hover:glow-red",
  yellow: "border-yellow-200/50 hover:border-yellow-400/80 hover:bg-gradient-to-br hover:from-yellow-50/80 hover:to-yellow-100/60 group-hover:text-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25",
  indigo: "border-indigo-200/50 hover:border-indigo-400/80 hover:bg-gradient-to-br hover:from-indigo-50/80 hover:to-indigo-100/60 group-hover:text-indigo-700 hover:shadow-xl hover:shadow-indigo-500/25"
};

const badgeColors = {
  blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg",
  purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg",
  green: "bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg",
  red: "bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg",
  yellow: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-lg",
  indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-lg"
};

export function CommandCenter() {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load suggestions on component mount
  useEffect(() => {
    loadSuggestions();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadSuggestions = async () => {
    try {
      const aiSuggestions = await AIService.getSuggestions();
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if ((!message.trim() && attachments.length === 0) || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage("");
    setAttachments([]);
    setIsExpanded(false);
    setIsLoading(true);

    try {
      const aiResponse = await AIService.chatWithAgent(message, conversationId);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.response,
        sender: 'ai',
        timestamp: new Date(),
        aiResponse: aiResponse
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setConversationId(aiResponse.conversation_id);
      
      // Update suggestions if provided
      if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
        setSuggestions(aiResponse.suggestions);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    setIsExpanded(true);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.sender === 'user';
    
    return (
      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 max-w-[80%]`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
              : 'bg-gradient-to-br from-gray-500 to-gray-600'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          {/* Message Content */}
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : 'bg-white border border-gray-200 text-gray-900'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            
            {/* AI Suggestions */}
            {!isUser && msg.aiResponse?.suggestions && msg.aiResponse.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Suggested follow-ups:</p>
                <div className="flex flex-wrap gap-1">
                  {msg.aiResponse.suggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(suggestion)}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1">
            {formatTimestamp(msg.timestamp)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                AI Command Console
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
                <span className="text-sm text-gray-600 font-medium">
                  {isLoading ? 'Processing...' : 'Live & Ready'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Ask anything about your Amazon business or use quick actions below
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to TradeIQ AI</h3>
              <p className="text-gray-600 mb-6">Ask me anything about your Amazon business or try one of the quick actions below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatMessages.map(renderMessage)}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Command Input */}
      <div className="px-8 pb-8 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto pt-6">
          <div className={`relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-300 ${isExpanded ? 'ring-2 ring-blue-500/20' : ''}`}>
            
            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                        <Image className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 max-w-[150px] truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex items-end gap-3 p-4">
              
              {/* Attachment Button */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 w-10 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
              </div>

              {/* Text Input */}
              <div className="flex-1">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsExpanded(true)}
                  onBlur={() => setIsExpanded(false)}
                  placeholder="Ask TradeIQ AI anything about your Amazon business..."
                  className="min-h-[48px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent px-0 py-3 placeholder:text-gray-500 font-medium leading-relaxed"
                  rows={1}
                  disabled={isLoading}
                />
              </div>

              {/* Additional Tools */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 w-10 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  <Image className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 w-10 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>

              {/* Send Button */}
              <Button 
                onClick={handleSend}
                disabled={(!message.trim() && attachments.length === 0) || isLoading}
                className="h-10 w-10 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </Button>
            </div>

            {/* Quick Suggestions */}
            {isExpanded && message.length === 0 && suggestions.length > 0 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(suggestion)}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Tips */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>•</span>
              <span>Supports images, PDFs, and documents</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
              <span>{isLoading ? 'Processing...' : 'AI Ready'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Quick Actions</h2>
            <p className="text-gray-600">Common Amazon seller tasks and automations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200"
                onClick={() => handleQuickAction(action.title)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${action.color}-400 to-${action.color}-600 flex items-center justify-center shadow-sm`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0"
                  >
                    {action.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Recent AI Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200/50 hover:bg-blue-100/50 transition-colors cursor-pointer">
                <p className="text-blue-800 text-sm font-medium">📈 Your Buy Box win rate increased by 12% this week</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200/50 hover:bg-yellow-100/50 transition-colors cursor-pointer">
                <p className="text-yellow-800 text-sm font-medium">⚠️ Competitor lowered prices on 3 of your monitored ASINs</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200/50 hover:bg-green-100/50 transition-colors cursor-pointer">
                <p className="text-green-800 text-sm font-medium">✅ Automation rules generated $2,340 in additional revenue</p>
              </div>
            </div>
          </div>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}