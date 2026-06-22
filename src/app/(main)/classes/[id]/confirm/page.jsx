import { GetClassById } from "@/lib/api/getClasses";
import BookingWrapper from "./BookingWrapper";
import Link from "next/link";

const DAY_SHORT = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const calculateEndTime = (startTime, duration) => {
  if (!startTime || !duration) return "TBD";
  const [hours, minutes] = startTime.split(":").map(Number);
  const durationMinutes = parseInt(duration) || 0;
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
};

export default async function ConfirmBookingPage({ params }) {
  const { id } = await params;
  const apiResponse = await GetClassById(id);
  const classData = apiResponse?.data || apiResponse;

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <p
          className="text-xs text-red-400 uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          ERROR 404: SESSION NOT FOUND.
        </p>
      </div>
    );
  }

  const endTime = calculateEndTime(classData.time, classData.duration);
  const formattedDays =
    classData.days
      ?.slice()
      .sort((a, b) => a - b)
      .map((d) => DAY_SHORT[d])
      .join(" / ") || "N/A";

  return (
    <div
      className="text-[#e5e2e1] min-h-screen relative"
      style={{ fontFamily: "Inter, sans-serif", background: "#131313" }}
    >
      {/* ── Background Image ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${classData.image})`,
          opacity: 0.25,
          filter: "grayscale(20%) blur(1px)",
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none" />

      {/* ── Back Button ── */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 pt-4 sm:pt-6">
        <Link
          href={`/classes/${id}`}
          className="inline-flex items-center gap-2 group w-fit"
        >
          {/* SVG back arrow — no Material Icons dependency */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#caf300"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span
            className="text-[11px] font-bold uppercase tracking-widest text-[#caf300] group-hover:text-white transition-colors"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Back to Class
          </span>
        </Link>
      </div>

      {/* ── Main Content ── */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-8 pb-16 space-y-4 sm:space-y-5">
        {/* ── Class Summary Card ── */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#caf300]/20 p-4 sm:p-6 relative overflow-hidden">
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#caf300]/50 pointer-events-none" />

          <div className="space-y-4">
            {/* Title + Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span
                  className="text-[9px] sm:text-[10px] text-[#caf300] uppercase tracking-widest block mb-1"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Session Protocol
                </span>
                <h2
                  className="text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight text-white"
                  style={{
                    fontFamily: "Archivo Narrow, sans-serif",
                    wordBreak: "break-word",
                  }}
                >
                  {classData.title}
                </h2>
              </div>
              <div
                className="shrink-0 bg-[#caf300] text-[#171e00] px-2 py-1 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase max-w-[120px] text-center"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {classData.difficulty || "Standard"}
              </div>
            </div>

            {/* Trainer + Category */}
            <div className="grid grid-cols-2 gap-3 border-t border-[#444932]/30 pt-3">
              <div className="min-w-0">
                <p
                  className="text-[9px] sm:text-[10px] text-[#c6c6c7] uppercase mb-1 tracking-wider"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Lead Trainer
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                  {classData.trainerName}
                </p>
              </div>
              <div className="min-w-0">
                <p
                  className="text-[9px] sm:text-[10px] text-[#c6c6c7] uppercase mb-1 tracking-wider"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Category
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#caf300] truncate">
                  {classData.category}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-[9px] sm:text-[10px]"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {/* Days */}
              <div className="flex items-center gap-1.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#caf300"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="uppercase text-[#e5e2e1]">
                  {formattedDays}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#caf300"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="uppercase text-[#e5e2e1]">
                  {classData.time} — {endTime}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#caf300"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="uppercase text-[#e5e2e1]">
                  {classData.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Booking Wrapper ── */}
        <BookingWrapper classData={classData} id={id} />
      </main>
    </div>
  );
}