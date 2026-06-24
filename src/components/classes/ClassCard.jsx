"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@gravity-ui/icons";

export default function ClassCard({ item }) {
  if (!item) return null;

  const maxSeats = parseInt(item?.capacity) || 0;
  const bookedSeats = parseInt(item?.bookingCount) || 0;
  const isFull = bookedSeats >= maxSeats;

  const seatPercentage = maxSeats > 0 ? (bookedSeats / maxSeats) * 100 : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] backdrop-blur-xl transition-all duration-500 hover:border-[#caf300]/40 hover:shadow-[0_0_40px_rgba(202,243,0,0.08)]"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(202,243,0,0.08),transparent_60%)] pointer-events-none" />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
          src={item?.image || "https://i.ibb.co/NnYqc09c/screen.png"}
          alt={item?.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="bg-[#caf300] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full">
            {item?.category || "N/A"}
          </span>

          {isFull && (
            <span className="bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full animate-pulse">
              Full
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title + Price */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-white font-black text-lg uppercase leading-tight line-clamp-2 group-hover:text-[#caf300] transition-colors duration-500">
            {item?.title || "Untitled Class"}
          </h3>

          <span className="text-[#caf300] font-black text-base shrink-0">
            ${parseFloat(item?.price || 0).toFixed(2)}
          </span>
        </div>

        {/* Extra Info */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-1 rounded-full bg-white/5 text-neutral-400 text-[10px] font-medium">
            ⏱ {item?.duration || "60 MIN"}
          </span>

          <span className="px-2 py-1 rounded-full bg-white/5 text-neutral-400 text-[10px] font-medium">
            🕒 {item?.time || "08:00"}
          </span>

          <span className="px-2 py-1 rounded-full bg-white/5 text-neutral-400 text-[10px] font-medium truncate max-w-[140px]">
            {item?.difficulty || "Beginner"}
          </span>
        </div>

        {/* Trainer */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
          <img
            src={item?.trainerImage || "https://i.ibb.co/NnYqc09c/screen.png"}
            alt={item?.trainerName}
            className="w-8 h-8 rounded-full object-cover border border-[#caf300]/30"
          />

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
              Coach
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#caf300]" />

              <p className="text-white text-sm font-semibold truncate">
                {item?.trainerName || "Expert Trainer"}
              </p>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-neutral-500 mb-2">
            <span>Available Seats</span>

            <span>
              {bookedSeats}/{maxSeats}
            </span>
          </div>

          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${seatPercentage}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-[#caf300] rounded-full"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto pt-5">
          <Link
            href={`/classes/${item?._id}`}
            className={`w-full min-h-[46px] rounded-xl flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-widest transition-all duration-500 ${
              isFull
                ? "bg-red-500/10 border border-red-500/20 text-red-400 cursor-not-allowed"
                : "bg-[#caf300] text-black hover:shadow-[0_0_25px_rgba(202,243,0,0.35)] hover:scale-[1.02]"
            }`}
            style={{ pointerEvents: isFull ? "none" : "auto" }}
          >
            <span>{isFull ? "Join Waitlist" : "View Details"}</span>

            {!isFull && (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}