import { useState } from "react";
import { formatKES } from "@/lib/formatCurrency";

const bookings = [
  { id: "BK-001", customer: "Mary Wanjiku", phone: "+254 712 345 678", car: "Toyota Prado TX", plate: "KCZ 456P", type: "Self-Drive", startDate: "2024-01-15", endDate: "2024-01-18", status: "Active", amount: 25500, paid: true },
  { id: "BK-002", customer: "Peter Ochieng", phone: "+254 723 456 789", car: "Mercedes E-Class", plate: "KDA 789Q", type: "Chauffeur", startDate: "2024-01-16", endDate: "2024-01-16", status: "Pending", amount: 15000, paid: false },
  { id: "BK-003", customer: "Grace Muthoni", phone: "+254 734 567 890", car: "Nissan X-Trail", plate: "KCB 123M", type: "Self-Drive", startDate: "2024-01-10", endDate: "2024-01-14", status: "Completed", amount: 24000, paid: true },
  { id: "BK-004", customer: "James Kiprop", phone: "+254 745 678 901", car: "Land Cruiser V8", plate: "KDB 567R", type: "Long-term", startDate: "2024-01-01", endDate: "2024-01-31", status: "Active", amount: 180000, paid: true },
  { id: "BK-005", customer: "Susan Akinyi", phone: "+254 756 789 012", car: "Toyota Hiace", plate: "KCC 890N", type: "Chauffeur", startDate: "2024-01-17", endDate: "2024-01-17", status: "Pending", amount: 18000, paid: false },
];

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchesSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Bookings</h2>
          <p className="text-muted-foreground">Manage customer reservations</p>
        </div>
        <button className="px-4 py-2 bg-foreground text-background rounded">
          + New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === "Active").length}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === "Pending").length}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Completed").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by customer or ID..."
          className="flex-1 p-2 border border-border rounded bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="p-2 border border-border rounded bg-background"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map((booking) => (
          <div key={booking.id} className="bg-card border border-border p-4 rounded">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{booking.id}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    booking.status === "Active" ? "bg-green-100 text-green-800" :
                    booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {booking.status}
                  </span>
                  <span className="px-2 py-1 bg-muted rounded text-xs">{booking.type}</span>
                  {booking.paid && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Paid</span>}
                </div>
                <p className="font-semibold">{booking.customer}</p>
                <p className="text-sm text-muted-foreground">{booking.phone}</p>
                <p className="text-sm">{booking.car} • {booking.plate}</p>
                <p className="text-sm text-muted-foreground">{booking.startDate} → {booking.endDate}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-xl font-bold">{formatKES(booking.amount)}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-border rounded text-sm">View</button>
                  {booking.status === "Pending" && (
                    <button className="px-3 py-1 bg-foreground text-background rounded text-sm">Confirm</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
