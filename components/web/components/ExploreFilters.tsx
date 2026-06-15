"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export function ExploreFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter") || "";
  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = React.useState(currentQuery);
  const [, startTransition] = React.useTransition();

  // Sync state if URL changes externally
  React.useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateSearch = (newQuery: string, newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    if (newFilter) {
      params.set("filter", newFilter);
    } else {
      params.delete("filter");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    updateSearch(val, currentFilter);
  };

  const handleTabChange = (tab: string) => {
    updateSearch(query, tab);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border border-hairline bg-canvas p-4 rounded-lg shadow-xs mb-10">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-soft" />
        <input
          type="text"
          placeholder="Search skills (e.g. SQL, UI, scheduling)..."
          value={query}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 text-sm text-ink placeholder:text-muted-soft bg-canvas border border-hairline rounded-md outline-none focus:border-muted-soft/60 focus:ring-1 focus:ring-muted-soft/10 transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex bg-surface-soft border border-hairline p-1 rounded-lg gap-1 select-none w-full sm:w-auto">
        <button
          onClick={() => handleTabChange("")}
          className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            !currentFilter
              ? "bg-canvas text-ink border border-hairline shadow-xs"
              : "text-muted-soft hover:text-ink hover:bg-canvas/40 border border-transparent"
          }`}
        >
          All Categories
        </button>
        <button
          onClick={() => handleTabChange("frontend")}
          className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            currentFilter === "frontend"
              ? "bg-canvas text-ink border border-hairline shadow-xs"
              : "text-muted-soft hover:text-ink hover:bg-canvas/40 border border-transparent"
          }`}
        >
          Frontend
        </button>
        <button
          onClick={() => handleTabChange("backend")}
          className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            currentFilter === "backend"
              ? "bg-canvas text-ink border border-hairline shadow-xs"
              : "text-muted-soft hover:text-ink hover:bg-canvas/40 border border-transparent"
          }`}
        >
          Backend
        </button>
      </div>
    </div>
  );
}
