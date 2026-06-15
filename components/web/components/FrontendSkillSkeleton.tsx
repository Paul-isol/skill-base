import { Skeleton } from "@/components/ui/skeleton";
import { SkillCardSkeleton } from "./SkillCardSkeleton";

export function FrontendSkillSkeleton() {
  return (
    <section className="py-24 bg-canvas border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-[11px] font-bold tracking-widest text-muted-soft uppercase">
            Frontend Skill Files
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-cal-sans-md text-ink mt-2">
            User Interface Prompt Templates
          </h2>
          <p className="text-sm md:text-base text-body mt-3 max-w-2xl leading-relaxed">
            Copy or download markdown skill files to instruct your AI agents on user interactions, scheduling flows, and formatting data visualization components.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Skeleton className="h-10 w-48 rounded-md bg-muted/60" />
        </div>
      </div>
    </section>
  );
}