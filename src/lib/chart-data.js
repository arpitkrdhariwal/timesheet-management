import { formatShortDate, TARGET_HOURS } from "@/lib/timesheet-utils";

const PROJECT_COLORS = [
  "#2563eb",
  "#f97316",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export function buildDailyHoursData(weekDates, entriesByDate) {
  return weekDates.map((date) => {
    const dayEntries = entriesByDate[date] || [];
    const hours = dayEntries.reduce((sum, e) => sum + e.hours, 0);
    return {
      date,
      label: dayEntries[0]?.dateLabel || formatShortDate(date),
      hours,
    };
  });
}

export function buildProjectHoursData(entriesByDate) {
  const totals = new Map();
  Object.values(entriesByDate).forEach((dayEntries) => {
    dayEntries.forEach((entry) => {
      totals.set(entry.projectName, (totals.get(entry.projectName) || 0) + entry.hours);
    });
  });
  return Array.from(totals.entries()).map(([name, hours], index) => ({
    name,
    hours,
    fill: PROJECT_COLORS[index % PROJECT_COLORS.length],
  }));
}

export function getDailyTarget(dayCount) {
  if (dayCount <= 0) return 8;
  return Math.round((TARGET_HOURS / dayCount) * 10) / 10;
}
