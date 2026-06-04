export const TARGET_HOURS = 40;

export function calculateStatus(totalHours) {
  if (totalHours === 0) return "missing";
  if (totalHours === TARGET_HOURS) return "completed";
  return "incomplete";
}

export function sumHours(entries) {
  return entries.reduce((sum, entry) => sum + entry.hours, 0);
}

export function formatDateRange(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = endDate.toLocaleString("en-US", { month: "long" });
  const year = endDate.getFullYear();
  return `${startDay} - ${endDay} ${month}, ${year}`;
}

/** e.g. "2024-01-21" → "Jan 21" */
export function formatShortDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
}

export function getProgressPercent(totalHours) {
  return Math.min(100, Math.round((totalHours / TARGET_HOURS) * 100));
}

export function getActionLabel(status) {
  if (status === "completed") return "View";
  if (status === "incomplete") return "Update";
  return "Create";
}

export function parseDateRangeFilter(range) {
  if (!range || range === "all") return {};
  const [startStr, endStr] = range.split("_");
  return {
    start: startStr ? new Date(startStr) : undefined,
    end: endStr ? new Date(endStr) : undefined,
  };
}

export function weekOverlapsRange(weekStart, weekEnd, filterStart, filterEnd) {
  if (!filterStart && !filterEnd) return true;
  const start = new Date(weekStart);
  const end = new Date(weekEnd);
  if (filterStart && end < filterStart) return false;
  if (filterEnd && start > filterEnd) return false;
  return true;
}
