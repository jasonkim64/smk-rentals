import { formatKES } from "@/lib/formatCurrency";

const recentBookings = [
  { id: "BK-001", customer: "Mary Wanjiku", car: "Toyota Prado TX", type: "Self-Drive", status: "Active", amount: 8500 },
  { id: "BK-002", customer: "Peter Ochieng", car: "Mercedes E-Class", type: "Chauffeur", status: "Pending", amount: 15000 },
  { id: "BK-003", customer: "Grace Muthoni", car: "Nissan X-Trail", type: "Self-Drive", status: "Completed", amount: 6000 },
  { id: "BK-004", customer: "James Kiprop", car: "Land Cruiser V8", type: "Long-term", status: "Active", amount: 180000 },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Fleet</p>
          <p className="text-2xl font-bold">48</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Active Bookings</p>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold">156</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="text-2xl font-bold">{formatKES(720000)}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-sm">ID</th>
                <th className="text-left p-3 text-sm">Customer</th>
                <th className="text-left p-3 text-sm">Vehicle</th>
                <th className="text-left p-3 text-sm">Type</th>
                <th className="text-left p-3 text-sm">Status</th>
                <th className="text-right p-3 text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border">
                  <td className="p-3 text-sm">{booking.id}</td>
                  <td className="p-3 text-sm">{booking.customer}</td>
                  <td className="p-3 text-sm">{booking.car}</td>
                  <td className="p-3 text-sm">{booking.type}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === "Active" ? "bg-green-100 text-green-800" :
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right font-medium">{formatKES(booking.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
