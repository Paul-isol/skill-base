"use client";

import * as React from "react";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/brandIcons";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormErrors = {
  email?: string;
  password?: string;
};

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    
    const result = signInSchema.safeParse({ email, password });
    
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
      // Proceed with login logic
      console.log("Validated successfully:", result.data);

      await authClient.signIn.email({...result.data, callbackURL: "/"},{
        onError: errors => {
          toast.error(errors.error.message || "Failed to Sign In")
        },
        onSuccess: () => {
          toast.success("Successfully Signed In")
          router.push("/")
        }
      })
    }
    setLoading(false)
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            placeholder="name@domain.com"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.email ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          {errors.email && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.email}</p>
          )}
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            placeholder="••••••••"
            className={`w-full h-10 rounded-md border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft transition-colors ${
              errors.password ? "border-destructive focus:border-destructive" : "border-hairline focus:border-ink"
            }`}
          />
          {errors.password && (
            <p className="text-xs font-semibold text-destructive mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 mt-2 font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-colors duration-200 cursor-pointer"
        >
          {loading ? <><Spinner className="size-4 mr-2" />Signing In...</> : "Sign In"}
        </Button>
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
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-ink hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

