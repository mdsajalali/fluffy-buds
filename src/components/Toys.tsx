import { useEffect, useState } from "react";
import HeadingTitle from "../shared/HeadingTitle";
import Container from "../shared/Container";
import { ProductProps } from "../types/types";
import ProductCard from "../shared/ProductCard";

const Toys = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <HeadingTitle title="Toys" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={idx} idx={idx} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Toys;
