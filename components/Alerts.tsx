import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  X, 
  AlertTriangle, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  BarChart3,
  Calendar,
  ChevronDown,
  Target,
  TrendingDown,
  TrendingUp,
  Bot,
  Zap,
  Eye,
  MoreHorizontal,
  Settings,
  ChevronRight,
  Shield
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Alert {
  id: string;
  type: 'buy-box' | 'inventory' | 'pricing' | 'account-health' | 'disputes';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  asin: string;
  timestamp: string;
  status: 'open' | 'resolved' | 'snoozed';
  aiSuggestion: string;
  impact: {
    revenue: 'high' | 'medium' | 'low';
    margin: 'high' | 'medium' | 'low';
  };
  estimatedLoss?: string;
  probability?: number;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'buy-box',
    priority: 'critical',
    title: 'Buy Box Lost for ASIN B07XYZ123',
    description: 'Competitor "ElectroDeals" undercut your price by $2.50. You lost the Buy Box 3 hours ago.',
    asin: 'B07XYZ123',
    timestamp: '3 hours ago',
    status: 'open',
    aiSuggestion: 'Lower price by 2% to regain Buy Box. Estimated regain probability: 82%',
    impact: { revenue: 'high', margin: 'low' },
    estimatedLoss: '$1,200/day',
    probability: 82
  },
  {
    id: '2',
    type: 'inventory',
    priority: 'high',
    title: 'Low Stock Alert - Running Out Soon',
    description: 'Only 15 units left in stock for your bestselling wireless charger. At current sales velocity, you\'ll run out in 4 days.',
    asin: 'B08ABC456',
    timestamp: '5 hours ago',
    status: 'open',
    aiSuggestion: 'Expedite shipment or temporarily increase price by 8% to slow demand',
    impact: { revenue: 'high', margin: 'medium' },
    estimatedLoss: '$800/day',
    probability: 95
  },
  {
    id: '3',
    type: 'pricing',
    priority: 'medium',
    title: 'Price Change Opportunity Detected',
    description: 'Market analysis shows you can increase price by 12% while maintaining competitive position.',
    asin: 'B09DEF789',
    timestamp: '1 day ago',
    status: 'open',
    aiSuggestion: 'Increase price to $24.99 for optimal margin without losing sales',
    impact: { revenue: 'medium', margin: 'high' },
    probability: 78
  },
  {
    id: '4',
    type: 'account-health',
    priority: 'high',
    title: 'Account Health Score Declining',
    description: 'Your ODR increased to 1.8%. You\'re approaching the 2% threshold that could lead to account suspension.',
    asin: 'N/A',
    timestamp: '6 hours ago',
    status: 'open',
    aiSuggestion: 'Contact recent customers with shipping delays to prevent negative feedback',
    impact: { revenue: 'high', margin: 'high' },
    estimatedLoss: '$5,000/week'
  },
  {
    id: '5',
    type: 'disputes',
    priority: 'medium',
    title: 'New A-to-Z Claim Filed',
    description: 'Customer filed A-to-Z claim for order #123-456789 citing "Item not received". Package shows delivered.',
    asin: 'B10GHI012',
    timestamp: '2 days ago',
    status: 'snoozed',
    aiSuggestion: 'Provide tracking info and delivery confirmation to Amazon within 72 hours',
    impact: { revenue: 'low', margin: 'low' }
  }
];

