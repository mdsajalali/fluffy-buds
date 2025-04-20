const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const SkeletonCircle = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

function OrderSkeleton() {
  return Array(3)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <SkeletonCircle className="w-10 h-10" />
          <SkeletonBlock className="h-4 w-24" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="h-4 w-20" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <SkeletonBlock className="h-4 w-24" />
        </div>

        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-6 w-24 rounded-full" />
          <SkeletonBlock className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    ));
}

export default OrderSkeleton;
