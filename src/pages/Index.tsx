import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { FleetOverview } from "@/components/dashboard/FleetOverview";
import { FuelConsumptionChart } from "@/components/dashboard/FuelConsumptionChart";
import { UpcomingTrips } from "@/components/dashboard/UpcomingTrips";
import { Car, Fuel, Users, Calendar } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your fleet.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Vehicles"
            value={48}
            change="+2 this month"
            changeType="positive"
            icon={Car}
            iconColor="bg-primary"
          />
          <StatCard
            title="Active Drivers"
            value={35}
            change="3 on leave"
            changeType="neutral"
            icon={Users}
            iconColor="bg-accent"
          />
          <StatCard
            title="Fuel This Month"
            value="3,100L"
            change="-5% from last month"
            changeType="positive"
            icon={Fuel}
            iconColor="bg-warning"
          />
          <StatCard
            title="Scheduled Trips"
            value={12}
            change="Next 7 days"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FuelConsumptionChart />
          </div>
          <FleetOverview />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingTrips />
          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
