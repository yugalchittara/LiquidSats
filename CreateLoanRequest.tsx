import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { HelpCircle, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function CreateLoanRequest() {
  const [borrowAmount, setBorrowAmount] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [ltv, setLtv] = useState([75]);
  const [duration, setDuration] = useState("");
  const [apr, setApr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Loan request submitted");
    }, 2000);
  };

  // Calculate collateral based on LTV and amount
  const calculateCollateral = () => {
    if (borrowAmount && ltv[0]) {
      const btcPrice = 65000; // Mock BTC price
      const collateralValue = (parseFloat(borrowAmount) / ltv[0]) * 100;
      const btcAmount = collateralValue / btcPrice;
      setCollateralAmount(btcAmount.toFixed(6));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-subheading text-neutral-dark">
            Create Loan Request
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="borrowAmount" className="text-body-medium text-neutral-dark">
                  Borrow Amount (USDT)
                </Label>
                <Input
                  id="borrowAmount"
                  type="number"
                  placeholder="50,000"
                  value={borrowAmount}
                  onChange={(e) => {
                    setBorrowAmount(e.target.value);
                    calculateCollateral();
                  }}
                  className="bg-input-background border-border text-body text-neutral-dark"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="collateralAmount" className="text-body-medium text-neutral-dark">
                  Collateral Amount (wBTC)
                </Label>
                <Input
                  id="collateralAmount"
                  type="number"
                  placeholder="Auto-calculated"
                  value={collateralAmount}
                  readOnly
                  className="bg-muted border-border text-body text-neutral-medium"
                />
              </div>
            </div>

            {/* LTV Slider */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-body-medium text-neutral-dark">
                  LTV Ratio: {ltv[0]}%
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-neutral-medium" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Loan-to-Value ratio determines your collateral requirement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                value={ltv}
                onValueChange={(value) => {
                  setLtv(value);
                  calculateCollateral();
                }}
                max={85}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-caption text-neutral-medium">
                <span>50% (Safe)</span>
                <span>85% (Risky)</span>
              </div>
            </div>

            {/* Duration and APR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-body-medium text-neutral-dark">
                  Duration
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-input-background border-border text-body">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="apr" className="text-body-medium text-neutral-dark">
                    APR (%)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-neutral-medium" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annual Percentage Rate you're willing to pay</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="apr"
                  type="number"
                  placeholder="8.5"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  className="bg-input-background border-border text-body text-neutral-dark"
                />
              </div>
            </div>

            {/* Additional Information Card */}
            <Card className="border border-border bg-muted/30">
              <CardContent className="p-4">
                <h3 className="text-body-medium text-neutral-dark mb-3">
                  Loan Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-body">
                  <div>
                    <p className="text-neutral-medium">Max Borrowable Amount</p>
                    <p className="font-semibold text-neutral-dark">
                      ${borrowAmount ? parseFloat(borrowAmount).toLocaleString() : '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-medium">Liquidation Threshold</p>
                    <p className="font-semibold text-warning">
                      {ltv[0] ? Math.round(ltv[0] + 10) : 85}%
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-medium">BTC Collateral Needed</p>
                    <p className="font-semibold text-neutral-dark">
                      {collateralAmount || '0'} wBTC
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !borrowAmount || !duration || !apr}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-body-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Request...
                  </>
                ) : (
                  "Submit Loan Request"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}