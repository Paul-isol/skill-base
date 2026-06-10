"use client";

import Link from "next/link";
import { Cpu, Globe } from "lucide-react";
import { GithubIcon, TwitterIcon, SlackIcon } from "../icons/brandIcons";

export function Footer() {
  return (
    <footer className="w-full bg-surface-dark text-on-dark-soft border-t border-hairline/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Main Grid: Logo & Info + Links columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Info Section (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-1.5 group select-none">
              <span className="font-sans text-lg font-bold tracking-tight text-white lowercase">
                skill.base<span className="text-primary font-black ml-0.5">●</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The open-source registry for AI agent skills, tools, and Model Context Protocol (MCP) integrations.
            </p>
            {/* Operational status badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              All Systems Operational
            </div>
          </div>

          {/* Links Sections (8 cols on desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Platform */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Platform
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/explore" className="text-sm hover:text-white transition-colors duration-200">
                    Explore Skills
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm hover:text-white transition-colors duration-200">
                    Developer Docs
                  </Link>
                </li>
                <li>
                  <Link href="/mcp" className="text-sm hover:text-white transition-colors duration-200">
                    MCP Servers
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-sm hover:text-white transition-colors duration-200">
                    Submit Project
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Resources
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/changelog" className="text-sm hover:text-white transition-colors duration-200">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-sm hover:text-white transition-colors duration-200">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-sm hover:text-white transition-colors duration-200">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Subscribe */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Subscribe to updates
              </h3>
              <p className="text-xs leading-relaxed">
                Get notified when new agent capabilities and tooling protocols are indexed.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full min-w-0 rounded-md border border-hairline/20 bg-surface-dark-elevated px-3 py-2 text-xs text-white placeholder:text-muted-soft outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="h-9 inline-flex items-center justify-center rounded-md bg-white px-4 text-xs font-semibold text-surface-dark hover:bg-white/90 active:translate-y-px transition-colors duration-200 cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-hairline/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} skill.base. Built for the agentic web.</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <GithubIcon className="size-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <TwitterIcon className="size-4" />
            </a>
            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <SlackIcon className="size-4" />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Globe className="size-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

