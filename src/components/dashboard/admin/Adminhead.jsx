"use client";

import { RiShieldCheckLine, RiUploadCloud2Line, RiAddLine, RiFileChartLine } from "react-icons/ri";

export default function AdminHeader() {
  return (
    <header className="bg-[#0d0d0d] border-b border-white/[0.06] px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">

        {/* ── Brand ── */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            <span className="text-[#caf300]">FORGE</span> CENTER
          </h1>

          {/* System status bar */}
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-pulse" />
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                System Status: Optimal
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <RiUploadCloud2Line className="text-[#caf300] text-xs" />
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                226 Active Uploads
              </span>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-white/15 text-white/60 text-[10px] font-black uppercase tracking-wider hover:border-white/30 hover:text-white transition-colors font-mono">
            <RiAddLine size={13} />
            <span className="hidden sm:inline">Create Session</span>
            <span className="sm:hidden">Create</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#caf300] text-black text-[10px] font-black uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all font-mono">
            <RiFileChartLine size={13} />
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}