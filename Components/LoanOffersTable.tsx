import { useState } from "react";
import { LoanOfferCard } from "./LoanOfferCard";
import { TableFilters } from "./TableFilters";

interface LoanOffer {
  loanId: string;
  borrowerAddress: string;
  borrowAmount: number;
  loanCurrency: string;
  ltv: number;
  apr: number;
  duration: number;
  status: 'active' | 'pending' | 'filled';
}

interface LoanOffersTableProps {
  offers?: LoanOffer[];
  isMyOffers?: boolean;
}

// Mock data for demonstration - moved before component
const mockOffers: LoanOffer[] = [
  {
    loanId: "LN001",
    borrowerAddress: "1A1zP1eP...BV2kUd",
    borrowAmount: 50000,
    loanCurrency: "USDT",
    ltv: 75,
    apr: 8.5,
    duration: 30,
    status: 'active'
  },
  {
    loanId: "LN002", 
    borrowerAddress: "3J98t1WpE...Qx3bz1",
    borrowAmount: 25000,
    loanCurrency: "USDT",
    ltv: 70,
    apr: 9.2,
    duration: 14,
    status: 'pending'
  },
  {
    loanId: "LN003",
    borrowerAddress: "bc1qw508d...pqxqz5w",
    borrowAmount: 100000,
    loanCurrency: "USDT", 
    ltv: 80,
    apr: 7.8,
    duration: 60,
    status: 'filled'
  },
  {
    loanId: "LN004",
    borrowerAddress: "bc1q5d6m0...xyz123",
    borrowAmount: 75000,
    loanCurrency: "USDT",
    ltv: 65,
    apr: 8.8,
    duration: 45,
    status: 'active'
  },
  {
    loanId: "LN005",
    borrowerAddress: "1BvBMSEY...abc789",
    borrowAmount: 120000,
    loanCurrency: "USDT",
    ltv: 78,
    apr: 7.5,
    duration: 60,
    status: 'active'
  }
];

export function LoanOffersTable({ offers = [], isMyOffers = false }: LoanOffersTableProps) {
  const [filteredOffers, setFilteredOffers] = useState<LoanOffer[]>(offers.length > 0 ? offers : mockOffers);

  const filters = {
    duration: [
      { value: '7', label: '7 days' },
      { value: '14', label: '14 days' },
      { value: '30', label: '30 days' },
      { value: '60', label: '60 days' },
      { value: '90', label: '90 days' }
    ],
    ltv: [
      { value: '50-60', label: '50-60%' },
      { value: '60-70', label: '60-70%' },
      { value: '70-80', label: '70-80%' },
      { value: '80-85', label: '80-85%' }
    ],
    status: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'filled', label: 'Filled' }
    ]
  };

  const sortOptions = [
    { value: 'amount-desc', label: 'Amount (High to Low)' },
    { value: 'amount-asc', label: 'Amount (Low to High)' },
    { value: 'apr-desc', label: 'APR (High to Low)' },
    { value: 'apr-asc', label: 'APR (Low to High)' },
    { value: 'duration-asc', label: 'Duration (Short to Long)' },
    { value: 'duration-desc', label: 'Duration (Long to Short)' }
  ];

  const handleAcceptOffer = (loanId: string) => {
    console.log(`Accept offer ${loanId}`);
  };

  const handleClaimCollateral = (loanId: string) => {
    console.log(`Claim collateral ${loanId}`);
  };

  const handleCancelOffer = (loanId: string) => {
    console.log(`Cancel offer ${loanId}`);
  };

  return (
    <div className="space-y-6">
      <TableFilters 
        filters={filters}
        sortOptions={sortOptions}
        onFilterChange={(type, value) => console.log(`Filter ${type}: ${value}`)}
        onSortChange={(value) => console.log(`Sort: ${value}`)}
      />

      {/* Column Headers */}
      <div className="bg-orange-light/30 border border-orange-medium/50 rounded-xl px-6 py-4">
        <div className="grid grid-cols-12 gap-4 items-center text-caption text-neutral-medium">
          <div className="col-span-2">COLLATERAL</div>
          <div className="col-span-2">LOAN</div>
          <div className="col-span-1 text-center">LTV</div>
          <div className="col-span-2 text-center">AMOUNT</div>
          <div className="col-span-1 text-center">DURATION</div>
          <div className="col-span-1 text-center">APR</div>
          <div className="col-span-2 text-center">STATUS</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
      </div>

      {/* Loan Offer Cards */}
      <div className="space-y-3">
        {filteredOffers.map((offer) => (
          <LoanOfferCard
            key={offer.loanId}
            offer={offer}
            isMyOffer={isMyOffers}
            onAcceptOffer={handleAcceptOffer}
            onClaimCollateral={handleClaimCollateral}
            onCancelOffer={handleCancelOffer}
          />
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-body-medium text-neutral-dark mb-2">
            {isMyOffers ? 'No Accepted Offers' : 'No Loan Offers Available'}
          </h3>
          <p className="text-body text-neutral-medium">
            {isMyOffers 
              ? 'You haven\'t accepted any loan offers yet. Browse available offers to start earning.' 
              : 'No loan requests are currently available. Check back later for new opportunities.'
            }
          </p>
        </div>
      )}
    </div>
  );
}