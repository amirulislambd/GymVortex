import { FiArrowRight, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const sessions = [
  {
    id: 1,
    date: { month: "OCT", day: "24" },
    title: "Metabolic Power",
    time: "08:00 AM",
    coach: "Coach Jax",
  },
  {
    id: 2,
    date: { month: "OCT", day: "26" },
    title: "Industrial HIIT",
    time: "05:30 PM",
    coach: "Coach Raze",
  },
];

export default function UpcomingSessions() {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          UPCOMING
        </h2>
        <FiCalendar className="text-neutral-600" size={16} />
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-4 p-3 border border-neutral-900 hover:border-[#caf300]/20 hover:bg-[#caf300]/5 transition-all group cursor-pointer"
          >
            {/* Date Badge */}
            <div className="flex flex-col items-center justify-center w-10 shrink-0">
              <span
                className="text-[9px] font-bold uppercase text-neutral-500 leading-none"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {s.date.month}
              </span>
              <span
                className="text-xl font-black text-[#caf300] leading-tight"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                {s.date.day}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-neutral-800" />

            {/* Info */}
            <div className="flex flex-col gap-0.5 flex-1">
              <span
                className="text-sm font-black uppercase text-white leading-tight"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                {s.title}
              </span>
              <span
                className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {s.time} • {s.coach}
              </span>
            </div>

            <FiArrowRight
              className="text-neutral-700 group-hover:text-[#caf300] transition-colors shrink-0"
              size={14}
            />
          </div>
        ))}
      </div>

      {/* View All */}
      <Link
        href="/dashboard/user/booked-classes"
        className="w-full py-2.5 text-center text-[10px] font-black uppercase tracking-widest text-[#caf300] border border-[#caf300]/20 hover:bg-[#caf300]/10 transition-all mt-auto"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        VIEW ALL SESSIONS
      </Link>
    </div>
  );
}