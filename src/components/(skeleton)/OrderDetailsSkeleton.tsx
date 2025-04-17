const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const OrderDetailsSkeleton = () => {
  return Array(3)
    .fill(0)
    .map((_, index) => (
      <tr key={index} className="hover:bg-gray-50 transition">
        <td className="px-5 py-4">
          <SkeletonBlock className="h-4 w-32" />
        </td>
        <td className="px-5 py-4">
          <SkeletonBlock className="h-4 w-24 mb-1" />
          <SkeletonBlock className="h-3 w-36" />
        </td>
        <td className="px-5 py-4">
          <SkeletonBlock className="h-4 w-28 mb-1" />
          <SkeletonBlock className="h-4 w-28" />
        </td>
        <td className="px-5 py-4">
          <SkeletonBlock className="h-4 w-16" />
        </td>
        <td className="px-5 py-4">
          <SkeletonBlock className="h-4 w-12" />
        </td>
        <td className="px-5 py-4">
          <SkeletonBlock className="h-6 w-24 rounded" />
        </td>
      </tr>
    ));
};

export default OrderDetailsSkeleton;
