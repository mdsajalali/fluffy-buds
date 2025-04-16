import { Search, X } from "lucide-react";
import { useState } from "react";
import Container from "../../shared/Container";
import ProductCard from "../../shared/ProductCard";
import Pagination from "../../components/Pagination";
import useProducts from "../../hooks/useProducts";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const handleMaxPriceChange = (value: number) => {
    if (value >= minPrice + 50) {
      setMaxPrice(value);
    } else {
      setMaxPrice(minPrice + 50);
    }
  };

  const resetPriceRange = () => {
    setMinPrice(0);
    setMaxPrice(500);
  };

  const { products, totalPages, totalProducts, loading } = useProducts(
    currentPage,
    {
      category: selectedCategory,
      sort,
      name: searchText,
      minPrice,
      maxPrice,
    }
  );

  return (
    <div className="md:mt-[50px]">
      <div className="bg-gray-100 py-14 md:py-20">
        <h1 className="text-center text-3xl md:text-4xl">Shop</h1>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-5">
          {/* Sidebar Filters */}
          <div className="p-4 md:col-span-3 hidden md:block">
            {/* Search Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">Search</h2>
                {searchText.length > 0 && (
                  <X
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={() => setSearchText("")}
                  />
                )}
              </div>
              <div className="relative">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder="Search here..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </span>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center mt-6 justify-between mb-2">
                <h2 className="text-lg font-bold">Price Range</h2>
                {(minPrice !== 0 || maxPrice !== 500) && (
                  <X
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={resetPriceRange}
                  />
                )}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$50</span>
                  <span>${maxPrice}</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded">
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={maxPrice}
                    onChange={(e) =>
                      handleMaxPriceChange(Number(e.target.value))
                    }
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
                    style={{ zIndex: 4 }}
                  />
                  <div
                    className="absolute h-2 bg-blue-500 rounded"
                    style={{
                      left: `${(minPrice / 500) * 100}%`,
                      width: `${((maxPrice - minPrice) / 500) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center mt-6 justify-between mb-2">
                <h2 className="text-lg font-bold">Categories</h2>
                {selectedCategory.length > 0 && (
                  <X
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={() => setSelectedCategory("")}
                  />
                )}
              </div>
              <ul className="space-y-2">
                {["All", "Toys", "Accessories", "Stationery"].map((cat) => (
                  <li
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(cat === "All" ? "" : cat)
                    }
                    className={`cursor-pointer ${
                      selectedCategory === (cat === "All" ? "" : cat)
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 col-span-12">
            <div className="flex gap-2 my-4 items-center justify-between w-full max-w-7xl mx-auto">
              <h1 className="text-sm md:text-base mb-2 md:mb-0">
                Showing {(currentPage - 1) * 6 + 1} -{" "}
                {Math.min(currentPage * 6, totalProducts)} of {totalProducts}{" "}
                results
              </h1>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 w-full rounded-lg bg-gray-200 animate-pulse"
                  />
                ))
              ) : products.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 text-lg py-10">
                  No products found.
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Container>
    </div>
  );
};

export default Shop;
