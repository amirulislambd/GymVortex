"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const BACKGROUND_IMAGES = {
  pending:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzigLyi8qpxdXEToNo_NT7mLuF1SM4-02uVi9q3LcpxW-ydXet_XinlYdGGbozLdbJ-ZRl8qrJmgdvG_jf_D2ys8JOmVjYsYTckzRiluZ2zA1fyFk02LkKcJ69PzLAfKvlE1m5o_6ALhmkMbG6BISksBCJ6LOdu5ZW1zkGg_-eqXSwNBfL6rYgCbWTYmBb0Nu8vubE2_Gz07ZW1hhXltM13-lc0eOI-Utvc0UvhT7EHZ8CutpaN4ZPw-cHGk98Hjv4HU-Um6ng7Uc",
  approved:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDvAcL_MpxdDDXJaHEVGJ8gFko8R45NCA-M2ePwXcyH5cB3ESondCvd2tClM24aJ4aXpE7fXs4dLdIbDaGseeR5zsVPjqfkzT7TdriRjxNlQIgdbqKnJvEACa2GqvrY6dgKK_XxjKR6Mai8hJbrKkkNAuwUvOZmOlKvmCWAYGlevhk_k_Oxvgj7hLWwTWONl2hDKebCY85nBbw3orY0x-nnOx3K8TIWtG_o7LX6CusId04JJZquewewoFDJmv3nRpqOcjFs7kviPQk",
  rejected:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuALbeuRB7IzPF0MK1sp-v31z8DFCUpBrJUtoNJSLQrR2sHs9lUyjDmh0AB2SsvnOChQT4DSxf95ZHQKkmwCRgBynwOlMsKifHtyLSpVNSThEPS9PO0MBvF-dXAr1efSo06Yxg-hJtT_YhyTHqDt2oe20R_cs5X8cAzzpa2whwEGIV75ZRniXNcLd5w-5S_9Xk9jcACky4Wzz6FZOqk_2ReBQBIf6pY3L_ugw35-ti4wGLkaIzZ7d0nvoyRQfVPxIPbakGO34fb_C-c",
};

export default function ApplicationStatus({
  status = "pending",
  submittedAt,
  reviewWindowHours = 48,
}) {
  const bgUrl = BACKGROUND_IMAGES[status] || BACKGROUND_IMAGES.pending;

  const deadline = useMemo(() => {
    const startTime = submittedAt
      ? new Date(submittedAt).getTime()
      : Date.now();
    return startTime + reviewWindowHours * 60 * 60 * 1000;
  }, [submittedAt, reviewWindowHours]);

  const getRemaining = () =>
    Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (status !== "pending") return;
    setTimeLeft(getRemaining());
    const timer = setInterval(() => setTimeLeft(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, [status, deadline]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full p-4 md:p-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl relative z-10 mx-auto p-5 md:p-10 rounded border transition-all duration-300"
        style={{
          background: "rgba(13, 13, 13, 0.92)",
          borderColor:
            status === "rejected"
              ? "rgba(244, 67, 54, 0.2)"
              : "rgba(202, 243, 0, 0.2)",
          boxShadow:
            status === "rejected"
              ? "0 0 40px rgba(244, 67, 54, 0.1)"
              : "0 0 40px rgba(202, 243, 0, 0.1)",
        }}
      >
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

          <div className="flex items-center gap-1.5 bg-black/40 p-1 border border-[#444932]/40 text-[10px] font-bold tracking-widest font-mono">
            <span
              className={`px-2 py-1 ${status === "pending" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}
            >
              PENDING
            </span>
            <span
              className={`px-2 py-1 ${status === "approved" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}
            >
              APPROVED
            </span>
            <span
              className={`px-2 py-1 ${status === "rejected" ? "bg-[#caf300] text-black" : "text-[#c5c9ac]/40"}`}
            >
              REJECTED
            </span>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <h2
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic"
            style={{ fontFamily: "'Archivo Narrow', sans-serif" }}
          >
            PROTOCOL INDUCTION
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#caf300] animate-pulse" />
            <p className="text-xs text-[#c5c9ac] uppercase tracking-widest font-mono">
              VALIDATING BIOMETRIC AND PROFESSIONAL CLEARANCE...
            </p>
          </div>
        </div>

        {status === "pending" && (
          <div className="space-y-6 mt-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="bg-[#caf300] text-[#171e00] px-8 py-2 w-fit">
                <span
                  className="text-xl font-black tracking-[0.15em]"
                  style={{ fontFamily: "'Archivo Narrow', sans-serif" }}
                >
                  PENDING
                </span>
              </div>
              <div className="font-mono text-right">
                <div className="text-[10px] text-[#c5c9ac]">Buffer ETA</div>
                <div className="text-2xl font-bold text-[#caf300]">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
            <div className="w-full bg-neutral-900/60 p-1 border border-[#444932]/20 h-4">
              <div className="h-full bg-[#caf300] w-[60%]" />
            </div>
          </div>
        )}

        {status === "approved" && (
          <div className="space-y-6 mt-8">
            <div className="bg-[#caf300] text-[#171e00] px-8 py-2 w-fit">
              <span
                className="text-xl font-black tracking-[0.15em]"
                style={{ fontFamily: "'Archivo Narrow', sans-serif" }}
              >
                APPROVED
              </span>
            </div>
            <p className="text-xl text-white">
              Welcome to the Vortex, Trainer.
            </p>
          </div>
        )}

        {status === "rejected" && (
          <div className="space-y-6 mt-8">
            <div className="bg-[#f3a99e] text-[#6b1211] px-8 py-2 w-fit">
              <span
                className="text-xl font-black tracking-[0.15em]"
                style={{ fontFamily: "'Archivo Narrow', sans-serif" }}
              >
                REJECTED
              </span>
            </div>
            <div className="bg-[#1f1110] border-l-2 border-[#ff7b72] p-4 text-xs text-[#ffb4ab] font-mono">
              "INCOMPLETE DOCUMENTATION: PLEASE UPLOAD CURRENT CERTIFICATION."
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
}