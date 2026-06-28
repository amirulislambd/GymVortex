"use client";

import {
  RiShieldCheckLine,
  RiUploadCloud2Line,
  RiCheckboxCircleFill,
} from "react-icons/ri";

export default function AdminHeader({ user }) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-[#0d0d0d] px-4 py-5 sm:px-3">
      {/* Background Glow */}
      <div className="absolute -top-16 right-0 h-48  rounded-full bg-[#caf300]/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* ================= LEFT ================= */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#caf300]/30 bg-[#caf300]/10">
              <RiShieldCheckLine className="text-2xl text-[#caf300]" />
            </div>

            <div>
              <h1
                className="text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                <span className="text-[#caf300]">FORGE</span> CENTER
              </h1>

              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/40">
                ADMIN CONTROL PANEL
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#caf300]/20 bg-[#caf300]/10 px-3 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#caf300]" />

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#caf300]">
                System Optimal
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <RiUploadCloud2Line className="text-[#caf300]" />

              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                Live Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT (Admin Profile) ================= */}
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={user?.image}
              alt={user?.name}
              className="h-16 w-16 rounded-2xl border-2 border-[#caf300] object-cover shadow-lg shadow-[#caf300]/20"
            />

            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0d0d0d] bg-[#caf300]">
              <RiCheckboxCircleFill className="text-xs text-black" />
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0">
            <h2
              className="truncate text-xl font-black uppercase text-white"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {user?.name}
            </h2>

            <p className="truncate text-[11px] font-mono text-white/50">
              {user?.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#caf300]/30 bg-[#caf300]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#caf300]">
                ADMIN
              </span>

              {user?.emailVerified && (
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  VERIFIED
                </span>
              )}

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/60">
                {user?.plan?.replace("_", " ")}
              </span>
            </div>

            <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-white/35">
              Joined{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}