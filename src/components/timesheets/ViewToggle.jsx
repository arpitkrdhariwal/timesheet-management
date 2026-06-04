"use client";

import { BarChart3, List } from "lucide-react";

export function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex shrink-0 rounded-md border border-slate-200 bg-slate-100 p-0.5">
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium ${
          view === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
        }`}
      >
        <List className="h-3.5 w-3.5" />
        Entries
      </button>
      <button
        type="button"
        onClick={() => onChange("graph")}
        className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium ${
          view === "graph" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
        }`}
      >
        <BarChart3 className="h-3.5 w-3.5" />
        Graph
      </button>
    </div>
  );
}
