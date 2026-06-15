import { SkillCardSkeleton } from "./SkillCardSkeleton";

export function ExploreSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter Controls Skeleton */}
      <div className="h-16 w-full animate-pulse bg-surface-soft rounded-lg border border-hairline mb-10" />
      
      {/* Grid Container Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkillCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}