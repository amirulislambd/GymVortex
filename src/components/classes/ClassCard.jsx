"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function ClassCard({ item }) {
  if (!item) return null;

  const maxSeats = parseInt(item?.capacity) || 0;
  const bookedSeats = parseInt(item?.bookingCount) || 0;
  const isFull = bookedSeats >= maxSeats;

  return (
    <div className="bg-[#1c1b1b]/80 backdrop-blur-md border border-[#444932]/30 flex flex-col group overflow-hidden rounded-sm transition-all duration-300 hover:border-[#caf300]/40 hover:shadow-[0_0_20px_rgba(202,243,0,0.03)]">
      {/* Media Asset Header Box */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0e0e0e] shrink-0">
        <img
          src={item?.image || "https://i.ibb.co/NnYqc09c/screen.png"}
          alt={item?.title || "Class Image"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />

        {/* Floating Identity Badges */}
        <div className="absolute top-4 left-4 flex gap-2 items-center z-10">
          <span className="bg-[#caf300] text-[#171e00] text-[10px] font-mono font-black px-2.5 py-0.5 uppercase tracking-wider rounded-sm shadow-sm">
            {item?.category || "N/A"}
          </span>
          {isFull && (
            <span className="bg-red-600 text-white text-[10px] font-mono font-black px-2.5 py-0.5 uppercase tracking-wider rounded-sm shadow-sm animate-pulse">
              FULL
            </span>
          )}
        </div>

        {/* Ambient Dark Bottom Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-transparent opacity-60" />
      </div>

      {/* Cyberpunk Accent Divider Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#caf300] via-[#b0d500] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />

      {/* Meta Content Ledger Layer */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#131313]/40">
        {/* Core Metadata Pipeline Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-sans font-black text-lg md:text-xl uppercase leading-tight text-white tracking-tight group-hover:text-[#caf300] transition-colors duration-300 line-clamp-2">
              {item?.title || "Untitled Class"}
            </h3>
            <span className="font-mono text-sm md:text-base font-black text-[#caf300] shrink-0 drop-shadow-[0_0_10px_rgba(202,243,0,0.1)]">
              ${parseFloat(item?.price || 0).toFixed(2)}
            </span>
          </div>

          {/* Technical Profile Link Architecture */}
          <div className="flex items-center gap-2.5 border-t border-[#444932]/10 pt-3">
            <div className="w-6 h-6 rounded-full bg-[#252524] overflow-hidden border border-[#caf300]/20 shrink-0 shadow-inner">
              <img
                className="w-full h-full object-cover"
                src={
                  item?.trainerImage || "https://i.ibb.co/NnYqc09c/screen.png"
                }
                alt={item?.trainerName || "Trainer"}
              />
            </div>
            <span className="font-mono text-[10px] tracking-wider text-[#8f9378] uppercase truncate">
              COACH:{" "}
              <span className="text-[#e5e2e1] font-bold font-sans text-xs lowercase first-letter:uppercase">
                {item?.trainerName || "Expert Trainer"}
              </span>
            </span>
          </div>
        </div>

        {/* Industrial Action CTA Trigger Box */}
        <div className="mt-6 pt-2">
          <Link
            href={`/classes/${item?._id}`}
            className={`w-full h-11 font-mono text-[11px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 border border-[#caf300]/20 rounded-sm cursor-pointer transition-all duration-300 ${
              isFull
                ? "bg-red-950/10 text-red-400/80 border-red-900/30 cursor-not-allowed hover:bg-red-950/20"
                : "bg-transparent text-[#e5e2e1] hover:bg-[#caf300] hover:text-[#171e00] hover:border-[#caf300] shadow-[inset_0_0_10px_rgba(202,243,0,0.01)]"
            }`}
            style={{ pointerEvents: isFull ? "none" : "auto" }}
          >
            <span>{isFull ? "Join Waitlist" : "View Details"}</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1 shrink-0 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}