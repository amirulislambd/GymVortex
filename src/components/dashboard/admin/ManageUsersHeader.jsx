"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";

export default function ManageUsersHeader({ currentSearch }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");

  // Sync if URL changes externally
  useEffect(() => {
    setSearchTerm(currentSearch || "");
  }, [currentSearch]);

  // Debounce — searchParams dependency সরানো হয়েছে
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }
      params.set("page", "1");
      router.push(`/dashboard/admin/manage-users?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]); // ← শুধু searchTerm

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-6 w-full">
      <div>
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-zinc-100 italic">
          Manage Users
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Modify user permissions, roles, and access states across the GymVortex
          network.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search athletes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-sm text-zinc-200 pl-4 pr-10 py-2.5 rounded-xs focus:outline-none focus:border-lime-500 transition-colors"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}