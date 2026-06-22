"use client";

import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiArrowRight, FiTrash2, FiLock } from "react-icons/fi";
import Image from "next/image";
import { RemoveFavoriteClass } from "@/lib/action/favorite";
import toast, { Toaster } from "react-hot-toast";

export default function MyFavoritesClasses({ getMyFavorites, getMyBookings }) {
  const [favorites, setFavorites] = useState(getMyFavorites || []);
  const [removing, setRemoving] = useState(null);

  const isBooked = (classId) => {
    return getMyBookings?.some((b) => b.classId === classId);
  };

  const handleRemove = async (favoriteId, classId) => {
    try {
      setRemoving(classId);
      const result = await RemoveFavoriteClass(favoriteId);
      if (result.success) {
        setFavorites((prev) => prev.filter((f) => f._id !== favoriteId));
        toast.success("Removed from favorites.");
      } else {
        toast.error("Failed to remove.");
      }
    } catch (err) {
      console.error("Remove favorite error:", err);
      toast.error("Something went wrong.");
    } finally {
      setRemoving(null);
    }
  };

  if (favorites.length === 0) {
    return (
      <>
        <Toaster position="bottom-right" />
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
      </>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* React Hot Toast */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f0f0f",
            color: "#e5e2e1",
            border: "1px solid rgba(202,243,0,0.3)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
          success: {
            iconTheme: {
              primary: "#caf300",
              secondary: "#0f0f0f",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4444",
              secondary: "#0f0f0f",
            },
            style: {
              border: "1px solid rgba(255,68,68,0.3)",
            },
          },
        }}
      />

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
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#caf300] text-[#0a0a0a]"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {item.category}
                  </span>
                </div>
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
    </div>
  );
}