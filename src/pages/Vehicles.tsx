import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const vehicles = [
  { id: "V-001", model: "Toyota Hilux", plate: "WP CAB-1234", type: "Pickup", status: "active", driver: "John Smith", mileage: "45,230 km" },
  { id: "V-002", model: "Nissan X-Trail", plate: "WP CAD-5678", type: "SUV", status: "maintenance", driver: "Unassigned", mileage: "78,120 km" },
  { id: "V-003", model: "Toyota Corolla", plate: "WP CAE-9012", type: "Sedan", status: "active", driver: "Sarah Johnson", mileage: "32,450 km" },
  { id: "V-004", model: "Mitsubishi L200", plate: "WP CAF-3456", type: "Pickup", status: "rented", driver: "External", mileage: "56,780 km" },
  { id: "V-005", model: "Honda CR-V", plate: "WP CAG-7890", type: "SUV", status: "active", driver: "Mike Brown", mileage: "23,100 km" },
  { id: "V-006", model: "Toyota Hiace", plate: "WP CAH-1122", type: "Van", status: "inactive", driver: "Unassigned", mileage: "120,450 km" },
];

const statusColors: Record<string, string> = {
  active: "bg-success text-success-foreground",
  maintenance: "bg-warning text-warning-foreground",
  rented: "bg-primary text-primary-foreground",
  inactive: "bg-muted text-muted-foreground",
};

const Vehicles = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Vehicles</h1>
            <p className="text-muted-foreground">Manage your fleet vehicles</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search vehicles..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Driver</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{vehicle.id}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[vehicle.status]}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vehicle.driver}</TableCell>
                  <TableCell>{vehicle.mileage}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Maintenance History</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Vehicles;
