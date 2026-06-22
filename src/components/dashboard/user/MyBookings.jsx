"use client";

import Link from "next/link";
import { FaRegCalendarAlt, FaRegUser, FaMapMarkerAlt } from "react-icons/fa";

export default function MyBookings({ getMyBookings }) {
  const bookings = getMyBookings || [];
  console.log("bookings:", bookings[0].classId);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white p-6 sm:p-12 font-sans selection:bg-[#caf300] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="relative border-l-4 border-[#caf300] pl-4 space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            My Enrolled Classes
          </h1>
          <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
            GymVortex Protocol // Personalized Training Grid
          </p>
        </div>

        {/* Bookings Grid */}
        {bookings.length === 0 ? (
          <div className="bg-[#141414] border border-zinc-900 p-12 text-center text-zinc-500 font-mono text-xs tracking-widest uppercase">
            [ NO ACTIVE BOOKINGS RECORDED IN DATABASE ]
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#141414] border border-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all duration-300"
              >
                {/* 📸 Top Image Section (image_1fc529.png থিম) */}
                <div className="w-full h-44 relative overflow-hidden bg-zinc-950 border-b border-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40 z-10" />
                  <img
                    src={
                      booking.classImage ||
                      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
                    }
                    alt={booking.className}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0"
                  />
                  <span className="absolute top-4 left-4 z-20 bg-zinc-900/90 border border-zinc-800 text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase px-2 py-1">
                    FITNESS PROTOCOL
                  </span>
                </div>

                {/* Card Content (image_1fc529.png টেকটিক্যাল ডিজাইন) */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  {/* Title & Session Time */}
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-xl font-black tracking-tight text-white uppercase leading-6 flex-1 min-w-0 break-words group-hover:text-[#caf300] transition-colors">
                      {booking.className}
                    </h2>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black font-mono text-[#caf300] tracking-tighter leading-none">
                        08:00
                      </div>
                      <div className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase mt-0.5">
                        AM SESSION
                      </div>
                    </div>
                  </div>

                  {/* Meta Details List with React Icons */}
                  <div className="space-y-3 font-mono">
                    {/* Date */}
                    <div className="flex items-center gap-3 text-zinc-400">
                      <FaRegCalendarAlt className="w-3.5 h-3.5 shrink-0 text-zinc-600" />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "JUNE 22, 2026"}
                      </span>
                    </div>

                    {/* Coach */}
                    <div className="flex items-center gap-3 text-zinc-400">
                      <FaRegUser className="w-3.5 h-3.5 shrink-0 text-zinc-600" />
                      <span className="text-xs font-bold uppercase tracking-wide truncate">
                        COACH MARCUS VANCE
                      </span>
                    </div>

                    {/* Sector / Paid Amount */}
                    <div className="flex items-center gap-3 text-zinc-400">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0 text-zinc-600" />
                      <span className="text-xs font-bold uppercase tracking-wide truncate">
                        TRACK DISTRICT • ${booking.priceAmount} PAID
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div>
                    <Link
                      href={`/classes/${booking.classId}`}
                      className="bg-[#caf300] hover:bg-[#b5da00] text-black font-mono text-xs font-black uppercase tracking-widest py-3 text-center transition-colors block"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
