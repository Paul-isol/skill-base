import db from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export async function HeroStats() {
  const totalSkills = await db.skill.count();
  const downloadSum = await db.skill.aggregate({
    _sum: {
      downloads: true,
    },
  });
  const totalDownloads = downloadSum._sum.downloads || 0;

  const formatCount = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  };

  const stats = [
    { value: formatCount(totalDownloads), label: "Downloads" },
    { value: formatCount(totalSkills), label: "Skills" },
    { value: "100%", label: "Open source" },
  ];

  return (
    <div className="flex border-t border-hairline pt-6 gap-0 w-full">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex-1 ${i > 0 ? "border-l border-hairline pl-5" : "pr-5"}`}
        >
          <p className="font-mono text-xl font-bold text-ink leading-none">{s.value}</p>
          <p className="text-[11px] text-muted-soft uppercase tracking-widest mt-1 font-semibold">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function HeroStatsSkeleton() {
  return (
    <div className="flex border-t border-hairline pt-6 gap-0 w-full animate-pulse">
      {/* Downloads Skeleton */}
      <div className="flex-1 pr-5 space-y-2">
        <Skeleton className="h-5 w-16 bg-muted/60" />
        <div className="h-3 w-20 bg-muted/40 rounded" />
      </div>

      {/* Skills Skeleton */}
      <div className="flex-1 border-l border-hairline pl-5 space-y-2">
        <Skeleton className="h-5 w-12 bg-muted/60" />
        <div className="h-3 w-16 bg-muted/40 rounded" />
      </div>

      {/* Static Open Source Display */}
      <div className="flex-1 border-l border-hairline pl-5">
        <p className="font-mono text-xl font-bold text-ink leading-none">100%</p>
        <p className="text-[11px] text-muted-soft uppercase tracking-widest mt-1 font-semibold">
          Open source
        </p>
      </div>
    </div>
  );
}
