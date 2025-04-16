import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Package,
  ShoppingCart,
  DollarSign,
  LucideIcon,
  Users,
} from "lucide-react";
import RecentOrders from "./RecentOrders";
import DevicesUsage from "./(components)/DevicesUsage";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";

interface StatCardProps {
  title: string;
  value: number | string;
  Icon: LucideIcon;
  color: string;
}

interface SalesEntry {
  month: string;
  sales: number;
}

const dummyStats = {
  totalProducts: 125,
  totalOrders: 430,
  totalSales: 24350,
  cancelledOrders: 15,
  deliveredOrders: 390,
};

const salesData: SalesEntry[] = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 1500 },
  { month: "Apr", sales: 2100 },
  { month: "May", sales: 2800 },
  { month: "Jun", sales: 3000 },
  { month: "Jul", sales: 2700 },
  { month: "Aug", sales: 2500 },
  { month: "Sep", sales: 2200 },
  { month: "Oct", sales: 2000 },
  { month: "Nov", sales: 2400 },
  { month: "Dec", sales: 3100 },
];

const DashboardData = () => {
  const [users, setUsers] = useState("");
  const [orders, setOrders] = useState("");

  const getTotalUserOrder = async () => {
    try {
      const response = await axiosInstance.get("/order/get-total-user-order");
      setUsers(response?.data?.totalUsers);
      setOrders(response?.data?.totalOrders);
    } catch (error) {
      console.error("Error fetching total user order:", error);
    }
  };
  useEffect(() => {
    getTotalUserOrder();
  }, []);
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Dashboard Overview
        </h1>

        {/* Stat Cards */}
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            title="Total Products"
            value={dummyStats.totalProducts}
            Icon={Package}
            color="text-purple-500"
          />
          <Card
            title="Total Users"
            value={users}
            Icon={Users}
            color="text-red-500"
          />
          <Card
            title="Total Sales"
            value={`$${dummyStats.totalSales.toLocaleString()}`}
            Icon={DollarSign}
            color="text-green-500"
          />
          <Card
            title="Total Orders"
            value={orders}
            Icon={ShoppingCart}
            color="text-blue-500"
          />
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Graph */}
          <div className="bg-white shadow-md rounded-2xl p-6 col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              Last 12 Months Sales
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    borderColor: "#e5e7eb",
                  }}
                  labelStyle={{ color: "#6b7280", fontSize: 13 }}
                  itemStyle={{ color: "#4f46e5" }}
                  cursor={{ fill: "#f3f4f6" }}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#salesGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Device Usage Pie */}
          <DevicesUsage />
        </div>
      </div>
      {/* recent orders */}
      <RecentOrders />
    </div>
  );
};

const Card = ({ title, value, Icon, color }: StatCardProps) => (
  <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

export default DashboardData;
