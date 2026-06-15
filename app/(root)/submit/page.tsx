import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitForm } from "@/components/web/components/SubmitForm";
import { Compass, Sparkles } from "lucide-react";

export const metadata = {
  title: "Submit a Skill | skill.base",
  description: "Share your prompt-engineered AI agent skill file with the community.",
};

export default async function SubmitPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return (
      <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 text-center">
          {/* Soft badge */}
          <span className="inline-flex items-center text-[10px] font-bold text-muted-soft tracking-wider uppercase bg-surface-soft border border-hairline px-3 py-1 rounded-full mb-6">
            <Sparkles className="size-3 mr-1 text-purple-600 animate-pulse" />
            Share Your Skills
          </span>
          
          {/* Title */}
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-cal-sans-md text-ink leading-tight">
            Join the Agent Registry
          </h1>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-body mt-4 max-w-md mx-auto leading-relaxed">
            Log in to submit custom prompt templates, schemas, and instructions for AI agents. Help build the open-source agentic web.
          </p>

          {/* Action Panel */}
          <div className="border border-hairline bg-surface-soft rounded-xl p-6 mt-8 flex flex-col gap-3">
            <Link href="/sign-in?callbackUrl=/submit" className="w-full">
              <Button className="w-full h-10 font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-colors cursor-pointer justify-center">
                Sign In to Submit
              </Button>
            </Link>
            <Link href="/sign-up" className="w-full">
              <Button
                variant="outline"
                className="w-full h-10 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-colors cursor-pointer justify-center"
              >
                Create an Account
              </Button>
            </Link>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-soft hover:text-ink transition-colors"
            >
              <Compass className="size-3.5" />
              Explore Existing Skills
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-canvas min-h-screen py-24 border-b border-hairline-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SubmitForm />
      </div>
    </div>
  );
}