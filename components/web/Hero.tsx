"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Hero() {
  const [copied, setCopied] = React.useState(false);

  const skillFilename = "web_search_executor.md";
  const skillMarkdown = `# Web Search Executor Prompt

## Role & Mission
You are a research crawler agent. Your purpose is to formulate queries, dispatch searches, and return relevant articles.

## Instructions
1. Inspect query parameters.
2. Filter target URLs (HTTPS only).
3. Return abbreviated markdown result logs.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(skillMarkdown);
      setCopied(true);
      toast.success(`Copied ${skillFilename} to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([skillMarkdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = skillFilename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${skillFilename} successfully!`);
    } catch (err) {
      toast.error("Failed to download prompt file");
    }
  };

  return (
    <div className="relative overflow-hidden bg-canvas py-16 md:py-24 border-b border-hairline transition-colors duration-300">
      {/* Universal Grid Container aligned with global padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Heading, text, and buttons */}
          <div className="lg:col-span-7 flex flex-col text-left items-start">
            {/* Soft Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-card border border-hairline px-3 py-1 text-xs font-semibold text-ink tracking-tight mb-6 select-none">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500 opacity-75 rounded-full" />
                <span className="relative inline-flex size-2 bg-emerald-500 rounded-full" />
              </span>
              <p>AI Agent Skill File Registry</p>
            </div>

            {/* Display-XL H1 Headline */}
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-semibold tracking-cal-sans-xl leading-[1.05] text-ink mb-6 lowercase">
              skill.base<span className="text-primary font-black ml-0.5">●</span>
              <span className="block mt-4 text-foreground font-sans text-4xl sm:text-5xl lg:text-6xl tracking-cal-sans-lg leading-[1.1] normal-case font-semibold">
                Download & Deploy AI Agent Skill Files
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-body max-w-2xl mb-8 leading-relaxed font-sans font-normal">
              Curated prompt instructions, schema instructions, and custom logic templates for developer agents. Copy or download markdown skill files instantly to configure agent capabilities without coding complex connectors.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/submit">
                <Button className="h-10 gap-1.5 font-semibold text-primary-foreground bg-primary hover:bg-primary-active transition-all duration-200 cursor-pointer">
                  Publish a Skill File
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" className="h-10 gap-1.5 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-all duration-200 cursor-pointer">
                  Explore Skill Files
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Prompt File Mockup Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] rounded-xl border border-hairline bg-canvas p-6 shadow-sm flex flex-col gap-5 select-none relative overflow-hidden transition-all duration-300 hover:shadow-md">
              
              {/* Card Product Chrome Header */}
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-md bg-primary text-white font-mono text-xs font-bold">
                    MD
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{skillFilename}</h3>
                    <p className="text-[11px] text-muted-soft">v1.2.0 • 1.1 KB</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Approved Prompt
                </span>
              </div>

              {/* Code/Markdown Content Block */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-soft">
                    File Contents Preview
                  </span>
                  <span className="text-[9px] font-mono text-muted-soft">markdown</span>
                </div>
                <div className="min-h-48 rounded-md bg-surface-soft p-3.5 text-[11px] font-mono text-ink border border-hairline leading-normal overflow-x-auto text-left select-text">
                  <pre className="whitespace-pre-wrap">
                    <code>{skillMarkdown}</code>
                  </pre>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="h-10 gap-1.5 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas cursor-pointer active:translate-y-px transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy File
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDownload}
                  className="h-10 gap-1.5 font-semibold text-primary-foreground bg-primary hover:bg-primary-active cursor-pointer active:translate-y-px transition-all"
                >
                  <Download className="size-3.5" />
                  Download
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}