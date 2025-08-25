import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  Filter,
  Save,
  Upload,
  TrendingUp,
  TrendingDown,
  Star,
  Crown,
  DollarSign,
  Package,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  BarChart3,
  Calendar,
  Globe,
  Bot,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  AlertTriangle
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro",
    brand: "TechSound",
    price: 79.99,
    buyBoxPercentage: 85,
    salesRank: 1247,
    salesRankTrend: "up",
    rating: 4.6,
    revenue: 45780,
    revenueTrend: "up",
    sales: 572,
    profitMargin: 28.5,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80&h=80&fit=crop",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Organic Cotton Baby Blanket",
    brand: "SoftCare",
    price: 34.99,
    buyBoxPercentage: 92,
    salesRank: 892,
    salesRankTrend: "down",
    rating: 4.8,
    revenue: 28340,
    revenueTrend: "up",
    sales: 810,
    profitMargin: 35.2,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=80&h=80&fit=crop",
    category: "Baby & Kids"
  },
  {
    id: 3,
    name: "Smart Fitness Tracker Watch",
    brand: "FitTech",
    price: 129.99,
    buyBoxPercentage: 78,
    salesRank: 2156,
    salesRankTrend: "up",
    rating: 4.4,
    revenue: 67540,
    revenueTrend: "up",
    sales: 519,
    profitMargin: 22.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Premium Kitchen Knife Set",
    brand: "ChefMaster",
    price: 89.99,
    buyBoxPercentage: 88,
    salesRank: 1567,
    salesRankTrend: "down",
    rating: 4.7,
    revenue: 52180,
    revenueTrend: "up",
    sales: 580,
    profitMargin: 31.5,
    image: "https://images.unsplash.com/photo-1593618998160-e34014cb6952?w=80&h=80&fit=crop",
    category: "Kitchen"
  },
  {
    id: 5,
    name: "Eco-Friendly Yoga Mat",
    brand: "ZenFlow",
    price: 49.99,
    buyBoxPercentage: 94,
    salesRank: 743,
    salesRankTrend: "up",
    rating: 4.5,
    revenue: 38760,
    revenueTrend: "up",
    sales: 775,
    profitMargin: 40.2,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop",
    category: "Sports"
  }
];

const categories = [
  "Electronics", "Baby & Kids", "Kitchen", "Sports", "Home & Garden", 
  "Beauty", "Automotive", "Books", "Clothing", "Health"
];

const aiRecommendations = [
  {
    type: "High-Potential Products",
    items: [
      {
        name: "Wireless Phone Charger",
        metric: "Low competition",
        insight: "Trending up 15% this month",
        image: "https://images.unsplash.com/photo-1586953408885-5b2b6c16d167?w=60&h=60&fit=crop"
      },
      {
        name: "LED Strip Lights",
        metric: "High demand",
        insight: "300% growth in searches",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=60&h=60&fit=crop"
      }
    ]
  },
  {
    type: "Quick-Flip Opportunities",
    items: [
      {
        name: "Portable Phone Stand",
        metric: "Fast-moving",
        insight: "Avg. 50 sales/day",
        image: "https://images.unsplash.com/photo-1512385448847-34f3c63aac87?w=60&h=60&fit=crop"
      }
    ]
  },
  {
    type: "Underserved Niches",
    items: [
      {
        name: "Pet Travel Carriers",
        metric: "Growing demand",
        insight: "Only 3 major competitors",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=60&h=60&fit=crop"
      }
    ]
  }
];

