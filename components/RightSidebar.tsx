import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { 
  DollarSign, 
  Target, 
  Package, 
  AlertTriangle, 
  Zap, 
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

// Mock data for sparklines
const generateTrendData = (trend: 'up' | 'down' | 'stable') => {
  const baseData = Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));
  
  if (trend === 'up') {
    return baseData.map((item, index) => ({
      ...item,
      value: item.value + (index * 2)
    }));
  } else if (trend === 'down') {
    return baseData.map((item, index) => ({
      ...item,
      value: item.value - (index * 1.5)
    }));
  }
  return baseData;
};

const kpiData = [
  {
    title: "Revenue",
    value: "$24,573",
    change: "+12.5%",
    trend: "up" as const,
    color: "#10b981",
    icon: DollarSign,
    data: generateTrendData('up')
  },
  {
    title: "Buy Box %",
    value: "87.3%",
    change: "+5.2%",
    trend: "up" as const,
    color: "#3b82f6",
    icon: Target,
    data: generateTrendData('up')
  },
  {
    title: "SKUs in Stock",
    value: "1,247",
    change: "-2.1%",
    trend: "down" as const,
    color: "#f59e0b",
    icon: Package,
    data: generateTrendData('down')
  },
  {
    title: "Disputes Value",
    value: "$3,241",
    change: "-18.7%",
    trend: "up" as const,
    color: "#ef4444",
    icon: AlertTriangle,
    data: generateTrendData('down')
  },
  {
    title: "Automations Run",
    value: "342",
    change: "+24.3%",
    trend: "up" as const,
    color: "#8b5cf6",
    icon: Zap,
    data: generateTrendData('up')
  },
  {
    title: "Sales Rank Δ",
    value: "↑ 1,247",
    change: "0.0%",
    trend: "stable" as const,
    color: "#6b7280",
    icon: TrendingUp,
    data: generateTrendData('stable')
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-3 h-3" />;
    case 'down':
      return <TrendingDown className="w-3 h-3" />;
    default:
      return <Minus className="w-3 h-3" />;
  }
};

const getTrendColor = (trend: string, change: string) => {
  if (change.startsWith('+')) {
    return 'text-green-300 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 shadow-lg glow-green';
  } else if (change.startsWith('-')) {
    return 'text-red-300 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 shadow-lg glow-red';
  } else {
    return 'text-gray-300 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 shadow-lg';
  }
};

export function RightSidebar() {
  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-l border-gray-700/50 flex flex-col shadow-2xl dark-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-gray-700/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Live KPIs</h2>
        </div>
        <p className="text-gray-300 text-sm font-medium">Real-time business metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="flex-1 p-6 space-y-6 overflow-auto dark-scrollbar">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="dark-premium-card hover:scale-105 transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300`} style={{ background: `linear-gradient(135deg, ${kpi.color}aa, ${kpi.color})` }}>
                    <kpi.icon className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                  <span className="text-gray-200 font-semibold tracking-wide">{kpi.title}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-3 py-1 font-semibold rounded-full ${getTrendColor(kpi.trend, kpi.change)}`}
                >
                  {getTrendIcon(kpi.trend)}
                  <span className="ml-1">{kpi.change}</span>
                </Badge>
              </div>
              
              <div className="mb-5">
                <span className={`text-3xl font-bold tracking-tight ${
                  kpi.change.startsWith('+') ? 'text-green-300 animate-glow' :
                  kpi.change.startsWith('-') ? 'text-red-300' : 'text-white'
                }`}>
                  {kpi.value}
                </span>
              </div>

              {/* Sparkline Chart */}
              <div className="h-16 -mx-1 rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpi.data}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={kpi.color} 
                      strokeWidth={3}
                      dot={false}
                      strokeOpacity={0.9}
                      className="drop-shadow-lg animate-pulse-subtle"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="p-6 border-t border-gray-700/50">
        <div className="bg-gradient-to-br from-blue-500/20 via-green-500/15 to-emerald-500/20 p-6 rounded-2xl border-2 border-green-500/30 shadow-2xl glow-green">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-300 animate-bounce" />
            <span className="text-sm font-bold text-green-200 tracking-wide">Performance Score</span>
          </div>
          <div className="text-4xl font-black text-white mb-2 tracking-tight">94<span className="text-green-300">/100</span></div>
          <p className="text-sm text-gray-300 font-semibold">↗️ 8 pts from last week</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t border-gray-700/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-gray-800/60 to-gray-700/40 rounded-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-2xl font-bold text-white mb-1">156</div>
            <div className="text-xs text-gray-300 font-medium tracking-wide">Active SKUs</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg glow-red">
            <div className="text-2xl font-bold text-red-300 mb-1 animate-pulse">23</div>
            <div className="text-xs text-red-200 font-medium tracking-wide">Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
}