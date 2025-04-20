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

const DashboardData = () => {
  const [users, setUsers] = useState("");
  const [orders, setOrders] = useState("");
  const [sales, setSales] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [salesData, setSalesData] = useState<SalesEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTotalUserOrderSales = async () => {
    try {
      const response = await axiosInstance.get(
        "/order/get-total-user-order-sales"
      );
      setUsers(response?.data?.totalUsers);
      setOrders(response?.data?.totalOrders);
      setSales(response?.data?.totalSales);
    } catch (error) {
      console.error("Error fetching total user order and sales:", error);
    }
  };

  const getTotalProductQuantity = async () => {
    try {
      const response = await axiosInstance.get("/get-total-product-quantity");
      setTotalProducts(response?.data?.getTotalProducts);
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  const getLast12MonthsSalesData = async () => {
    try {
      const response = await axiosInstance.get(
        "/order/get-last12-months-sales"
      );
      // Ensure the correct structure for sales data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedSalesData = response.data.data.map((item: any) => ({
        month: item.month,
        sales: item.sales, // Adjusted the key for sales
      }));
      setSalesData(formattedSalesData);
    } catch (error) {
      console.error("Error fetching last 12 months sales data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getTotalUserOrderSales(),
          getTotalProductQuantity(),
          getLast12MonthsSalesData(),
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Skeleton component for rectangular blocks
  const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  // Skeleton component for circular elements
  const SkeletonCircle = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
  );

  return (
    <div className=" md:p-8 bg-gray-100 ">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Dashboard Overview
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between"
                >
                  <div className="space-y-2">
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-6 w-12" />
                  </div>
                  <SkeletonCircle className="w-8 h-8" />
                </div>
              ))
          ) : (
            <>
              <Card
                title="Total Products"
                value={totalProducts}
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
                value={`$${sales}`}
                Icon={DollarSign}
                color="text-green-500"
              />
              <Card
                title="Total Orders"
                value={orders}
                Icon={ShoppingCart}
                color="text-blue-500"
              />
            </>
          )}
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 ">
          {/* Sales Graph */}
          <div className="bg-white shadow-md rounded-2xl p-6 col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              Last 12 Months Sales
            </h2>
            {loading ? (
              <SkeletonBlock className="w-full h-[320px] rounded-lg" />
            ) : (
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
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.4}
                      />
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
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
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
