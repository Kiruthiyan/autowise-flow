import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wrench, Clock, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const maintenanceRequests = [
  {
    id: "MR-001",
    vehicle: "V-002",
    type: "Engine Service",
    status: "in_progress",
    priority: "high",
    requestDate: "Nov 28, 2025",
    estimatedCost: "$450",
    progress: 65,
  },
  {
    id: "MR-002",
    vehicle: "V-006",
    type: "Brake Replacement",
    status: "pending",
    priority: "medium",
    requestDate: "Nov 30, 2025",
    estimatedCost: "$280",
    progress: 0,
  },
  {
    id: "MR-003",
    vehicle: "V-001",
    type: "Oil Change",
    status: "completed",
    priority: "low",
    requestDate: "Nov 25, 2025",
    estimatedCost: "$85",
    progress: 100,
  },
  {
    id: "MR-004",
    vehicle: "V-005",
    type: "Tire Rotation",
    status: "approved",
    priority: "low",
    requestDate: "Dec 1, 2025",
    estimatedCost: "$60",
    progress: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending Approval", color: "bg-warning text-warning-foreground", icon: Clock },
  approved: { label: "Approved", color: "bg-primary text-primary-foreground", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "bg-accent text-accent-foreground", icon: Wrench },
  completed: { label: "Completed", color: "bg-success text-success-foreground", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-destructive text-destructive-foreground", icon: XCircle },
};

const priorityColors: Record<string, string> = {
  high: "border-l-destructive",
  medium: "border-l-warning",
  low: "border-l-success",
};

const Maintenance = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Maintenance</h1>
            <p className="text-muted-foreground">Track and manage vehicle maintenance</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Completed (Month)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">$2,450</p>
                <p className="text-sm text-muted-foreground">Total Cost (Month)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          {maintenanceRequests.map((request) => {
            const status = statusConfig[request.status];
            return (
              <Card
                key={request.id}
                className={`border-l-4 ${priorityColors[request.priority]}`}
              >
                <CardContent className="py-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{request.id}</span>
                        <Badge className={status.color}>{status.label}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {request.priority} priority
                        </Badge>
                      </div>
                      <p className="font-medium">{request.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Vehicle: {request.vehicle} • Requested: {request.requestDate}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {request.status === "in_progress" && (
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{request.progress}%</span>
                          </div>
                          <Progress value={request.progress} />
                        </div>
                      )}
                      <div className="text-right">
                        <p className="font-semibold">{request.estimatedCost}</p>
                        <p className="text-xs text-muted-foreground">Est. Cost</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Maintenance;
