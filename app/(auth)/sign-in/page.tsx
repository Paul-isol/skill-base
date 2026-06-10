"use client";

import * as React from "react";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/brandIcons";

export default function SignInPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-sans text-2xl font-semibold tracking-cal-sans-sm text-ink">
          Welcome back
        </h1>
        <p className="text-sm text-muted-soft">
          Enter your credentials to access your skill registry.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-ink" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="name@domain.com"
            className="w-full h-10 rounded-md border border-hairline bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft focus:border-ink transition-colors"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-ink" htmlFor="password">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-muted-soft hover:text-ink transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full h-10 rounded-md border border-hairline bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft focus:border-ink transition-colors"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-10 mt-2 inline-flex items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-active active:translate-y-px transition-colors duration-200 cursor-pointer"
        >
          Sign In
        </button>
      </form>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-hairline" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-canvas px-2 text-muted-soft">Or continue with</span>
        </div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={() => {}}
        className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-md border border-hairline bg-canvas text-sm font-semibold text-ink hover:bg-surface-soft active:translate-y-px transition-colors duration-200 cursor-pointer"
      >
        <GoogleIcon />
        Google
      </button>

      {/* Footer Link */}
      <p className="text-center text-xs text-muted-soft">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-ink hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

