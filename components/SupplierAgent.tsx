import { useState, useEffect, useRef } from "react";
import { Search, Bot, CheckCircle, AlertTriangle, Loader2, Sparkles, ExternalLink, Heart, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SourcingAPI } from "../lib/sourcingApi";
import { SupplierResult } from "../lib/types";

// Mock sources data
const mockSources = [
  { name: "Google", icon: "G", color: "bg-blue-500", status: "pending" as const },
  { name: "Amazon", icon: "A", color: "bg-orange-500", status: "pending" as const },
  { name: "Alibaba", icon: "A", color: "bg-red-500", status: "pending" as const },
  { name: "ThomasNet", icon: "T", color: "bg-green-500", status: "pending" as const },
  { name: "GlobalSpec", icon: "G", color: "bg-purple-500", status: "pending" as const },
  { name: "Kompass", icon: "K", color: "bg-yellow-500", status: "pending" as const },
  { name: "ImportYeti", icon: "I", color: "bg-indigo-500", status: "pending" as const },
  { name: "TradeKey", icon: "T", color: "bg-pink-500", status: "pending" as const },
  { name: "EC21", icon: "E", color: "bg-teal-500", status: "pending" as const }
];


interface ProgressUpdate {
  step: string;
  message: string;
  details: string[];
  progress: number;
  checkpoints: Array<{
    id: string;
    title: string;
    completed: boolean;
    current: boolean;
  }>;
  sources?: Array<{
    name: string;
    icon: string;
    color: string;
    status: 'active' | 'completed' | 'pending';
  }>;
}

