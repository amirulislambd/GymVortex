"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { AddFavoriteClass } from "@/lib/action/favorite";

export default function ClassActions({
  classData,
  id,
  isBooked,
  isFavorite: isFavoriteProp,
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isFavorite, setIsFavorite] = useState(isFavoriteProp ?? false);
  const [alreadyBooked, setAlreadyBooked] = useState(isBooked ?? false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    setAlreadyBooked(isBooked ?? false);
    setIsFavorite(isFavoriteProp ?? false);
  }, [isBooked, isFavoriteProp]);

  const slotsLeft = Math.max(
    0,
    parseInt(classData.capacity) - (classData.bookingCount || 0),
  );
  const hazardPercentage = (slotsLeft / parseInt(classData.capacity)) * 100;

  const handleBooking = async () => {
    if (!user) {
      router.push(`/login?redirect=/classes/${id}`);
      return;
    }
    if (alreadyBooked) {
      toast.error("You have already booked this class.");
      return;
    }
    if (slotsLeft === 0) {
      toast.error("No slots available for this class.");
      return;
    }
    try {
      setBookingLoading(true);
      router.push(`/classes/${id}/confirm`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setBookingLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      router.push(`/login?redirect=/classes/${id}`);
      return;
    }

    if (isFavorite) {
      toast.success("Already saved to favorites.", { icon: "💛" });
      return;
    }

    setFavoriteLoading(true);

    try {
      const result = await AddFavoriteClass({
        classId: id,
        userEmail: user.email,
        title: classData.title,
        image: classData.image,
        category: classData.category,
        price: classData.price,
        trainerName: classData.trainerName,
        trainerImage: classData.trainerImage,
      });

      if (result?.insertedId) {
        setIsFavorite(true); // ← success এর পরে set করো
        toast.success("Added to your favorites!");
      } else if (result?.message?.toLowerCase().includes("already")) {
        setIsFavorite(true);
        toast("Already in your favorites.", { icon: "💛" });
      } else {
        toast.error(result?.message || "Failed to add favorite.");
      }
    } catch (error) {
      toast.error("Failed to update favorite. Try again.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <>
      {/* React Hot Toast */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#e5e2e1",
            border: "1px solid rgba(202,243,0,0.2)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "11px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          },
          success: {
            iconTheme: { primary: "#caf300", secondary: "#171e00" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#fff" },
          },
        }}
      />

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
              ${Math.floor(parseFloat(classData?.price || 0))}
              <span style={{ fontFamily: "JetBrains Mono, monospace" }}>
                .
                {parseFloat(classData?.price || 0)
                  .toFixed(2)
                  .split(".")[1] || "00"}
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
            disabled={slotsLeft === 0 || bookingLoading || alreadyBooked}
            onClick={handleBooking}
            className="w-full py-3 sm:py-4 bg-[#caf300] text-[#171e00] font-bold text-sm sm:text-base md:text-lg uppercase hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed rounded-sm"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {bookingLoading
              ? "Processing..."
              : alreadyBooked
                ? "Already Booked"
                : slotsLeft === 0
                  ? "Class Full"
                  : "Book Now →"}
          </button>

          {/* Add to Favorites */}
          <button
            disabled={favoriteLoading || isFavorite}
            onClick={handleToggleFavorite}
            className={`w-full py-3 sm:py-4 border font-bold text-sm sm:text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98] rounded-sm disabled:cursor-not-allowed disabled:opacity-70 ${
              isFavorite
                ? "border-[#caf300]/40 text-[#caf300] bg-[#caf300]/5"
                : "border-white/20 text-white hover:border-[#caf300]/60 hover:text-[#caf300]"
            }`}
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {favoriteLoading ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : isFavorite ? (
              <>
                <FaHeart className="text-[#caf300]" />
                Saved to Favorites
              </>
            ) : (
              <>
                <FaRegHeart />
                Add to Favorites
              </>
            )}
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
      </div>
    </>
  );
}