"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const session = useSession();
  const user = session?.data;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/timesheets" className="text-xl font-bold text-slate-900">
            ticktock
          </Link>
          <Link href="/timesheets" className="text-sm text-slate-600 hover:text-slate-900">
            Timesheets
          </Link>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 text-sm font-medium text-slate-900"
          >
            {user?.name || "User"}
            <ChevronDown className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
