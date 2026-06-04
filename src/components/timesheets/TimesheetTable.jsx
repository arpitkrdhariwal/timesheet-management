"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getActionLabel } from "@/lib/timesheet-utils";

function SortIcon({
  column,
  sortBy,
  sortOrder,
}) {
  if (sortBy !== column) {
    return (
      <span className="inline-flex flex-col opacity-40">
        <ChevronUp className="-mb-1 h-3 w-3" />
        <ChevronDown className="h-3 w-3" />
      </span>
    );
  }
  return sortOrder === "asc" ? (
    <ChevronUp className="h-4 w-4" />
  ) : (
    <ChevronDown className="h-4 w-4" />
  );
}

export function TimesheetTable({
  timesheets,
  sortBy,
  sortOrder,
  onSort,
}) {
  const columns = [
    { key: "weekNumber", label: "WEEK #" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500"
              >
                <button
                  onClick={() => onSort(col.key)}
                  className="inline-flex items-center gap-1 hover:text-slate-700"
                >
                  {col.label}
                  <SortIcon
                    column={col.key}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {timesheets.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                No timesheets found
              </td>
            </tr>
          ) : (
            timesheets.map((sheet) => (
              <tr
                key={sheet.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-4 text-sm text-slate-900">
                  {sheet.weekNumber}
                </td>
                <td className="px-4 py-4 text-sm text-slate-900">
                  {sheet.dateLabel}
                </td>
                <td className="px-4 py-4">
                  <Badge status={sheet.status} />
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/timesheets/${sheet.id}`}
                    className="text-sm font-medium text-blue-700 hover:text-blue-800"
                  >
                    {getActionLabel(sheet.status)}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
