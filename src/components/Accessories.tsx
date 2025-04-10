import HeadingTitle from "../shared/HeadingTitle";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { ProductProps } from "../types/types";

const Accessories = ({ products }: { products: ProductProps[] }) => {
  
  return (
    <>
      <HeadingTitle title="Accessories" />
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

export default Accessories;
