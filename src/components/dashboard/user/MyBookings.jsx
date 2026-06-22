"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarAlt, FaRegUser, FaDollarSign } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

export default function MyBookings({ getMyBookings }) {
  const bookings = getMyBookings || [];

  if (bookings.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-16 h-16 border-2 border-[#caf300]/20 flex items-center justify-center">
          <FiPackage size={28} className="text-[#444932]" />
        </div>
        <p
          className="text-xs text-neutral-600 uppercase tracking-widest text-center"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          [ NO ACTIVE BOOKINGS RECORDED IN DATABASE ]
        </p>
        <Link
          href="/classes"
          className="text-[10px] font-bold uppercase tracking-widest text-[#caf300] border border-[#caf300]/30 px-4 py-2 hover:bg-[#caf300]/10 transition-all"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          Browse Classes →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-l-4 border-[#caf300] pl-4 space-y-1">
        <h1
          className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          My Enrolled Classes
        </h1>
        <p
          className="text-[10px] text-neutral-600 uppercase tracking-wider"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          GymVortex Protocol // Personalized Training Grid
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#0f0f0f] border border-neutral-900 flex flex-col overflow-hidden group hover:border-[#caf300]/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-44 overflow-hidden bg-neutral-950">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/40 z-10" />
              <Image
                src={
                  booking.classImage ||
                  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
                }
                alt={booking.className || "Class"}
                fill
                className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Badge */}
              <span
                className="absolute top-4 left-4 z-20 bg-neutral-900/90 border border-neutral-800 text-[9px] font-bold tracking-widest text-neutral-400 uppercase px-2 py-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                FITNESS PROTOCOL
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-4 flex-1">
              {/* Title + Price */}
              <div className="flex justify-between items-start gap-3">
                <h2
                  className="text-lg font-black tracking-tight text-white uppercase leading-tight flex-1 min-w-0 group-hover:text-[#caf300] transition-colors"
                  style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                >
                  {booking.className}
                </h2>
                <div className="text-right shrink-0">
                  <div
                    className="text-xl font-black text-[#caf300] leading-none"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    ${parseFloat(booking.priceAmount || 0).toFixed(2)}
                  </div>
                  <div
                    className="text-[9px] font-bold tracking-widest text-neutral-600 uppercase mt-0.5"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    PAID
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div
                className="space-y-2.5"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {/* Booked Date */}
                <div className="flex items-center gap-3 text-neutral-500">
                  <FaRegCalendarAlt className="w-3.5 h-3.5 shrink-0 text-neutral-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "N/A"}
                  </span>
                </div>

                {/* Session ID */}
                <div className="flex items-center gap-3 text-neutral-500">
                  <FaDollarSign className="w-3.5 h-3.5 shrink-0 text-neutral-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wide truncate">
                    {booking.stripeSessionId
                      ? `TXN: ...${booking.stripeSessionId.slice(-8)}`
                      : "TXN: N/A"}
                  </span>
                </div>

                {/* User Email */}
                <div className="flex items-center gap-3 text-neutral-500">
                  <FaRegUser className="w-3.5 h-3.5 shrink-0 text-neutral-700" />
                  <span className="text-[10px] font-bold uppercase tracking-wide truncate">
                    {booking.userEmail || "N/A"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/classes/${booking.classId}`}
                  className="block w-full bg-[#caf300] hover:bg-white text-[#0a0a0a] text-[10px] font-black uppercase tracking-widest py-3 text-center transition-colors"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  VIEW CLASS DETAILS →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}