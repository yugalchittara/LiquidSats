import { BorrowStats } from "./BorrowStats";
import { MorphoTabs } from "./MorphoTabs";
import { BorrowPositionsTable } from "./BorrowPositionsTable";
import { CreateLoanRequest } from "./CreateLoanRequest";

export function BorrowPage() {
  const tabs = [
    {
      value: "positions",
      label: "My Borrow Positions", 
      content: (
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">📊</span>
              </div>
              <h3 className="text-body-medium text-neutral-dark">Active Positions</h3>
            </div>
            <p className="text-body text-neutral-medium">
              Track your active loan positions, manage payments, and monitor your collateralization ratios. Stay on top of your borrowing portfolio.
            </p>
          </div>
          <BorrowPositionsTable />
        </div>
      )
    },
    {
      value: "create-request",
      label: "Create Loan Request",
      content: (
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent text-lg">➕</span>
              </div>
              <h3 className="text-body-medium text-neutral-dark">New Loan Request</h3>
            </div>
            <p className="text-body text-neutral-medium">
              Submit a new loan request to the marketplace. Your Bitcoin will serve as collateral to secure the loan.
            </p>
          </div>
          <CreateLoanRequest />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Orange Gradient Background */}
      <div className="bg-gradient-to-br from-orange-light to-orange-medium border-b border-orange-medium/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-xl">₿</span>
              </div>
              <div>
                <h1 className="text-heading font-bold text-neutral-dark">
                  Borrow USDT
                </h1>
                <p className="text-subheading text-neutral-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Create loan requests and manage your borrowing positions with Bitcoin as collateral.
                </p>
              </div>
            </div>
          </div>
          <BorrowStats />
        </div>
      </div>

      {/* Content Section with White Background */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <MorphoTabs tabs={tabs} defaultValue="positions" />
        </div>
      </div>
    </div>
  );
}