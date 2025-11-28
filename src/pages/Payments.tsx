import { useState } from "react";
import { formatKES } from "@/lib/formatCurrency";

const payments = [
  { id: "INV-001", customer: "Mary Wanjiku", booking: "BK-001", amount: 25500, method: "M-Pesa", status: "Completed", date: "2024-01-15", reference: "QKJ7HGDM2N" },
  { id: "INV-002", customer: "Peter Ochieng", booking: "BK-002", amount: 15000, method: "Card", status: "Pending", date: "2024-01-16", reference: "-" },
  { id: "INV-003", customer: "Grace Muthoni", booking: "BK-003", amount: 24000, method: "M-Pesa", status: "Completed", date: "2024-01-14", reference: "RKL9MFPQ4X" },
  { id: "INV-004", customer: "James Kiprop", booking: "BK-004", amount: 180000, method: "Bank Transfer", status: "Completed", date: "2024-01-01", reference: "BT-2024-001" },
  { id: "INV-005", customer: "Susan Akinyi", booking: "BK-005", amount: 18000, method: "M-Pesa", status: "Failed", date: "2024-01-17", reference: "-" },
  { id: "INV-006", customer: "David Mwangi", booking: "BK-006", amount: 35000, method: "Card", status: "Completed", date: "2024-01-13", reference: "CARD-X789" },
];

export default function Payments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = payments.filter((p) => {
    const matchesSearch = p.customer.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReceived = payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Payments & Invoices</h2>
          <p className="text-muted-foreground">Track payments and invoices</p>
        </div>
        <button className="px-4 py-2 border border-border rounded">
          Export Report
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Received</p>
          <p className="text-2xl font-bold text-green-600">{formatKES(totalReceived)}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="text-2xl font-bold text-yellow-600">{formatKES(totalPending)}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Transactions</p>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by customer or invoice..."
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
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="bg-card border border-border rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 text-sm">Invoice</th>
              <th className="text-left p-3 text-sm">Customer</th>
              <th className="text-left p-3 text-sm">Method</th>
              <th className="text-left p-3 text-sm">Reference</th>
              <th className="text-left p-3 text-sm">Date</th>
              <th className="text-left p-3 text-sm">Status</th>
              <th className="text-right p-3 text-sm">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => (
              <tr key={payment.id} className="border-b border-border">
                <td className="p-3 text-sm font-mono">{payment.id}</td>
                <td className="p-3 text-sm">{payment.customer}</td>
                <td className="p-3 text-sm">{payment.method}</td>
                <td className="p-3 text-sm font-mono text-muted-foreground">{payment.reference}</td>
                <td className="p-3 text-sm text-muted-foreground">{payment.date}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    payment.status === "Completed" ? "bg-green-100 text-green-800" :
                    payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-right font-medium">{formatKES(payment.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
