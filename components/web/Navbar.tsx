"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Plus } from "lucide-react";
import { GithubIcon } from "../icons/brandIcons";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-hairline bg-canvas/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1.5 group select-none">
            <span className="font-sans text-lg font-bold tracking-tight text-ink lowercase">
              skill.base<span className="text-primary font-black ml-0.5">●</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Centered) */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="/explore"
            className="hover:text-ink transition-colors duration-200"
          >
            Explore
          </Link>
          <Link
            href="/docs"
            className="hover:text-ink transition-colors duration-200"
          >
            Docs
          </Link>
          <Link
            href="/integrations"
            className="hover:text-ink transition-colors duration-200"
          >
            Integrations
          </Link>
          <Link
            href="/pricing"
            className="hover:text-ink transition-colors duration-200"
          >
            Pricing
          </Link>
        </div>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-muted-foreground hover:text-ink transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-muted-foreground hover:text-ink transition-colors"
          >
            Sign In
          </Link>
          <Link href="/submit">
            <button className="h-10 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-active transition-colors duration-200 active:translate-y-px cursor-pointer">
              <Plus className="size-3.5" />
              Submit Skill
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-surface-card hover:text-ink focus:outline-none transition-colors cursor-pointer"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-hairline bg-canvas px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-3">
            <Link
              href="/explore"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-soft hover:text-ink transition-colors"
            >
              Explore Skills
            </Link>
            <Link
              href="/docs"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-soft hover:text-ink transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/integrations"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-soft hover:text-ink transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-soft hover:text-ink transition-colors"
            >
              Pricing
            </Link>
          </div>
          <hr className="border-hairline" />
          <div className="flex flex-col gap-2.5 pt-1">
            <Link href="/sign-in" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full h-10 inline-flex items-center justify-center rounded-md border border-hairline bg-canvas text-sm font-semibold text-ink hover:bg-surface-soft transition-colors cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/submit" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-active transition-colors cursor-pointer">
                <Plus className="size-4" />
                Submit Skill
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

