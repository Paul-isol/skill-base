import { Skeleton } from "@/components/ui/skeleton";

export function SkillCardSkeleton() {
  return (
    <div className="flex flex-col justify-between bg-surface-card border border-hairline rounded-lg p-6 md:p-8">
      <div>
        {/* Top bar with category & stats */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-20 rounded-full bg-muted/60" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-3.5 rounded bg-muted/60" />
            <Skeleton className="h-3.5 w-8 rounded bg-muted/60" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <Skeleton className="h-6 w-3/4 rounded bg-muted/60" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-5">
          <Skeleton className="h-4 w-full rounded bg-muted/60" />
          <Skeleton className="h-4 w-5/6 rounded bg-muted/60" />
        </div>

        {/* Embedded UI Chrome (File Content Preview) */}
        <div className="bg-canvas border border-hairline rounded-md p-3.5 mb-5 text-left">
          <div className="flex items-center justify-between border-b border-hairline-soft pb-2 mb-2">
            <Skeleton className="h-3 w-32 rounded bg-muted/60" />
            <Skeleton className="h-2.5 w-12 rounded bg-muted/60" />
          </div>
          <div className="space-y-2 py-1">
            <Skeleton className="h-3 w-full rounded bg-muted/60" />
            <Skeleton className="h-3 w-11/12 rounded bg-muted/60" />
            <Skeleton className="h-3 w-4/5 rounded bg-muted/60" />
            <Skeleton className="h-3 w-3/4 rounded bg-muted/60" />
          </div>
        </div>
      </div>

      {/* Card Footer with Author and Action Cluster */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-hairline/60">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full bg-muted/60" />
          <Skeleton className="h-3.5 w-16 rounded bg-muted/60" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-8 rounded-md bg-muted/60" />
          <Skeleton className="h-8 w-20 rounded-md bg-muted/60" />
        </div>
      </div>
    </div>
  );
}
