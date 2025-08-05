import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "earn", label: "Earn" },
    { id: "borrow", label: "Borrow" },
    { id: "explore", label: "Explore" }
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-heading font-bold text-neutral-dark">
                LiquidSat
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative py-4 text-body-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-neutral-medium hover:text-neutral-dark"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-body-medium rounded-lg"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}