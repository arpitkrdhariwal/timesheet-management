"use client";

import { useState } from "react";
import { ProgressBar } from "@/components/timesheets/ProgressBar";
import { TimesheetCharts } from "@/components/timesheets/TimesheetCharts";
import { TaskRow } from "@/components/timesheets/TaskRow";
import { AddTaskButton } from "@/components/timesheets/AddTaskButton";
import { ViewToggle } from "@/components/timesheets/ViewToggle";
import { EntryModal } from "@/components/timesheets/EntryModal";
import { createEntry, deleteEntryApi, updateEntryApi } from "@/lib/api-client";
import { formatShortDate } from "@/lib/timesheet-utils";

export function WeekDetailView({
  week,
  entriesByDate,
  weekDates,
  projects,
  workTypes,
  onRefresh,
}) {
  const [view, setView] = useState("list");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(weekDates[0] || "");
  const [menuEntryId, setMenuEntryId] = useState(null);

  const openAddModal = (date) => {
    setEditingEntry(null);
    setSelectedDate(date);
    setModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setSelectedDate(entry.date);
    setModalOpen(true);
    setMenuEntryId(null);
  };

  const handleSaveEntry = async (data) => {
    if (editingEntry) await updateEntryApi(editingEntry.id, data);
    else await createEntry(data);
    onRefresh();
  };

  const handleDeleteEntry = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await deleteEntryApi(id);
    setMenuEntryId(null);
    onRefresh();
  };

  return (
    <>
      <header className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">This week&apos;s timesheet</h1>
            <p className="text-sm text-slate-500">{week.dateLabel}</p>
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>
        <ProgressBar totalHours={week.totalHours} />
      </header>

      {view === "graph" ? (
        <TimesheetCharts
          weekDates={weekDates}
          entriesByDate={entriesByDate}
          totalHours={week.totalHours}
        />
      ) : (
        <div className="divide-y divide-slate-100">
          {weekDates.map((date) => {
            const dayEntries = entriesByDate[date] || [];
            const label = dayEntries[0]?.dateLabel || formatShortDate(date);
            return (
              <section key={date} className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[56px_1fr] sm:gap-3">
                <h3 className="text-sm font-bold text-slate-900 sm:pt-2">{label}</h3>
                <div className="space-y-2">
                  {dayEntries.map((entry) => (
                    <TaskRow
                      key={entry.id}
                      entry={entry}
                      isMenuOpen={menuEntryId === entry.id}
                      onMenuToggle={() =>
                        setMenuEntryId(menuEntryId === entry.id ? null : entry.id)
                      }
                      onEdit={() => openEditModal(entry)}
                      onDelete={() => handleDeleteEntry(entry.id)}
                    />
                  ))}
                  <AddTaskButton
                    onClick={() => openAddModal(date)}
                    compact={dayEntries.length === 0}
                  />
                </div>
              </section>
            );
          })}
        </div>
      )}

      <EntryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveEntry}
        projects={projects}
        workTypes={workTypes}
        defaultDate={selectedDate}
        weekId={week.id}
        entry={editingEntry}
        title={editingEntry ? "Edit Entry" : "Add New Entry"}
      />
    </>
  );
}
