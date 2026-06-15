"use client";

import * as React from "react";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SkillDetailActionsProps {
  markdownContent: string;
  filename: string;
}

export function SkillDetailActions({ markdownContent, filename }: SkillDetailActionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      toast.success(`Copied ${filename} to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdownContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${filename} successfully!`);
    } catch (err) {
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={handleCopy}
        className="h-10 px-5 gap-2 font-semibold text-ink border border-hairline hover:bg-surface-soft bg-canvas transition-colors duration-200 cursor-pointer active:translate-y-px"
      >
        {copied ? (
          <>
            <Check className="size-4 text-emerald-600" />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copy Prompt File
          </>
        )}
      </Button>

      <Button
        onClick={handleDownload}
        className="h-10 px-5 gap-2 font-semibold text-primary-foreground bg-primary hover:bg-primary-active transition-colors duration-200 cursor-pointer active:translate-y-px"
      >
        <Download className="size-4" />
        Download Prompt (.md)
      </Button>
    </div>
  );
}
