"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Plus } from "lucide-react";
import { GithubIcon } from "../icons/brandIcons";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session, isPending: loading } = authClient.useSession();

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
            href="https://github.com/Paul-isol/skill-base"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-muted-foreground hover:text-ink transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>
          
          {/* Submit Skill (always visible) */}
          <Link href="/submit">
            <Button
              size="sm"
              className="h-10 gap-1.5 font-semibold text-primary-foreground bg-primary hover:bg-primary-active transition-colors duration-200 cursor-pointer"
            >
              <Plus className="size-3.5" />
              Submit Skill
            </Button>
          </Link>

          {/* Session actions / loader */}
          {loading ? (
            <Skeleton className="size-9 rounded-full" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground select-none border-0 outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {session.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-semibold text-ink leading-none">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground leading-none">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer py-2">
                  <Link href="/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await authClient.signOut();
                  }}
                  variant="destructive"
                  className="cursor-pointer py-2"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-muted-foreground hover:text-ink transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:bg-surface-card hover:text-ink transition-colors cursor-pointer"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
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
            {loading ? (
              <Skeleton className="w-full h-10" />
            ) : session?.user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-3 py-2 border border-hairline rounded-lg bg-surface-soft">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground select-none">
                    {session.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-ink truncate leading-tight">{session.user.name}</span>
                    <span className="text-xs text-muted-foreground truncate leading-tight">{session.user.email}</span>
                  </div>
                </div>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="w-full block">
                  <Button
                    variant="outline"
                    className="w-full h-10 font-semibold cursor-pointer justify-center border border-hairline hover:bg-surface-soft text-ink bg-canvas"
                  >
                    My Profile & Skills
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await authClient.signOut();
                    setIsOpen(false);
                  }}
                  className="w-full h-10 font-semibold cursor-pointer justify-center"
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <Link href="/sign-in" onClick={() => setIsOpen(false)} className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-10 font-semibold cursor-pointer justify-center"
                >
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/submit" onClick={() => setIsOpen(false)} className="w-full py-2">
              <Button
                className="w-full h-10 gap-1.5 font-semibold cursor-pointer justify-center"
              >
                <Plus className="size-4" />
                Submit Skill
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


