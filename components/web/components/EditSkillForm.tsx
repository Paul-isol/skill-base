"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updateSkillAction } from "@/app/(root)/profile/actions";
import { ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

const updateSkillSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be under 50 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .max(50, "Slug must be under 50 characters.")
    .regex(
      /^[a-z0-9-_]+$/,
      "Slug can only contain lowercase letters, numbers, hyphens, and underscores."
    ),
  category: z.enum(["frontend", "backend"], {
    message: "Please select either Frontend or Backend.",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(300, "Description must be under 300 characters."),
  markdownContent: z
    .string()
    .min(20, "Prompt markdown content must be at least 20 characters."),
});

type FormErrors = {
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  markdownContent?: string;
};

interface EditSkillFormProps {
  skill: {
    name: string;
    slug: string;
    description: string;
    category: string;
    markdownContent: string;
  };
}

export function EditSkillForm({ skill }: EditSkillFormProps) {
  const router = useRouter();
  const [name, setName] = React.useState(skill.name);
  const [slug, setSlug] = React.useState(skill.slug);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(true); // Default true for edits so we don't overwrite user slugs
  const [category, setCategory] = React.useState<"frontend" | "backend">(
    skill.category as "frontend" | "backend"
  );
  const [description, setDescription] = React.useState(skill.description);
  const [markdownContent, setMarkdownContent] = React.useState(skill.markdownContent);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [loading, setLoading] = React.useState(false);

  // Helper to format string into slug
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-_]/g, "") // Remove non-alphanumeric except spaces, hyphens, underscores
      .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
      .replace(/-+/g, "-") // Collapse duplicate hyphens
      .replace(/^-+|-+$/g, ""); // Trim edge hyphens
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }

    // Auto-update slug if not manually edited by user
    if (!isSlugManuallyEdited) {
      const autoSlug = slugify(val);
      setSlug(autoSlug);
      if (errors.slug) {
        setErrors((prev) => ({ ...prev, slug: undefined }));
      }
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""));
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: undefined }));
    }
  };

  const handleCategoryChange = (val: "frontend" | "backend") => {
    setCategory(val);
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  // Live compiled filename output preview
  const compiledFilename = slug.replace(/-/g, "_") || "skill_name";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parseResult = updateSkillSchema.safeParse({
      name,
      slug,
      category,
      description,
      markdownContent,
    });

    if (!parseResult.success) {
      const fieldErrors: FormErrors = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof FormErrors] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      setErrors({});
      const res = await updateSkillAction(skill.slug, parseResult.data);
      if (res.success) {
        toast.success(`Successfully updated skill file: ${compiledFilename}.md!`);
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-canvas border border-hairline rounded-xl p-8 shadow-xs">
      <div className="mb-8 border-b border-hairline-soft pb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-soft hover:text-ink transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          Back to Profile
        </Link>
        <h2 className="font-sans text-2xl font-bold tracking-cal-sans-sm text-ink">
          Edit Skill File
        </h2>
        <p className="text-sm text-body mt-2 leading-relaxed">
          Modify the details of your prompt file. Compiles dynamically upon saving.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-ink block" htmlFor="name">
            Skill Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Postgres DB Query Agent"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.name ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          <p className="text-[11px] text-muted-soft">
            Keep it clear and short. E.g. "Google Search Agent", "React UI Structurer".
          </p>
          {errors.name && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-ink block" htmlFor="slug">
              Custom Slug
            </label>
            {isSlugManuallyEdited && (
              <button
                type="button"
                onClick={() => {
                  setIsSlugManuallyEdited(false);
                  setSlug(slugify(name));
                }}
                className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
              >
                Reset to Auto Slug
              </button>
            )}
          </div>
          <input
            id="slug"
            type="text"
            required
            value={slug}
            onChange={handleSlugChange}
            placeholder="e.g. postgres-db-query-agent"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.slug ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          {/* Real-time file preview */}
          <div className="flex items-center gap-1.5 mt-1 bg-surface-soft border border-hairline p-2 rounded-md font-mono text-[10px] text-muted-soft">
            <Terminal className="size-3.5 text-muted-soft" />
            <span>
              Filename will compile as:{" "}
              <strong className="text-ink font-semibold select-all">
                {compiledFilename}.md
              </strong>
            </span>
          </div>
          {errors.slug && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.slug}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-ink block">
            Category
          </label>
          <div className="flex bg-surface-soft border border-hairline p-1 rounded-lg gap-1 select-none max-w-xs">
            <button
              type="button"
              onClick={() => handleCategoryChange("frontend")}
              className={`flex-1 px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                category === "frontend"
                  ? "bg-canvas text-ink border border-hairline shadow-xs"
                  : "text-muted-soft hover:text-ink border border-transparent"
              }`}
            >
              Frontend
            </button>
            <button
              type="button"
              onClick={() => handleCategoryChange("backend")}
              className={`flex-1 px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                category === "backend"
                  ? "bg-canvas text-ink border border-hairline shadow-xs"
                  : "text-muted-soft hover:text-ink border border-transparent"
              }`}
            >
              Backend
            </button>
          </div>
          <p className="text-[11px] text-muted-soft">
            Frontend is for user interfaces. Backend is for logic, data queries, and integrations.
          </p>
          {errors.category && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.category}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-ink block" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={3}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
            placeholder="Describe what instructions or functions this prompt file defines..."
            className={`w-full rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors resize-y ${
              errors.description ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          {errors.description && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.description}</p>
          )}
        </div>

        {/* MarkdownContent */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-ink block" htmlFor="markdownContent">
            Prompt Markdown Content
          </label>
          <textarea
            id="markdownContent"
            required
            rows={10}
            value={markdownContent}
            onChange={(e) => {
              setMarkdownContent(e.target.value);
              if (errors.markdownContent) {
                setErrors((prev) => ({ ...prev, markdownContent: undefined }));
              }
            }}
            placeholder={`# Title\n\n## System Instructions\nYou are a Postgres DB query generator agent...`}
            className={`w-full font-mono rounded-md border bg-canvas px-3.5 py-2.5 text-xs text-ink outline-none placeholder:text-muted-soft transition-colors resize-y min-h-[220px] ${
              errors.markdownContent ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          <p className="text-[11px] text-muted-soft">
            Paste the raw markdown content. Variables can be denoted with standard tags like {"{query}"} or {"{{slug}}"}.
          </p>
          {errors.markdownContent && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.markdownContent}</p>
          )}
        </div>

        {/* Actions panel */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 h-10 font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-colors duration-200 cursor-pointer"
          >
            {loading ? (
              <>
                <Spinner className="size-4 mr-2" />
                Updating Skill...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          <Link href="/profile" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-colors duration-200 cursor-pointer justify-center"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
