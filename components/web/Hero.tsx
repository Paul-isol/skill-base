"use client";

import Link from "next/link";
import { ArrowUpRight, Search, Play, Check, Copy } from "lucide-react";
import * as React from "react";

export function Hero() {
  const [copied, setCopied] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [runComplete, setRunComplete] = React.useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setRunComplete(false);
    setTimeout(() => {
      setIsRunning(false);
      setRunComplete(true);
    }, 1200);
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
              <p>AI Agent Capabilities Registry</p>
            </div>

            {/* Display-XL H1 Headline */}
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-semibold tracking-cal-sans-xl leading-[1.05] text-ink mb-6 lowercase">
              skill.base<span className="text-primary font-black ml-0.5">●</span>
              <span className="block mt-4 text-foreground font-sans text-4xl sm:text-5xl lg:text-6xl tracking-cal-sans-lg leading-[1.1] normal-case font-semibold">
                Showcase Your AI Agent Skills
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-body max-w-2xl mb-8 leading-relaxed font-sans font-normal">
              The curated launchpad for modern creators to index builds, log
              technical challenges, and capture code peer feedback in a sharp,
              professional registry. Show the world what your agents can do.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/submit">
                <button className="h-10 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-active transition-all duration-200 active:translate-y-px cursor-pointer">
                  Share Your Project
                  <ArrowUpRight className="size-4" />
                </button>
              </Link>
              <Link href="/explore">
                <button className="h-10 inline-flex items-center justify-center gap-1.5 rounded-md border border-hairline bg-canvas px-5 text-sm font-semibold text-ink hover:bg-surface-soft transition-all duration-200 active:translate-y-px cursor-pointer">
                  Explore Showcase
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): App Mockup Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] rounded-xl border border-hairline bg-canvas p-6 shadow-sm flex flex-col gap-5 select-none relative overflow-hidden transition-all duration-300">
              
              {/* Card Product Chrome Header */}
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-md bg-primary text-white font-mono text-xs">
                    WS
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">web-search-agent</h3>
                    <p className="text-[11px] text-muted-soft">v1.2.0 • Active</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  MCP Compatible
                </span>
              </div>

              {/* Mock Input Form Panel */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Query Parameter
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Latest AI Agent frameworks 2026"
                      className="w-full rounded-md border border-hairline bg-surface-soft px-3 py-1.5 text-xs text-ink outline-none pointer-events-none"
                    />
                    <Search className="absolute right-3 top-2 size-3.5 text-muted-soft" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Max Results
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="5"
                      className="w-full rounded-md border border-hairline bg-surface-soft px-3 py-1.5 text-xs text-ink outline-none pointer-events-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Format
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Markdown"
                      className="w-full rounded-md border border-hairline bg-surface-soft px-3 py-1.5 text-xs text-ink outline-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary-active transition-colors cursor-pointer"
              >
                {isRunning ? (
                  <span className="flex items-center gap-1.5">
                    <span className="size-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Executing...
                  </span>
                ) : (
                  <>
                    <Play className="size-3 fill-current" />
                    Run Agent Skill
                  </>
                )}
              </button>

              {/* Console Output Block */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-soft">
                    Response Console
                  </span>
                  <button
                    onClick={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-muted-soft hover:text-ink transition-colors cursor-pointer p-0.5"
                  >
                    {copied ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
                <div className="min-h-section rounded-md bg-surface-dark p-3 text-[11px] font-mono text-on-dark-soft border border-hairline/10 leading-normal flex flex-col justify-between overflow-x-auto">
                  {isRunning ? (
                    <span className="text-white animate-pulse">Running query on web endpoints...</span>
                  ) : runComplete ? (
                    <code className="text-emerald-500 block whitespace-pre">
                      {`{
  "status": "success",
  "results": [
    { "title": "Cal.com MCP Spec v2", "url": "https://cal.com/docs" },
    { "title": "Next.js 16 Registry", "url": "https://skill.base" }
  ],
  "latency": "148ms"
}`}
                    </code>
                  ) : (
                    <code className="block whitespace-pre text-muted-soft">
                      {`{
  "status": "idle",
  "instructions": "Click Run Agent Skill above to simulate tool execution."
}`}
                    </code>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}