const alertTypeConfig = {
  'buy-box': { icon: Target, color: 'text-red-500', bgColor: 'bg-red-500/10', label: 'Buy Box' },
  'inventory': { icon: ShoppingCart, color: 'text-orange-500', bgColor: 'bg-orange-500/10', label: 'Inventory' },
  'pricing': { icon: DollarSign, color: 'text-blue-500', bgColor: 'bg-blue-500/10', label: 'Pricing' },
  'account-health': { icon: Shield, color: 'text-purple-500', bgColor: 'bg-purple-500/10', label: 'Account Health' },
  'disputes': { icon: FileText, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', label: 'Disputes' }
};

const priorityConfig = {
  critical: { color: 'text-red-600', bgColor: 'bg-red-100', darkBgColor: 'bg-red-500/20', label: 'Critical' },
  high: { color: 'text-orange-600', bgColor: 'bg-orange-100', darkBgColor: 'bg-orange-500/20', label: 'High' },
  medium: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', darkBgColor: 'bg-yellow-500/20', label: 'Medium' },
  low: { color: 'text-green-600', bgColor: 'bg-green-100', darkBgColor: 'bg-green-500/20', label: 'Low' }
};

export function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    type: string[];
    priority: string[];
  }>({
    status: [],
    type: [],
    priority: []
  });
  const [showAIPriorityOnly, setShowAIPriorityOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.asin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = activeFilters.status.length === 0 || activeFilters.status.includes(alert.status);
    const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(alert.type);
    const matchesPriority = activeFilters.priority.length === 0 || activeFilters.priority.includes(alert.priority);
    const matchesAIPriority = !showAIPriorityOnly || ['critical', 'high'].includes(alert.priority);

    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAIPriority;
  });

  const criticalAlerts = mockAlerts.filter(alert => alert.priority === 'critical' || alert.priority === 'high');

  const toggleFilter = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const toggleAlertSelection = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const selectAllAlerts = () => {
    setSelectedAlerts(filteredAlerts.map(alert => alert.id));
  };

  const clearSelection = () => {
    setSelectedAlerts([]);
  };

  const AlertCard = ({ alert }: { alert: Alert }) => {
    const typeConfig = alertTypeConfig[alert.type];
    const priorityConfig_ = priorityConfig[alert.priority];
    const IconComponent = typeConfig.icon;

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-gray-200 hover:border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Checkbox 
                checked={selectedAlerts.includes(alert.id)}
                onCheckedChange={() => toggleAlertSelection(alert.id)}
                className="mt-1"
              />
              
              <div className={`p-3 rounded-xl ${typeConfig.bgColor} ${typeConfig.color} flex-shrink-0`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{alert.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`${priorityConfig_.color} ${priorityConfig_.bgColor} border-current text-xs`}
                  >
                    {priorityConfig_.label}
                  </Badge>
                  {alert.estimatedLoss && (
                    <Badge variant="destructive" className="text-xs">
                      {alert.estimatedLoss}
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{alert.description}</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 font-medium">{alert.aiSuggestion}</p>
                      {alert.probability && (
                        <p className="text-xs text-blue-600 mt-1">Success probability: {alert.probability}%</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>ASIN: {alert.asin}</span>
                    <span>{alert.timestamp}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        Revenue Risk: {alert.impact.revenue}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Margin Impact: {alert.impact.margin}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Snooze
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Resolve
                    </Button>
                    <Button size="sm" className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Apply AI Fix
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts Center</h1>
              <p className="text-gray-600">Monitor and resolve important issues impacting your Amazon business</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Acknowledge All
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Sparkles className="w-4 h-4" />
                AI Prioritize Alerts
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={showAIPriorityOnly ? "default" : "outline"}
                onClick={() => setShowAIPriorityOnly(!showAIPriorityOnly)}
                className="gap-2"
              >
                <Bot className="w-4 h-4" />
                AI Priority Only
              </Button>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {/* Status Filters */}
              {['open', 'resolved', 'snoozed'].map(status => (
                <Button
                  key={status}
                  variant={activeFilters.status.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('status', status)}
                  className="text-xs capitalize"
                >
                  {status}
                </Button>
              ))}
              
              <Separator orientation="vertical" className="h-6" />
              
              {/* Type Filters */}
              {Object.entries(alertTypeConfig).map(([type, config]) => (
                <Button
                  key={type}
                  variant={activeFilters.type.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('type', type)}
                  className="text-xs gap-1"
                >
                  <config.icon className="w-3 h-3" />
                  {config.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedAlerts.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800 font-medium">
                  {selectedAlerts.length} alert{selectedAlerts.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="gap-1">
                        Bulk Actions
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Acknowledge All</DropdownMenuItem>
                      <DropdownMenuItem>Resolve All</DropdownMenuItem>
                      <DropdownMenuItem>Apply AI Suggestions</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All clear! No active alerts.</h3>
              <p className="text-gray-600 mb-6">Your Amazon business is running smoothly with no urgent issues to address.</p>
              <Button className="gap-2">
                <Zap className="w-4 h-4" />
                Run AI Scan
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
              
              {/* Add extra padding at bottom to ensure content isn't cut off */}
              <div className="h-16"></div>
            </div>
          )}
        </div>
      </div>

      {/* AI Priority Sidebar */}
      <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-12' : 'w-80'} flex flex-col`}>
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </Button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* AI Summary */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">What's Happening</h4>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">
                  3 Buy Box losses, 2 inventory low alerts in Electronics. Revenue impact: $3,200/day.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Alert Volume</span>
                    <span className="text-green-600">↓ 15% vs last week</span>
                  </div>
                  <div className="h-16 bg-gray-50 rounded flex items-end justify-center gap-1 p-2">
                    {[8, 12, 6, 15, 9, 5, 11].map((height, i) => (
                      <div
                        key={i}
                        className="bg-blue-500 rounded-sm w-3"
                        style={{ height: `${height * 2}px` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <h4 className="font-medium">Critical Alerts</h4>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {criticalAlerts.slice(0, 3).map(alert => {
                  const typeConfig = alertTypeConfig[alert.type];
                  const IconComponent = typeConfig.icon;
                  
                  return (
                    <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${typeConfig.bgColor} ${typeConfig.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{alert.title}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Fix
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <h4 className="font-medium">Quick Actions</h4>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Auto-fix pricing
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Reorder inventory
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Contact customers
                </Button>
              </CardContent>
            </Card>
            
            {/* Add extra padding at bottom */}
            <div className="h-8"></div>
          </div>
        )}
      </div>
    </div>
  );
}