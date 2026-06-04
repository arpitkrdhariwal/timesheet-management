"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Info, Minus, Plus, X } from "lucide-react";

export function EntryModal({
  isOpen,
  onClose,
  onSubmit,
  projects,
  workTypes,
  defaultDate,
  weekId,
  entry,
  title = "Add New Entry",
}) {
  const [projectId, setProjectId] = useState("");
  const [workType, setWorkType] = useState("Bug fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(12);
  const [date, setDate] = useState(defaultDate);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      if (entry) {
        setProjectId(entry.projectId);
        setWorkType(entry.workType);
        setDescription(entry.description);
        setHours(entry.hours);
        setDate(entry.date);
      } else {
        setProjectId("");
        setWorkType("Bug fixes");
        setDescription("");
        setHours(12);
        setDate(defaultDate);
      }
      setErrors({});
    }
  }, [isOpen, entry, defaultDate]);

  const validate = () => {
    const newErrors = {};
    if (!projectId) newErrors.projectId = "Please select a project";
    if (!workType) newErrors.workType = "Please select type of work";
    if (!description.trim())
      newErrors.description = "Task description is required";
    if (hours < 1 || hours > 24)
      newErrors.hours = "Hours must be between 1 and 24";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        projectId,
        workType,
        description,
        hours,
        date,
        weekId,
      });
      onClose();
    } catch (err) {
      const apiErrors = err?.errors;
      if (apiErrors) setErrors(apiErrors);
      else setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="entry-modal-title"
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2
            id="entry-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="space-y-5 px-6 py-5">
            {errors.form && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {errors.form}
              </p>
            )}

            {/* Select Project */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-900">
                Select Project
                <span className="text-red-500">*</span>
                <Info className="h-3.5 w-3.5 text-slate-400" aria-hidden />
              </label>
              <div className="relative">
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className={`w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 ${
                    errors.projectId ? "border-red-400" : "border-slate-300"
                  } ${!projectId ? "text-slate-400" : ""}`}
                >
                  <option value="">Project Name</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.projectId && (
                <p className="mt-1.5 text-xs text-red-500">{errors.projectId}</p>
              )}
            </div>

            {/* Type of Work */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-900">
                Type of Work
                <span className="text-red-500">*</span>
                <Info className="h-3.5 w-3.5 text-slate-400" aria-hidden />
              </label>
              <div className="relative">
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className={`w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 ${
                    errors.workType ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  {workTypes.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.workType && (
                <p className="mt-1.5 text-xs text-red-500">{errors.workType}</p>
              )}
            </div>

            {/* Task description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Task description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write text here ..."
                rows={4}
                className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 ${
                  errors.description ? "border-red-400" : "border-slate-300"
                }`}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                A note for extra info
              </p>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Hours stepper */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">
                Hours <span className="text-red-500">*</span>
              </label>
              <div
                className={`inline-flex overflow-hidden rounded-lg border ${
                  errors.hours ? "border-red-400" : "border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setHours((h) => Math.max(1, h - 1))}
                  className="flex h-10 w-10 items-center justify-center border-r border-slate-300 text-slate-600 hover:bg-slate-50"
                  aria-label="Decrease hours"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-14 items-center justify-center border-r border-slate-300 text-sm font-medium text-slate-900">
                  {hours}
                </span>
                <button
                  type="button"
                  onClick={() => setHours((h) => Math.min(24, h + 1))}
                  className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-50"
                  aria-label="Increase hours"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {errors.hours && (
                <p className="mt-1.5 text-xs text-red-500">{errors.hours}</p>
              )}
            </div>
          </div>

          {/* Footer: Add entry (left) + Cancel (right) */}
          <div className="flex gap-3 border-t border-slate-200 px-6 py-5">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:opacity-60"
            >
              {submitting ? "Saving..." : entry ? "Save changes" : "Add entry"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
