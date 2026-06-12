import { FrontendSkills } from "@/components/web/FrontendSkills";
import { Hero } from "@/components/web/Hero";
import { BackendSkills } from "@/components/web/BackendSkills";

export default function Home() {
  return (
    <div>
      <Hero />
      <FrontendSkills />
      <BackendSkills />
    </div>
  );
}
