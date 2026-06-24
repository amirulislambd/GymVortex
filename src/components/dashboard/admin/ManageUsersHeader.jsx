"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi"; // FontAwesome / Feather standard icons
import { FaUserPlus } from "react-icons/fa";

export default function ManageUsersHeader({ currentSearch }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");

  // Debounce logic: Sync search input with URL after a short delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset to page 1 on a new search trigger

      router.push(`/dashboard/admin/manage-users?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  // Sync internal state if URL params change externally
  useEffect(() => {
    setSearchTerm(currentSearch || "");
  }, [currentSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-6 w-full">
      <div>
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-zinc-100 italic">
          Manage Users
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Modify user permissions, roles, and access states across the GymVortex industrial athletic network.
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

        <button className="bg-lime-500 hover:bg-lime-600 text-black font-bold uppercase text-xs tracking-wider px-4 py-3 rounded-xs flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer">
          <FaUserPlus className="h-3.5 w-3.5" /> Add User
        </button>
      </div>
    </div>
  );
}