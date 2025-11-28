import { useState } from "react";
import { formatKES } from "@/lib/formatCurrency";

const cars = [
  { id: 1, name: "Toyota Prado TX", image: "https://images.unsplash.com/photo-1625231334168-25bec0aca7de?w=400&h=300&fit=crop", category: "SUV", year: 2022, seats: 7, fuel: "Diesel", transmission: "Automatic", dailyRate: 8500, status: "Available", plate: "KCZ 456P" },
  { id: 2, name: "Mercedes E-Class", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop", category: "Luxury", year: 2023, seats: 5, fuel: "Petrol", transmission: "Automatic", dailyRate: 15000, status: "Rented", plate: "KDA 789Q" },
  { id: 3, name: "Nissan X-Trail", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", category: "SUV", year: 2021, seats: 5, fuel: "Petrol", transmission: "Automatic", dailyRate: 6000, status: "Available", plate: "KCB 123M" },
  { id: 4, name: "Land Cruiser V8", image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400&h=300&fit=crop", category: "Premium SUV", year: 2023, seats: 8, fuel: "Diesel", transmission: "Automatic", dailyRate: 18000, status: "Maintenance", plate: "KDB 567R" },
  { id: 5, name: "Toyota Vitz", image: "https://images.unsplash.com/photo-1623006772851-a950dc9d322b?w=400&h=300&fit=crop", category: "Economy", year: 2020, seats: 5, fuel: "Petrol", transmission: "Automatic", dailyRate: 3500, status: "Available", plate: "KBZ 234L" },
  { id: 6, name: "Toyota Hiace", image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400&h=300&fit=crop", category: "Van", year: 2022, seats: 14, fuel: "Diesel", transmission: "Manual", dailyRate: 12000, status: "Available", plate: "KCC 890N" },
];

export default function Fleet() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || car.plate.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Fleet Management</h2>
          <p className="text-muted-foreground">Manage your vehicle inventory</p>
        </div>
        <button className="px-4 py-2 bg-foreground text-background rounded">
          + Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or plate..."
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
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((car) => (
          <div key={car.id} className="bg-card border border-border rounded overflow-hidden">
            <div className="relative">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${
                car.status === "Available" ? "bg-green-100 text-green-800" :
                car.status === "Rented" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {car.status}
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">{car.category} • {car.year}</p>
                </div>
                <span className="text-sm text-muted-foreground">{car.plate}</span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                <span>{car.seats} seats</span>
                <span>{car.fuel}</span>
                <span>{car.transmission}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <div>
                  <p className="text-lg font-bold">{formatKES(car.dailyRate)}</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
                <button className="px-3 py-1 border border-border rounded text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
