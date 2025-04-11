import { useState } from "react";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
};

const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    date: "2025-04-10",
    total: 120.5,
    status: "Pending",
  },
  {
    id: "ORD-1002",
    customer: "Emily Smith",
    date: "2025-04-08",
    total: 89.99,
    status: "Shipped",
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    date: "2025-04-06",
    total: 249.0,
    status: "Delivered",
  },
  {
    id: "ORD-1004",
    customer: "Sarah Wilson",
    date: "2025-04-05",
    total: 34.75,
    status: "Cancelled",
  },
];

const statusColors: Record<Order["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">Order ID</th>
              <th className="px-5 py-4 text-left font-semibold">Customer</th>
              <th className="px-5 py-4 text-left font-semibold">Date</th>
              <th className="px-5 py-4 text-left font-semibold">Total</th>
              <th className="px-5 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 font-medium text-gray-800">
                  {order.id}
                </td>
                <td className="px-5 py-4 text-gray-700">{order.customer}</td>
                <td className="px-5 py-4 text-gray-600">{order.date}</td>
                <td className="px-5 py-4 text-gray-900 font-semibold">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as Order["status"]
                      )
                    }
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      statusColors[order.status]
                    } outline-none`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
