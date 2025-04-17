function ProductCardSkeleton() {
  return (
    <div className="rounded-lg  animate-pulse">
      <div className="w-full h-48 md:h-[265px] bg-gray-200 rounded-md mb-4"></div>

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>

      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

export default ProductCardSkeleton;
