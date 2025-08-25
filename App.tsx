import React, { useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { CommandCenter } from "./components/CommandCenter";
import { RightSidebar } from "./components/RightSidebar";
import { Settings } from "./components/Settings";
import { Pricing } from "./components/Pricing";
import { Products } from "./components/Products";
import { MarketAnalyzer } from "./components/MarketAnalyzer";
import { Automations } from "./components/Automations";
import { Alerts } from "./components/Alerts";
import { Analytics } from "./components/Analytics";
import Landing from "./components/Landing";

type NavKey = "dashboard" | "market-analyzer" | "analytics" | "products" | "alerts" | "automation" | "settings" | "landing" | "pricing";

export default function App() {
  const [activeSection, setActiveSection] = useState<NavKey>("landing");

  const renderMainContent = () => {
    switch (activeSection) {
      case "landing":
        return <Landing onEnterApp={() => setActiveSection("dashboard")} />;
      case "market-analyzer":
        return <MarketAnalyzer />;
      case "analytics":
        return <Analytics />;
      case "products":
        return <Products />;
      case "automation":
        return <Automations />;
      case "alerts":
        return <Alerts />;
      case "settings":
        return <Settings onUpgrade={() => setActiveSection("pricing")} />;
      case "pricing":
        return <Pricing />;
      default:
        return <CommandCenter />;
    }
  };

  // Show landing page without sidebars
  if (activeSection === "landing") {
    return (
      <div className="min-h-screen w-full bg-white">
        <Landing onEnterApp={() => setActiveSection("dashboard")} />
      </div>
    );
  }

  // Show dashboard layout with sidebars
  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <LeftSidebar 
        activeSection={activeSection as any} 
        setActiveSection={setActiveSection as any}
        onUpgrade={() => setActiveSection("pricing")}
      />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto">
        {renderMainContent()}
      </div>
      
      {/* Right Sidebar - Only show on dashboard */}
      {activeSection === "dashboard" && <RightSidebar />}
    </div>
  );
}