"use client";

import * as React from "react";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/brandIcons";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const result = signUpSchema.safeParse({ name, email, password });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      // Proceed with registration logic
      console.log("Validated successfully:", result.data);

      await authClient.signUp.email(
        { ...result.data, callbackURL: "/" },
        {
          onError: (errors) => {
            toast.error(errors.error.message || "Failed to Sign Up");
          },
          onSuccess: () => {
            toast.success("Account Created Successfully");
            router.push("/");
          },
        },
      );
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-sans text-2xl font-semibold tracking-cal-sans-sm text-ink">
          Create an account
        </h1>
        <p className="text-sm text-muted-soft">
          Sign up to begin publishing and managing AI agent skills.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-ink" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            placeholder="John Doe"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.name
                ? "border-destructive focus:border-destructive"
                : "border-hairline focus:border-ink"
            }`}
          />
          {errors.name && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-ink" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            placeholder="name@domain.com"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.email
                ? "border-destructive focus:border-destructive"
                : "border-hairline focus:border-ink"
            }`}
          />
          {errors.email && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-ink" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            placeholder="••••••••"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.password
                ? "border-destructive focus:border-destructive"
                : "border-hairline focus:border-ink"
            }`}
          />
          {errors.password && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full h-10 mt-2 font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-colors duration-200 cursor-pointer"
        >
          {loading ?  <><Spinner /> Creating Account</> : "Create Account"}
        </Button>
      </form>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-hairline" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-canvas px-2 text-muted-soft">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => {}}
        className="w-full h-10 gap-2 border border-hairline bg-canvas font-semibold text-ink hover:bg-surface-soft active:translate-y-px transition-colors duration-200 cursor-pointer"
      >
        <GoogleIcon />
        Google
      </Button>

      {/* Footer Link */}
      <p className="text-center text-xs text-muted-soft">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-ink hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
