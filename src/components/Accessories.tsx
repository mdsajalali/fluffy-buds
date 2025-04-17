import HeadingTitle from "../shared/HeadingTitle";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { Product } from "../hooks/useCategoriesProduct";
import ProductCardSkeleton from "./(skeleton)/ProductCardSkeleton";

interface ToysProps {
  products: Product[];
  loading: boolean;
}

const Accessories = ({ products, loading }: ToysProps) => {
  const skeletonCount = 8;

  return (
    <>
      <HeadingTitle title="Accessories" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </Container>
    </>
  );
};

export default Accessories;
