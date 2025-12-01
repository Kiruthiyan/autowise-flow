import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Active", value: 32, color: "hsl(142, 76%, 36%)" },
  { name: "In Maintenance", value: 8, color: "hsl(38, 92%, 50%)" },
  { name: "Rented Out", value: 5, color: "hsl(217, 91%, 40%)" },
  { name: "Inactive", value: 3, color: "hsl(215, 16%, 47%)" },
];

export function FleetOverview() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4">Fleet Status Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
        <p className="text-3xl font-bold">48</p>
        <p className="text-sm text-muted-foreground">Total Vehicles</p>
      </div>
    </div>
  );
}
