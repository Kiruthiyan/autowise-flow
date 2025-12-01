import { Car, Fuel, Wrench, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "maintenance",
    title: "Vehicle V-001 maintenance completed",
    time: "2 hours ago",
    icon: Wrench,
    color: "bg-warning",
  },
  {
    id: 2,
    type: "fuel",
    title: "Fuel filled for Vehicle V-005",
    time: "3 hours ago",
    icon: Fuel,
    color: "bg-accent",
  },
  {
    id: 3,
    type: "trip",
    title: "Trip #T-234 completed successfully",
    time: "5 hours ago",
    icon: MapPin,
    color: "bg-success",
  },
  {
    id: 4,
    type: "vehicle",
    title: "New vehicle V-012 added to fleet",
    time: "1 day ago",
    icon: Car,
    color: "bg-primary",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("p-2 rounded-lg", activity.color)}>
              <activity.icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
