import { useState } from "react";
import { Plus, Search, Filter, Car, Fuel, Users, Settings2 } from "lucide-react";
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

const cars = [
  {
    id: 1,
    name: "Toyota Prado TX",
    image: "https://images.unsplash.com/photo-1625231334168-25bec0aca7de?w=400&h=300&fit=crop",
    category: "SUV",
    year: 2022,
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    dailyRate: 8500,
    status: "Available",
    plate: "KCZ 456P",
  },
  {
    id: 2,
    name: "Mercedes E-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    category: "Luxury",
    year: 2023,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    dailyRate: 15000,
    status: "Rented",
    plate: "KDA 789Q",
  },
  {
    id: 3,
    name: "Nissan X-Trail",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
    category: "SUV",
    year: 2021,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    dailyRate: 6000,
    status: "Available",
    plate: "KCB 123M",
  },
  {
    id: 4,
    name: "Land Cruiser V8",
    image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400&h=300&fit=crop",
    category: "Premium SUV",
    year: 2023,
    seats: 8,
    fuel: "Diesel",
    transmission: "Automatic",
    dailyRate: 18000,
    status: "Maintenance",
    plate: "KDB 567R",
  },
  {
    id: 5,
    name: "Toyota Vitz",
    image: "https://images.unsplash.com/photo-1623006772851-a950dc9d322b?w=400&h=300&fit=crop",
    category: "Economy",
    year: 2020,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    dailyRate: 3500,
    status: "Available",
    plate: "KBZ 234L",
  },
  {
    id: 6,
    name: "Toyota Hiace",
    image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400&h=300&fit=crop",
    category: "Van",
    year: 2022,
    seats: 14,
    fuel: "Diesel",
    transmission: "Manual",
    dailyRate: 12000,
    status: "Available",
    plate: "KCC 890N",
  },
];

const statusColors = {
  Available: "bg-success/10 text-success border-success/20",
  Rented: "bg-primary/10 text-primary border-primary/20",
  Maintenance: "bg-warning/10 text-warning border-warning/20",
};

export default function Fleet() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.plate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Fleet Management</h2>
          <p className="text-muted-foreground">Manage your vehicle inventory</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or plate..."
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
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Rented">Rented</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in"
          >
            <div className="relative h-48">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <Badge
                variant="outline"
                className={`absolute top-3 right-3 ${statusColors[car.status as keyof typeof statusColors]}`}
              >
                {car.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {car.category} • {car.year}
                  </p>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {car.plate}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{car.seats}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Fuel className="h-4 w-4" />
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Settings2 className="h-4 w-4" />
                  <span>{car.transmission.slice(0, 4)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xl font-bold text-primary">
                    {formatKES(car.dailyRate)}
                  </p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
