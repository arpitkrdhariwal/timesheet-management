"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WeekDetailView } from "@/components/timesheets/WeekDetailView";
import { fetchWeekDetail } from "@/lib/api-client";
import { getWeekDates } from "@/lib/date-utils";

export default function WeekDetailPage() {
  const weekId = useParams().weekId;

  const [week, setWeek] = useState(null);
  const [entriesByDate, setEntriesByDate] = useState({});
  const [weekDates, setWeekDates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeek = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWeekDetail(weekId);
      setWeek(data.week);
      setEntriesByDate(data.entriesByDate);
      setProjects(data.projects);
      setWorkTypes(data.workTypes);
      setWeekDates(getWeekDates(data.week.startDate, data.week.endDate));
    } catch {
      setError("Failed to load timesheet. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [weekId]);

  useEffect(() => {
    loadWeek();
  }, [loadWeek]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-4 sm:px-6 sm:py-5">
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
          {loading && (
            <p className="py-12 text-center text-slate-500">Loading...</p>
          )}
          {error && (
            <p className="py-12 text-center text-red-600">{error}</p>
          )}
          {week && !loading && !error && (
            <WeekDetailView
              week={week}
              entriesByDate={entriesByDate}
              weekDates={weekDates}
              projects={projects}
              workTypes={workTypes}
              onRefresh={loadWeek}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
