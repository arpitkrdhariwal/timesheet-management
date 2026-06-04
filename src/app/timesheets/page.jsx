"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TimesheetTable } from "@/components/timesheets/TimesheetTable";
import { TimesheetFilters } from "@/components/timesheets/TimesheetFilters";
import { Pagination } from "@/components/timesheets/Pagination";
import { fetchTimesheets } from "@/lib/api-client";

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("weekNumber");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadTimesheets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchTimesheets({
        dateRange: dateRange || undefined,
        status: status || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
      });
      setTimesheets(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch {
      setError("Failed to load timesheets. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dateRange, status, page, limit, sortBy, sortOrder]);

  useEffect(() => {
    loadTimesheets();
  }, [loadTimesheets]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Your Timesheets
            </h1>
            <div className="mt-4">
              <TimesheetFilters
                dateRange={dateRange}
                status={status}
                onDateRangeChange={(v) => {
                  setDateRange(v);
                  setPage(1);
                }}
                onStatusChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500">
              Loading timesheets...
            </div>
          ) : (
            <>
              <TimesheetTable
                timesheets={timesheets}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <Pagination
                page={page}
                totalPages={totalPages || 1}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
