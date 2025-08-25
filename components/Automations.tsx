import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  Plus,
  Sparkles,
  Zap,
  Grid3X3,
  List,
  Filter,
  Clock,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Package,
  AlertTriangle,
  Target,
  Bot,
  ChevronRight,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Save,
  X,
  Crown,
  ShoppingCart,
  BarChart3,
  Bell,
  FileText,
  Settings as SettingsIcon
} from "lucide-react";

// Mock data for automations
const mockAutomations = [
  {
    id: 1,
    name: "Competitive Repricing - Electronics",
    description: "Reprices electronics SKUs every 2 hours based on competitor data",
    type: "pricing",
    status: "active",
    runsPerWeek: 84,
    lastTriggered: "2 hours ago",
    tags: ["Electronics", "Competitive"],
    createdBy: "AI",
    potentialRevenue: "+$2,340",
    productsAffected: 45
  },
  {
    id: 2,
    name: "Buy Box Alert - High Volume Products",
    description: "Monitors Buy Box status for products with >100 sales/month",
    type: "alerts",
    status: "active",
    runsPerWeek: 168,
    lastTriggered: "15 mins ago",
    tags: ["Buy Box", "High Volume"],
    createdBy: "User",
    potentialRevenue: "+$890",
    productsAffected: 23
  },
  {
    id: 3,
    name: "Inventory Low Stock Notification",
    description: "Sends alerts when inventory drops below 10 units",
    type: "inventory",
    status: "paused",
    runsPerWeek: 28,
    lastTriggered: "1 day ago",
    tags: ["Inventory", "Stock Alert"],
    createdBy: "User",
    potentialRevenue: "N/A",
    productsAffected: 78
  },
  {
    id: 4,
    name: "Dispute Auto-Response",
    description: "Automatically responds to common dispute types with templates",
    type: "disputes",
    status: "active",
    runsPerWeek: 12,
    lastTriggered: "3 hours ago",
    tags: ["Disputes", "Auto-Response"],
    createdBy: "AI",
    potentialRevenue: "+$1,200",
    productsAffected: 15
  },
  {
    id: 5,
    name: "Weekly Performance Report",
    description: "Generates comprehensive performance reports every Monday",
    type: "reports",
    status: "active",
    runsPerWeek: 1,
    lastTriggered: "2 days ago",
    tags: ["Reports", "Weekly"],
    createdBy: "User",
    potentialRevenue: "N/A",
    productsAffected: 120
  }
];

const automationTypes = {
  pricing: { label: "Pricing Rules", color: "bg-green-100 text-green-700 border-green-200", icon: DollarSign },
  alerts: { label: "Buy Box Alerts", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Bell },
  inventory: { label: "Inventory Monitoring", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Package },
  disputes: { label: "Dispute Handling", color: "bg-red-100 text-red-700 border-red-200", icon: AlertTriangle },
  reports: { label: "Report Generation", color: "bg-purple-100 text-purple-700 border-purple-200", icon: FileText }
};

const activityLog = [
  {
    id: 1,
    date: "2024-01-15 14:30",
    automation: "Competitive Repricing - Electronics",
    trigger: "Schedule",
    result: "Success",
    notes: "Updated 12 product prices"
  },
  {
    id: 2,
    date: "2024-01-15 14:15",
    automation: "Buy Box Alert - High Volume Products",
    trigger: "Buy Box Lost",
    result: "Alert Sent",
    notes: "Notification sent for ASIN B08N5WRWNW"
  },
  {
    id: 3,
    date: "2024-01-15 13:45",
    automation: "Dispute Auto-Response",
    trigger: "New Dispute",
    result: "Success",
    notes: "Auto-responded to shipping complaint"
  },
  {
    id: 4,
    date: "2024-01-15 12:00",
    automation: "Inventory Low Stock Notification",
    trigger: "Low Stock",
    result: "Failed",
    notes: "Email delivery failed - retrying"
  }
];

