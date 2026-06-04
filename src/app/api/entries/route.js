import { NextResponse } from "next/server";
import {
  findProject,
  requireSession,
  validateEntry,
  validationError,
} from "@/lib/api-helpers";
import { addEntry } from "@/lib/data-store";
import { formatShortDate } from "@/lib/timesheet-utils";

export async function POST(request) {
  const { error } = await requireSession();
  if (error) return error;

  const body = await request.json();
  const errors = validateEntry(body, { requireWeekAndDate: true });
  if (Object.keys(errors).length > 0) return validationError(errors);

  const project = findProject(body.projectId);
  if (!project) return validationError({ projectId: "Invalid project" });

  const entry = addEntry({
    weekId: body.weekId,
    date: body.date,
    dateLabel: formatShortDate(body.date),
    projectId: body.projectId,
    projectName: project.name,
    workType: body.workType,
    description: body.description.trim(),
    hours: Number(body.hours),
  });

  return NextResponse.json({ data: entry }, { status: 201 });
}
