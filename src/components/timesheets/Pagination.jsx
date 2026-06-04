"use client";

import { ChevronDown } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}) {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row">
      <div className="relative flex items-center gap-2 text-sm text-slate-600">
        <span>Rows per page</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="appearance-none rounded-md border border-slate-300 py-1.5 pl-2 pr-7 text-sm outline-none"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
      </div>

      <div className="flex items-center gap-1 rounded-md border border-slate-200 p-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          Previous
        </button>
        {getPageNumbers().map((p, i) =>
          typeof p === "number" ? (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={`min-w-[32px] rounded px-2 py-1.5 text-sm ${
                p === page
                  ? "font-semibold text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={i} className="px-1 text-slate-400">
              {p}
            </span>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