const aiSuggestions = [
  {
    id: 1,
    title: "Competitor Price Drop Response",
    description: "We noticed competitor prices dropped for 20 of your SKUs - suggest creating a repricing automation",
    potentialIncrease: "+$1,500/month",
    confidence: "High",
    type: "pricing"
  },
  {
    id: 2,
    title: "Holiday Inventory Prep",
    description: "Based on last year's data, increase inventory alerts for seasonal products",
    potentialIncrease: "Avoid stockouts",
    confidence: "Medium",
    type: "inventory"
  },
  {
    id: 3,
    title: "Review Response Automation",
    description: "Auto-respond to positive reviews to improve seller metrics",
    potentialIncrease: "+15% response rate",
    confidence: "High",
    type: "alerts"
  }
];

export function Automations() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedAutomation, setSelectedAutomation] = useState<any>(null);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showAISidebar, setShowAISidebar] = useState(true);
  const [automations, setAutomations] = useState(mockAutomations);

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || automation.status === filterStatus;
    const matchesType = filterType === 'all' || automation.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEdit = (automation: any) => {
    setSelectedAutomation(automation);
    setShowEditDrawer(true);
  };

  const handleToggleStatus = (automationId: number) => {
    setAutomations(prevAutomations => 
      prevAutomations.map(automation => 
        automation.id === automationId 
          ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
          : automation
      )
    );
  };

  const renderAutomationCard = (automation: any) => {
    const typeInfo = automationTypes[automation.type as keyof typeof automationTypes];
    const TypeIcon = typeInfo.icon;

    return (
      <motion.div
        key={automation.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        className="group hover:shadow-2xl"
      >
        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <Badge className={`${typeInfo.color} px-3 py-1 font-medium`}>
                <TypeIcon className="w-3 h-3 mr-1" />
                {typeInfo.label}
              </Badge>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={automation.status === 'active'}
                  onCheckedChange={() => handleToggleStatus(automation.id)}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={() => handleEdit(automation)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
              {automation.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">{automation.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Runs/Week</p>
                  <p className="font-semibold text-gray-900">{automation.runsPerWeek}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Last Run</p>
                  <p className="font-semibold text-gray-900">{automation.lastTriggered}</p>
                </div>
              </div>
            </div>

            {automation.potentialRevenue !== "N/A" && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Potential Revenue: {automation.potentialRevenue}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {automation.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {automation.createdBy === 'AI' ? (
                  <Bot className="w-4 h-4 text-purple-500" />
                ) : (
                  <SettingsIcon className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-xs text-gray-500">
                  Created by {automation.createdBy}
                </span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-gray-500 hover:text-gray-700"
            >
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderTableView = () => (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="font-semibold text-gray-900">Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Type</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Runs/Week</TableHead>
            <TableHead className="font-semibold text-gray-900">Last Triggered</TableHead>
            <TableHead className="font-semibold text-gray-900">Revenue Impact</TableHead>
            <TableHead className="font-semibold text-gray-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAutomations.map((automation) => {
            const typeInfo = automationTypes[automation.type as keyof typeof automationTypes];
            const TypeIcon = typeInfo.icon;
            
            return (
              <TableRow key={automation.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-semibold text-gray-900">{automation.name}</p>
                    <p className="text-sm text-gray-600 truncate max-w-xs">{automation.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${typeInfo.color} px-3 py-1`}>
                    <TypeIcon className="w-3 h-3 mr-1" />
                    {typeInfo.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={automation.status === 'active'}
                      onCheckedChange={() => handleToggleStatus(automation.id)}
                    />
                    <span className={`text-sm font-medium ${
                      automation.status === 'active' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {automation.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-gray-900">{automation.runsPerWeek}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{automation.lastTriggered}</span>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold ${
                    automation.potentialRevenue !== "N/A" ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {automation.potentialRevenue}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(automation)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/30 border-b border-gray-200/50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Automations</h1>
                <p className="text-gray-600 mt-1 font-medium">Streamline your Amazon business with intelligent automation</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: 1 minute ago
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className={`col-span-12 ${showAISidebar ? 'lg:col-span-9' : 'lg:col-span-12'} transition-all duration-300`}>
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search automations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-gray-200 bg-white shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48 h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pricing">Pricing Rules</SelectItem>
                      <SelectItem value="alerts">Buy Box Alerts</SelectItem>
                      <SelectItem value="inventory">Inventory Monitoring</SelectItem>
                      <SelectItem value="disputes">Dispute Handling</SelectItem>
                      <SelectItem value="reports">Report Generation</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className="h-10"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="h-10"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Automations Display */}
              <div className="mb-8">
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAutomations.map(renderAutomationCard)}
                  </div>
                ) : (
                  renderTableView()
                )}
              </div>

              {/* Activity Log */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Automation Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recent" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="recent">Recent Runs</TabsTrigger>
                      <TabsTrigger value="errors">Failures & Errors</TabsTrigger>
                      <TabsTrigger value="changes">Changes Made</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent" className="mt-6">
                      <div className="space-y-4">
                        {activityLog.map((log) => (
                          <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="font-semibold text-gray-900">{log.automation}</p>
                                <p className="text-sm text-gray-600">{log.notes}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{log.result}</p>
                              <p className="text-xs text-gray-500">{log.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="errors" className="mt-6">
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-600">No errors in the last 24 hours</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="changes" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Edit className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-semibold text-gray-900">Modified Pricing Rules</p>
                              <p className="text-sm text-gray-600">Updated trigger frequency from 1 hour to 2 hours</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations Sidebar */}
            <AnimatePresence>
              {showAISidebar && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  className="col-span-12 lg:col-span-3"
                >
                  <div className="sticky top-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAISidebar(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {aiSuggestions.map((suggestion) => (
                        <Card key={suggestion.id} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <Badge className={`${automationTypes[suggestion.type as keyof typeof automationTypes].color} px-2 py-1 text-xs`}>
                                {suggestion.confidence} Confidence
                              </Badge>
                              <Target className="w-4 h-4 text-green-500" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
                            <div className="space-y-3">
                              <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-green-800">{suggestion.potentialIncrease}</p>
                              </div>
                              <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                One-click Create
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                            <h4 className="font-semibold text-gray-900 mb-2">Need More Ideas?</h4>
                            <p className="text-sm text-gray-600 mb-4">Let our AI analyze your data and suggest custom automations</p>
                            <Button size="sm" variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                              Analyze My Data
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* Edit Automation Drawer */}
      <Sheet open={showEditDrawer} onOpenChange={setShowEditDrawer}>
        <SheetContent className="w-[600px] sm:w-[600px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <Edit className="w-5 h-5" />
              Edit Automation
            </SheetTitle>
            <SheetDescription>
              Modify your automation settings and let AI suggest optimizations
            </SheetDescription>
          </SheetHeader>
          
          {selectedAutomation && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Automation Name</label>
                <Input 
                  defaultValue={selectedAutomation.name}
                  className="rounded-xl border-gray-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                <Select defaultValue={selectedAutomation.type}>
                  <SelectTrigger className="rounded-xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pricing">Pricing Rules</SelectItem>
                    <SelectItem value="alerts">Buy Box Alerts</SelectItem>
                    <SelectItem value="inventory">Inventory Monitoring</SelectItem>
                    <SelectItem value="disputes">Dispute Handling</SelectItem>
                    <SelectItem value="reports">Report Generation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                <Input 
                  defaultValue={selectedAutomation.description}
                  className="rounded-xl border-gray-200"
                />
              </div>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-900">AI Optimization</h4>
                  </div>
                  <p className="text-sm text-purple-800 mb-4">
                    Based on your data, we suggest reducing the trigger frequency to every 3 hours for better efficiency.
                  </p>
                  <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                    Apply AI Suggestions
                  </Button>
                </CardContent>
              </Card>

              <div className="flex gap-3 pt-6 border-t">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setShowEditDrawer(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}