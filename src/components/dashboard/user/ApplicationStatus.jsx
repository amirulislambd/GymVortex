"use client";

import React, { useState, useEffect, useMemo } from "react";

const BACKGROUND_IMAGES = {
  pending: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzigLyi8qpxdXEToNo_NT7mLuF1SM4-02uVi9q3LcpxW-ydXet_XinlYdGGbozLdbJ-ZRl8qrJmgdvG_jf_D2ys8JOmVjYsYTckzRiluZ2zA1fyFk02LkKcJ69PzLAfKvlE1m5o_6ALhmkMbG6BISksBCJ6LOdu5ZW1zkGg_-eqXSwNBfL6rYgCbWTYmBb0Nu8vubE2_Gz07ZW1hhXltM13-lc0eOI-Utvc0UvhT7EHZ8CutpaN4ZPw-cHGk98Hjv4HU-Um6ng7Uc",
  approved: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvAcL_MpxdDDXJaHEVGJ8gFko8R45NCA-M2ePwXcyH5cB3ESondCvd2tClM24aJ4aXpE7fXs4dLdIbDaGseeR5zsVPjqfkzT7TdriRjxNlQIgdbqKnJvEACa2GqvrY6dgKK_XxjKR6Mai8hJbrKkkNAuwUvOZmOlKvmCWAYGlevhk_k_Oxvgj7hLWwTWONl2hDKebCY85nBbw3orY0x-nnOx3K8TIWtG_o7LX6CusId04JJZquewewoFDJmv3nRpqOcjFs7kviPQk",
  rejected: "https://lh3.googleusercontent.com/aida-public/AB6AXuALbeuRB7IzPF0MK1sp-v31z8DFCUpBrJUtoNJSLQrR2sHs9lUyjDmh0AB2SsvnOChQT4DSxf95ZHQKkmwCRgBynwOlMsKifHtyLSpVNSThEPS9PO0MBvF-dXAr1efSo06Yxg-hJtT_YhyTHqDt2oe20R_cs5X8cAzzpa2whwEGIV75ZRniXNcLd5w-5S_9Xk9jcACky4Wzz6FZOqk_2ReBQBIf6pY3L_ugw35-ti4wGLkaIzZ7d0nvoyRQfVPxIPbakGO34fb_C-c"
};

