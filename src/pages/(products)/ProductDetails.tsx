import { useParams } from "react-router-dom";
import Container from "../../shared/Container";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../../components/ProductDetailsCard";
import { ProductProps } from "../../types/types";
import Categories from "../../components/Categories";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (item: ProductProps) => item?.id === parseInt(id as string)
        );
        setProduct(found);
      });
  }, [id]);

  return (
    <div className="md:mt-[65px]">
      {" "}
      {/* Adds margin to the top for large screens */}
      <Container>
        {product ? (
          <ProductDetailsCard product={product} />
        ) : (
          <div className="text-center text-xl text-gray-500">Loading...</div>
        )}
        {/* Categories */}
        <Categories />
      </Container>
    </div>
  );
};

export default ProductDetails;
