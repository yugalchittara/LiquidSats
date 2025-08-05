import { useState } from "react";
import { BorrowPositionCard } from "./BorrowPositionCard";
import { TableFilters } from "./TableFilters";

interface BorrowPosition {
  loanId: string;
  amount: number;
  currency: string;
  ltv: number;
  apr: number;
  duration: number;
  status: 'active' | 'awaiting-init' | 'pending' | 'expired';
  offersCount: number;
}

// Mock data for demonstration - moved before component
const mockPositions: BorrowPosition[] = [
  {
    loanId: "BR001",
    amount: 75000,
    currency: "USDT",
    ltv: 75,
    apr: 8.2,
    duration: 30,
    status: 'active',
    offersCount: 3
  },
  {
    loanId: "BR002", 
    amount: 50000,
    currency: "USDT",
    ltv: 70,
    apr: 9.5,
    duration: 14,
    status: 'awaiting-init',
    offersCount: 5
  },
  {
    loanId: "BR003",
    amount: 120000,
    currency: "USDT",
    ltv: 80,
    apr: 7.8,
    duration: 60,
    status: 'pending',
    offersCount: 1
  },
  {
    loanId: "BR004",
    amount: 25000,
    currency: "USDT",
    ltv: 65,
    apr: 8.9,
    duration: 21,
    status: 'expired',
    offersCount: 0
  }
];

export function BorrowPositionsTable() {
  const [positions] = useState<BorrowPosition[]>(mockPositions);

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
      { value: 'awaiting-init', label: 'Awaiting Init' },
      { value: 'pending', label: 'Pending' },
      { value: 'expired', label: 'Expired' }
    ]
  };

  const sortOptions = [
    { value: 'amount-desc', label: 'Amount (High to Low)' },
    { value: 'amount-asc', label: 'Amount (Low to High)' },
    { value: 'apr-desc', label: 'APR (High to Low)' },
    { value: 'apr-asc', label: 'APR (Low to High)' }
  ];

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
          <div className="col-span-2">BORROWED</div>
          <div className="col-span-1 text-center">LTV</div>
          <div className="col-span-2 text-center">AMOUNT</div>
          <div className="col-span-1 text-center">DURATION</div>
          <div className="col-span-1 text-center">APR</div>
          <div className="col-span-2 text-center">STATUS & OFFERS</div>
          <div className="col-span-1 text-center">ACTIONS</div>
        </div>
      </div>

      {/* Borrow Position Cards */}
      <div className="space-y-3">
        {positions.map((position) => (
          <BorrowPositionCard
            key={position.loanId}
            position={position}
          />
        ))}
      </div>

      {positions.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="text-body-medium text-neutral-dark mb-2">
            No Borrow Positions
          </h3>
          <p className="text-body text-neutral-medium">
            You don't have any active borrow positions. Create a loan request to get started.
          </p>
        </div>
      )}
    </div>
  );
}