import { FiArrowRight, FiCalendar, FiRotateCcw } from "react-icons/fi";
import Link from "next/link";

const sessions = [
  {
    id: 1,
    when: "TODAY | 18:30",
    icon: "repeat",
    title: "METABOLIC POWER",
    coach: "COACH STRICKLAND",
    date: { month: "OCT", day: "24" },
  },
  {
    id: 2,
    when: "TOMORROW | 07:00",
    icon: "calendar",
    title: "INDUSTRIAL HIIT",
    coach: "COACH VANCE",
    date: { month: "OCT", day: "26" },
  },
];

export default function UpcomingSessions() {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          UPCOMING
        </h2>
        <Link
          href="/dashboard/user/booked-classes"
          className="text-[10px] font-black uppercase tracking-widest text-[#caf300] hover:underline"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          VIEW SCHEDULE
        </Link>
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-2">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="border-l-2 border-[#caf300] pl-4 py-2 pr-3 bg-[#0a0a0a] hover:bg-[#111] transition-all group cursor-pointer"
          >
            {/* When */}
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[9px] font-bold uppercase tracking-widest text-neutral-500"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {s.when}
              </span>
              {s.icon === "repeat" ? (
                <FiRotateCcw size={11} className="text-neutral-700" />
              ) : (
                <FiCalendar size={11} className="text-neutral-700" />
              )}
            </div>

            {/* Title */}
            <p
              className="text-base sm:text-lg font-black uppercase text-white leading-tight"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {s.title}
            </p>

            {/* Coach */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[#caf300] text-xs">▲</span>
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {s.coach}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
