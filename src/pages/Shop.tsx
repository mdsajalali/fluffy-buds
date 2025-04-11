import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { ProductProps } from "../types/types";

interface ProductType {
  products: ProductProps[];
}

const Shop = ({ products }: ProductType) => {
  return (
    <div className="md:mt-[63px]">
      <div className="bg-gray-100 py-14 md:py-20">
        <h1 className="text-center text-3xl md:text-4xl">Shop</h1>
      </div>
      <Container>
        <div className=" my-8 md:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={idx} idx={idx} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Shop;
