import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Zap,
  Clock,
  Crown,
  Settings,
  HelpCircle,
  Search,
  Users
} from "lucide-react";

const navigationItems = [
  { icon: BarChart3, label: "Dashboard", key: "dashboard" },
  { icon: Search, label: "Market Analyzer", key: "market-analyzer" },
  { icon: TrendingUp, label: "Analytics", key: "analytics" },
  { icon: ShoppingCart, label: "Products", key: "products" },
  { icon: Users, label: "Supplier Agent", key: "supplier-agent" },
  { icon: AlertTriangle, label: "Alerts", key: "alerts" },
  { icon: Zap, label: "Automation", key: "automation" },
  { icon: Settings, label: "Settings", key: "settings" },
];

const recentCommands = [
  "Track Buy Box for SKU-123",
  "Monitor competitor pricing",
  "Create repricing rule",
  "Analyze sales trends",
  "Generate dispute report",
];

interface LeftSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onUpgrade: () => void;
}

export function LeftSidebar({ activeSection, setActiveSection, onUpgrade }: LeftSidebarProps) {
  return (
    // Full safe viewport height; column layout
    <div className="w-64 h-svh bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-r border-gray-700/50 flex flex-col shadow-2xl">
      {/* Top: Logo (fixed) */}
      <div className="flex-none p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight">TradeIQ Pro</h1>
            <p className="text-gray-400 text-xs font-medium">AI Analytics</p>
          </div>
        </div>
      </div>

      {/* Nav (fixed height content) */}
      <nav className="flex-none p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.key}
            variant={activeSection === item.key ? "secondary" : "ghost"}
            onClick={() => setActiveSection(item.key)}
            className={`w-full justify-start gap-3 h-10 rounded-lg transition-colors ${
              activeSection === item.key
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Recent Commands = the ONLY flexing/scrolling region */}
      <section className="flex-1 min-h-0 overflow-y-auto border-t border-gray-700/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Recent Commands</span>
          </div>

          <div className="space-y-2">
            {recentCommands.map((command, i) => (
              <div
                key={i}
                className="text-xs text-gray-400 p-2 bg-gray-800/60 rounded border border-gray-700/30 hover:bg-gray-700/70 hover:text-gray-200 transition-colors"
              >
                {command}
              </div>
            ))}
          </div>

          {/* Optional spacer: keeps the section visually balanced on tall screens */}
          <div className="h-8 md:h-16" />
        </div>
      </section>

      {/* Trial card (fixed near bottom) */}
      <div className="flex-none p-4 border-t border-gray-700/50">
        <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-indigo-500/20 p-3 rounded-xl border border-purple-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-semibold text-purple-200">Pro Trial</span>
            <Badge
              variant="secondary"
              className="ml-auto text-xs bg-purple-400/30 text-purple-200 border-purple-400/50 px-1.5 py-0"
            >
              7 days
            </Badge>
          </div>
          <Progress value={30} className="h-1.5 mb-2" />
          <p className="text-xs text-gray-300 mb-3 font-medium">30% used</p>
          <Button
            onClick={onUpgrade}
            size="sm"
            className="w-full text-xs bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg h-8"
          >
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Bottom: User profile (fixed footer) */}
      <div className="flex-none p-4 border-t border-gray-700/50 bg-gray-900/80">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-purple-500/30 shadow-lg">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-semibold text-xs">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate font-medium">john@example.com</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg h-8 w-8 p-0"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}