export function MarketAnalyzer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [showAISidebar, setShowAISidebar] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [salesRankRange, setSalesRankRange] = useState({ min: "", max: "" });
  const [minSales, setMinSales] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [includeKeywords, setIncludeKeywords] = useState("");
  const [excludeKeywords, setExcludeKeywords] = useState("");
  const [excludeTopBrands, setExcludeTopBrands] = useState(false);
  const [includeUnavailable, setIncludeUnavailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const insights = [
    {
      title: "Predicted Sales Next Month",
      value: "+23%",
      description: "Based on seasonal trends and market analysis",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Seasonal Demand Spike Forecast",
      value: "Holiday Season",
      description: "Electronics category expected to surge 40%",
      icon: Calendar,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Suggested Bundle Opportunities",
      value: "12 Bundles",
      description: "High-margin product combinations identified",
      icon: Package,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/30 border-b border-gray-200/50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Market Analyzer</h1>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 mt-1 font-medium">AI-powered insights to help you discover profitable products faster</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: 2 minutes ago
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* AI Search Assistant Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <Input
                placeholder="Tell me what kind of products you're looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[60px] pl-16 pr-20 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-lg placeholder:text-gray-400 focus:border-purple-300 focus:ring-purple-100"
              />
              <Button 
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              <span className="font-medium">Example:</span> Show me electronics under $50 with at least 4.5 stars and less than 10 competitors
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Filters */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-8 w-8 p-0"
                  >
                    {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      {/* Category & Marketplace */}
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base">Category & Marketplace</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Marketplace</label>
                            <Select defaultValue="us">
                              <SelectTrigger className="rounded-xl border-gray-200">
                                <Globe className="w-4 h-4 mr-2" />
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="de">Germany</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-3 block">Categories</label>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={category}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                                  />
                                  <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                                    {category}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Price & Sales Rank */}
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base">Price & Sales Rank</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Min Price</label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  placeholder="0"
                                  value={priceRange.min}
                                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                  className="pl-10 rounded-xl border-gray-200"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Max Price</label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  placeholder="1000"
                                  value={priceRange.max}
                                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                  className="pl-10 rounded-xl border-gray-200"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Min Sales Rank</label>
                              <div className="relative">
                                <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  placeholder="1"
                                  value={salesRankRange.min}
                                  onChange={(e) => setSalesRankRange({ ...salesRankRange, min: e.target.value })}
                                  className="pl-10 rounded-xl border-gray-200"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Max Sales Rank</label>
                              <div className="relative">
                                <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  placeholder="10000"
                                  value={salesRankRange.max}
                                  onChange={(e) => setSalesRankRange({ ...salesRankRange, max: e.target.value })}
                                  className="pl-10 rounded-xl border-gray-200"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Performance & Quality */}
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base">Performance & Quality</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Min Sales</label>
                              <Input
                                placeholder="100"
                                value={minSales}
                                onChange={(e) => setMinSales(e.target.value)}
                                className="rounded-xl border-gray-200"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Min Revenue</label>
                              <Input
                                placeholder="1000"
                                value={minRevenue}
                                onChange={(e) => setMinRevenue(e.target.value)}
                                className="rounded-xl border-gray-200"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Min Rating</label>
                              <Select value={minRating} onValueChange={setMinRating}>
                                <SelectTrigger className="rounded-xl border-gray-200">
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                                  <SelectItem value="3.0">3.0+ Stars</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">Max Weight (lbs)</label>
                              <Input
                                placeholder="10"
                                value={maxWeight}
                                onChange={(e) => setMaxWeight(e.target.value)}
                                className="rounded-xl border-gray-200"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Keyword Filters */}
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base">Keyword Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Include Keywords</label>
                            <Input
                              placeholder="wireless, bluetooth"
                              value={includeKeywords}
                              onChange={(e) => setIncludeKeywords(e.target.value)}
                              className="rounded-xl border-gray-200"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Exclude Keywords</label>
                            <Input
                              placeholder="refurbished, used"
                              value={excludeKeywords}
                              onChange={(e) => setExcludeKeywords(e.target.value)}
                              className="rounded-xl border-gray-200"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="exclude-brands"
                                checked={excludeTopBrands}
                                onCheckedChange={(checked) => setExcludeTopBrands(checked === true)}
                              />
                              <label htmlFor="exclude-brands" className="text-sm text-gray-700 cursor-pointer">
                                Exclude Top Brands
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="include-unavailable"
                                checked={includeUnavailable}
                                onCheckedChange={(checked) => setIncludeUnavailable(checked === true)}
                              />
                              <label htmlFor="include-unavailable" className="text-sm text-gray-700 cursor-pointer">
                                Include Unavailable Products
                              </label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Filter Actions */}
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                          <Save className="w-4 h-4 mr-2" />
                          Save Filter
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                          <Upload className="w-4 h-4 mr-2" />
                          Load Filter
                        </Button>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Suggest Filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Middle Column - Results */}
            <div className={`col-span-12 ${showAISidebar ? 'lg:col-span-6' : 'lg:col-span-9'} transition-all duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Results</h3>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    {mockProducts.length} products found
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="font-semibold text-gray-900 px-6 py-4 w-80">Product</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-28">Brand</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-24">Price</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-28">Buy Box %</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-32">Sales Rank</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-24">Rating</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-28">Revenue</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-20">Sales</TableHead>
                        <TableHead className="font-semibold text-gray-900 px-4 py-4 w-28">Profit Margin</TableHead>
                        <TableHead className="w-20 px-4 py-4"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProducts.map((product) => (
                        <TableRow 
                          key={product.id} 
                          className="hover:bg-blue-50/30 transition-colors group cursor-pointer border-b border-gray-100"
                        >
                          <TableCell className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-sm leading-5 truncate max-w-60">{product.name}</p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">{product.category}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <span className="text-sm font-medium text-gray-700">{product.brand}</span>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <span className="text-sm font-semibold text-gray-900">${product.price}</span>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-900">{product.buyBoxPercentage}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">#{product.salesRank.toLocaleString()}</span>
                              {product.salesRankTrend === "up" ? (
                                <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</span>
                              {product.revenueTrend === "up" && (
                                <ArrowUpRight className="w-4 h-4 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <span className="text-sm font-medium text-gray-900">{product.sales}</span>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <span className="text-sm font-semibold text-green-600">{product.profitMargin}%</span>
                          </TableCell>
                          <TableCell className="px-4 py-5">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Bookmark className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            {/* Right Column - AI Insights */}
            {showAISidebar && (
              <div className="col-span-12 lg:col-span-3">
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAISidebar(!showAISidebar)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* AI Insights Cards */}
                    {insights.map((insight, index) => {
                      const IconComponent = insight.icon;
                      return (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${insight.gradient} text-white shadow-lg flex-shrink-0`}>
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{insight.title}</h4>
                                  <p className="text-lg font-bold text-gray-900 mb-2">{insight.value}</p>
                                  <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}

                    {/* AI Recommendations */}
                    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Bot className="w-5 h-5 text-purple-600" />
                          AI Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        {aiRecommendations.map((category, categoryIndex) => (
                          <div key={category.type}>
                            <h4 className="font-medium text-gray-900 mb-3 text-sm">{category.type}</h4>
                            <div className="space-y-3">
                              {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                    <p className="text-xs text-purple-600 font-medium">{item.metric}</p>
                                    <p className="text-xs text-gray-500">{item.insight}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}