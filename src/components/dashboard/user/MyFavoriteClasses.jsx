"use client";

import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiArrowRight, FiTrash2, FiLock } from "react-icons/fi";
import Image from "next/image";

export default function MyFavoritesClasses({ getMyFavorites, getMyBookings }) {
  const [favorites, setFavorites] = useState(getMyFavorites || []);
  const [removing, setRemoving] = useState(null);
  const [toast, setToast] = useState(null);
  console.log("getMyFavorites:", getMyFavorites);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check if a class is already booked
  const isBooked = (classId) => {
    return getMyBookings?.some((b) => b.classId === classId);
  };

  const handleRemove = async (favoriteId, classId) => {
    try {
      setRemoving(classId);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${favoriteId}`,
        { method: "DELETE" },
      );
      const result = await res.json();
      if (result.success) {
        setFavorites((prev) => prev.filter((f) => f._id !== favoriteId));
        showToast("Removed from favorites.", "success");
      } else {
        showToast("Failed to remove.", "error");
      }
    } catch (err) {
      console.error("Remove favorite error:", err);
      showToast("Something went wrong.", "error");
    } finally {
      setRemoving(null);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-16 h-16 border-2 border-[#caf300]/20 flex items-center justify-center">
          <FiHeart size={28} className="text-[#444932]" />
        </div>
        <p
          className="text-xs text-neutral-600 uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          No favorite classes yet
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
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p
            className="text-[10px] text-[#caf300] uppercase tracking-widest mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // SAVED PROTOCOLS
          </p>
          <h2
            className="text-xl sm:text-2xl font-black uppercase text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            Favorite Classes
          </h2>
        </div>
        <span
          className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {favorites.length} SAVED
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((item) => {
          const alreadyBooked = isBooked(item.classId);
          const isRemoving = removing === item.classId;

          return (
            <div
              key={item._id}
              className="bg-[#0f0f0f] border border-neutral-900 hover:border-[#caf300]/20 transition-all overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "Class"}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#caf300] text-[#0a0a0a]"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {item.category}
                  </span>
                </div>
                {/* Favorite icon */}
                <div className="absolute top-3 right-3 z-10">
                  <FiHeart
                    size={16}
                    className="text-[#caf300]"
                    fill="#caf300"
                  />
                </div>
              </div>
              {/* Info */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <div>
                  <h3
                    className="text-base font-black uppercase text-white leading-tight"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    W/ TRAINER {item.trainerName?.toUpperCase()}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg font-black text-[#caf300]"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </span>
                  {alreadyBooked && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest text-green-400 border border-green-400/30 px-2 py-0.5"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      ✓ BOOKED
                    </span>
                  )}
                </div>
                {/* Buttons */}
                <div className="flex gap-2 pt-1">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id, item.classId)}
                    disabled={isRemoving}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-neutral-800 text-neutral-500 hover:border-red-500/50 hover:text-red-400 transition-all text-[10px] font-bold uppercase tracking-wider disabled:opacity-40"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {isRemoving ? (
                      <div className="w-3 h-3 border border-neutral-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiTrash2 size={13} />
                    )}
                  </button>

                  {/* Book / Already Booked Button */}
                  {alreadyBooked ? (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-neutral-600 text-[10px] font-bold uppercase tracking-widest cursor-not-allowed border border-neutral-800"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <FiLock size={11} />
                      ALREADY BOOKED
                    </button>
                  ) : (
                    <Link
                      href={`/classes/${item.classId}/confirm`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#caf300] text-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      BOOK SESSION
                      <FiArrowRight size={11} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-sm">
          <div
            className={`border p-3 flex items-center gap-3 shadow-2xl ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/40"
                : "bg-[#0f0f0f] border-[#caf300]/30"
            }`}
          >
            <div
              className={`w-1 h-6 shrink-0 ${
                toast.type === "error" ? "bg-red-400" : "bg-[#caf300]"
              }`}
            />
            <p
              className={`text-[10px] uppercase tracking-wider ${
                toast.type === "error" ? "text-red-400" : "text-[#caf300]"
              }`}
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
