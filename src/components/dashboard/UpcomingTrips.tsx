import { Calendar, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trips = [
  {
    id: "T-301",
    destination: "District Office - Colombo",
    driver: "John Smith",
    vehicle: "V-003",
    date: "Dec 2, 2025",
    status: "confirmed",
  },
  {
    id: "T-302",
    destination: "Head Office - Kandy",
    driver: "Sarah Johnson",
    vehicle: "V-007",
    date: "Dec 3, 2025",
    status: "pending",
  },
  {
    id: "T-303",
    destination: "Regional Center - Galle",
    driver: "Mike Brown",
    vehicle: "V-012",
    date: "Dec 4, 2025",
    status: "confirmed",
  },
];

export function UpcomingTrips() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4">Upcoming Trips</h3>
      <div className="space-y-3">
        {trips.map((trip, index) => (
          <div
            key={trip.id}
            className="p-4 bg-secondary rounded-lg animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium">{trip.id}</span>
              <Badge
                variant={trip.status === "confirmed" ? "default" : "secondary"}
                className={
                  trip.status === "confirmed"
                    ? "bg-success text-success-foreground"
                    : ""
                }
              >
                {trip.status}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                <span>{trip.driver} • {trip.vehicle}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{trip.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
