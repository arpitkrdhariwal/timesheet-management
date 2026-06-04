import { NextResponse } from "next/server";
import { requireSession } from "@/lib/api-helpers";
import { resetEntriesFromSeed } from "@/lib/data-store";

/**
 * Resets in-memory entries to seed data (development/demo use).
 * POST /api/seed/reset
 */
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const { error } = await requireSession();
  if (error) return error;

  resetEntriesFromSeed();

  return NextResponse.json({
    success: true,
    message: "Timesheet entries reset to seed data",
  });
}
