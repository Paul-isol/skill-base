import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import db from "@/lib/db";
import { EditSkillForm } from "@/components/web/components/EditSkillForm";
import { Suspense } from "react";

export const metadata = {
  title: "Edit Skill | skill.base",
  description: "Modify your registered prompt template details.",
};

function EditFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-canvas border border-hairline rounded-xl p-8 shadow-xs animate-pulse">
      <div className="mb-8 border-b border-hairline-soft pb-6 space-y-3">
        <div className="h-4 w-24 rounded bg-muted/60" />
        <div className="h-8 w-48 rounded bg-muted/60" />
        <div className="h-4 w-full rounded bg-muted/60" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted/60" />
          <div className="h-10 w-full rounded bg-muted/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted/60" />
          <div className="h-10 w-full rounded bg-muted/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted/60" />
          <div className="h-10 w-full rounded bg-muted/60" />
        </div>
      </div>
    </div>
  );
}

async function EditFormContent({ slug, userId }: { slug: string; userId: string }) {
  const skill = await db.skill.findUnique({
    where: { slug },
  });

  if (!skill) {
    notFound();
  }

  if (skill.authorId !== userId) {
    notFound(); // Enforce authorization check
  }

  return <EditSkillForm skill={skill} />;
}

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const { slug } = await params;

  return (
    <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<EditFormSkeleton />}>
          <EditFormContent slug={slug} userId={session.user.id} />
        </Suspense>
      </div>
    </div>
  );
}
