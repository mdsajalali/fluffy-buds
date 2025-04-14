import { Search } from "lucide-react";
import { useState } from "react";
import { ProductProps } from "../../types/types";
import Container from "../../shared/Container";
import ProductCard from "../../shared/ProductCard";

interface ProductType {
  products: ProductProps[];
}

const Shop = ({ products }: ProductType) => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(900);

  return (
    <div className="md:mt-[63px]">
      <div className="bg-gray-100 py-14 md:py-20">
        <h1 className="text-center text-3xl md:text-4xl">Shop</h1>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-5">
          <div className="p-4 md:col-span-3 hidden md:block">
            {/* Search Section */}
            <h2 className="text-lg font-bold mb-2">Search</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search />
              </span>
            </div>

            {/* Price Range Slider */}
            <h2 className="text-lg font-bold mt-6 mb-2">Price Range</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
                  style={{ zIndex: minPrice > maxPrice - 100 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
                />
              </div>
            </div>

            {/* Categories Section */}
            <h2 className="text-lg font-bold mt-6 mb-2">Categories</h2>
            <ul className="space-y-2">
              <li className="text-red-500 font-semibold cursor-pointer">All</li>
              <li className="text-gray-700 cursor-pointer hover:text-blue-500">
                Toys
              </li>
              <li className="text-gray-700 cursor-pointer hover:text-blue-500">
                Accessories
              </li>
              <li className="text-gray-700 cursor-pointer hover:text-blue-500">
                Stationery
              </li>
            </ul>
          </div>

          <div className="md:col-span-9 col-span-12 ">
            <div className="flex gap-2   my-4   items-center justify-between w-full max-w-7xl mx-auto   md:px-4">
              <h1 className="text-sm md:text-base mb-2 md:mb-0">
                Showing 1 - 6 of 15 results
              </h1>
              <select className="w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* pagination here */}
        {/* <Pagination /> */}
      </Container>
    </div>
  );
};

export default Shop;
