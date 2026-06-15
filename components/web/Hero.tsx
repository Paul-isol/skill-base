"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Download, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SKILL_FILENAME = "web_search_executor.md";

const SKILL_MARKDOWN = `# Web Search Executor Prompt

## Role & Mission
You are a research crawler agent. Your purpose is to formulate queries, dispatch searches, and return relevant articles.

## Instructions
1. Inspect query parameters.
2. Filter target URLs (HTTPS only).
3. Return abbreviated markdown result logs.

### Schema
version: "1.0.0"
type: web_search
max_results: 10
# enforce safe browsing`;

const FILE_LINES: { n: string; type: string; text: string }[] = [
  { n: "1",  type: "h1",      text: "# Web Search Executor" },
  { n: "2",  type: "blank",   text: "" },
  { n: "3",  type: "h2",      text: "## Role & Mission" },
  { n: "4",  type: "normal",  text: "You are a research crawler agent." },
  { n: "5",  type: "normal",  text: "Formulate queries, dispatch searches," },
  { n: "6",  type: "normal",  text: "and return relevant articles." },
  { n: "7",  type: "blank",   text: "" },
  { n: "8",  type: "h2",      text: "## Instructions" },
  { n: "9",  type: "key",     text: "1. Inspect query parameters." },
  { n: "10", type: "key",     text: "2. Filter target URLs (HTTPS only)." },
  { n: "11", type: "key",     text: "3. Return abbreviated result logs." },
  { n: "12", type: "blank",   text: "" },
  { n: "13", type: "h3",      text: "### Schema" },
  { n: "14", type: "str",     text: 'version: "1.0.0"' },
  { n: "15", type: "str",     text: "type: web_search" },
  { n: "16", type: "num",     text: "max_results: 10" },
  { n: "17", type: "comment", text: "# enforce safe browsing" },
];

const LINE_COLORS: Record<string, string> = {
  h1:      "text-indigo-400 font-bold",
  h2:      "text-blue-400 font-semibold",
  h3:      "text-emerald-400",
  key:     "text-pink-400",
  str:     "text-lime-400",
  num:     "text-orange-400",
  comment: "text-muted-soft",
  normal:  "text-ink",
  blank:   "",
};

interface HeroProps {
  stats: React.ReactNode;
}

export function Hero({ stats }: HeroProps) {
  const [copied, setCopied] = React.useState(false);
  const [linesVisible, setLinesVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLinesVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_MARKDOWN);
      setCopied(true);
      toast.success(`Copied ${SKILL_FILENAME} to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy prompt");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([SKILL_MARKDOWN], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = SKILL_FILENAME;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${SKILL_FILENAME} successfully!`);
    } catch {
      toast.error("Failed to download prompt file");
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] px-4 sm:px-8 md:px-12 lg:px-20 py-8 lg:py-12 border-b border-hairline transition-colors duration-300 gap-8 lg:gap-0">

      {/* ── LEFT PANEL ── */}
      <div className="flex flex-col justify-between py-6 lg:py-10 lg:pr-12 lg:border-r border-hairline">

        {/* Top: eyebrow + headline + tagline */}
        <div>
          

          {/* File path breadcrumb */}
          <p className="font-mono text-[13px] text-muted-soft mb-5 flex items-center gap-1 flex-wrap">
            <span className="opacity-40">~/</span>
            <span>registry</span>
            <span className="opacity-40">/</span>
            <span>skills</span>
            <span className="opacity-40">/</span>
            <span className="text-ink font-medium">
              web_search_executor
              <span className="inline-block w-0.5 h-[0.85em] bg-ink align-[-0.05em] ml-0.5 animate-[blink_1s_step-end_infinite]" />
            </span>
          </p>

          {/* H1 */}
          <h1 className="text-[48px] sm:text-[56px] lg:text-[52px] xl:text-[60px] font-bold leading-none tracking-tight text-ink mb-6 py-10">
            Prompt
            files for<br />
            agents.
          </h1>

          {/* Tagline */}
          <p className="text-[15px] leading-relaxed text-body max-w-sm">
            A curated index of markdown skill files. Paste a path, pull the file, configure your agent — in seconds.
          </p>
        </div>

        {/* Bottom: CTAs + stats */}
        <div className="mt-10">
          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/submit">
              <Button className="h-10 px-5 gap-2 text-[13px] font-medium bg-ink text-canvas hover:bg-ink/90 rounded-md transition-all active:translate-y-px cursor-pointer">
                <Upload className="size-3.5" />
                Publish a skill
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" className="h-10 px-5 gap-2 text-[13px] font-normal text-muted-soft border-hairline bg-canvas hover:bg-surface-soft hover:text-ink rounded-md transition-all active:translate-y-px cursor-pointer">
                Browse registry
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          {stats}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-col bg-surface-soft border border-hairline rounded-xl overflow-hidden lg:ml-12">

        {/* Terminal chrome header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-yellow-400" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600">
            <ShieldCheck className="size-3" />
            Verified prompt
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-hairline text-[11px] font-mono select-none">
          <div className="flex items-center gap-1.5 px-5 py-2.5 text-ink bg-canvas border-r border-hairline">
            <span className="text-[9px] font-bold text-amber-500">M↓</span>
            {SKILL_FILENAME}
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 text-muted-soft border-r border-hairline hover:text-ink transition-colors cursor-pointer">
            <span className="text-[9px] font-bold text-muted-soft">M↓</span>
            slack_notifier.md
          </div>
        </div>

        {/* Code body */}
        <div
          className="flex-1 px-5 py-6 font-mono text-[11.5px] leading-[1.75] overflow-y-auto"
          style={{
            opacity: linesVisible ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        >
          {FILE_LINES.map((line, i) => (
            <div
              key={i}
              className="flex"
              style={{
                opacity: linesVisible ? 1 : 0,
                transform: linesVisible ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 0.25s ${i * 45}ms, transform 0.25s ${i * 45}ms`,
              }}
            >
              <span className="w-7 shrink-0 text-hairline select-none">{line.n}</span>
              <span className={LINE_COLORS[line.type] ?? "text-ink"}>
                {line.text || "\u00A0"}
              </span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 px-5 pb-4">
          {["research", "web", "crawler", "https-only"].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-canvas border border-hairline text-muted-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 px-5 pb-5 border-t border-hairline pt-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-9 gap-1.5 text-[12px] font-medium text-muted-soft border-hairline bg-canvas hover:bg-canvas hover:text-ink rounded-md transition-all active:translate-y-px cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy file
              </>
            )}
          </Button>
          <Button
            onClick={handleDownload}
            className="h-9 gap-1.5 text-[12px] font-medium bg-ink text-canvas hover:bg-ink/90 rounded-md transition-all active:translate-y-px cursor-pointer"
          >
            <Download className="size-3.5" />
            Download .md
          </Button>
        </div>
      </div>

    </section>
  );
}