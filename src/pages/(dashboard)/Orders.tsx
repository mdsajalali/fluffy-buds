import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";
import OrderDetailsSkeleton from "../../components/(skeleton)/OrderDetailsSkeleton";

type OrderItem = {
  _id: string;
  name: string;
  quantity: number;
};

type Address = {
  firstName: string;
  lastName: string;
  email: string;
};

type OrderStatus = "Food Processing" | "Delivered" | "Cancelled";

type Order = {
  _id: string;
  items: OrderItem[];
  amount: number;
  payment: boolean;
  address: Address;
  status: OrderStatus;
};

const statusColors: Record<OrderStatus, string> = {
  "Food Processing": "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/order/list");
      if (res.data.success) {
        setOrders(res.data.data);
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

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    orderId: string
  ) => {
    const newStatus = event.target.value as OrderStatus;
    try {
      const res = await axiosInstance.post("/order/status", {
        orderId,
        status: newStatus,
      });
      if (res.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      } else {
        toast.error("Failed to update status");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto md:px-4 md:py-10">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">Order ID</th>
              <th className="px-5 py-4 text-left font-semibold">Customer</th>
              <th className="px-5 py-4 text-left font-semibold">Items</th>
              <th className="px-5 py-4 text-left font-semibold">Amount</th>
              <th className="px-5 py-4 text-left font-semibold">Payment</th>
              <th className="px-5 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <OrderDetailsSkeleton />
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {order._id}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {order.address?.firstName} {order.address?.lastName}
                    <div className="text-xs text-gray-500">
                      {order.address?.email}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item._id}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
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
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(e, order._id)}
                      className={`px-2 py-1 text-xs rounded font-medium outline-none ${
                        statusColors[order.status]
                      }`}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
