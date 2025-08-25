import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Target,
  RefreshCcw,
  Download,
  Sparkles,
  Calendar,
  ChevronRight,
  Bot,
  AlertTriangle,
  Trophy,
  Lightbulb,
  Filter,
  BarChart3,
  Activity,
  Users,
  ShoppingCart,
  Zap,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";

// Mock data
const salesData = [
  { date: "Jan 1", revenue: 12500, units: 125, profit: 3750 },
  { date: "Jan 2", revenue: 15200, units: 152, profit: 4560 },
  { date: "Jan 3", revenue: 18900, units: 189, profit: 5670 },
  { date: "Jan 4", revenue: 14200, units: 142, profit: 4260 },
  { date: "Jan 5", revenue: 21500, units: 215, profit: 6450 },
  { date: "Jan 6", revenue: 19800, units: 198, profit: 5940 },
  { date: "Jan 7", revenue: 23400, units: 234, profit: 7020 },
  { date: "Jan 8", revenue: 17600, units: 176, profit: 5280 },
  { date: "Jan 9", revenue: 25100, units: 251, profit: 7530 },
  { date: "Jan 10", revenue: 22300, units: 223, profit: 6690 },
  { date: "Jan 11", revenue: 28700, units: 287, profit: 8610 },
  { date: "Jan 12", revenue: 31200, units: 312, profit: 9360 },
  { date: "Jan 13", revenue: 26800, units: 268, profit: 8040 },
  { date: "Jan 14", revenue: 29500, units: 295, profit: 8850 }
];

const categoryData = [
  { category: "Electronics", revenue: 125400, units: 1254, buyBox: 87, margin: 28.5 },
  { category: "Home & Garden", revenue: 89200, units: 892, buyBox: 92, margin: 32.1 },
  { category: "Clothing", revenue: 67800, units: 678, buyBox: 78, margin: 45.2 },
  { category: "Sports", revenue: 54300, units: 543, buyBox: 85, margin: 29.8 },
  { category: "Books", revenue: 32100, units: 321, buyBox: 94, margin: 22.3 }
];

const topProducts = [
  {
    asin: "B07XYZ123",
    title: "Wireless Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop",
    revenue: 45600,
    units: 456,
    margin: 35.2,
    recommendation: "Increase price by 5%"
  },
  {
    asin: "B08ABC456",
    title: "Smart Phone Stand Adjustable",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=60&h=60&fit=crop",
    revenue: 32400,
    units: 324,
    margin: 28.7,
    recommendation: "Low inventory alert"
  },
  {
    asin: "B09DEF789",
    title: "USB-C Charging Cable 6ft",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=60&h=60&fit=crop",
    revenue: 28900,
    units: 289,
    margin: 42.1,
    recommendation: "Optimize keywords"
  },
  {
    asin: "B10GHI012",
    title: "Portable Power Bank 20000mAh",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=60&h=60&fit=crop",
    revenue: 24700,
    units: 247,
    margin: 31.8,
    recommendation: "Monitor competitor pricing"
  }
];

