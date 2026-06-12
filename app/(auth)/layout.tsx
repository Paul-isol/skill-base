import * as React from "react";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12 bg-canvas font-sans antialiased">
      {/* Left Column: Tech Branding & Geometric Background (Hidden on small screens) */}
      <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-r border-hairline overflow-hidden bg-surface-soft">
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glow */}
        <div className="absolute left-0 top-0 -z-10 size-[300px] rounded-full bg-primary/5 blur-3xl" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group select-none w-fit">
          <span className="font-sans text-lg font-bold tracking-tight text-ink lowercase">
            skill.base<span className="text-primary font-black ml-0.5">●</span>
          </span>
        </Link>

        {/* Testimonial Card */}
        <div className="rounded-lg border border-hairline bg-surface-card p-6 shadow-sm">
          <blockquote className="space-y-4">
            <p className="text-sm font-medium leading-relaxed text-ink">
              &ldquo;This platform has allowed us to version control and audit all of our Model Context Protocol servers in one central location. Absolute lifesaver for agent development.&rdquo;
            </p>
            <footer className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground select-none">
                NF
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">Lead AI Engineer</p>
                <p className="text-[10px] text-muted-soft">NeuralFlow Systems</p>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* System info */}
        <div className="text-[11px] font-mono text-muted-soft">
          auth_node_v1.0.3 // secure_tunnel: active
        </div>
      </div>

      {/* Right Column: Actual Form Container */}
      <div className="lg:col-span-7 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-canvas">
        <div className="mx-auto w-full max-w-sm">
          <Toaster position="top-right"/>
          {children}
        </div>
      </div>
    </div>
  );
}
