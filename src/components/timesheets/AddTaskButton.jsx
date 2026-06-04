"use client";

import { Plus } from "lucide-react";

export function AddTaskButton({ onClick, compact = false }) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group inline-flex items-center gap-1.5 rounded-md py-1 text-sm text-slate-500 transition-colors hover:text-blue-600"
      >
        <Plus className="h-3.5 w-3.5" />
        Add new task
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 py-2 text-sm text-slate-500 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
    >
      <Plus className="h-3.5 w-3.5" />
      Add new task
    </button>
  );
}
