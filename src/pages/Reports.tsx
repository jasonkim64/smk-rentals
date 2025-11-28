import { Download, TrendingUp, TrendingDown, Car, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKES, formatNumber } from "@/lib/formatCurrency";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jul", revenue: 380000, expenses: 120000 },
  { month: "Aug", revenue: 420000, expenses: 145000 },
  { month: "Sep", revenue: 480000, expenses: 130000 },
  { month: "Oct", revenue: 520000, expenses: 160000 },
  { month: "Nov", revenue: 610000, expenses: 175000 },
  { month: "Dec", revenue: 720000, expenses: 190000 },
];

const vehicleUtilization = [
  { name: "SUVs", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Luxury", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Economy", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Vans", value: 10, color: "hsl(var(--chart-4))" },
];

const bookingTypes = [
  { type: "Self-Drive", count: 156, revenue: 1250000 },
  { type: "Chauffeur", count: 89, revenue: 890000 },
  { type: "Long-term", count: 23, revenue: 2150000 },
  { type: "Airport", count: 78, revenue: 420000 },
];

const topVehicles = [
  { name: "Toyota Prado TX", bookings: 42, revenue: 357000 },
  { name: "Land Cruiser V8", bookings: 28, revenue: 504000 },
  { name: "Mercedes E-Class", bookings: 35, revenue: 525000 },
  { name: "Nissan X-Trail", bookings: 38, revenue: 228000 },
  { name: "Toyota Hiace", bookings: 21, revenue: 252000 },
];

export default function Reports() {
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((sum, d) => sum + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Business insights and performance metrics
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold">{formatKES(totalRevenue)}</p>
            <p className="text-sm text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +18% vs last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm">Total Expenses</span>
            </div>
            <p className="text-2xl font-bold">{formatKES(totalExpenses)}</p>
            <p className="text-sm text-destructive flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12% vs last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Car className="h-4 w-4" />
              <span className="text-sm">Net Profit</span>
            </div>
            <p className="text-2xl font-bold text-success">{formatKES(netProfit)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {profitMargin}% margin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Total Bookings</span>
            </div>
            <p className="text-2xl font-bold">346</p>
            <p className="text-sm text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +24% vs last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatKES(value)}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExp)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fleet Utilization by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={vehicleUtilization}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {vehicleUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Types Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingTypes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="type" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVehicles.map((vehicle, index) => (
                <div key={vehicle.name} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{vehicle.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.bookings} bookings
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    {formatKES(vehicle.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
