import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  size: string[];
  discount?: number;
  color: string[];
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

function useCategoriesProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [toys, setToys] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [stationery, setStationery] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get<ResponseData>(`/all-products`);

        const allProducts = res?.data?.products || [];

        setProducts(allProducts);

        // Filter by category
        setToys(allProducts.filter((p) => p?.category === "Toys"));
        setAccessories(
          allProducts.filter((p) => p?.category === "Accessories")
        );
        setStationery(allProducts.filter((p) => p?.category === "Stationery"));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  return {
    products,
    toys,
    accessories,
    stationery,
    loading,
    setProducts,
  };
}

export default useCategoriesProduct;
