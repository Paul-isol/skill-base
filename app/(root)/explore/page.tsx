import { getAllSkills } from "@/lib/skills/skill-select";
import { SkillCard } from "@/components/web/components/SkillCard";
import { ExploreFilters } from "@/components/web/components/ExploreFilters";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { ExploreSkeleton } from "@/components/web/components/ExploreSkeleton";

export const metadata = {
  title: "Explore Agent Skills | skill.base",
  description: "Browse, search, and download prompt markdown templates and integration setups for your AI agents.",
};

async function ExploreContent({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || "";
  const q = params.q || "";

  // Fetch all skills
  const allSkills = await getAllSkills() || [];

  // Filter skills in memory
  const filteredSkills = allSkills.filter((skill) => {
    // Category filter
    if (filter && skill.category.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }

    // Search query filter
    if (q) {
      const query = q.toLowerCase();
      const matchName = skill.name.toLowerCase().includes(query);
      const matchDesc = skill.description.toLowerCase().includes(query);
      const matchSlug = skill.slug.toLowerCase().includes(query);
      const matchContent = skill.markdownContent.toLowerCase().includes(query);
      return matchName || matchDesc || matchSlug || matchContent;
    }

    return true;
  });

  return (
    <>
      {/* Live Filter Controls */}
      <ExploreFilters />

      {/* Meta Stats Row */}
      <div className="mb-6 flex justify-between items-center text-xs text-muted-soft font-medium">
        <span>
          Showing {filteredSkills.length} {filteredSkills.length === 1 ? "skill" : "skills"}
        </span>
        {(filter || q) && (
          <a
            href="/explore"
            className="text-primary hover:text-primary-active hover:underline font-semibold cursor-pointer"
          >
            Clear all filters
          </a>
        )}
      </div>

      {/* Grid Container */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              slug={skill.slug}
              description={skill.description}
              category={skill.category}
              downloads={skill.downloads}
              markdownContent={skill.markdownContent}
              authorName={skill.authorName}
              authorId={skill.authorId}
            />
          ))}
        </div>
      ) : (
        /* Premium Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-hairline rounded-xl bg-surface-soft text-center max-w-xl mx-auto my-8">
          <div className="size-12 rounded-full bg-canvas border border-hairline flex items-center justify-center mb-4 shadow-xs">
            <Search className="size-5 text-muted-soft" />
          </div>
          <h3 className="text-base font-bold text-ink mb-1">No skills found</h3>
          <p className="text-sm text-body max-w-sm mb-6">
            We couldn't find any skills matching your search query or selected category. Try searching for something else or clearing the filters.
          </p>
          <a
            href="/explore"
            className="inline-flex h-9 px-4 items-center justify-center font-semibold text-xs text-ink bg-canvas border border-hairline rounded-md hover:bg-surface-soft cursor-pointer transition-colors duration-200"
          >
            Reset Search & Filters
          </a>
        </div>
      )}
    </>
  );
}

export default function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>;
}) {
  return (
    <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-[11px] font-bold tracking-widest text-muted-soft uppercase">
            Prompt Registry
          </span>
          <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-cal-sans-md text-ink mt-2">
            Explore AI Agent Skills
          </h1>
          <p className="text-sm md:text-base text-body mt-3 max-w-2xl leading-relaxed">
            Discover prompt-engineered instructions, schemas, and actions templates to enhance your agents' autonomous functions.
          </p>
        </div>

        {/* Content suspended inside a loading boundary */}
        <Suspense fallback={<ExploreSkeleton />}>
          <ExploreContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
