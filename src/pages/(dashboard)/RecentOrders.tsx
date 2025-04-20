import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RecentOrdersSkeleton from "../../components/(skeleton)/RecentOrdersSkeleton";
import moment from "moment";

interface Address {
  firstName: string;
  lastName: string;
  email: string;
}

interface Order {
  _id: string;
  address?: Address;
  amount: number;
  createdAt: string;
  payment: boolean;
}

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/order/recent-orders");
      if (res?.data?.success) {
        setOrders(res?.data?.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <div className="py-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Recent Orders</h2>
        <p className="text-sm text-gray-500 mt-1">
          A quick snapshot of your latest transactions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-xl shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">Order ID</th>
              <th className="px-5 py-4 text-left font-semibold">Customer</th>
              <th className="px-5 py-4 text-left font-semibold">Date</th>
              <th className="px-5 py-4 text-left font-semibold">Amount</th>
              <th className="px-5 py-4 text-left font-semibold">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <RecentOrdersSkeleton />
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    ORD-{order._id.slice(0, 5)}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {order.address?.firstName} {order.address?.lastName}
                    <div className="text-xs text-gray-500">
                      {order.address?.email}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-900 font-semibold">
                    {moment(order?.createdAt).format("DD-MMM-YYYY")}
                  </td>
                  <td className="px-5 py-4 text-gray-900 font-semibold">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    {order.payment ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unpaid</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        {loading ? (
          <SkeletonBlock className="h-8 w-28 mx-auto rounded" />
        ) : (
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="text-sm text-white bg-blue-600 cursor-pointer hover:bg-blue-700 transition font-medium px-4 py-2 rounded"
          >
            View all orders
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
