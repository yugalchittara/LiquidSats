import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { EarnPage } from "./components/EarnPage";
import { BorrowPage } from "./components/BorrowPage";
import { ExplorePage } from "./components/ExplorePage";

export default function App() {
  const [activeTab, setActiveTab] = useState("earn");

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === "earn" && <EarnPage />}
        {activeTab === "borrow" && <BorrowPage />}
        {activeTab === "explore" && <ExplorePage />}
      </main>
    </div>
  );
}