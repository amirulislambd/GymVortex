"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function ClassActions({ classData, id }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: "success" | "error" }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check if already booked or favorited
  useEffect(() => {
    if (!user) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}/status?email=${user.email}`
        );
        const data = await res.json();
        if (data.success) {
          setIsAlreadyBooked(data.isBooked);
          setIsFavorite(data.isFavorite);
        }
      } catch (err) {
        console.error("Status check failed:", err);
      }
    };

    checkStatus();
  }, [user, id]);

  const handleBooking = async () => {
    // Auth check
    if (!user) {
      router.push(`/login?redirect=/classes/${id}`);
      return;
    }

    // Already booked check
    if (isAlreadyBooked) {
      showToast("You have already booked this class.", "error");
      return;
    }

    // Slots check
    if (slotsLeft === 0) {
      showToast("No slots available for this class.", "error");
      return;
    }

    try {
      setBookingLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            classId: id,
            userEmail: user.email,
            userName: user.name,
            trainerEmail: classData?.trainerEmail,
          }),
        }
      );
      const result = await res.json();

      if (result.success) {
        setIsAlreadyBooked(true);
        router.push(`/payment?classId=${id}`);
      } else {
        showToast(result.message || "Booking failed. Try again.", "error");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    // Auth check
    if (!user) {
      router.push(`/login?redirect=/classes/${id}`);
      return;
    }

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        // Remove favorite
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${id}?email=${user.email}`,
          { method: "DELETE" }
        );
        const result = await res.json();
        if (result.success) {
          setIsFavorite(false);
          showToast("Removed from favorites.", "success");
        }
      } else {
        // Add favorite
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              classId: id,
              userEmail: user.email,
              classData: {
                title: classData.title,
                image: classData.image,
                category: classData.category,
                price: classData.price,
                trainerName: classData.trainerName,
              },
            }),
          }
        );
        const result = await res.json();
        if (result.success) {
          setIsFavorite(true);
          showToast("Successfully added to your favorites!", "success");
          if (typeof window !== "undefined" && window.navigator.vibrate) {
            window.navigator.vibrate(50);
          }
        } else {
          showToast(result.message || "Failed to add favorite.", "error");
        }
      }
    } catch (error) {
      console.error("Favorite toggle failed:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setFavoriteLoading(false);
    }
  };

  const slotsLeft = Math.max(
    0,
    parseInt(classData.capacity) - (classData.bookingCount || 0)
  );
  const hazardPercentage = (slotsLeft / parseInt(classData.capacity)) * 100;

  return (
    <div className="bg-[#262626]/70 backdrop-blur-xl border border-[#caf300]/10 p-4 sm:p-6 md:p-8 border-t-4 border-t-[#caf300] rounded-sm">

      {/* Price + Slots */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p
            className="text-[10px] sm:text-[11px] text-[#c5c9ac] uppercase tracking-wider mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Single Session
          </p>
          <p
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-none text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            ${Math.floor(parseFloat(classData.price))}
            <span
              className="text-base sm:text-lg font-medium text-[#c5c9ac]"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              .{classData.price.toString().split(".")[1] || "00"}
            </span>
          </p>
        </div>

        <div className="sm:text-right">
          <p
            className={`text-[11px] sm:text-[12px] font-bold uppercase tracking-wider ${
              slotsLeft === 0
                ? "text-red-400"
                : slotsLeft <= 3
                ? "text-orange-400"
                : "text-[#caf300]"
            }`}
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {slotsLeft === 0 ? "Sold Out" : `${slotsLeft} Slots Left`}
          </p>
          <div className="w-full sm:w-24 h-1.5 bg-white/10 mt-2 rounded-sm overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${hazardPercentage}%`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, #caf300, #caf300 5px, #131313 5px, #131313 10px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">

        {/* Book Now */}
        <button
          disabled={slotsLeft === 0 || bookingLoading || isAlreadyBooked}
          onClick={handleBooking}
          className="w-full py-3 sm:py-4 bg-[#caf300] text-[#171e00] font-bold text-sm sm:text-base md:text-lg uppercase hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed rounded-sm"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          {bookingLoading
            ? "Processing..."
            : isAlreadyBooked
            ? "Already Booked"
            : slotsLeft === 0
            ? "Class Full"
            : "Book Now →"}
        </button>

        {/* Add to Favorites */}
        <button
          disabled={favoriteLoading}
          onClick={handleToggleFavorite}
          className={`w-full py-3 sm:py-4 border-2 font-bold text-sm sm:text-base md:text-lg uppercase flex items-center justify-center gap-2 transition-all group rounded-sm cursor-pointer disabled:opacity-40 ${
            isFavorite
              ? "border-[#caf300] text-[#caf300]"
              : "border-[#444932]/40 text-[#e5e2e1] hover:border-[#caf300]"
          }`}
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          <motion.span
            animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
            className={`material-symbols-outlined text-base sm:text-lg transition-colors ${
              isFavorite ? "text-[#caf300]" : "group-hover:text-[#caf300]"
            }`}
            style={{
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            favorite
          </motion.span>
          {favoriteLoading
            ? "Processing..."
            : isFavorite
            ? "Saved to Favorites"
            : "Add to Favorites"}
        </button>

        {/* Login prompt */}
        {!user && (
          <p
            className="text-center text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider mt-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            You must{" "}
            <span
              onClick={() => router.push(`/login?redirect=/classes/${id}`)}
              className="text-[#caf300] cursor-pointer hover:underline"
            >
              login
            </span>{" "}
            to book or save classes.
          </p>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 border text-center text-[10px] sm:text-[11px] uppercase tracking-wider rounded-sm ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/40 text-red-400"
                : "bg-[#caf300]/10 border-[#caf300]/40 text-[#caf300]"
            }`}
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}