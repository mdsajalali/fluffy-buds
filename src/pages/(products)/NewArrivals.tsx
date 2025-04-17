import { useEffect, useState } from "react";
import HeadingTitle from "../../shared/HeadingTitle";
import ProductCard from "../../shared/ProductCard";
import axiosInstance from "../../lib/axiosInstance";
import { ProductProps } from "../../types/types";

function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axiosInstance.get("/new-arrivals");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch recent products:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="mb-10">
      <HeadingTitle title="New Arrivals – Freshly Added Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products?.map((product: ProductProps) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
