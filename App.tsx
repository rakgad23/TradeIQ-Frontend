import { useState } from "react";
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
import { SupplierAgent } from "./components/SupplierAgent";
import { SourcingFinder } from "./components/sourcing/SourcingFinder";
import { SourcingRun } from "./components/sourcing/SourcingRun";
import Landing from "./components/Landing";
import SignInWrapper from "./components/SignInWrapper";
import SignupWrapper from "./components/SignupWrapper";
import { AuthProvider } from "./context/AuthContext";

type NavKey = "dashboard" | "market-analyzer" | "analytics" | "products" | "alerts" | "automation" | "settings" | "landing" | "pricing" | "signin" | "signup" | "supplier-agent" | "sourcing" | "sourcing-run";

function AppContent() {
  const [activeSection, setActiveSection] = useState<NavKey>("landing");
  const [sourcingRunId, setSourcingRunId] = useState<string | null>(null);

  const renderMainContent = () => {
    switch (activeSection) {
      case "landing":
        return (
          <Landing 
            onEnterApp={() => setActiveSection("dashboard")} 
            onSignIn={() => setActiveSection("signin")}
            onSignUp={() => setActiveSection("signup")}
          />
        );
      case "market-analyzer":
        return <MarketAnalyzer />;
      case "analytics":
        return <Analytics />;
      case "products":
        return <Products />;
      case "supplier-agent":
        return <SupplierAgent />;
      case "sourcing":
        return (
          <SourcingFinder
            onRunCreated={(runId) => {
              setSourcingRunId(runId);
              setActiveSection("sourcing-run");
            }}
          />
        );
      case "sourcing-run":
        return sourcingRunId ? (
          <SourcingRun
            runId={sourcingRunId}
            onBackToFinder={() => setActiveSection("sourcing")}
          />
        ) : (
          <SourcingFinder
            onRunCreated={(runId) => {
              setSourcingRunId(runId);
              setActiveSection("sourcing-run");
            }}
          />
        );
      case "automation":
        return <Automations />;
      case "alerts":
        return <Alerts />;
      case "settings":
        return <Settings onUpgrade={() => setActiveSection("pricing")} />;
      case "pricing":
        return <Pricing />;
      case "signin":
        return (
          <SignInWrapper 
            onSuccess={() => setActiveSection("dashboard")} 
            onBackToLanding={() => setActiveSection("landing")}
            onGoToSignup={() => setActiveSection("signup")}
          />
        );
      case "signup":
        return (
          <SignupWrapper 
            onSuccess={() => setActiveSection("dashboard")} 
            onBackToLanding={() => setActiveSection("landing")}
            onGoToSignin={() => setActiveSection("signin")}
          />
        );
      default:
        return <CommandCenter />;
    }
  };

  // Show landing page, signin, signup, and supplier-agent without sidebars
  if (activeSection === "landing" || activeSection === "signin" || activeSection === "signup" || activeSection === "supplier-agent") {
    return (
      <div className="min-h-screen w-full bg-white">
        {renderMainContent()}
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}