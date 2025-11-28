import { useState } from "react";
import { Plus, Search, Filter, Fuel, Wrench, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatKES } from "@/lib/formatCurrency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const expenses = [
  {
    id: 1,
    category: "Fuel",
    description: "Fuel refill - Toyota Prado TX",
    vehicle: "KCZ 456P",
    amount: 8500,
    date: "2024-01-15",
    receipt: true,
  },
  {
    id: 2,
    category: "Maintenance",
    description: "Oil change and filter replacement",
    vehicle: "KDA 789Q",
    amount: 12000,
    date: "2024-01-14",
    receipt: true,
  },
  {
    id: 3,
    category: "Insurance",
    description: "Annual comprehensive insurance renewal",
    vehicle: "KCB 123M",
    amount: 65000,
    date: "2024-01-10",
    receipt: true,
  },
  {
    id: 4,
    category: "Fuel",
    description: "Fuel refill - Land Cruiser V8",
    vehicle: "KDB 567R",
    amount: 15000,
    date: "2024-01-13",
    receipt: true,
  },
  {
    id: 5,
    category: "Maintenance",
    description: "Brake pads replacement",
    vehicle: "KBZ 234L",
    amount: 8500,
    date: "2024-01-12",
    receipt: false,
  },
  {
    id: 6,
    category: "License",
    description: "Annual road license renewal",
    vehicle: "KCC 890N",
    amount: 7500,
    date: "2024-01-11",
    receipt: true,
  },
  {
    id: 7,
    category: "Maintenance",
    description: "Tire replacement (4 tires)",
    vehicle: "KCZ 456P",
    amount: 48000,
    date: "2024-01-08",
    receipt: true,
  },
];

const categoryIcons = {
  Fuel: Fuel,
  Maintenance: Wrench,
  Insurance: Shield,
  License: FileText,
};

const categoryColors = {
  Fuel: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Maintenance: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Insurance: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  License: "bg-chart-1/10 text-chart-1 border-chart-1/20",
};

export default function Expenses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const fuelExpenses = expenses
    .filter((e) => e.category === "Fuel")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const maintenanceExpenses = expenses
    .filter((e) => e.category === "Maintenance")
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Expense Tracker</h2>
          <p className="text-muted-foreground">
            Track and manage fleet expenses in KES
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fuel">Fuel</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="License">License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KCZ 456P">KCZ 456P - Toyota Prado</SelectItem>
                    <SelectItem value="KDA 789Q">KDA 789Q - Mercedes E-Class</SelectItem>
                    <SelectItem value="KCB 123M">KCB 123M - Nissan X-Trail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount (KES)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter expense details..." />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Save Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">{formatKES(totalExpenses)}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Fuel Costs</p>
            <p className="text-2xl font-bold text-chart-4">
              {formatKES(fuelExpenses)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {((fuelExpenses / totalExpenses) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Maintenance</p>
            <p className="text-2xl font-bold text-chart-3">
              {formatKES(maintenanceExpenses)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {((maintenanceExpenses / totalExpenses) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Fuel">Fuel</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Insurance">Insurance</SelectItem>
            <SelectItem value="License">License</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expenses List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => {
                  const Icon =
                    categoryIcons[expense.category as keyof typeof categoryIcons];
                  return (
                    <tr
                      key={expense.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            categoryColors[
                              expense.category as keyof typeof categoryColors
                            ]
                          }
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {expense.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{expense.description}</td>
                      <td className="py-3 px-4 text-sm font-mono">
                        {expense.vehicle}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {expense.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-medium">
                        {formatKES(expense.amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
