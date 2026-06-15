import { getAllSkills } from "@/lib/skills/skill-select";
import { SkillCard } from "./components/SkillCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export async function BackendSkills() {
  const allSkills = await getAllSkills();
  const backendSkills = (allSkills || [])
    .filter((skill) => skill.category === "backend")
    .slice(0, 6);

  return (
    <section className="py-24 bg-surface-soft border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-[11px] font-bold tracking-widest text-muted-soft uppercase">
            Backend Skill Files
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-cal-sans-md text-ink mt-2">
            Logic & Integration Prompt Templates
          </h2>
          <p className="text-sm md:text-base text-body mt-3 max-w-2xl leading-relaxed">
            Copy or download markdown skill files to instruct your AI agents on running search queries, executing SQL operations, and drafting notifications.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {backendSkills.map((skill) => (
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

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/explore?filter=backend">
            <Button
              variant="outline"
              className="h-10 px-5 gap-1.5 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-colors duration-200 cursor-pointer"
            >
              View All Backend Skills
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}