import React from "react";
import Link from "next/link";
import { FiUser, FiClipboard, FiCpu } from "react-icons/fi";

export default function TrainerApplicationStatus({ cardData }) {
  const currentStatus = cardData?.status || "pending";
  const adminFeedback = cardData?.adminFeedback;

  const statusConfig = {
    pending: {
      text: "PENDING REVIEW",
      mobileBadge: "bg-[#caf300] text-[#0a0a0a]",
      desktopText: "text-white",
      dotColor: "bg-amber-500 animate-pulse",
    },
    approved: {
      text: "APPLICATION APPROVED",
      mobileBadge: "bg-emerald-500 text-white",
      desktopText: "text-[#caf300]",
      dotColor: "bg-[#caf300]",
    },
    rejected: {
      text: "APPLICATION REJECTED",
      mobileBadge: "bg-red-600 text-white",
      desktopText: "text-red-500",
      dotColor: "bg-red-600",
    },
  };

  const config = statusConfig[currentStatus] || statusConfig.pending;

  return (
    <div className="w-full space-y-4">
      {/* 🖥️ DESKTOP DESIGN */}
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex items-center justify-between bg-[#111111]/90 border border-neutral-900 p-5 w-full">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[#caf300] shadow-[0_0_8px_#caf300]"></div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                  SYSTEM STATUS
                </span>
                <h4 className="text-base font-black uppercase tracking-wide text-[#caf300] italic">
                  OPTIMIZED
                </h4>
              </div>
            </div>
            <FiCpu size={20} className="text-neutral-700" />
          </div>

          <Link
            href={`/dashboard/user/apply-trainer`}
            className="flex items-center justify-between bg-[#111111]/90 border border-neutral-900 p-5 hover:border-neutral-800 transition-all w-full"
          >
            <div className="flex items-center gap-4">
              <div className={`h-2 w-2 rounded-full ${config.dotColor}`}></div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                  TRAINER APPLICATION
                </span>
                <h4
                  className={`text-base font-black uppercase tracking-wide ${config.desktopText}`}
                >
                  {config.text}
                </h4>
              </div>
            </div>
            <FiClipboard size={20} className="text-neutral-600" />
          </Link>
        </div>

        {/* Desktop Admin Feedback */}
        {currentStatus === "rejected" && adminFeedback && (
          <div className="mt-4 p-4 bg-red-900/10 border border-red-500/20">
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">
              Admin Feedback:
            </p>
            <p className="text-sm text-red-100 font-mono italic">
              "{adminFeedback}"
            </p>
          </div>
        )}
      </div>

      {/* 📱 MOBILE DESIGN */}
      <div className="block md:hidden max-w-xl w-full bg-[#1b1b1b]/60 border border-neutral-800 p-6 relative font-sans mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 border border-neutral-700 flex items-center justify-center bg-[#141414]">
              <FiUser className="text-white text-lg" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider leading-tight">
                Mentorship Program
              </h4>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wide mt-0.5">
                Trainer Application
              </p>
            </div>
          </div>
          <span
            className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 ${config.mobileBadge}`}
          >
            {currentStatus}
          </span>
        </div>

        <div className="relative pl-3 mb-5 border-l-2 border-[#caf300]">
          <p className="text-xs text-neutral-300 leading-relaxed">
            {currentStatus === "rejected"
              ? "Application denied. Security matrix protocols not satisfied."
              : "Your application status protocol."}
          </p>

          {currentStatus === "rejected" && adminFeedback && (
            <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30">
              <p className="text-[10px] text-red-400 font-bold uppercase mb-1">
                Admin Note:
              </p>
              <p className="text-[11px] text-red-200">"{adminFeedback}"</p>
            </div>
          )}
        </div>

        <Link
          href={`/dashboard/user/apply-trainer`}
          className="w-full border border-[#caf300] text-[#caf300] font-mono text-[11px] font-bold py-2.5 uppercase tracking-widest block text-center transition-all active:bg-[#caf300] active:text-[#0a0a0a]"
        >
          View Status Protocol
        </Link>
      </div>
    </div>
  );
}