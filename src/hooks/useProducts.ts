import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
  regularPrice: number;
  images: { url: string }[];
};

type Pagination = {
  totalPages: number;
};

type ResponseData = {
  products: Product[];
  pagination: Pagination;
};
function useProducts(page: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get<ResponseData>(`/products`, {
          params: {
            page,
            limit: 9,
          },
        });
        setProducts(res?.data?.products || []);
        setTotalPages(res?.data?.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, loading, totalPages, setProducts };
}

export default useProducts;
