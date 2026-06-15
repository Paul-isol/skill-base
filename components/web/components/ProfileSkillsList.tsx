"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteSkillAction } from "@/app/(root)/profile/actions";
import { Download, Edit2, Trash2, X, Check, FileCode } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  downloads: number;
  createdAt: Date;
}

interface ProfileSkillsListProps {
  initialSkills: SkillItem[];
}

export function ProfileSkillsList({ initialSkills }: ProfileSkillsListProps) {
  const [skills, setSkills] = React.useState<SkillItem[]>(initialSkills);
  const [confirmDeleteSlug, setConfirmDeleteSlug] = React.useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = React.useState<string | null>(null);

  // Sync state if server data changes
  React.useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleDelete = async (slug: string) => {
    setDeletingSlug(slug);
    const toastId = toast.loading(`Deleting skill file...`);

    try {
      const res = await deleteSkillAction(slug);
      if (res.success) {
        setSkills((prev) => prev.filter((skill) => skill.slug !== slug));
        toast.success("Skill file deleted successfully!", { id: toastId });
        setConfirmDeleteSlug(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete skill file.", { id: toastId });
    } finally {
      setDeletingSlug(null);
    }
  };

  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-hairline rounded-xl bg-surface-soft text-center max-w-md mx-auto my-6">
        <div className="size-12 rounded-full bg-canvas border border-hairline flex items-center justify-center mb-4 shadow-xs">
          <FileCode className="size-5 text-muted-soft" />
        </div>
        <h3 className="text-base font-bold text-ink mb-1">No submitted skills</h3>
        <p className="text-sm text-body max-w-xs mb-6">
          You haven't submitted any skills yet. Share your first prompt template with the community.
        </p>
        <Link href="/submit">
          <Button className="h-9 px-4 font-semibold text-xs text-primary-foreground bg-primary hover:bg-primary-active rounded-md cursor-pointer transition-colors duration-200">
            Submit Your First Skill
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => {
        const filename = `${skill.slug.replace(/-/g, "_")}.md`;
        const isConfirming = confirmDeleteSlug === skill.slug;

        return (
          <div
            key={skill.id}
            className="group flex flex-col md:flex-row md:items-center justify-between bg-surface-card border border-hairline rounded-lg p-5 md:p-6 transition-all duration-300 hover:shadow-xs hover:border-muted-soft/30"
          >
            {/* Left side info */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-sans text-lg font-bold tracking-cal-sans-sm text-ink group-hover:text-primary transition-colors">
                  <Link href={`/explore/${skill.slug}`}>{skill.name}</Link>
                </h3>
                <span className="text-[10px] font-semibold text-muted-soft tracking-wider uppercase bg-canvas border border-hairline px-2 py-0.5 rounded-full">
                  {skill.category}
                </span>
              </div>
              <p className="text-sm text-body line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-soft pt-0.5 font-medium">
                <div className="flex items-center gap-1">
                  <Download className="size-3.5" />
                  <span>{skill.downloads.toLocaleString()}</span>
                </div>
                <div className="size-1 rounded-full bg-hairline" />
                <span className="font-mono select-all text-[11px] text-muted-soft">
                  {filename}
                </span>
              </div>
            </div>

            {/* Right side controls */}
            <div className="mt-4 md:mt-0 flex items-center gap-2 self-end md:self-center">
              {isConfirming ? (
                /* Inline Delete Confirmation */
                <div className="flex items-center gap-1.5 bg-destructive-soft border border-destructive/20 p-1 rounded-md animate-in fade-in slide-in-from-right-1 duration-150">
                  <span className="text-[10px] font-bold text-destructive px-2 uppercase tracking-wide">
                    Confirm?
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={deletingSlug === skill.slug}
                    onClick={() => handleDelete(skill.slug)}
                    className="h-7 px-2 font-semibold text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                  >
                    {deletingSlug === skill.slug ? "..." : <Check className="size-3.5" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setConfirmDeleteSlug(null)}
                    className="h-7 px-2 font-semibold text-xs text-muted-soft hover:bg-surface-soft cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              ) : (
                /* Edit / Delete Buttons */
                <>
                  <Link href={`/profile/edit/${skill.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1.5 font-semibold text-xs text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-colors cursor-pointer"
                    >
                      <Edit2 className="size-3.5" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDeleteSlug(skill.slug)}
                    className="h-9 gap-1.5 font-semibold text-xs text-destructive hover:bg-destructive/5 hover:border-destructive/30 border border-hairline bg-canvas transition-colors cursor-pointer"
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
