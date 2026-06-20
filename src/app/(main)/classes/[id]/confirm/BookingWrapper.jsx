"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function BookingWrapper({ classData, id }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [loadingStep, setLoadingStep] = useState("idle"); // idle | checking | redirecting
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check if already booked
  useEffect(() => {
    if (!user) return;
    const checkBooking = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}/status?email=${user.email}`
        );
        const data = await res.json();
        if (data.success && data.isBooked) {
          setIsAlreadyBooked(true);
        }
      } catch (err) {
        console.error("Booking status check failed:", err);
      }
    };
    checkBooking();
  }, [user, id]);

  const handleBookNow = async () => {
    // Auth check
    if (!user) {
      router.push(`/login?redirect=/payment/${id}`);
      return;
    }
  
    // Already booked check
    if (isAlreadyBooked) {
      showToast("You have already booked this class.", "error");
      return;
    }
  
    try {
      setLoadingStep("checking");
      showToast("Verifying credentials...", "info");
  
      // Send dynamic data including classId to the backend Stripe session configuration
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: classData?.title || "MOBILITY REPAIR",
          PriceAmount: classData?.price || 380, // Matches 'PriceAmount' expected by backend
          classId: id, // Pass the original MongoDB class id
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
  
      // Update state to redirecting and switch to Stripe Hosted Gateway
      if (data.url) {
        setLoadingStep("redirecting");
        showToast("Redirecting to secure payment gateway...", "info");
        window.location.href = data.url;
      }
  
    } catch (error) {
      console.error("Payment Error:", error);
      showToast(error.message || "Failed to initiate payment.", "error");
      setLoadingStep("idle");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-[#caf300] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Payment Method Selection */}
      <section className="space-y-4">
        <h3
          className="text-[10px] sm:text-xs text-[#c6c6c7] uppercase tracking-widest border-l-2 border-[#caf300] pl-3"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          Payment Protocol
        </h3>

        <div className="space-y-3">
          {/* Stripe */}
          <label className="block cursor-pointer group">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <div
              className={`bg-[#201f1f]/70 backdrop-blur-xl p-4 flex items-center justify-between border-2 transition-all group-hover:bg-[#2a2a2a] ${
                paymentMethod === "stripe"
                  ? "border-[#caf300]"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#353534] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#caf300]">credit_card</span>
                </div>
                <div>
                  <p className="font-bold uppercase text-white text-sm sm:text-base">
                    Stripe / Credit Card
                  </p>
                  <p
                    className="text-[9px] sm:text-[10px] text-[#b0d500]"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    RECOMMENDED • SECURE ENCRYPTION
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  paymentMethod === "stripe" ? "border-[#caf300]" : "border-[#444932]"
                }`}
              >
                {paymentMethod === "stripe" && (
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#caf300] rounded-full" />
                )}
              </div>
            </div>
          </label>

          {/* Vortex Credits — disabled for now */}
          <label className="block cursor-not-allowed opacity-40">
            <div className="bg-[#201f1f]/70 backdrop-blur-xl p-4 flex items-center justify-between border-2 border-transparent">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#353534] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#c6c6c7]">token</span>
                </div>
                <div>
                  <p className="font-bold uppercase text-white text-sm sm:text-base">
                    Vortex Credits
                  </p>
                  <p
                    className="text-[9px] sm:text-[10px] text-[#c6c6c7]"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    COMING SOON
                  </p>
                </div>
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#444932]" />
            </div>
          </label>
        </div>
      </section>

      {/* Total + Action */}
      <section className="space-y-5 pt-2">
        <div className="flex justify-between items-end border-b border-[#444932] pb-4">
          <p
            className="text-[10px] sm:text-xs text-[#c6c6c7] uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Total Commitment
          </p>
          <p
            className="text-2xl sm:text-3xl font-bold text-[#caf300] tracking-tighter"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            ${parseFloat(classData?.price || 0).toFixed(2)}
          </p>
        </div>

        {/* Not logged in */}
        {!user ? (
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/login?redirect=/payment/${id}`)}
              className="w-full bg-[#caf300] text-[#171e00] py-4 sm:py-5 uppercase font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              LOGIN TO BOOK
              <span className="material-symbols-outlined text-lg">login</span>
            </button>
            <p
              className="text-[10px] text-center text-[#c6c6c7] uppercase tracking-wider"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              You must be logged in to complete this booking.
            </p>
          </div>
        ) : isAlreadyBooked ? (
          // Already booked state
          <button
            disabled
            className="w-full bg-[#353534] text-[#c6c6c7] py-4 sm:py-5 uppercase font-bold tracking-widest opacity-50 cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            ALREADY BOOKED
            <span className="material-symbols-outlined text-lg">lock</span>
          </button>
        ) : (
          // Direct Payment Button
          <button
            onClick={handleBookNow}
            disabled={loadingStep !== "idle"}
            className={`w-full bg-[#caf300] text-[#171e00] py-4 sm:py-5 uppercase font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed ${
              loadingStep !== "idle" ? "brightness-50" : ""
            }`}
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {loadingStep === "checking" 
              ? "VERIFYING..." 
              : loadingStep === "redirecting" 
              ? "REDIRECTING..." 
              : "BOOK NOW"}
            <span className="material-symbols-outlined text-lg">
              {loadingStep !== "idle" ? "sync" : "bolt"}
            </span>
          </button>
        )}

        <p
          className="text-[9px] sm:text-[10px] text-center text-[#c6c6c7] uppercase px-4 leading-relaxed"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          By clicking book now, you authorize a verification of your credentials and slot availability.
        </p>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`border p-4 flex items-center gap-3 shadow-2xl ${
                toast.type === "error"
                  ? "bg-red-500/10 border-red-500/40"
                  : "bg-[#353534] border-[#caf300]/30"
              }`}
            >
              <div className={`w-1.5 h-8 shrink-0 ${toast.type === "error" ? "bg-red-400" : "bg-[#caf300]"}`} />
              <div className="flex-1">
                <p
                  className={`text-[10px] sm:text-xs uppercase tracking-wider ${
                    toast.type === "error" ? "text-red-400" : "text-[#caf300]"
                  }`}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {toast.message}
                </p>
                <div className="w-full h-0.5 bg-[#201f1f] mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className={`h-full ${toast.type === "error" ? "bg-red-400" : "bg-[#caf300]"}`}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}