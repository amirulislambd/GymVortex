import { GetClassById } from "@/lib/api/getClasses";
import ClassActions from "@/components/classes/ClassActions";
import { CheckFavorite } from "@/lib/api/favorite";
import { CheckBooking } from "@/lib/api/booking";
import { GetUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const calculateEndTime = (startTime, duration) => {
  if (!startTime || !duration) return "TBD";
  const [hours, minutes] = startTime.split(":").map(Number);
  const durationMinutes = parseInt(duration) || 0;
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
};

const DAY_NAMES = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const DAY_SHORT = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const apiResponse = await GetClassById(id);
    const classData = apiResponse?.data || apiResponse;
    return {
      title: classData?.title ? `${classData.title} | GymVortex` : "Class Details | GymVortex",
      description: classData?.description?.slice(0, 155) || "View elite fitness class details at GymVortex.",
    };
  } catch (error) {
    return {
      title: "Class Details | GymVortex",
      description: "View elite fitness class details at GymVortex.",
    };
  }
}

export default async function ClassDetails({ params }) {
  const { id } = await params;

  const user = await GetUserSession();
  console.log("user:", user);
  const userEmail = user?.email ?? null;

  const apiResponse = await GetClassById(id);
  const classData = apiResponse?.data || apiResponse;

  let isBooked = false;
  let isFavorite = false;
  if (!user) {
    redirect(`/login?redirect=/classes/${id}`);
  }

  if (userEmail) {
    const [bookingRes, favoriteRes] = await Promise.all([
      CheckBooking({ userEmail, classId: id }),
      CheckFavorite({ userEmail, classId: id }),
    ]);

    // API returns: { success: true, isBooked: true/false }
    //              { success: true, isFavorite: true/false }
    isBooked = bookingRes?.isBooked ?? false;
    isFavorite = favoriteRes?.isFavorite ?? false;
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <p
          className="text-xs text-red-400 uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          ERROR 404: TARGET SESSION NOT FOUND WITHIN DATABASE.
        </p>
      </div>
    );
  }

  const endTime = calculateEndTime(classData.time, classData.duration);
  const formattedDays =
    classData.days
      ?.sort((a, b) => a - b)
      .map((d) => DAY_SHORT[d])
      .join(" / ") || "N/A";
  const todayIndex = new Date().getDay();

  return (
    <div
      className="bg-[#131313] text-[#e5e2e1] min-h-screen overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent z-10" />
          <img
            className="w-full h-full object-cover grayscale brightness-[0.4]"
            src={
              classData.image ||
              "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200"
            }
            alt={classData.title || "Class Image"}
          />
        </div>
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 pb-8 sm:pb-12">
          <div
            className="inline-block bg-[#caf300] text-[#171e00] text-[10px] sm:text-[12px] font-bold px-3 py-1 uppercase mb-4 tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {classData.difficulty || "Standard"}
          </div>
          <h1
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase italic leading-none mb-4 max-w-3xl tracking-tighter text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {classData.title?.split(" ")[0] || ""}{" "}
            <span className="text-[#caf300]">
              {classData.title?.split(" ").slice(1).join(" ") || ""}
            </span>
          </h1>
          <div
            className="flex flex-wrap gap-3 sm:gap-6 items-center text-[10px] sm:text-[12px]"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#caf300] text-base sm:text-lg">
                schedule
              </span>
              <span className="uppercase tracking-wider">
                {formattedDays} — {classData.time || "TBD"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#caf300] text-base sm:text-lg">
                payments
              </span>
              <span className="uppercase tracking-wider">
                ${parseFloat(classData.price || 0).toFixed(2)} per session
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 mt-8 sm:mt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#262626]/70 backdrop-blur-xl border border-[#caf300]/10 p-5 sm:p-8">
              <h2
                className="font-bold text-lg sm:text-2xl uppercase border-b border-[#444932]/30 pb-4 mb-6 tracking-tight text-white"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                Class Protocol
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#c5c9ac] leading-relaxed">
                {classData.description || "No description provided."}
              </p>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {[
                  { label: "Category", value: classData.category || "General" },
                  { label: "Duration", value: classData.duration || "N/A" },
                  {
                    label: "Total Slots",
                    value: `${classData.capacity || 0} Seats`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-[#444932]/20 p-3 sm:p-4 bg-white/5"
                  >
                    <p className="text-[10px] sm:text-[11px] text-[#caf300] mb-1 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-base sm:text-xl font-bold uppercase text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#262626]/70 backdrop-blur-xl border border-[#caf300]/10 p-5 sm:p-8">
              <h2
                className="font-bold text-lg sm:text-2xl uppercase border-b border-[#444932]/30 pb-4 mb-6 tracking-tight text-white"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                Weekly Schedule
              </h2>
              <div
                className="space-y-2"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {classData.days
                  ?.slice()
                  .sort((a, b) => a - b)
                  .map((dayNum) => {
                    const isToday = dayNum === todayIndex;
                    return (
                      <div
                        key={dayNum}
                        className={`flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 border-l-4 transition-all ${isToday ? "bg-[#caf300]/5 border-[#caf300]" : "border-transparent hover:bg-white/5 hover:border-[#caf300]/30"}`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span
                            className={`text-sm sm:text-lg font-bold uppercase ${isToday ? "text-white" : "text-[#c5c9ac]"}`}
                          >
                            {DAY_NAMES[dayNum] || "Unknown"}
                          </span>
                          {isToday && (
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-[#caf300] text-[#171e00] px-1.5 py-0.5">
                              TODAY
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[11px] sm:text-sm px-2 sm:px-3 py-1 font-bold ${isToday ? "bg-[#caf300] text-[#171e00]" : "border border-[#444932]/40 text-[#c5c9ac]"}`}
                        >
                          {classData.time || "TBD"} — {endTime}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#262626]/70 backdrop-blur-xl border border-[#caf300]/10 p-5 sm:p-8">
              <h2
                className="text-[11px] sm:text-[12px] text-[#caf300] uppercase mb-4 sm:mb-6 tracking-widest"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Lead Engineer
              </h2>
              <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 border-2 border-[#caf300] p-1 bg-neutral-900 overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={classData.trainerImage || "/default-avatar.png"}
                    alt={classData.trainerName || "Trainer"}
                  />
                </div>
                <div>
                  <h3
                    className="text-base sm:text-xl font-bold uppercase text-white leading-tight"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    {classData.trainerName || "Expert Trainer"}
                  </h3>
                  <p
                    className="text-[10px] sm:text-[11px] text-[#c5c9ac] uppercase tracking-wider mt-0.5"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Performance Specialist
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] sm:text-xs text-[#c5c9ac] mb-4 sm:mb-6 italic leading-relaxed"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                "Strength isn't just physical. It's the byproduct of mechanical
                discipline and mental grit."
              </p>
              <button
                className="w-full py-2.5 sm:py-3 border border-white text-white text-[11px] sm:text-[12px] uppercase hover:bg-white hover:text-black transition-all cursor-pointer font-bold tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                View Profile
              </button>
            </div>

            <ClassActions
              classData={classData}
              id={id}
              isBooked={isBooked}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      </section>
    </div>
  );
}