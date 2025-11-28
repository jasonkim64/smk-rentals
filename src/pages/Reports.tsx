import { formatKES } from "@/lib/formatCurrency";

const monthlyData = [
  { month: "Jul", revenue: 380000, expenses: 120000 },
  { month: "Aug", revenue: 420000, expenses: 145000 },
  { month: "Sep", revenue: 480000, expenses: 130000 },
  { month: "Oct", revenue: 520000, expenses: 160000 },
  { month: "Nov", revenue: 610000, expenses: 175000 },
  { month: "Dec", revenue: 720000, expenses: 190000 },
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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Business performance overview</p>
        </div>
        <button className="px-4 py-2 border border-border rounded">
          Download Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold">{formatKES(totalRevenue)}</p>
          <p className="text-sm text-green-600">+18% vs last period</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold">{formatKES(totalExpenses)}</p>
          <p className="text-sm text-red-600">+12% vs last period</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Net Profit</p>
          <p className="text-2xl font-bold text-green-600">{formatKES(netProfit)}</p>
          <p className="text-sm text-muted-foreground">{((netProfit / totalRevenue) * 100).toFixed(1)}% margin</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold">346</p>
          <p className="text-sm text-green-600">+24% vs last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Table */}
        <div className="bg-card border border-border rounded">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">Monthly Revenue vs Expenses</h3>
          </div>
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-sm">Month</th>
                <th className="text-right p-3 text-sm">Revenue</th>
                <th className="text-right p-3 text-sm">Expenses</th>
                <th className="text-right p-3 text-sm">Profit</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row) => (
                <tr key={row.month} className="border-b border-border">
                  <td className="p-3 text-sm">{row.month}</td>
                  <td className="p-3 text-sm text-right">{formatKES(row.revenue)}</td>
                  <td className="p-3 text-sm text-right">{formatKES(row.expenses)}</td>
                  <td className="p-3 text-sm text-right text-green-600">{formatKES(row.revenue - row.expenses)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booking Types */}
        <div className="bg-card border border-border rounded">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">Booking Types Performance</h3>
          </div>
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-sm">Type</th>
                <th className="text-right p-3 text-sm">Bookings</th>
                <th className="text-right p-3 text-sm">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {bookingTypes.map((row) => (
                <tr key={row.type} className="border-b border-border">
                  <td className="p-3 text-sm">{row.type}</td>
                  <td className="p-3 text-sm text-right">{row.count}</td>
                  <td className="p-3 text-sm text-right">{formatKES(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Vehicles */}
      <div className="bg-card border border-border rounded mt-6">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold">Top Performing Vehicles</h3>
        </div>
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 text-sm">#</th>
              <th className="text-left p-3 text-sm">Vehicle</th>
              <th className="text-right p-3 text-sm">Bookings</th>
              <th className="text-right p-3 text-sm">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topVehicles.map((vehicle, index) => (
              <tr key={vehicle.name} className="border-b border-border">
                <td className="p-3 text-sm font-bold text-muted-foreground">{index + 1}</td>
                <td className="p-3 text-sm">{vehicle.name}</td>
                <td className="p-3 text-sm text-right">{vehicle.bookings}</td>
                <td className="p-3 text-sm text-right font-medium">{formatKES(vehicle.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
