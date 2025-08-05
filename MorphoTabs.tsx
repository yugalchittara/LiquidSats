import { ReactNode, useState } from "react";

interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

interface MorphoTabsProps {
  tabs: Tab[];
  defaultValue: string;
}

export function MorphoTabs({ tabs, defaultValue }: MorphoTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`py-3 px-1 relative transition-colors ${
                activeTab === tab.value
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div>
        {tabs.find(tab => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}