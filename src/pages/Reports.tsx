import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, TrendingUp, Car, Fuel, Wrench, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const costTrendData = [
  { month: "Jul", maintenance: 1200, fuel: 3200, rentals: 800 },
  { month: "Aug", maintenance: 1800, fuel: 3100, rentals: 600 },
  { month: "Sep", maintenance: 900, fuel: 3400, rentals: 1200 },
  { month: "Oct", maintenance: 2200, fuel: 3000, rentals: 400 },
  { month: "Nov", maintenance: 1500, fuel: 3300, rentals: 900 },
  { month: "Dec", maintenance: 1100, fuel: 2900, rentals: 700 },
];

const vehicleUtilization = [
  { vehicle: "V-001", utilization: 85 },
  { vehicle: "V-002", utilization: 62 },
  { vehicle: "V-003", utilization: 91 },
  { vehicle: "V-005", utilization: 78 },
  { vehicle: "V-007", utilization: 88 },
  { vehicle: "V-012", utilization: 45 },
];

const reportTypes = [
  { id: "maintenance", name: "Maintenance Report", icon: Wrench, description: "Vehicle maintenance history and costs" },
  { id: "fuel", name: "Fuel Consumption Report", icon: Fuel, description: "Fuel usage and efficiency analysis" },
  { id: "trips", name: "Trip Report", icon: Car, description: "Trip details, distances, and routes" },
  { id: "drivers", name: "Driver Performance", icon: Users, description: "Driver ratings and trip history" },
  { id: "costs", name: "Cost Analysis", icon: TrendingUp, description: "Overall fleet cost breakdown" },
];

const Reports = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and analyze fleet data</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="dec2025">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec2025">December 2025</SelectItem>
                <SelectItem value="nov2025">November 2025</SelectItem>
                <SelectItem value="oct2025">October 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report, index) => (
            <Card
              key={report.id}
              className="card-hover cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <report.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{report.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="maintenance"
                      stroke="hsl(var(--warning))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="fuel"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="rentals"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Utilization (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vehicleUtilization} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="vehicle" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="utilization"
                      fill="hsl(var(--accent))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary - December 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-primary">$7,800</p>
                <p className="text-sm text-muted-foreground mt-1">Total Operating Cost</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-accent">156</p>
                <p className="text-sm text-muted-foreground mt-1">Trips Completed</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-warning">12,450</p>
                <p className="text-sm text-muted-foreground mt-1">Total KM Traveled</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-success">78%</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Fleet Utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;
