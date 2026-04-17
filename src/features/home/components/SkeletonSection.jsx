export default function SkeletonSection() {
  return (
    <div className="py-4 animate-pulse">
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[200px] rounded-xl border border-gray-100 overflow-hidden"
          >
            <div className="h-[180px] bg-gray-200"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
