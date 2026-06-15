import { FrontendSkills } from "@/components/web/FrontendSkills";
import { Hero } from "@/components/web/Hero";
import { BackendSkills } from "@/components/web/BackendSkills";
import { Suspense } from "react";
import { FrontendSkillSkeleton } from "@/components/web/components/FrontendSkillSkeleton";
import { BackendSkillSkeleton } from "@/components/web/components/BackendSkillSkeleton";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<FrontendSkillSkeleton />}>
        <FrontendSkills />
      </Suspense>
      <Suspense fallback={<BackendSkillSkeleton />}>
        <BackendSkills />
      </Suspense>
    </div>
  );
}
