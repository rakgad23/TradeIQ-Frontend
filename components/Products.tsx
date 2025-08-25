import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  Plus,
  Grid3X3,
  List,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  BarChart3,
  Bot,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Crown,
  CheckCircle,
  XCircle,
  Star,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Settings,
  Target,
  Users,
  Calendar
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    asin: "B08N5WRWNW",
    sku: "WBH-001-BLK",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    price: 89.99,
    priceChange: 5.2,
    unitsSold: 245,
    stock: 156,
    lowStock: false,
    buyBoxStatus: "in",
    buyBoxPercentage: 87,
    profitMargin: 23.5,
    repricerActive: true,
    category: "Electronics",
    status: "active"
  },
  {
    id: 2,
    name: "Organic Cotton Bath Towels Set",
    asin: "B07QXYZ123",
    sku: "TOW-002-WHT",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
    price: 45.99,
    priceChange: -2.1,
    unitsSold: 189,
    stock: 23,
    lowStock: true,
    buyBoxStatus: "out",
    buyBoxPercentage: 0,
    profitMargin: 18.7,
    repricerActive: false,
    category: "Home & Garden",
    status: "active"
  },
  {
    id: 3,
    name: "Professional Chef Knife Set",
    asin: "B09ABC456D",
    sku: "KNF-003-SET",
    image: "https://images.unsplash.com/photo-1593618998160-e34014cb6952?w=100&h=100&fit=crop",
    price: 129.99,
    priceChange: 12.8,
    unitsSold: 98,
    stock: 87,
    lowStock: false,
    buyBoxStatus: "in",
    buyBoxPercentage: 94,
    profitMargin: 31.2,
    repricerActive: true,
    category: "Kitchen",
    status: "active"
  },
  {
    id: 4,
    name: "Smart Fitness Tracker Watch",
    asin: "B08FITTRACK",
    sku: "FIT-004-BLU",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&h=100&fit=crop",
    price: 79.99,
    priceChange: -8.5,
    unitsSold: 67,
    stock: 8,
    lowStock: true,
    buyBoxStatus: "out",
    buyBoxPercentage: 12,
    profitMargin: 15.3,
    repricerActive: true,
    category: "Electronics",
    status: "inactive"
  },
  {
    id: 5,
    name: "Eco-Friendly Yoga Mat",
    asin: "B07YOGA123",
    sku: "YOG-005-GRN",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
    price: 34.99,
    priceChange: 3.7,
    unitsSold: 156,
    stock: 234,
    lowStock: false,
    buyBoxStatus: "in",
    buyBoxPercentage: 76,
    profitMargin: 28.9,
    repricerActive: false,
    category: "Sports",
    status: "active"
  },
  {
    id: 6,
    name: "LED Desk Lamp with USB Charging",
    asin: "B08LEDLAMP",
    sku: "LED-006-WHT",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop",
    price: 49.99,
    priceChange: 7.3,
    unitsSold: 134,
    stock: 45,
    lowStock: false,
    buyBoxStatus: "in",
    buyBoxPercentage: 91,
    profitMargin: 22.1,
    repricerActive: true,
    category: "Home & Garden",
    status: "active"
  }
];

type ViewMode = 'table' | 'grid';
type FilterStatus = 'all' | 'active' | 'inactive' | 'low-stock' | 'out-of-buybox';

