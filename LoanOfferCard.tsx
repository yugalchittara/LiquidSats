import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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

interface LoanOfferCardProps {
  offer: LoanOffer;
  isMyOffer?: boolean;
  onAcceptOffer?: (loanId: string) => void;
  onClaimCollateral?: (loanId: string) => void;
  onCancelOffer?: (loanId: string) => void;
}

export function LoanOfferCard({ 
  offer, 
  isMyOffer = false, 
  onAcceptOffer, 
  onClaimCollateral, 
  onCancelOffer 
}: LoanOfferCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'active';
      case 'pending': return 'awaiting';
      case 'filled': return 'expired';
      default: return 'default';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Collateral Section */}
        <div className="col-span-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">₿</span>
          </div>
          <div>
            <div className="text-body-medium text-neutral-dark">BTC</div>
            <div className="text-caption text-neutral-medium">Collateral</div>
          </div>
        </div>

        {/* Loan Currency Section */}
        <div className="col-span-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground font-semibold">₮</span>
          </div>
          <div>
            <div className="text-body-medium text-neutral-dark">{offer.loanCurrency}</div>
            <div className="text-caption text-neutral-medium">Loan</div>
          </div>
        </div>

        {/* LTV Section */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-body-medium text-neutral-dark">{offer.ltv}%</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-neutral-medium" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Loan-to-Value ratio</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-caption text-neutral-medium">LTV</div>
        </div>

        {/* Amount Section */}
        <div className="col-span-2 text-center">
          <div className="text-body-medium text-neutral-dark font-semibold">
            ${offer.borrowAmount.toLocaleString()}
          </div>
          <div className="text-caption text-neutral-medium">Amount</div>
        </div>

        {/* Duration Section */}
        <div className="col-span-1 text-center">
          <div className="text-body-medium text-neutral-dark">{offer.duration}d</div>
          <div className="text-caption text-neutral-medium">Duration</div>
        </div>

        {/* APR Section */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-body-medium text-accent font-semibold">{offer.apr}%</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-neutral-medium" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual Percentage Rate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-caption text-neutral-medium">APR</div>
        </div>

        {/* Status Section */}
        <div className="col-span-2 flex items-center justify-center">
          <StatusBadge 
            status={offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            variant={getStatusVariant(offer.status)}
          />
        </div>

        {/* Action Section */}
        <div className="col-span-1 flex justify-end">
          {isMyOffer ? (
            <div className="flex gap-2">
              {offer.status === 'filled' && (
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-body-medium"
                  onClick={() => onClaimCollateral?.(offer.loanId)}
                >
                  Claim
                </Button>
              )}
              {offer.status === 'pending' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-border text-neutral-dark hover:bg-muted text-body-medium"
                  onClick={() => onCancelOffer?.(offer.loanId)}
                >
                  Cancel
                </Button>
              )}
            </div>
          ) : (
            offer.status === 'active' && (
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-body-medium px-6"
                onClick={() => onAcceptOffer?.(offer.loanId)}
              >
                Accept
              </Button>
            )
          )}
        </div>
      </div>

      {/* Additional Info Row */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-caption text-neutral-medium">
            ID: <span className="text-neutral-dark font-medium">{offer.loanId}</span>
          </div>
          <div className="text-caption text-neutral-medium">
            Borrower: <span className="text-neutral-dark font-medium">{offer.borrowerAddress}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs text-primary">🔥</span>
          </div>
          <span className="text-caption text-neutral-medium">+{Math.floor(Math.random() * 10) + 1}</span>
        </div>
      </div>
    </div>
  );
}