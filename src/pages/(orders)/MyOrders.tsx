import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Container from "../../shared/Container";
import { StoreContext } from "../../context/StoreContext";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  amount: number;
  status: string;
}

const statusStyles: Record<string, string> = {
  "Food Processing": "bg-yellow-100 text-yellow-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const res = await axiosInstance.post(
      "/order/my-orders",
      {},
      { headers: { token } }
    );
    setOrders(res?.data?.data || []);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleTrackOrder = async (orderId: string) => {
    setLoadingOrderId(orderId);
    await fetchOrders();
    setLoadingOrderId(null);
  };

  return (
    <div className="md:mt-[65px] py-5 md:py-10">
      <Container>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left: Order Name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-200 rounded flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">
                  {order.items[0]?.name || "Order"}
                </span>
              </div>

              {/* Middle: Price & Item Count */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-gray-800 font-medium">
                  ৳{order.amount}
                </span>
                <span className="text-gray-600">
                  Items: {order.items.length}
                </span>
              </div>

              {/* Right: Status & Track */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    statusStyles[order.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current inline-block"></span>
                  {order.status}
                </span>

                <button
                  onClick={() => handleTrackOrder(order._id)}
                  className="px-4 py-2 cursor-pointer bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200 transition flex items-center gap-2"
                  disabled={loadingOrderId === order._id}
                >
                  {loadingOrderId === order._id ? (
                    <>
                      <span>Tracking...</span>
                      <span className="inline-block w-4 h-4 border-2 border-t-transparent border-pink-600 rounded-full animate-spin"></span>
                    </>
                  ) : (
                    <span>Track Order</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyOrders;
