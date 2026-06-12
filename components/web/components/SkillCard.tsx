import * as React from "react";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface SkillCardProps {
  title: string;
  filename: string;
  description: string;
  category: string;
  downloads: string;
  markdownContent: string;
  author: {
    name: string;
    avatarBg: string;
  };
  badge?: {
    text: string;
    bgClass: string;
    textClass: string;
  };
}

export function SkillCard({
  title,
  filename,
  description,
  category,
  downloads,
  markdownContent,
  author,
  badge,
}: SkillCardProps) {
  const [copied, setCopied] = React.useState(false);

  // Get initials from author name
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
    <div className="group flex flex-col justify-between bg-surface-card border border-hairline rounded-lg p-6 md:p-8 transition-all duration-300 hover:shadow-md hover:border-muted-soft/30">
      <div>
        {/* Top bar with category & stats */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-muted-soft tracking-wider uppercase bg-canvas border border-hairline px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-soft font-medium">
            <Download className="size-3.5" />
            <span>{downloads}</span>
          </div>
        </div>

        {/* Title and Badge */}
        <div className="flex items-start gap-2.5 mb-1.5">
          <h3 className="font-sans text-xl font-bold tracking-cal-sans-sm text-ink group-hover:text-primary transition-colors">
            {title}
          </h3>
          {badge && (
            <span
              className={`inline-flex px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full uppercase scale-90 ${badge.bgClass} ${badge.textClass}`}
            >
              {badge.text}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-body leading-relaxed mb-4 min-h-[40px]">
          {description}
        </p>

        {/* Embedded UI Chrome (File Content Preview) */}
        <div className="bg-canvas border border-hairline rounded-md p-3.5 mb-5 shadow-xs relative overflow-hidden text-left">
          <div className="flex items-center justify-between border-b border-hairline-soft pb-2 mb-2">
            <span className="text-[10px] font-mono text-muted-soft select-all font-semibold">
              {filename}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-soft">
              markdown
            </span>
          </div>
          <pre className="h-28 overflow-y-auto text-[11px] font-mono text-ink leading-normal select-text whitespace-pre-wrap">
            <code>{markdownContent}</code>
          </pre>
        </div>
      </div>

      {/* Card Footer with Author and Action Cluster */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-hairline/60">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div
            className={`size-7 rounded-full flex items-center justify-center text-[10px] font-bold text-ink select-none border border-hairline ${author.avatarBg}`}
          >
            {initials}
          </div>
          <span className="text-xs font-medium text-ink truncate max-w-[80px] sm:max-w-none">
            {author.name}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="size-8 border border-hairline rounded-md bg-canvas hover:bg-surface-soft text-ink flex items-center justify-center cursor-pointer transition-colors active:translate-y-px"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="h-8 px-3 text-xs font-semibold border border-hairline rounded-md bg-canvas hover:bg-surface-soft text-ink flex items-center gap-1.5 cursor-pointer transition-colors active:translate-y-px"
          >
            <Download className="size-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}