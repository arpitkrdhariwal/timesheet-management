"use client";

import { ChevronDown } from "lucide-react";

const DATE_RANGES = [
  { value: "", label: "Date Range" },
  { value: "all", label: "All dates" },
  { value: "2024-01-01_2024-01-31", label: "January 2024" },
  { value: "2024-02-01_2024-02-29", label: "February 2024" },
  { value: "2024-03-01_2024-03-31", label: "March 2024" },
  { value: "2024-04-01_2024-04-30", label: "April 2024" },
];

const STATUS_OPTIONS = [
  { value: "", label: "Status" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
  { value: "missing", label: "Missing" },
];

export function TimesheetFilters({
  dateRange,
  status,
  onDateRangeChange,
  onStatusChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative">
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-blue-600"
        >
          {DATE_RANGES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      <div className="relative">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-blue-600"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
