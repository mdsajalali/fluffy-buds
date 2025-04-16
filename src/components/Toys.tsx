import HeadingTitle from "../shared/HeadingTitle";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { Product } from "../hooks/useCategoriesProduct";

const Toys = ({ products }: { products: Product[] }) => {
  return (
    <>
      <HeadingTitle title="Toys" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Toys;
