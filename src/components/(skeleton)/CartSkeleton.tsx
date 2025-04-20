const SkeletonCircle = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

function CartSkeleton() {
  return Array(3)
    .fill(0)
    .map((_, index) => (
      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 flex items-center gap-4">
          <SkeletonBlock className="w-14 h-14 rounded" />
        </td>
        <td className="text-center py-4">
          <SkeletonBlock className="h-4 w-24 mx-auto" />
        </td>
        <td className="text-center px-6 py-4">
          <SkeletonBlock className="h-4 w-16 mx-auto" />
        </td>
        
        <td className="text-center px-6 py-4">
          <div className="inline-flex items-center gap-2">
            <SkeletonCircle className="w-6 h-6" />
            <SkeletonBlock className="h-4 w-8" />
            <SkeletonCircle className="w-6 h-6" />
          </div>
        </td>
        <td className="text-center px-6 py-4">
          <SkeletonBlock className="h-4 w-16 mx-auto" />
        </td>
        <td className="text-center px-6 py-4">
          <SkeletonCircle className="w-5 h-5 mx-auto" />
        </td>
      </tr>
    ));
}

export default CartSkeleton;
