import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";

const mockProducts = [
  {
    id: 1,
    name: "Wooden Toy Car",
    description: "Eco-friendly handmade toy for kids.",
    image:
      "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2F1704884664-668232595609980517370275&w=256&q=75",
    price: 18,
    regularPrice: 25,
    category: "Toys",
  },
  {
    id: 2,
    name: "Notebook Set",
    description: "Premium stationery notebooks for all purposes.",
    image:
      "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2F1704884664-668232595609980517370275&w=256&q=75",
    price: 12,
    regularPrice: 15,
    category: "Stationery",
  },
  {
    id: 3,
    name: "Leather Keychain",
    description: "Minimal and stylish everyday carry.",
    image:
      "https://mocknarzo.redshop.io/_next/image?url=https%3A%2F%2Fcdn.redshop.io%2Fmedia%2Fimages%2F1704884664-668232595609980517370275&w=256&q=75",
    price: 8,
    regularPrice: 10,
    category: "Accessories",
  },
];

const ListItems = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Product List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="px-5 py-4 font-semibold">Image</th>
              <th className="px-5 py-4 font-semibold">Name</th>
              <th className="px-5 py-4 font-semibold">Description</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Price</th>
              <th className="px-5 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockProducts.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-all">
                <td className="px-5 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                </td>
                <td className="px-5 py-4 font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="px-5 py-4 text-gray-600 max-w-xs">
                  {item.description}
                </td>
                <td className="px-5 py-4 text-gray-700">{item.category}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-base font-bold text-gray-900">
                      ${item.price}
                    </span>
                    {item.price < item.regularPrice && (
                      <span className="text-xs line-through text-gray-400">
                        ${item.regularPrice}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-600 cursor-pointer hover:text-blue-800 transition flex items-center gap-1">
                      <Pencil size={18} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button className="text-red-600 cursor-pointer hover:text-red-800 transition flex items-center gap-1">
                      <Trash2 size={18} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default ListItems;
