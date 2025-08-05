import { Card, CardContent } from "./ui/card";

export function EarnStats() {
  const stats = [
    {
      label: "Total USDT Lent",
      value: "$2.4M",
      subtext: "+$340K this week",
      icon: "💰"
    },
    {
      label: "Active Loans",
      value: "89",
      subtext: "85% filled",
      icon: "📊"
    },
    {
      label: "Total Loan Requests",
      value: "127",
      subtext: "+12 this week",
      icon: "📋"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-white/20 bg-white/60 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{stat.icon}</div>
              <div className="space-y-1">
                <p className="text-sm text-blue-700">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-semibold text-blue-900">{stat.value}</p>
                  <p className="text-xs text-green-700">{stat.subtext}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}