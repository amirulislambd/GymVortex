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
    <div className="bg-[#201f1f]/70 backdrop-blur-md border border-[#caf300]/10 flex flex-col group overflow-hidden rounded-sm transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1b1b]">
        <img
          src={item?.image || "https://i.ibb.co/NnYqc09c/screen.png"}
          alt={item?.title || "Class Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4 flex gap-1.5 items-center">
          <span className="bg-[#caf300] text-[#171e00] text-[10px] font-mono font-black px-2 py-1 uppercase tracking-tighter rounded-sm">
            {item?.category || "N/A"}
          </span>
          {isFull && (
            <span className="bg-red-600 text-white text-[10px] font-mono font-black px-2 py-1 uppercase tracking-tighter rounded-sm">
              FULL
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-[3px] bg-gradient-to-r from-[#caf300] to-[#b0d500] shrink-0" />

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-sans font-bold text-xl uppercase leading-tight text-white tracking-tight truncate max-w-[75%]">
            {item?.title || "Untitled Class"}
          </h3>
          <span className="font-mono text-sm font-bold text-[#caf300] shrink-0">
            ${parseFloat(item?.price || 0).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-6 h-6 rounded-full bg-[#353534] overflow-hidden border border-[#444932]/40 shrink-0">
            <img
              className="w-full h-full object-cover"
              src={item?.trainerImage || "https://i.ibb.co/NnYqc09c/screen.png"}
              alt={item?.trainerName || "Trainer"}
            />
          </div>
          <span className="font-sans text-xs text-[#c5c9ac] truncate">
            Coach {item?.trainerName || "Expert Trainer"}
          </span>
        </div>

        <div className="mt-auto">
          <Link
            href={`/classes/${item?._id}`}
            className={`w-full py-4 font-mono text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 border-t border-[#444932]/30 cursor-pointer ${
              isFull
                ? "bg-red-950/20 text-red-400 border-red-900/30 cursor-not-allowed"
                : "bg-white/5 transition-all duration-500 hover:scale-105 text-white hover:bg-[#caf300] hover:text-[#171e00] overflow-hidden"
            }`}
          >
            {isFull ? "Join Waitlist" : "View Details"}
            <span className="material-symbols-outlined text-sm">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
