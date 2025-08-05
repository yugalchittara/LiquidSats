import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Eye, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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

interface BorrowPositionCardProps {
  position: BorrowPosition;
}

export function BorrowPositionCard({ position }: BorrowPositionCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'active';
      case 'awaiting-init': return 'awaiting';
      case 'pending': return 'awaiting';
      case 'expired': return 'expired';
      default: return 'default';
    }
  };

  const getActionButtons = (position: BorrowPosition) => {
    switch (position.status) {
      case 'pending':
        return (
          <Button 
            size="sm" 
            variant="outline"
            className="border-border text-neutral-dark hover:bg-muted text-body-medium"
          >
            Cancel Request
          </Button>
        );
      case 'awaiting-init':
        return (
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-body-medium"
          >
            Initialize Loan
          </Button>
        );
      case 'active':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-body-medium"
            >
              Repay Loan
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-border text-neutral-dark hover:bg-muted text-body-medium"
            >
              Pay Interest
            </Button>
          </div>
        );
      case 'expired':
        return (
          <Button 
            size="sm"
            className="bg-warning hover:bg-warning/90 text-warning-foreground text-body-medium"
          >
            Redeem Collateral
          </Button>
        );
      default:
        return null;
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
            <div className="text-body-medium text-neutral-dark">{position.currency}</div>
            <div className="text-caption text-neutral-medium">Borrowed</div>
          </div>
        </div>

        {/* LTV Section */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-body-medium text-neutral-dark">{position.ltv}%</span>
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
            ${position.amount.toLocaleString()}
          </div>
          <div className="text-caption text-neutral-medium">Amount</div>
        </div>

        {/* Duration Section */}
        <div className="col-span-1 text-center">
          <div className="text-body-medium text-neutral-dark">{position.duration}d</div>
          <div className="text-caption text-neutral-medium">Duration</div>
        </div>

        {/* APR Section */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-body-medium text-accent font-semibold">{position.apr}%</span>
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

        {/* Status & Offers Section */}
        <div className="col-span-2 flex flex-col items-center gap-2">
          <StatusBadge 
            status={position.status.charAt(0).toUpperCase() + position.status.slice(1).replace('-', ' ')}
            variant={getStatusVariant(position.status)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline"
                className="border-border text-neutral-dark hover:bg-muted text-body-medium"
              >
                <Eye className="h-4 w-4 mr-1" />
                {position.offersCount} Offers
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Lender Offers for {position.loanId}</DialogTitle>
                <DialogDescription>
                  View and manage lender offers for your loan request. You can review terms and accept offers that meet your requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-body text-neutral-medium">
                  {position.offersCount} lenders have made offers for this loan request.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-body text-neutral-dark">
                    Offer details would be displayed here...
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Action Section */}
        <div className="col-span-1 flex justify-end">
          {getActionButtons(position)}
        </div>
      </div>

      {/* Additional Info Row */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-caption text-neutral-medium">
            ID: <span className="text-neutral-dark font-medium">{position.loanId}</span>
          </div>
          <div className="text-caption text-neutral-medium">
            Status: <span className="text-neutral-dark font-medium">{position.status.replace('-', ' ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs text-primary">🔥</span>
          </div>
          <span className="text-caption text-neutral-medium">+{position.offersCount}</span>
        </div>
      </div>
    </div>
  );
}