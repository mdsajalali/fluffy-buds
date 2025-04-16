import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { ProductProps } from "../types/types";

// ✅ Reusable Filter Type
export interface ProductFilterOptions {
  category?: string; 
  sort?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}

function useProducts(page: number, filters: ProductFilterOptions) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/products`, {
          params: {
            page,
            category: filters.category, 
            sort: filters.sort,
            name: filters.name,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          },
        });

        setProducts(res?.data?.products || []);
        setTotalPages(res?.data?.pagination?.totalPages || 1);
        setTotalProducts(res?.data?.pagination?.totalProducts || 0);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    filters.category, 
    filters.sort,
    filters.name,
    filters.minPrice,
    filters.maxPrice,
  ]);

  return {
    products,
    loading,
    totalPages,
    setProducts,
    totalProducts,
  };
}

export default useProducts;