export function SupplierAgent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<ProgressUpdate | null>(null);
  const [suppliers, setSuppliers] = useState<SupplierResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [runId, setRunId] = useState<string | null>(null);
  const [sources] = useState(mockSources);
  
  // Timer for progress animation
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentStepRef = useRef<number>(0);


  // Timer-based progress animation
  const startProgressAnimation = () => {
    const steps = [
      { step: "initializing", message: "🤖 AI is analyzing your request...", progress: 10, details: ["Analyzing search query", "Preparing search strategy", "Initializing discovery process"] },
      { step: "searching", message: "🔍 Searching across multiple sources...", progress: 25, details: ["Querying Google", "Searching Amazon", "Browsing Alibaba", "Checking ThomasNet"] },
      { step: "crawling", message: "🕷️ Crawling supplier websites...", progress: 45, details: ["Extracting company information", "Finding contact details", "Analyzing product catalogs"] },
      { step: "extracting", message: "📊 Extracting supplier data...", progress: 65, details: ["Parsing contact information", "Validating email addresses", "Extracting pricing data"] },
      { step: "ranking", message: "⭐ Ranking suppliers by relevance...", progress: 85, details: ["Calculating relevance scores", "Analyzing quality metrics", "Sorting by best matches"] },
      { step: "completing", message: "✅ Finalizing results...", progress: 95, details: ["Storing supplier data", "Preparing results", "Almost done..."] }
    ];

    currentStepRef.current = 0;
    
    const updateProgress = () => {
      if (currentStepRef.current < steps.length) {
        const currentStep = steps[currentStepRef.current];
        const checkpoints = [
          { id: "start", title: "Start AI search", completed: true, current: false },
          { id: "search", title: `Search for ${searchQuery}`, completed: currentStepRef.current > 0, current: currentStepRef.current === 0 },
          { id: "browse", title: "Browse and extract suppliers from relevant sources", completed: currentStepRef.current > 1, current: currentStepRef.current === 1 },
          { id: "extract", title: "Extract supplier information and contact details", completed: currentStepRef.current > 2, current: currentStepRef.current === 2 },
          { id: "rank", title: "Rank suppliers by relevance and quality", completed: currentStepRef.current > 3, current: currentStepRef.current === 3 },
          { id: "complete", title: "Complete search and display results", completed: currentStepRef.current > 4, current: currentStepRef.current === 4 }
        ];

        setCurrentProgress({
          step: currentStep.step,
          message: currentStep.message,
          details: currentStep.details,
          progress: currentStep.progress,
          checkpoints,
          sources: sources.map((s, index) => ({
            ...s,
            status: index < currentStepRef.current ? 'completed' as const : 
                   index === currentStepRef.current ? 'active' as const : 'pending' as const
          }))
        });

        currentStepRef.current++;
        progressTimerRef.current = setTimeout(updateProgress, 2000); // 2 seconds per step
      } else {
        // Animation complete - fetch results
        setCurrentProgress({
          step: 'completed',
          message: '✅ Search completed successfully!',
          details: ['Found suppliers', 'Results ranked by relevance', 'Ready to view'],
          progress: 100,
          checkpoints: [
            { id: "start", title: "Start AI search", completed: true, current: false },
            { id: "search", title: `Search for ${searchQuery}`, completed: true, current: false },
            { id: "browse", title: "Browse and extract suppliers from relevant sources", completed: true, current: false },
            { id: "extract", title: "Extract supplier information and contact details", completed: true, current: false },
            { id: "rank", title: "Rank suppliers by relevance and quality", completed: true, current: false },
            { id: "complete", title: "Complete search and display results", completed: true, current: false }
          ],
          sources: sources.map(s => ({ ...s, status: 'completed' as const }))
        });
        
        // Fetch results after a short delay
        setTimeout(() => {
          fetchResults(runId!);
        }, 1000);
      }
    };

    updateProgress();
  };

  const fetchResults = async (runId: string) => {
    try {
      const results = await SourcingAPI.getRunResults('68daa41a2ddc4afb45298714', { limit: 50 });
      setSuppliers(results.items);
      setShowResults(true);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Failed to fetch supplier results');
      setIsSearching(false);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setError(null);
    setSuppliers([]);
    setCurrentProgress(null);
    setShowResults(false);
    
    try {
      // Start the supplier discovery process
      const response = await SourcingAPI.startAgentSearch(
        searchQuery,
        ["US", "UK", "EU"], // Default regions
        50 // Max suppliers
      );

      const newRunId = response.sourcing_run_id;
      setRunId(newRunId);

      // Start the timer-based progress animation
      startProgressAnimation();

    } catch (error) {
      console.error('Error starting search:', error);
      setError('Failed to start supplier search. Please try again.');
      setIsSearching(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TQ</span>
              </div>
              <span className="text-xl font-semibold">TradeIQ</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="New Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg pl-4 pr-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                disabled={isSearching}
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
        </div>
      </div>

          <div className="flex items-center gap-3">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Build
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bot className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Query Display */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-300 text-lg">
              Searching for <span className="text-white font-medium">"{searchQuery}"</span>...
            </p>
          </div>
        )}

        {/* AI Thinking Process / Sources Section */}
        {currentProgress && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-300">Searching</span>
                <span className="text-white font-semibold">{sources.length} sources</span>
                <div className="flex gap-2">
                  {(currentProgress?.sources || sources).map((source, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full ${source.color} flex items-center justify-center text-white text-xs font-bold ${
                        source.status === 'active' ? 'animate-pulse' : 
                        source.status === 'completed' ? 'ring-2 ring-green-400' : ''
                      }`}
                      title={`${source.name} - ${source.status}`}
                    >
                      {source.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentProgress.checkpoints.map((checkpoint) => (
                <div key={checkpoint.id} className="flex items-center gap-3">
                  {checkpoint.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : checkpoint.current ? (
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                  )}
                  <span className={`text-sm ${
                    checkpoint.completed ? 'text-green-400' : 
                    checkpoint.current ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {checkpoint.title}
                  </span>
                  </div>
              ))}
                  </div>
                  </div>
        )}

        {/* Error Section */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Search Failed</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && suppliers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-orange-400">Supplier Search Results</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                      </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="relevance" className="text-white">Relevance: High to Low</SelectItem>
                  <SelectItem value="price-low" className="text-white">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="text-white">Price: High to Low</SelectItem>
                  <SelectItem value="rating" className="text-white">Rating: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.supplierId} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                        {false ? (
                          <img 
                            src="" 
                            alt={supplier.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {supplier.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      {supplier.scores.rank > 0.9 && (
                        <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                          Top Match
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{supplier.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="text-green-400">Available</span>
                        <span>from</span>
                        <span className="text-blue-400 font-mono text-xs">
                          {supplier.apexDomain || 'N/A'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div>Regions: {supplier.regions.join(', ')}</div>
                        <div>Roles: {supplier.roles.slice(0, 2).join(', ')}</div>
                        <div className="text-lg font-bold text-white mt-1">
                          Contact for pricing
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          if (supplier.apexDomain) {
                            // Ensure the URL has a protocol
                            const url = supplier.apexDomain.startsWith('http') 
                              ? supplier.apexDomain 
                              : `https://${supplier.apexDomain}`;
                            window.open(url, '_blank');
                          }
                        }}
                        disabled={!supplier.apexDomain}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Supplier
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}