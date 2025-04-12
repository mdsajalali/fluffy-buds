import { Trash2, Plus, Minus } from "lucide-react";
import { Step } from "./Cart";

const products = [
  {
    name: "HUNTING KINGDOM",
    price: 20000,
    size: "S",
    color: "Red",
    quantity: 2,
    image:
      "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2F1704884664-668232595609980517370275&w=256&q=75",
  },
  {
    name: "HUNTING KINGDOM",
    price: 20000,
    size: "S",
    color: "Red",
    quantity: 2,
    image:
      "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2F1704884664-668232595609980517370275&w=256&q=75",
  },
];

const CartContent = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Product Name</th>
              <th className="text-center px-6 py-3">Price</th>
              <th className="text-center px-6 py-3">Size</th>
              <th className="text-center px-6 py-3">Color</th>
              <th className="text-center px-6 py-3">Quantity</th>
              <th className="text-center px-6 py-3">Total</th>
              <th className="text-center px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="text-center py-4 text-gray-700">
                  {product.name}
                </td>
                <td className="text-center px-6 py-4 text-blue-600 font-medium">
                  ${product.price}
                </td>
                <td className="text-center px-6 py-4 text-gray-700">
                  {product.color}
                </td>
                <td className="text-center px-6 py-4 text-blue-600 font-medium">
                  {product.size}
                </td>
                <td className="text-center px-6 py-4">
                  <div className="inline-flex items-center gap-2">
                    <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{product.quantity}</span>
                    <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="text-center px-6 py-4 font-semibold text-gray-800">
                  ${product.price * product.quantity}
                </td>
                <td className="text-center px-6 py-4">
                  <button className="text-red-500 hover:text-red-700  cursor-pointer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subtotal & Checkout */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Subtotal: ${subtotal}
        </h2>
        <button
          onClick={() => setActiveStep("Address")}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartContent;
