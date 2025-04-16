import { MonitorSmartphone } from "lucide-react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DeviceEntry {
  name: string;
  value: number;
}

const deviceData: DeviceEntry[] = [
  { name: "Phone", value: 65 },
  { name: "Tablet", value: 15 },
  { name: "Computer", value: 20 },
];

const COLORS = ["#6366f1", "#facc15", "#10b981"];
const DevicesUsage = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <div className=" mb-6">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <MonitorSmartphone className="w-5 h-5 text-indigo-500" />
          Devices Usage
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          How users access your platform
        </p>
      </div>
      <p></p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={deviceData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {deviceData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DevicesUsage;
