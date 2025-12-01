import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Plus, MapPin, User, Car, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const trips = [
  {
    id: "T-301",
    requester: "Finance Dept",
    from: "Head Office - Colombo",
    to: "District Office - Kandy",
    date: "Dec 2, 2025",
    time: "08:00 AM",
    driver: "John Smith",
    vehicle: "V-003",
    passengers: 4,
    status: "confirmed",
    distance: "120 km",
  },
  {
    id: "T-302",
    requester: "HR Dept",
    from: "Head Office - Colombo",
    to: "Training Center - Galle",
    date: "Dec 3, 2025",
    time: "09:30 AM",
    driver: "Sarah Johnson",
    vehicle: "V-007",
    passengers: 6,
    status: "pending",
    distance: "130 km",
  },
  {
    id: "T-303",
    requester: "IT Dept",
    from: "Head Office - Colombo",
    to: "Data Center - Kurunegala",
    date: "Dec 4, 2025",
    time: "07:00 AM",
    driver: "Mike Brown",
    vehicle: "V-012",
    passengers: 2,
    status: "confirmed",
    distance: "95 km",
  },
  {
    id: "T-304",
    requester: "Admin Dept",
    from: "Regional Office - Gampaha",
    to: "Head Office - Colombo",
    date: "Dec 5, 2025",
    time: "10:00 AM",
    driver: "Pending",
    vehicle: "Pending",
    passengers: 3,
    status: "pending",
    distance: "32 km",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Confirmed", color: "bg-success text-success-foreground" },
  pending: { label: "Pending", color: "bg-warning text-warning-foreground" },
  in_progress: { label: "In Progress", color: "bg-primary text-primary-foreground" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", color: "bg-destructive text-destructive-foreground" },
};

const Trips = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Trip Scheduling</h1>
            <p className="text-muted-foreground">Manage vehicle bookings and trips</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Request Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Trips List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">Upcoming Trips</h2>
            {trips.map((trip, index) => {
              const status = statusConfig[trip.status];
              return (
                <Card
                  key={trip.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-lg">{trip.id}</span>
                          <Badge className={status.color}>{status.label}</Badge>
                          <span className="text-sm text-muted-foreground">
                            by {trip.requester}
                          </span>
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm">{trip.from}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-sm">{trip.to}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{trip.date} • {trip.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{trip.driver}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            <span>{trip.vehicle}</span>
                          </div>
                          <span>{trip.passengers} passengers</span>
                          <span>{trip.distance}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {trip.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              Approve
                            </Button>
                          </>
                        )}
                        {trip.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Trips;
