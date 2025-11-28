import { useState } from "react";
import { Upload as UploadIcon, Car, Image, CheckCircle, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

export default function Upload() {
  const [step, setStep] = useState(1);
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

  const handleSubmit = () => {
    toast({
      title: "Car Listed Successfully!",
      description: "Your vehicle has been submitted for review. We'll notify you once it's approved.",
    });
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">List Your Car</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Turn your car into income. Join SafariWheels and start earning by renting out your vehicle to verified customers.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <CheckCircle className="h-5 w-5" /> : s}
            </div>
            <span className={`hidden sm:block text-sm ${step >= s ? "font-medium" : "text-muted-foreground"}`}>
              {s === 1 ? "Vehicle Info" : s === 2 ? "Pricing & Photos" : "Complete"}
            </span>
            {s < 3 && <div className="w-8 h-0.5 bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Vehicle Information */}
      {step === 1 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Vehicle Information
            </CardTitle>
            <CardDescription>
              Tell us about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  placeholder="e.g., Toyota"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g., Prado TX"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Premium SUV">Premium SUV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select
                  value={formData.fuel}
                  onValueChange={(value) => setFormData({ ...formData, fuel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats</Label>
                <Select
                  value={formData.seats}
                  onValueChange={(value) => setFormData({ ...formData, seats: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 4, 5, 7, 8, 12, 14].map((seats) => (
                      <SelectItem key={seats} value={seats.toString()}>
                        {seats} seats
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate">License Plate</Label>
                <Input
                  id="plate"
                  placeholder="e.g., KCZ 456P"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rental Options</Label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="selfDrive"
                    checked={formData.selfDrive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, selfDrive: checked as boolean })
                    }
                  />
                  <Label htmlFor="selfDrive" className="font-normal">
                    Self-Drive
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chauffeur"
                    checked={formData.chauffeur}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, chauffeur: checked as boolean })
                    }
                  />
                  <Label htmlFor="chauffeur" className="font-normal">
                    With Chauffeur
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="longTerm"
                    checked={formData.longTerm}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, longTerm: checked as boolean })
                    }
                  />
                  <Label htmlFor="longTerm" className="font-normal">
                    Long-term Hire
                  </Label>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => setStep(2)}>
              Continue to Pricing & Photos
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Pricing & Photos */}
      {step === 2 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              Pricing & Photos
            </CardTitle>
            <CardDescription>
              Set your daily rate and upload vehicle photos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dailyRate">Daily Rate (KES)</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.dailyRate}
                  onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nairobi CBD">Nairobi CBD</SelectItem>
                    <SelectItem value="Westlands">Westlands</SelectItem>
                    <SelectItem value="Karen">Karen</SelectItem>
                    <SelectItem value="Kilimani">Kilimani</SelectItem>
                    <SelectItem value="JKIA Airport">JKIA Airport</SelectItem>
                    <SelectItem value="Mombasa">Mombasa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Vehicle Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your vehicle, its features, and any special instructions..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Vehicle Photos</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <UploadIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Drag and drop photos here</p>
                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse (min 4 photos recommended)
                </p>
                <Button variant="outline" className="mt-4">
                  Select Photos
                </Button>
              </div>
            </div>

            <div className="bg-accent/50 rounded-lg p-4 flex gap-3">
              <Info className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent-foreground">Photo Tips</p>
                <p className="text-muted-foreground">
                  Include exterior shots from all angles, interior photos, dashboard, and any unique features. Good photos increase booking rates by up to 50%.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                Submit Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <Card className="animate-scale-in text-center">
          <CardContent className="py-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Listing Submitted!</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Your vehicle has been submitted for review. Our team will verify your details and approve your listing within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setStep(1)}>
                List Another Car
              </Button>
              <Button>View Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits Section */}
      {step !== 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Earn Extra Income</h3>
              <p className="text-sm text-muted-foreground">
                Average hosts earn KES 50,000+ monthly
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-1">Full Insurance</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive coverage on all rentals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="font-semibold mb-1">Verified Renters</h3>
              <p className="text-sm text-muted-foreground">
                All customers are ID verified
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


