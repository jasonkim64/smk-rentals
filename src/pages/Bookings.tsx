import { useState } from "react";
import { Search, Filter, Plus, Calendar, MapPin, Clock } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookings = [
  {
    id: "BK-001",
    customer: {
      name: "Mary Wanjiku",
      phone: "+254 712 345 678",
      email: "mary@email.com",
    },
    car: "Toyota Prado TX",
    plate: "KCZ 456P",
    type: "Self-Drive",
    pickupLocation: "JKIA Airport",
    dropoffLocation: "Nairobi CBD",
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    status: "Active",
    amount: 25500,
    paid: true,
  },
  {
    id: "BK-002",
    customer: {
      name: "Peter Ochieng",
      phone: "+254 723 456 789",
      email: "peter@email.com",
    },
    car: "Mercedes E-Class",
    plate: "KDA 789Q",
    type: "Chauffeur",
    pickupLocation: "Westlands",
    dropoffLocation: "Karen",
    startDate: "2024-01-16",
    endDate: "2024-01-16",
    status: "Pending",
    amount: 15000,
    paid: false,
  },
  {
    id: "BK-003",
    customer: {
      name: "Grace Muthoni",
      phone: "+254 734 567 890",
      email: "grace@email.com",
    },
    car: "Nissan X-Trail",
    plate: "KCB 123M",
    type: "Self-Drive",
    pickupLocation: "Mombasa Road",
    dropoffLocation: "Mombasa Road",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    status: "Completed",
    amount: 24000,
    paid: true,
  },
  {
    id: "BK-004",
    customer: {
      name: "James Kiprop",
      phone: "+254 745 678 901",
      email: "james@email.com",
    },
    car: "Land Cruiser V8",
    plate: "KDB 567R",
    type: "Long-term",
    pickupLocation: "Kilimani",
    dropoffLocation: "Kilimani",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Active",
    amount: 180000,
    paid: true,
  },
  {
    id: "BK-005",
    customer: {
      name: "Susan Akinyi",
      phone: "+254 756 789 012",
      email: "susan@email.com",
    },
    car: "Toyota Hiace",
    plate: "KCC 890N",
    type: "Chauffeur",
    pickupLocation: "Naivasha",
    dropoffLocation: "Nairobi CBD",
    startDate: "2024-01-17",
    endDate: "2024-01-17",
    status: "Pending",
    amount: 18000,
    paid: false,
  },
];

const statusColors = {
  Active: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-muted text-muted-foreground border-muted",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Bookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.car.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "Active").length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Bookings</h2>
          <p className="text-muted-foreground">
            Manage customer reservations and rentals
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="animate-fade-in">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {booking.id}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        statusColors[booking.status as keyof typeof statusColors]
                      }
                    >
                      {booking.status}
                    </Badge>
                    <Badge variant="secondary">{booking.type}</Badge>
                    {booking.paid && (
                      <Badge className="bg-success/10 text-success border-success/20">
                        Paid
                      </Badge>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">{booking.customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.customer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">{booking.car}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.plate}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {booking.startDate} → {booking.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {booking.pickupLocation} → {booking.dropoffLocation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3">
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      {formatKES(booking.amount)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {booking.status === "Pending" && (
                      <Button size="sm">Confirm</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
