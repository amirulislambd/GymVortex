"use client";
import { authClient } from "@/lib/auth-client";

export default function OverviewHeader({ rank = "TITAN II", streak = 12 }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handle = user?.name
    ? user.name.toUpperCase().replace(/\s+/g, "_") + "_01"
    : "ATHLETE_01";

  const [rankWord, rankNum] = rank.split(" ");

  return (
    <div className="w-full px-5 py-4 flex items-center justify-between bg-[#0f0f0f] border border-neutral-900">
      {/* Left */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          <span className="text-white">TERMINAL </span>
          <span className="text-[#caf300]">V2.4</span>
        </h1>
        <p
          className="text-[10px] font-bold uppercase tracking-widest text-neutral-600"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          PERFORMANCE PROTOCOL INITIALIZED /{" "}
          <span className="text-neutral-400">USER: {handle}</span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 sm:gap-8">
        <div className="flex flex-col items-end">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 font-bold"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            CURRENT RANK
          </span>
          <span
            className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white leading-tight"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {rankWord}{" "}
            <span className="text-[#caf300]">{rankNum}</span>
          </span>
        </div>

        <div className="w-px h-8 bg-neutral-800 hidden sm:block" />

        <div className="flex flex-col items-end">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 font-bold"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            STREAK
          </span>
          <span
            className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white leading-tight"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {streak}{" "}
            <span className="text-[#caf300]">DAYS</span>
          </span>
        </div>
      </div>
    </div>
  );
}