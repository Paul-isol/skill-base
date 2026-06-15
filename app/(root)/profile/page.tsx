import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileSkillsList } from "@/components/web/components/ProfileSkillsList";
import { Plus, User, FileText, ArrowDownToLine, Mail } from "lucide-react";

export const metadata = {
  title: "My Profile | skill.base",
  description: "View and manage your indexed prompt templates and skills.",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/profile");
  }

  // Fetch the user's submitted skills
  const userSkills = await db.skill.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate aggregated stats
  const totalSubmissions = userSkills.length;
  const totalDownloads = userSkills.reduce((sum, skill) => sum + skill.downloads, 0);

  // Format downloads stat
  const formatDownloads = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  };

  // User initials avatar
  const initials = session.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Dashboard */}
        <div className="border border-hairline rounded-xl bg-canvas p-6 md:p-8 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* User Meta */}
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-sans text-xl font-bold select-none border border-hairline">
                {initials}
              </div>
              <div className="space-y-1">
                <h1 className="font-sans text-2xl font-bold tracking-cal-sans-sm text-ink">
                  {session.user.name}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-muted-soft">
                  <Mail className="size-3.5" />
                  <span>{session.user.email}</span>
                </div>
              </div>
            </div>

            {/* Submissions & Downloads Info cards */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="border border-hairline rounded-lg px-4 py-3 bg-surface-soft min-w-[120px] flex items-center gap-3">
                <FileText className="size-5 text-muted-soft" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-soft uppercase tracking-wider">
                    Skills
                  </span>
                  <span className="text-base font-bold text-ink leading-tight mt-0.5">
                    {totalSubmissions}
                  </span>
                </div>
              </div>

              <div className="border border-hairline rounded-lg px-4 py-3 bg-surface-soft min-w-[120px] flex items-center gap-3">
                <ArrowDownToLine className="size-5 text-muted-soft" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-soft uppercase tracking-wider">
                    Downloads
                  </span>
                  <span className="text-base font-bold text-ink leading-tight mt-0.5">
                    {formatDownloads(totalDownloads)}
                  </span>
                </div>
              </div>

              <Link href="/submit" className="md:ml-2">
                <Button className="h-10 gap-1.5 font-semibold text-xs text-primary-foreground bg-primary hover:bg-primary-active rounded-md cursor-pointer transition-colors duration-200">
                  <Plus className="size-4" />
                  Submit New Skill
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          <div className="border-b border-hairline-soft pb-3">
            <h2 className="font-sans text-lg font-bold tracking-cal-sans-sm text-ink">
              My Submitted Skill Files
            </h2>
            <p className="text-xs text-muted-soft mt-1">
              View, edit, or delete the prompt files you registered with the showcase registry.
            </p>
          </div>

          <ProfileSkillsList initialSkills={userSkills} />
        </div>

      </div>
    </div>
  );
}
