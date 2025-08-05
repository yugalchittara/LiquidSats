import { Card, CardContent } from "./ui/card";

export function StatsDashboard() {
  const stats = [
    {
      label: "Total Loan Requests",
      value: "127",
      subtext: "+12 this week"
    },
    {
      label: "Total USDT Lent",
      value: "$2.4M",
      subtext: "+$340K this week"
    },
    {
      label: "Active Loans",
      value: "89",
      subtext: "85% filled"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.subtext}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}