import { useParams } from "react-router-dom";
import Container from "../../shared/Container";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../../components/ProductDetailsCard";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";
import NewArrivals from "./NewArrivals";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        const productData = res?.data?.product;
        if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="md:mt-[65px] ">
      {" "}
      {/* Adds margin to the top for large screens */}
      <Container>
        {product && <ProductDetailsCard product={product} loading={loading} />}

        {/* recent products */}
        <NewArrivals />
      </Container>
    </div>
  );
};

export default ProductDetails;