export default function ApplicationStatus({
  status = "pending",
  submittedAt,            // backend থেকে আসা আসল submission timestamp / ISO string (যেমন application.createdAt)
  reviewWindowHours = 48  // submission এর কত ঘণ্টা পর review deadline শেষ হবে
}) {
  const bgUrl = BACKGROUND_IMAGES[status] || BACKGROUND_IMAGES.pending;

  // আসল deadline timestamp — submittedAt + reviewWindowHours
  // submittedAt না দিলে fallback হিসেবে "এখন থেকে reviewWindowHours ঘণ্টা" ধরে নেয়
  const deadline = useMemo(() => {
    const startTime = submittedAt ? new Date(submittedAt).getTime() : Date.now();
    return startTime + reviewWindowHours * 60 * 60 * 1000;
  }, [submittedAt, reviewWindowHours]);

  // Date.now() এর সাথে deadline এর পার্থক্য থেকে remaining seconds বের করা হয়,
  // তাই প্রতিটা tick-এই real সময় থেকে হিসাব হয় — drift হয় না, রিফ্রেশেও সঠিক থাকে
  const getRemaining = () => Math.max(0, Math.floor((deadline - Date.now()) / 1000));

  const [timeLeft, setTimeLeft] = useState(getRemaining);

  useEffect(() => {
    if (status !== "pending") return;

    setTimeLeft(getRemaining()); // status pending হওয়ার সাথে সাথে সিঙ্ক করে নেয়

    const timer = setInterval(() => {
      setTimeLeft(getRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [status, deadline]);

  // সেকেন্ড থেকে HH:MM:SS ফরম্যাট কনভার্টার
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen text-[#e5e2e1] bg-[#131313] font-sans selection:bg-[#caf300] selection:text-[#171e00] relative overflow-hidden flex flex-col justify-center items-center p-4 md:p-6">
      
      {/* ইমেজগুলোর মতো রিয়েল ব্যাকগ্রাউন্ড রেন্ডারার */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* মেইন রেসপন্সিভ টার্মিনাল কনটেইনার */}
      <main className="w-full max-w-4xl relative z-10 my-auto flex justify-center items-center">
        <div 
          className="w-full p-5 md:p-10 relative overflow-hidden flex flex-col gap-6 rounded border transition-all duration-300"
          style={{
            background: "rgba(13, 13, 13, 0.92)",
            borderColor: status === "rejected" ? "rgba(244, 67, 54, 0.2)" : "rgba(202, 243, 0, 0.2)",
            boxShadow: status === "rejected" 
              ? "0 0 40px rgba(244, 67, 54, 0.1)" 
              : "0 0 40px rgba(202, 243, 0, 0.1)"
          }}
        >
          {/* টপ বার লেআউট (ID এবং স্ট্যাটিক স্ট্যাটাস ব্যাজসমূহ) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#444932]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff7b72]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#7ee787]" />
              </div>
              <span className="text-xs tracking-widest text-[#c5c9ac] uppercase font-mono">
                ID: APPL-8829-X
              </span>
            </div>

            {/* ইমেজ অনুযায়ী ফিক্সড ইন্ডিকেটর বার (কোনো পরিবর্তন হবে না) */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 border border-[#444932]/40 text-[10px] font-bold tracking-widest font-mono overflow-x-auto">
              <span className={`px-2 py-1 transition-colors duration-300 ${status === "pending" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}>
                PENDING
              </span>
              <span className={`px-2 py-1 transition-colors duration-300 ${status === "approved" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}>
                APPROVED
              </span>
              <span className={`px-2 py-1 transition-colors duration-300 ${status === "rejected" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}>
                REJECTED
              </span>
            </div>
          </div>

          {/* মেইন প্রোটোকল ইনডাকশন হেডার */}
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>
              PROTOCOL INDUCTION
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#caf300] animate-pulse" />
              <p className="text-xs text-[#c5c9ac] uppercase tracking-widest font-mono">
                VALIDATING BIOMETRIC AND PROFESSIONAL CLEARANCE...
              </p>
            </div>
          </div>

          {/* ─── অবস্থা ১: পেন্ডিং (image_27249d.jpg) ─── */}
          {status === "pending" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] text-[#caf300] uppercase font-bold tracking-widest font-mono block">
                    SYSTEM STATUS
                  </span>
                  <div className="bg-[#caf300] text-[#171e00] px-8 py-2 w-fit [clip-path:polygon(0_0,100%_0,calc(100%-12px)_100%,0_100%)]">
                    <span className="text-xl font-black tracking-[0.15em]" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>PENDING</span>
                  </div>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <div className="text-[10px] text-[#c5c9ac] uppercase tracking-wider">Buffer ETA</div>
                  <div className="text-2xl font-bold text-[#caf300] tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-[#e5e2e1] leading-relaxed">
                  Authentication in progress. Secure nodes are processing your submission for <span className="text-[#caf300] underline decoration-dotted font-medium">Command Center</span> review.
                </p>
                
                {/* প্রোগ্রেস বার */}
                <div className="space-y-2">
                  <div className="flex gap-1 w-full bg-neutral-900/60 p-1 border border-[#444932]/20">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-3 w-[10%] bg-[#caf300]" />
                    ))}
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-3 w-[10%] bg-neutral-800" />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-[#c5c9ac] uppercase tracking-widest font-mono">
                    <span>DATALINK BUFFER</span>
                    <span>60% SYNC</span>
                  </div>
                </div>
              </div>

              {/* নোড গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-[#444932]/30 bg-black/40">
                  <span className="text-[10px] text-[#c5c9ac]/60 block mb-1 uppercase tracking-widest font-mono">Secure Node 01</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white tracking-wide" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>BACKGROUND CHECK</span>
                    <span className="text-[#caf300] text-xs font-bold font-mono">VERIFIED</span>
                  </div>
                </div>
                <div className="p-4 border border-[#444932]/30 bg-black/40">
                  <span className="text-[10px] text-[#c5c9ac]/60 block mb-1 uppercase tracking-widest font-mono">Secure Node 02</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white tracking-wide" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>CERTIFICATIONS</span>
                    <span className="text-yellow-500/80 text-xs font-bold font-mono animate-pulse">PROCESSING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── অবস্থা ২: অ্যাপ্রুভড (image_2724b4.jpg) ─── */}
          {status === "approved" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] text-[#caf300] uppercase font-bold tracking-widest font-mono block">
                  ACCESS LEVEL: TIER 1
                </span>
                <div className="bg-[#caf300] text-[#171e00] px-8 py-2 w-fit [clip-path:polygon(0_0,100%_0,calc(100%-12px)_100%,0_100%)]">
                  <span className="text-xl font-black tracking-[0.15em]" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>APPROVED</span>
                </div>
              </div>

              <div className="space-y-4 py-2">
                <p className="text-white font-black italic text-3xl md:text-4xl tracking-tight uppercase" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>
                  WELCOME TO THE VORTEX, TRAINER.
                </p>
                <p className="text-sm text-[#c5c9ac] border-l border-[#caf300] pl-4 leading-relaxed">
                  All protocols cleared. Bio-metric handshake successful. Your operational dashboard is now initialized for facility management.
                </p>
              </div>

              <button className="w-full bg-[#caf300] text-black text-xs font-bold py-4 uppercase tracking-[0.25em] font-mono hover:bg-white transition-colors flex items-center justify-center gap-2">
                INITIALIZE DASHBOARD
                <span className="font-sans text-sm">⚡</span>
              </button>
            </div>
          )}

          {/* ─── অবস্থা ৩: রিজেক্টেড (image_2724b7.jpg) ─── */}
          {status === "rejected" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] text-[#ff7b72] uppercase font-bold tracking-widest font-mono block">
                  ACCESS DENIED
                </span>
                <div className="bg-[#f3a99e] text-[#6b1211] px-8 py-2 w-fit [clip-path:polygon(0_0,100%_0,calc(100%-12px)_100%,0_100%)]">
                  <span className="text-xl font-black tracking-[0.15em]" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>REJECTED</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-white font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>
                  SYSTEM MISMATCH DETECTED.
                </p>
                <div className="bg-[#1f1110] border-l-2 border-[#ff7b72] p-4 text-xs text-[#ffb4ab] font-mono leading-relaxed italic">
                  "INCOMPLETE DOCUMENTATION: PLEASE UPLOAD CURRENT AED/CPR CERTIFICATION. THE PROVIDED FILE WAS CORRUPTED OR EXPIRED."
                </div>
              </div>

              <button className="w-full border border-[#444932] text-white/90 text-xs font-bold py-4 uppercase tracking-[0.25em] font-mono hover:bg-white hover:text-black transition-all">
                RE-INITIALIZE UPLOAD
              </button>
            </div>
          )}

          {/* টার্মিনাল ফুটার বার */}
          <div className="mt-2 pt-4 border-t border-[#444932]/20 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] tracking-wider text-[#c5c9ac]/50">
            <div>SYSTEM V4.2.0 // ENCRYPTION: AES-256 ACTIVE</div>
            <div className="text-[#caf300]/50 uppercase">VORTEX TERMINAL // SECURE LINK</div>
          </div>
        </div>
      </main>
    </div>
  );
}