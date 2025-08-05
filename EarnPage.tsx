import { EarnStats } from "./EarnStats";
import { MorphoTabs } from "./MorphoTabs";
import { LoanOffersTable } from "./LoanOffersTable";

export function EarnPage() {
  const tabs = [
    {
      value: "public-offers",
      label: "Loan Offers (Public)",
      content: (
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">💰</span>
              </div>
              <h3 className="text-body-medium text-neutral-dark">Available Loan Offers</h3>
            </div>
            <p className="text-body text-neutral-medium">
              Browse available loan requests from borrowers and earn attractive returns by providing USDT liquidity secured by Bitcoin collateral.
            </p>
          </div>
          <LoanOffersTable offers={[]} />
        </div>
      )
    },
    {
      value: "my-offers", 
      label: "My Accepted Offers",
      content: (
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent text-lg">✅</span>
              </div>
              <h3 className="text-body-medium text-neutral-dark">My Lending Portfolio</h3>
            </div>
            <p className="text-body text-neutral-medium">
              Manage your accepted loan offers and track your earnings from active lending positions. Monitor your portfolio performance and claim returns.
            </p>
          </div>
          <LoanOffersTable offers={[]} isMyOffers={true} />
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
                <span className="text-primary-foreground text-xl">💎</span>
              </div>
              <div>
                <h1 className="text-heading font-bold text-neutral-dark">
                  Earn on your USDT
                </h1>
                <p className="text-subheading text-neutral-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  Lend USDT to borrowers and earn attractive returns, secured by Bitcoin as collateral.
                </p>
              </div>
            </div>
          </div>
          <EarnStats />
        </div>
      </div>

      {/* Content Section with White Background */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <MorphoTabs tabs={tabs} defaultValue="public-offers" />
        </div>
      </div>
    </div>
  );
}