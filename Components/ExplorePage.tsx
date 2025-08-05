import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function ExplorePage() {
  const topStats = [
    {
      label: "Total Loan Requests",
      value: "347",
      subtext: "+23 this week",
      icon: "📋"
    },
    {
      label: "Total USDT Borrowed",
      value: "$4.2M",
      subtext: "+$580K this week",
      icon: "💰"
    },
    {
      label: "Total wBTC Locked",
      value: "127.8 wBTC",
      subtext: "$12.4M value",
      icon: "🔒"
    },
    {
      label: "Avg APR / APY",
      value: "8.3% / 7.9%",
      subtext: "Borrow / Earn",
      icon: "📈"
    }
  ];

  const volumeData = [
    { month: 'Jan', volume: 1200000 },
    { month: 'Feb', volume: 1800000 },
    { month: 'Mar', volume: 2400000 },
    { month: 'Apr', volume: 2100000 },
    { month: 'May', volume: 2800000 },
    { month: 'Jun', volume: 3200000 },
  ];

  const ltvData = [
    { ltv: '50-60%', count: 45 },
    { ltv: '60-70%', count: 78 },
    { ltv: '70-80%', count: 124 },
    { ltv: '80-85%', count: 89 },
  ];

  const statusData = [
    { name: 'Active', value: 45, color: '#10b981' },
    { name: 'Pending', value: 32, color: '#f59e0b' },
    { name: 'Completed', value: 78, color: '#3b82f6' },
    { name: 'Expired', value: 12, color: '#ef4444' },
  ];

  const recentActivity = [
    {
      id: "LN001",
      borrower: "0x1234...5678",
      amount: 50000,
      ltv: 75,
      status: "Active",
      time: "2 hours ago"
    },
    {
      id: "LN002", 
      borrower: "0x9876...4321",
      amount: 25000,
      ltv: 70,
      status: "Pending",
      time: "4 hours ago"
    },
    {
      id: "LN003",
      borrower: "0x5555...9999",
      amount: 100000,
      ltv: 80,
      status: "Completed",
      time: "6 hours ago"
    },
    {
      id: "LN004",
      borrower: "0x1111...2222",
      amount: 75000,
      ltv: 72,
      status: "Active",
      time: "8 hours ago"
    },
    {
      id: "LN005",
      borrower: "0x3333...4444",
      amount: 60000,
      ltv: 78,
      status: "Expired",
      time: "12 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Platform Analytics</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive overview of lending platform activity and performance metrics.
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {topStats.map((stat, index) => (
            <Card key={index} className="border border-gray-200 bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.subtext}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Volume Chart */}
          <Card className="bg-white shadow-md border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle>Loan Volume Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Volume']} />
                  <Area type="monotone" dataKey="volume" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LTV Distribution */}
          <Card className="bg-white shadow-md border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle>LTV Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ltvData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ltv" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-md border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle>Loan Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Additional Stats Card */}
          <Card className="bg-white shadow-md border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Loan Size</span>
                <span className="font-semibold">$62,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Default Rate</span>
                <span className="font-semibold text-green-600">2.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Loan Duration</span>
                <span className="font-semibold">45 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-semibold">0.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="bg-white shadow-md border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>LTV</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity, index) => (
                    <TableRow 
                      key={activity.id} 
                      className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <TableCell className="font-medium">{activity.id}</TableCell>
                      <TableCell className="font-mono text-sm">{activity.borrower}</TableCell>
                      <TableCell>${activity.amount.toLocaleString()}</TableCell>
                      <TableCell>{activity.ltv}%</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{activity.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}