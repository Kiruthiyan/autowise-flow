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
import { Plus, Search, Filter, Eye, Pencil, Car } from "lucide-react";

const vehicles = [
  { id: "V-001", regNo: "CAB-2345", model: "Toyota Hilux", type: "Van", department: "Engineering", status: "active", image: null },
  { id: "V-002", regNo: "CAD-5678", model: "Nissan X-Trail", type: "SUV", department: "Admin", status: "repair", image: null },
  { id: "V-003", regNo: "CAE-9012", model: "Toyota Corolla", type: "Sedan", department: "Science", status: "active", image: null },
  { id: "V-004", regNo: "CAF-3456", model: "Mitsubishi L200", type: "Pickup", department: "IT", status: "rented", image: null },
  { id: "V-005", regNo: "CAG-7890", model: "Honda CR-V", type: "Bus", department: "Medical", status: "active", image: null },
  { id: "V-006", regNo: "CAH-1122", model: "Toyota Hiace", type: "Van", department: "Library", status: "inactive", image: null },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="success">Active</Badge>;
    case "repair":
      return <Badge variant="destructive">Repair</Badge>;
    case "rented":
      return <Badge variant="warning">Rented</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Vehicles = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Vehicles</h1>
            <p className="text-muted-foreground text-sm">Manage your fleet vehicles</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Vehicle
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
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground">Vehicle No</TableHead>
                <TableHead className="font-semibold text-foreground">Image</TableHead>
                <TableHead className="font-semibold text-foreground">Type</TableHead>
                <TableHead className="font-semibold text-foreground">Department</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{vehicle.regNo}</TableCell>
                  <TableCell>
                    <div className="w-12 h-10 rounded bg-muted flex items-center justify-center">
                      <Car className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.type}</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.department}</TableCell>
                  <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
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
