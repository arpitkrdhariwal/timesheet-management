import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProjects } from "@/lib/data-store";

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) return { session: null, error: unauthorized() };
  return { session, error: null };
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function notFound(message) {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function validationError(errors) {
  return NextResponse.json({ errors }, { status: 400 });
}

export function validateEntry(body, options = {}) {
  const errors = {};
  if (options.requireWeekAndDate) {
    if (!body.weekId) errors.weekId = "Week is required";
    if (!body.date) errors.date = "Date is required";
  }
  if (!body.projectId) errors.projectId = "Project is required";
  if (!body.workType) errors.workType = "Type of work is required";
  if (!body.description?.trim()) errors.description = "Task description is required";
  if (!body.hours || body.hours < 1 || body.hours > 24) {
    errors.hours = "Hours must be between 1 and 24";
  }
  return errors;
}

export function findProject(projectId) {
  return getProjects().find((p) => p.id === projectId) ?? null;
}
