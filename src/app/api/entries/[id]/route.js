import { NextResponse } from "next/server";
import {
  findProject,
  notFound,
  requireSession,
  validateEntry,
  validationError,
} from "@/lib/api-helpers";
import { deleteEntry, updateEntry } from "@/lib/data-store";
import { formatShortDate } from "@/lib/timesheet-utils";

export async function PUT(request, { params }) {
  const { error } = await requireSession();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const errors = validateEntry(body);
  if (Object.keys(errors).length > 0) return validationError(errors);

  const project = findProject(body.projectId);
  if (!project) return validationError({ projectId: "Invalid project" });

  const updated = updateEntry(id, {
    projectId: body.projectId,
    projectName: project.name,
    workType: body.workType,
    description: body.description.trim(),
    hours: Number(body.hours),
    date: body.date,
    dateLabel: body.date ? formatShortDate(body.date) : undefined,
  });

  if (!updated) return notFound("Entry not found");
  return NextResponse.json({ data: updated });
}

export async function DELETE(_request, { params }) {
  const { error } = await requireSession();
  if (error) return error;

  const { id } = await params;
  if (!deleteEntry(id)) return notFound("Entry not found");
  return NextResponse.json({ success: true });
}
