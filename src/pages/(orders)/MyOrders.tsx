import Container from "../../shared/Container";

// Define the type for an order
interface Order {
  id: number;
  name: string;
  price: string;
  items: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

// Status color mapping
const statusStyles: Record<Order["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

// Sample orders data
const orders: Order[] = [
  { id: 1, name: "Chair 1", price: "$52.00", items: 1, status: "Delivered" },
  {
    id: 2,
    name: "Chair 1, Chair 2",
    price: "$102.00",
    items: 2,
    status: "Shipped",
  },
  { id: 3, name: "Chair 1", price: "$52.00", items: 1, status: "Pending" },
  { id: 4, name: "Chair 1", price: "$52.00", items: 1, status: "Pending" },
  { id: 5, name: "Chair 2", price: "$102.00", items: 1, status: "Cancelled" },
];

function MyOrders() {
  return (
    <div className="md:mt-[65px] py-5 md:py-10">
      <Container>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left section: Icon and Name */}
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
                <span className="text-gray-800 font-medium">{order.name}</span>
              </div>

              {/* Middle section: Price and Items */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-gray-800 font-medium">{order.price}</span>
                <span className="text-gray-600">Items: {order.items}</span>
              </div>

              {/* Right section: Status and Track Order */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    statusStyles[order.status]
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current inline-block"></span>
                  {order.status}
                </span>
                <button className="px-4 py-2 cursor-pointer bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200 transition">
                  Track Order
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