const aiInsights = [
  {
    type: "prediction",
    priority: "high",
    title: "You are on track to exceed last month's revenue by 12%",
    description: "Based on current sales velocity and seasonal trends",
    action: "View Forecast",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    type: "inventory",
    priority: "medium",
    title: "Low inventory risk for ASIN B08XYZ in 5 days",
    description: "Current stock level: 23 units, sales velocity: 4.6 units/day",
    action: "Reorder Now",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    type: "pricing",
    priority: "high",
    title: "Price optimization opportunity detected",
    description: "Consider increasing price for ASIN B07ABC by 3% to improve margin",
    action: "Apply Suggestion",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    type: "buybox",
    priority: "critical",
    title: "Buy Box loss alert",
    description: "Lost Buy Box for top-selling ASIN due to competitor price change",
    action: "Adjust Price",
    icon: Target,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const metricsData = [
  {
    title: "Net Revenue",
    value: "$347,250",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgGradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Units Sold",
    value: "3,472",
    change: "+8.3%",
    trend: "up",
    icon: Package,
    color: "text-blue-600",
    bgGradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Buy Box %",
    value: "87.4%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    color: "text-orange-600",
    bgGradient: "from-orange-500 to-yellow-500"
  },
  {
    title: "Refund Rate",
    value: "2.3%",
    change: "-0.5%",
    trend: "up",
    icon: RefreshCcw,
    color: "text-red-600",
    bgGradient: "from-red-500 to-pink-500"
  },
  {
    title: "Ad Spend ACOS",
    value: "22.8%",
    change: "-3.2%",
    trend: "up",
    icon: Activity,
    color: "text-purple-600",
    bgGradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Profit Margin",
    value: "31.2%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgGradient: "from-emerald-500 to-teal-500"
  }
];

const buyBoxData = [
  { date: "Week 1", buyBox: 89, competitor1: 78, competitor2: 65 },
  { date: "Week 2", buyBox: 92, competitor1: 82, competitor2: 70 },
  { date: "Week 3", buyBox: 87, competitor1: 85, competitor2: 68 },
  { date: "Week 4", buyBox: 94, competitor1: 80, competitor2: 72 },
];

export function Analytics() {
  const [dateRange, setDateRange] = useState("30D");
  const [marketplace, setMarketplace] = useState("US");
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const MetricCard = ({ metric }: { metric: typeof metricsData[0] }) => {
    const IconComponent = metric.icon;
    const isPositive = metric.trend === "up" && !metric.change.includes("-");
    const isNegative = metric.trend === "down" || metric.change.includes("-");

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.bgGradient} text-white shadow-lg`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-600"
            }`}>
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : isNegative ? (
                <ArrowDownRight className="w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
              {metric.change}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 font-medium">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
          
          {/* Mini Sparkline */}
          <div className="mt-4 h-8 opacity-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData.slice(-7)}>
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={metric.color} 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderChart = () => {
    const commonProps = {
      data: salesData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                border: "none", 
                borderRadius: "12px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
              }} 
            />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </BarChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                border: "none", 
                borderRadius: "12px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fill="url(#areaGradient)"
              strokeWidth={3}
            />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                border: "none", 
                borderRadius: "12px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#1d4ed8" }}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
              <p className="text-gray-600">Track sales, trends, and performance insights across your Amazon portfolio</p>
            </div>
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7D">7 Days</SelectItem>
                  <SelectItem value="30D">30 Days</SelectItem>
                  <SelectItem value="90D">90 Days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={marketplace} onValueChange={setMarketplace}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">🇺🇸 US</SelectItem>
                  <SelectItem value="UK">🇬🇧 UK</SelectItem>
                  <SelectItem value="DE">🇩🇪 DE</SelectItem>
                  <SelectItem value="FR">🇫🇷 FR</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Sparkles className="w-4 h-4" />
                AI Deep Dive
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

          {/* Sales Trends Chart */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Sales Performance Trends</CardTitle>
                  <p className="text-gray-600 mt-1">Revenue and profit over time</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={chartType === "line" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("line")}
                  >
                    Line
                  </Button>
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("bar")}
                  >
                    Bar
                  </Button>
                  <Button
                    variant={chartType === "area" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("area")}
                  >
                    Area
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
              
              {/* AI Insight Overlay */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">AI Insight: Prime Day impact detected</p>
                    <p className="text-sm text-blue-700">Sales surge on Jan 12-13 correlates with promotional activity. Consider similar pricing strategy for upcoming events.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Categories */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Top Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Buy Box %</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryData.map((category, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell className="text-right">${category.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={category.buyBox > 85 ? "default" : "secondary"}>
                            {category.buyBox}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{category.margin}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.title}</p>
                        <p className="text-sm text-gray-500">ASIN: {product.asin}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-sm font-medium">${product.revenue.toLocaleString()}</span>
                          <span className="text-sm text-gray-600">{product.units} units</span>
                          <span className="text-sm text-gray-600">{product.margin}% margin</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {product.recommendation}
                        </Badge>
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Performance Tabs */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detailed Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="sales">Sales Performance</TabsTrigger>
                  <TabsTrigger value="buybox">Buy Box Analysis</TabsTrigger>
                  <TabsTrigger value="ads">Advertising Performance</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory Health</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sales" className="mt-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="buybox" className="mt-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={buyBoxData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="buyBox" stroke="#3b82f6" strokeWidth={3} />
                        <Line type="monotone" dataKey="competitor1" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="competitor2" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="ads" className="mt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">ACOS Trend</p>
                        <p className="text-2xl font-bold text-blue-600">22.8%</p>
                        <p className="text-sm text-blue-600">↓ 3.2% from last period</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="font-medium text-green-900">ROAS</p>
                        <p className="text-2xl font-bold text-green-600">4.38x</p>
                        <p className="text-sm text-green-600">↑ 0.4x from last period</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900 mb-3">Campaign Performance</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Sponsored Products</span>
                          <span className="text-sm font-medium">68% of spend</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Sponsored Brands</span>
                          <span className="text-sm font-medium">22% of spend</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Sponsored Display</span>
                          <span className="text-sm font-medium">10% of spend</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="mt-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="font-medium text-orange-900">Low Stock Items</p>
                      <p className="text-2xl font-bold text-orange-600">7</p>
                      <p className="text-sm text-orange-600">Require immediate attention</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">Avg Days of Supply</p>
                      <p className="text-2xl font-bold text-green-600">45</p>
                      <p className="text-sm text-green-600">Healthy inventory levels</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">Inbound Shipments</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-sm text-blue-600">En route to fulfillment</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-12' : 'w-80'} flex flex-col`}>
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                AI Seller Assistant
              </h3>
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              const isPriority = insight.priority === "critical" || insight.priority === "high";
              
              return (
                <Card key={index} className={`border-l-4 ${
                  insight.priority === "critical" ? "border-l-red-500" : 
                  insight.priority === "high" ? "border-l-orange-500" :
                  insight.priority === "medium" ? "border-l-yellow-500" : "border-l-blue-500"
                } hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                        <IconComponent className={`w-4 h-4 ${insight.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm mb-1">{insight.title}</p>
                        <p className="text-xs text-gray-600 mb-3">{insight.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            {insight.action}
                          </Button>
                          {isPriority && (
                            <Badge variant="destructive" className="text-xs">
                              {insight.priority}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* AI Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Today's AI Summary</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>• Revenue trending 12% above target</p>
                  <p>• 3 pricing opportunities identified</p>
                  <p>• Buy Box performance stable at 87%</p>
                  <p>• Inventory health score: Excellent</p>
                </div>
                <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Get Full AI Report
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