export function Products() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter products based on search and status
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.asin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filterStatus) {
      case 'active':
        return matchesSearch && product.status === 'active';
      case 'inactive':
        return matchesSearch && product.status === 'inactive';
      case 'low-stock':
        return matchesSearch && product.lowStock;
      case 'out-of-buybox':
        return matchesSearch && product.buyBoxStatus === 'out';
      default:
        return matchesSearch;
    }
  });

  // Calculate metrics
  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.status === 'active').length;
  const lowStockProducts = mockProducts.filter(p => p.lowStock).length;
  const avgBuyBoxWin = Math.round(mockProducts.reduce((acc, p) => acc + p.buyBoxPercentage, 0) / mockProducts.length);
  const totalRevenue = mockProducts.reduce((acc, p) => acc + (p.price * p.unitsSold), 0);
  const totalUnitsSold = mockProducts.reduce((acc, p) => acc + p.unitsSold, 0);
  const avgProfitMargin = Math.round(mockProducts.reduce((acc, p) => acc + p.profitMargin, 0) / mockProducts.length * 10) / 10;

  const metrics = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      change: "+12",
      trend: "up" as const,
      icon: Package,
      color: "blue"
    },
    {
      title: "Buy Box Win %",
      value: `${avgBuyBoxWin}%`,
      change: "+5.2%",
      trend: "up" as const,
      icon: Crown,
      color: "green"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+18.3%",
      trend: "up" as const,
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Units Sold",
      value: totalUnitsSold.toLocaleString(),
      change: "+7.1%",
      trend: "up" as const,
      icon: ShoppingCart,
      color: "green"
    },
    {
      title: "Low Stock Alerts",
      value: lowStockProducts.toString(),
      change: "-3",
      trend: "down" as const,
      icon: AlertTriangle,
      color: "orange"
    },
    {
      title: "Avg Profit Margin",
      value: `${avgProfitMargin}%`,
      change: "+2.1%",
      trend: "up" as const,
      icon: BarChart3,
      color: "green"
    }
  ];

  const quickFilters = [
    { key: 'all' as FilterStatus, label: 'All Products', count: totalProducts },
    { key: 'active' as FilterStatus, label: 'Active', count: activeProducts },
    { key: 'inactive' as FilterStatus, label: 'Inactive', count: totalProducts - activeProducts },
    { key: 'low-stock' as FilterStatus, label: 'Low Stock', count: lowStockProducts },
    { key: 'out-of-buybox' as FilterStatus, label: 'Out of Buy Box', count: mockProducts.filter(p => p.buyBoxStatus === 'out').length }
  ];

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setShowAIInsights(true);
  };

  const renderMetricCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'orange' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  <metric.icon className={`w-5 h-5 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'orange' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.trend === 'up' ? 
                    <ArrowUpRight className="w-3 h-3" /> : 
                    <ArrowDownRight className="w-3 h-3" />
                  }
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600 font-medium">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Buy Box</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Units Sold</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Profit Margin</TableHead>
            <TableHead>Repricer</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow 
              key={product.id} 
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleProductSelect(product)}
            >
              <TableCell>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-semibold text-gray-900 truncate max-w-xs">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.asin} • {product.sku}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {product.buyBoxStatus === 'in' ? 
                    <CheckCircle className="w-4 h-4 text-green-600" /> :
                    <XCircle className="w-4 h-4 text-red-600" />
                  }
                  <span className={`text-sm font-medium ${
                    product.buyBoxStatus === 'in' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {product.buyBoxPercentage}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">${product.price}</span>
                  <div className={`flex items-center gap-1 text-xs ${
                    product.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.priceChange > 0 ? 
                      <TrendingUp className="w-3 h-3" /> : 
                      <TrendingDown className="w-3 h-3" />
                    }
                    {Math.abs(product.priceChange)}%
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-gray-900">{product.unitsSold}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    product.lowStock ? 'text-orange-600' : 'text-gray-900'
                  }`}>
                    {product.stock}
                  </span>
                  {product.lowStock && (
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                      Low
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-green-600">{product.profitMargin}%</span>
              </TableCell>
              <TableCell>
                <Switch checked={product.repricerActive} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -4 }}
          className="group cursor-pointer"
          onClick={() => handleProductSelect(product)}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 rounded-lg object-cover border border-gray-200"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${
                    product.buyBoxStatus === 'in' ? 'bg-green-100 text-green-700 border-green-200' :
                    'bg-red-100 text-red-700 border-red-200'
                  }`}>
                    {product.buyBoxStatus === 'in' ? 'Buy Box' : 'No Buy Box'}
                  </Badge>
                </div>
                {product.lowStock && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      Low Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.asin} • {product.sku}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <div className={`flex items-center gap-1 text-xs ${
                      product.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.priceChange > 0 ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      {Math.abs(product.priceChange)}%
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{product.profitMargin}% profit</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Units Sold</p>
                    <p className="font-semibold text-gray-900">{product.unitsSold}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Stock Level</p>
                    <p className={`font-semibold ${product.lowStock ? 'text-orange-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Repricer:</span>
                      <Switch checked={product.repricerActive} />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderAIInsights = () => (
    <AnimatePresence>
      {showAIInsights && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowAIInsights(false)}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 border-l border-gray-200"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-bold text-gray-900">AI Insights</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAIInsights(false)}
                    className="h-8 w-8 p-0"
                  >
                    ×
                  </Button>
                </div>
                {selectedProduct && (
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm truncate">{selectedProduct.name}</p>
                      <p className="text-xs text-gray-600">{selectedProduct.asin}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-auto p-6 space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Pricing Recommendation</h3>
                    </div>
                    <p className="text-sm text-green-800 mb-3">
                      Consider increasing price to <strong>${(selectedProduct?.price * 1.08).toFixed(2)}</strong> based on competitor analysis.
                    </p>
                    <div className="text-xs text-green-700">
                      Potential additional profit: +$2.40 per unit
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold text-orange-900">Stock Alert</h3>
                    </div>
                    <p className="text-sm text-orange-800 mb-3">
                      Current stock will last approximately <strong>12 days</strong> at current sales velocity.
                    </p>
                    <div className="text-xs text-orange-700">
                      Recommended reorder: 200 units
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Competitor Movement</h3>
                    </div>
                    <p className="text-sm text-blue-800 mb-3">
                      3 competitors have lowered prices in the last 24 hours.
                    </p>
                    <div className="text-xs text-blue-700">
                      Average competitor price: ${(selectedProduct?.price * 0.95).toFixed(2)}
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Sales Prediction</h3>
                    </div>
                    <p className="text-sm text-purple-800 mb-3">
                      Expected to sell <strong>78 units</strong> in the next 7 days.
                    </p>
                    <div className="text-xs text-purple-700">
                      15% above historical average
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Apply Recommendations
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 mt-1 font-medium">Manage your Amazon product listings with AI insights</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-3 rounded-xl px-8 shadow-lg">
              <Plus className="w-5 h-5" />
              Add Product
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by ASIN, SKU, or product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-gray-200 bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 rounded-xl border-gray-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                  <SelectItem value="units">Sort by Units Sold</SelectItem>
                  <SelectItem value="profit">Sort by Profit Margin</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-10"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-10"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            {quickFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={filterStatus === filter.key ? 'default' : 'outline'}
                onClick={() => setFilterStatus(filter.key)}
                className="rounded-xl"
              >
                {filter.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Metrics */}
          {renderMetricCards()}
          
          {/* Products View */}
          {viewMode === 'table' ? renderTableView() : renderGridView()}
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* AI Insights Sidebar */}
      {renderAIInsights()}
    </div>
  );
}