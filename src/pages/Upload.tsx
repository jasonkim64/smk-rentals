import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Upload() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    transmission: "",
    fuel: "",
    seats: "",
    plate: "",
    dailyRate: "",
    location: "",
    description: "",
    selfDrive: true,
    chauffeur: false,
    longTerm: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Car Listed Successfully!",
      description: "Your vehicle has been submitted for review.",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Listing Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Your vehicle has been submitted for review. We'll notify you once it's approved.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            className="px-4 py-2 border border-border rounded"
            onClick={() => setSubmitted(false)}
          >
            List Another Car
          </button>
          <button className="px-4 py-2 bg-foreground text-background rounded">
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">List Your Car</h1>
        <p className="text-muted-foreground">
          Turn your car into income. Join SMK Rentals and start earning.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded p-6 space-y-6">
        <h3 className="font-bold border-b border-border pb-2">Vehicle Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Make *</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-border rounded bg-background"
              placeholder="e.g., Toyota"
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Model *</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-border rounded bg-background"
              placeholder="e.g., Prado TX"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Year *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            >
              <option value="">Select year</option>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Category *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select category</option>
              <option value="Economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Van">Van</option>
              <option value="Premium SUV">Premium SUV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Transmission *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Fuel Type *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.fuel}
              onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Seats *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
            >
              <option value="">Select seats</option>
              {[2, 4, 5, 7, 8, 12, 14].map((seats) => (
                <option key={seats} value={seats}>{seats} seats</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">License Plate *</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-border rounded bg-background"
              placeholder="e.g., KCZ 456P"
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Rental Options</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.selfDrive}
                onChange={(e) => setFormData({ ...formData, selfDrive: e.target.checked })}
              />
              <span className="text-sm">Self-Drive</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.chauffeur}
                onChange={(e) => setFormData({ ...formData, chauffeur: e.target.checked })}
              />
              <span className="text-sm">With Chauffeur</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.longTerm}
                onChange={(e) => setFormData({ ...formData, longTerm: e.target.checked })}
              />
              <span className="text-sm">Long-term Hire</span>
            </label>
          </div>
        </div>

        <h3 className="font-bold border-b border-border pb-2 pt-4">Pricing & Location</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Daily Rate (KES) *</label>
            <input
              type="number"
              required
              className="w-full p-2 border border-border rounded bg-background"
              placeholder="e.g., 5000"
              value={formData.dailyRate}
              onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Pickup Location *</label>
            <select
              required
              className="w-full p-2 border border-border rounded bg-background"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option value="">Select location</option>
              <option value="Nairobi CBD">Nairobi CBD</option>
              <option value="Westlands">Westlands</option>
              <option value="Karen">Karen</option>
              <option value="Kilimani">Kilimani</option>
              <option value="JKIA Airport">JKIA Airport</option>
              <option value="Mombasa">Mombasa</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Vehicle Description</label>
          <textarea
            className="w-full p-2 border border-border rounded bg-background"
            rows={3}
            placeholder="Describe your vehicle..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-1">Vehicle Photos</label>
          <div className="border-2 border-dashed border-border rounded p-6 text-center">
            <p className="text-muted-foreground mb-2">Drag and drop photos here</p>
            <button type="button" className="px-4 py-2 border border-border rounded">
              Select Photos
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-foreground text-background rounded font-medium"
        >
          Submit Listing
        </button>
      </form>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card border border-border p-4 rounded text-center">
          <div className="text-2xl mb-2">💰</div>
          <h3 className="font-bold mb-1">Earn Extra Income</h3>
          <p className="text-sm text-muted-foreground">Average hosts earn KES 50,000+ monthly</p>
        </div>
        <div className="bg-card border border-border p-4 rounded text-center">
          <div className="text-2xl mb-2">🛡️</div>
          <h3 className="font-bold mb-1">Full Insurance</h3>
          <p className="text-sm text-muted-foreground">Comprehensive coverage on all rentals</p>
        </div>
        <div className="bg-card border border-border p-4 rounded text-center">
          <div className="text-2xl mb-2">✓</div>
          <h3 className="font-bold mb-1">Verified Renters</h3>
          <p className="text-sm text-muted-foreground">All customers are ID verified</p>
        </div>
      </div>
    </div>
  );
}
