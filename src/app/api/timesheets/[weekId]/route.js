import { NextResponse } from "next/server";
import { notFound, requireSession } from "@/lib/api-helpers";
import {
  getEntriesByWeekId,
  getProjects,
  getWeeklyTimesheetById,
  getWorkTypes,
} from "@/lib/data-store";
import { groupEntriesByDate } from "@/lib/group-entries";
import { sumHours } from "@/lib/timesheet-utils";

export async function GET(_request, { params }) {
  const { error } = await requireSession();
  if (error) return error;

  const { weekId } = await params;
  const week = getWeeklyTimesheetById(weekId);
  if (!week) return notFound("Timesheet not found");

  const entries = getEntriesByWeekId(weekId);
  return NextResponse.json({
    week: { ...week, totalHours: sumHours(entries) },
    entries,
    entriesByDate: groupEntriesByDate(entries),
    projects: getProjects(),
    workTypes: getWorkTypes(),
  });
}
