"use client";
import { authClient } from "@/lib/auth-client";

export default function OverviewHeader({ userActivity }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 1. Destructure backend metrics with safe defaults to prevent runtime crashes
  const {
    version = "V2.4",
    username = user?.name?.toUpperCase().replace(/\s+/g, "_") + "_01" ||
      "ATHLETE_01",
    rank = "TITAN II",
    streak = 12,
  } = userActivity || {};

  // Helper function to safely split the rank text into two parts for styling
  const renderRank = (fullRank) => {
    const parts = fullRank.split(" ");
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}{" "}
          <span className="text-[#caf300]">{parts.slice(1).join(" ")}</span>
        </>
      );
    }
    return <span className="text-[#caf300]">{fullRank}</span>;
  };

  return (
    <div className="w-full bg-[#0f0f0f] border border-neutral-900 rounded-md">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* System Status Bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span
            className="text-[9px] font-bold uppercase tracking-widest text-neutral-500"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            SYSTEM STATUS: OPTIMIZED
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-[#caf300] text-[#0a0a0a]"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            ACTIVE
          </span>
        </div>

        {/* Terminal Title */}
        <div className="px-4 pb-3">
          <h1
            className="text-3xl font-black uppercase tracking-tight leading-none"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            <span className="text-white">TERMINAL </span>
            <span className="text-[#caf300]">{version}</span>
          </h1>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 border-t border-neutral-900">
          <div className="px-4 py-3 border-r border-neutral-900">
            <p
              className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              USER RANK
            </p>
            <p
              className="text-2xl font-black uppercase text-white leading-none"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {renderRank(rank)}
            </p>
          </div>
          <div className="px-4 py-3">
            <p
              className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              CURRENT STREAK
            </p>
            <p
              className="text-2xl font-black uppercase text-white leading-none"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {streak} <span className="text-[#caf300]">DAYS</span>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-5 py-4">
        <div className="flex flex-col gap-1">
          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            <span className="text-white">TERMINAL </span>
            <span className="text-[#caf300]">{version}</span>
          </h1>
          <p
            className="text-[10px] font-bold uppercase tracking-widest text-neutral-600"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            PERFORMANCE PROTOCOL INITIALIZED /{" "}
            <span className="text-neutral-400">USER: {username}</span>
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span
              className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              CURRENT RANK
            </span>
            <span
              className="text-2xl md:text-3xl font-black uppercase text-white leading-tight"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {renderRank(rank)}
            </span>
          </div>
          <div className="w-px h-8 bg-neutral-800" />
          <div className="flex flex-col items-end">
            <span
              className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              STREAK
            </span>
            <span
              className="text-2xl md:text-3xl font-black uppercase text-white leading-tight"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {streak} <span className="text-[#caf300]">DAYS</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}