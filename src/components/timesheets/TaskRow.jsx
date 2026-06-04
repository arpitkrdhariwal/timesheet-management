"use client";

import { MoreVertical } from "lucide-react";

export function TaskRow({
  entry,
  isMenuOpen,
  onMenuToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="relative flex items-center gap-2.5 rounded-md border border-slate-200 bg-white px-3 py-2">
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900">
        {entry.description}
      </p>
      <span className="shrink-0 text-xs text-slate-400">{entry.hours} hrs</span>
      <span className="max-w-[88px] shrink-0 truncate rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 sm:max-w-[120px] sm:px-2 sm:text-xs">
        {entry.projectName}
      </span>
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Task actions"
          aria-expanded={isMenuOpen}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={onMenuToggle}
              aria-hidden
            />
            <div className="absolute right-0 z-20 mt-1 w-32 rounded-md border border-slate-200 bg-white py-0.5 shadow-lg">
              <button
                type="button"
                onClick={onEdit}
                className="w-full px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="w-full px-3 py-1.5 text-left text-sm text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
