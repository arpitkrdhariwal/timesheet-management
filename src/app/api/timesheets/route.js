import { NextResponse } from "next/server";
import { requireSession } from "@/lib/api-helpers";
import { getWeeklyTimesheets } from "@/lib/data-store";
import { parseDateRangeFilter, weekOverlapsRange } from "@/lib/timesheet-utils";

export async function GET(request) {
  const { error } = await requireSession();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const dateRange = searchParams.get("dateRange") || "";
  const status = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 5);
  const sortBy = searchParams.get("sortBy") || "weekNumber";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const { start, end } = parseDateRangeFilter(dateRange);
  let timesheets = getWeeklyTimesheets().filter((week) =>
    weekOverlapsRange(week.startDate, week.endDate, start, end)
  );

  if (status) timesheets = timesheets.filter((week) => week.status === status);

  timesheets.sort((a, b) => {
    const direction = sortOrder === "desc" ? -1 : 1;
    if (sortBy === "weekNumber") return (a.weekNumber - b.weekNumber) * direction;
    if (sortBy === "date") {
      return (new Date(a.startDate) - new Date(b.startDate)) * direction;
    }
    if (sortBy === "status") return a.status.localeCompare(b.status) * direction;
    return 0;
  });

  const total = timesheets.length;
  const startIndex = (page - 1) * limit;

  return NextResponse.json({
    data: timesheets.slice(startIndex, startIndex + limit),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
