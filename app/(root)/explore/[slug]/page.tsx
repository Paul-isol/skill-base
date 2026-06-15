import { getSkillBySlug } from "@/lib/skills/skill-select";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Calendar } from "lucide-react";
import { SkillDetailActions } from "@/components/web/components/SkillDetailActions";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    return {
      title: "Skill Not Found | skill.base",
    };
  }

  return {
    title: `${skill.name} - Agent Skill | skill.base`,
    description: skill.description,
  };
}

function SkillDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column Skeleton */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <div className="h-6 w-24 rounded-full bg-muted/60 animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-muted/60 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-28 rounded bg-muted/60 animate-pulse" />
            <div className="h-4 w-32 rounded bg-muted/60 animate-pulse" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full rounded bg-muted/60 animate-pulse" />
            <div className="h-4 w-full rounded bg-muted/60 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-muted/60 animate-pulse" />
          </div>
        </div>

        <div className="border border-hairline rounded-lg p-5 bg-surface-soft flex items-center gap-4 animate-pulse">
          <div className="size-10 rounded-full bg-muted/60" />
          <div className="space-y-1">
            <div className="h-3 w-12 rounded bg-muted/60" />
            <div className="h-4 w-24 rounded bg-muted/60" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <div className="h-10 w-36 rounded bg-muted/60 animate-pulse" />
          <div className="h-10 w-44 rounded bg-muted/60 animate-pulse" />
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="lg:col-span-7 bg-surface-card border border-hairline rounded-xl overflow-hidden shadow-sm flex flex-col h-[450px] animate-pulse">
        <div className="bg-canvas border-b border-hairline-soft px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-muted/40" />
            <div className="size-2.5 rounded-full bg-muted/40" />
            <div className="size-2.5 rounded-full bg-muted/40" />
            <div className="h-4 w-32 rounded bg-muted/60 ml-2" />
          </div>
          <div className="h-3.5 w-20 rounded bg-muted/60" />
        </div>
        <div className="p-6 space-y-3 flex-1 bg-canvas">
          <div className="h-3 w-full rounded bg-muted/40" />
          <div className="h-3 w-5/6 rounded bg-muted/40" />
          <div className="h-3 w-11/12 rounded bg-muted/40" />
          <div className="h-3 w-4/5 rounded bg-muted/40" />
          <div className="h-3 w-full rounded bg-muted/40" />
          <div className="h-3 w-3/4 rounded bg-muted/40" />
        </div>
      </div>
    </div>
  );
}

async function SkillDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  const filename = `${skill.slug.replace(/-/g, "_")}.md`;
  const authorName = skill.authorName || "Anonymous";
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getAvatarBg = (nameText: string) => {
    const bgs = [
      "bg-amber-100",
      "bg-blue-100",
      "bg-purple-100",
      "bg-emerald-100",
      "bg-pink-100",
      "bg-orange-100",
    ];
    let hash = 0;
    for (let i = 0; i < nameText.length; i++) {
      hash = nameText.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % bgs.length;
    return bgs[index];
  };

  const avatarBg = getAvatarBg(authorName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Metadata & Actions */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          {/* Category tag */}
          <span className="inline-flex items-center text-xs font-bold text-muted-soft tracking-wider uppercase bg-surface-soft border border-hairline px-3 py-1 rounded-full">
            {skill.category}
          </span>

          {/* Title & Downloads */}
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-cal-sans-lg text-ink">
            {skill.name}
          </h1>

          {/* Detailed metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-soft pt-1">
            <div className="flex items-center gap-1.5">
              <Download className="size-4" />
              <span>{skill.downloads.toLocaleString()} downloads</span>
            </div>
            <div className="size-1 rounded-full bg-hairline" />
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>Added {new Date(skill.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-body leading-relaxed pt-2">
            {skill.description}
          </p>
        </div>

        {/* Author Card info */}
        <div className="border border-hairline rounded-lg p-5 bg-surface-soft flex items-center gap-4">
          <div
            className={`size-10 rounded-full flex items-center justify-center text-xs font-bold text-ink border border-hairline ${avatarBg}`}
          >
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-soft uppercase tracking-wider">
              Author
            </span>
            <span className="text-sm font-semibold text-ink mt-0.5">
              {authorName}
            </span>
          </div>
        </div>

        {/* Action buttons wrapper */}
        <div className="pt-2">
          <SkillDetailActions markdownContent={skill.markdownContent} filename={filename} slug={skill.slug} />
        </div>
      </div>

      {/* Right Column: Code Preview Panel */}
      <div className="lg:col-span-7 bg-surface-card border border-hairline rounded-xl overflow-hidden shadow-sm flex flex-col max-h-[600px]">
        {/* Tab Bar Header */}
        <div className="bg-canvas border-b border-hairline-soft px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-yellow-400" />
            <span className="size-2.5 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-muted-soft ml-2 select-all font-semibold">
              {filename}
            </span>
          </div>
          <span className="text-[10px] font-bold text-muted-soft tracking-wider uppercase">
            markdown content
          </span>
        </div>
        
        {/* Scrollable file view */}
        <div className="p-6 overflow-y-auto bg-canvas">
          <pre className="text-xs font-mono text-ink leading-relaxed whitespace-pre-wrap select-text">
            <code>{skill.markdownContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back link */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-soft hover:text-ink transition-colors duration-200"
          >
            <ArrowLeft className="size-3.5" />
            Back to Explore
          </Link>
        </div>

        <Suspense fallback={<SkillDetailSkeleton />}>
          <SkillDetailContent params={params} />
        </Suspense>

      </div>
    </div>
  );
}
