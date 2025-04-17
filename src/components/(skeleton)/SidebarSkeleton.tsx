function SidebarSkeleton() {
  return (
    <div className=" md:col-span-3 hidden md:block animate-pulse">
      {/* Skeleton for Search Section */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Skeleton for Price Range */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Skeleton for Categories */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-1/2"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarSkeleton;
