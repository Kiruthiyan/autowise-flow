import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Phone, Mail, Car, Star } from "lucide-react";

const drivers = [
  {
    id: "D-001",
    name: "John Smith",
    phone: "+94 77 123 4567",
    email: "john.smith@company.com",
    license: "B1234567",
    licenseExpiry: "Mar 2026",
    status: "available",
    rating: 4.8,
    totalTrips: 156,
    assignedVehicle: "V-003",
  },
  {
    id: "D-002",
    name: "Sarah Johnson",
    phone: "+94 77 234 5678",
    email: "sarah.j@company.com",
    license: "B2345678",
    licenseExpiry: "Jun 2025",
    status: "on_trip",
    rating: 4.9,
    totalTrips: 203,
    assignedVehicle: "V-007",
  },
  {
    id: "D-003",
    name: "Mike Brown",
    phone: "+94 77 345 6789",
    email: "mike.b@company.com",
    license: "B3456789",
    licenseExpiry: "Dec 2025",
    status: "available",
    rating: 4.6,
    totalTrips: 98,
    assignedVehicle: "V-012",
  },
  {
    id: "D-004",
    name: "Lisa Chen",
    phone: "+94 77 456 7890",
    email: "lisa.c@company.com",
    license: "B4567890",
    licenseExpiry: "Sep 2025",
    status: "on_leave",
    rating: 4.7,
    totalTrips: 142,
    assignedVehicle: null,
  },
  {
    id: "D-005",
    name: "David Wilson",
    phone: "+94 77 567 8901",
    email: "david.w@company.com",
    license: "B5678901",
    licenseExpiry: "Feb 2026",
    status: "available",
    rating: 4.5,
    totalTrips: 87,
    assignedVehicle: "V-001",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-success text-success-foreground" },
  on_trip: { label: "On Trip", color: "bg-primary text-primary-foreground" },
  on_leave: { label: "On Leave", color: "bg-muted text-muted-foreground" },
};

const Drivers = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Drivers</h1>
            <p className="text-muted-foreground">Manage driver profiles and assignments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search drivers..." className="pl-10" />
        </div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver, index) => {
            const status = statusConfig[driver.status];
            return (
              <Card
                key={driver.id}
                className="card-hover animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {driver.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{driver.name}</h3>
                        <p className="text-sm text-muted-foreground">{driver.id}</p>
                      </div>
                    </div>
                    <Badge className={status.color}>{status.label}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Car className="w-4 h-4" />
                      <span>
                        {driver.assignedVehicle || "Unassigned"} • License: {driver.license}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {driver.totalTrips} trips
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Expires: </span>
                      <span className="font-medium">{driver.licenseExpiry}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Drivers;
