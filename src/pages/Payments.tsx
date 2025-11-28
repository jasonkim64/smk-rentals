import { useState } from "react";
import { Search, Filter, Download, CreditCard, Smartphone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatKES } from "@/lib/formatCurrency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const payments = [
  {
    id: "INV-001",
    customer: "Mary Wanjiku",
    booking: "BK-001",
    amount: 25500,
    method: "M-Pesa",
    status: "Completed",
    date: "2024-01-15",
    reference: "QKJ7HGDM2N",
  },
  {
    id: "INV-002",
    customer: "Peter Ochieng",
    booking: "BK-002",
    amount: 15000,
    method: "Card",
    status: "Pending",
    date: "2024-01-16",
    reference: "-",
  },
  {
    id: "INV-003",
    customer: "Grace Muthoni",
    booking: "BK-003",
    amount: 24000,
    method: "M-Pesa",
    status: "Completed",
    date: "2024-01-14",
    reference: "RKL9MFPQ4X",
  },
  {
    id: "INV-004",
    customer: "James Kiprop",
    booking: "BK-004",
    amount: 180000,
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-01-01",
    reference: "BT-2024-001",
  },
  {
    id: "INV-005",
    customer: "Susan Akinyi",
    booking: "BK-005",
    amount: 18000,
    method: "M-Pesa",
    status: "Failed",
    date: "2024-01-17",
    reference: "-",
  },
  {
    id: "INV-006",
    customer: "David Mwangi",
    booking: "BK-006",
    amount: 35000,
    method: "Card",
    status: "Completed",
    date: "2024-01-13",
    reference: "CARD-X789",
  },
];

const statusColors = {
  Completed: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
  Refunded: "bg-muted text-muted-foreground border-muted",
};

const methodIcons = {
  "M-Pesa": Smartphone,
  Card: CreditCard,
  "Bank Transfer": Building,
};

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReceived = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Payments & Invoices</h2>
          <p className="text-muted-foreground">
            Track payments and manage invoices
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Received</p>
            <p className="text-2xl font-bold text-success">
              {formatKES(totalReceived)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Payments</p>
            <p className="text-2xl font-bold text-warning">
              {formatKES(totalPending)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold">{payments.length}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, invoice, or reference..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Invoice
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Reference
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const MethodIcon =
                    methodIcons[payment.method as keyof typeof methodIcons];
                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm">{payment.id}</span>
                      </td>
                      <td className="py-3 px-4 text-sm">{payment.customer}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MethodIcon className="h-4 w-4 text-muted-foreground" />
                          {payment.method}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                        {payment.reference}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {payment.date}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            statusColors[payment.status as keyof typeof statusColors]
                          }
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-medium">
                        {formatKES(payment.amount)}
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
