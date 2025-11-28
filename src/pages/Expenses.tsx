import { useState } from "react";
import { formatKES } from "@/lib/formatCurrency";

const expenses = [
  { id: 1, category: "Fuel", description: "Fuel refill - Toyota Prado TX", vehicle: "KCZ 456P", amount: 8500, date: "2024-01-15" },
  { id: 2, category: "Maintenance", description: "Oil change and filter replacement", vehicle: "KDA 789Q", amount: 12000, date: "2024-01-14" },
  { id: 3, category: "Insurance", description: "Annual comprehensive insurance renewal", vehicle: "KCB 123M", amount: 65000, date: "2024-01-10" },
  { id: 4, category: "Fuel", description: "Fuel refill - Land Cruiser V8", vehicle: "KDB 567R", amount: 15000, date: "2024-01-13" },
  { id: 5, category: "Maintenance", description: "Brake pads replacement", vehicle: "KBZ 234L", amount: 8500, date: "2024-01-12" },
  { id: 6, category: "License", description: "Annual road license renewal", vehicle: "KCC 890N", amount: 7500, date: "2024-01-11" },
  { id: 7, category: "Maintenance", description: "Tire replacement (4 tires)", vehicle: "KCZ 456P", amount: 48000, date: "2024-01-08" },
];

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = expenses.filter((e) => {
    const matchesSearch = e.description.toLowerCase().includes(search.toLowerCase()) || e.vehicle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const fuelTotal = expenses.filter(e => e.category === "Fuel").reduce((sum, e) => sum + e.amount, 0);
  const maintenanceTotal = expenses.filter(e => e.category === "Maintenance").reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Expense Tracker</h2>
          <p className="text-muted-foreground">Track fleet expenses in KES</p>
        </div>
        <button className="px-4 py-2 bg-foreground text-background rounded">
          + Add Expense
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold">{formatKES(total)}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Fuel Costs</p>
          <p className="text-2xl font-bold">{formatKES(fuelTotal)}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground">Maintenance</p>
          <p className="text-2xl font-bold">{formatKES(maintenanceTotal)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search expenses..."
          className="flex-1 p-2 border border-border rounded bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="p-2 border border-border rounded bg-background"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Fuel">Fuel</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Insurance">Insurance</option>
          <option value="License">License</option>
        </select>
      </div>

      {/* Expenses Table */}
      <div className="bg-card border border-border rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 text-sm">Category</th>
              <th className="text-left p-3 text-sm">Description</th>
              <th className="text-left p-3 text-sm">Vehicle</th>
              <th className="text-left p-3 text-sm">Date</th>
              <th className="text-right p-3 text-sm">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((expense) => (
              <tr key={expense.id} className="border-b border-border">
                <td className="p-3 text-sm">
                  <span className="px-2 py-1 bg-muted rounded text-xs">{expense.category}</span>
                </td>
                <td className="p-3 text-sm">{expense.description}</td>
                <td className="p-3 text-sm font-mono">{expense.vehicle}</td>
                <td className="p-3 text-sm text-muted-foreground">{expense.date}</td>
                <td className="p-3 text-sm text-right font-medium">{formatKES(expense.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
