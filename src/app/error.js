"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaRedoAlt, FaHome } from "react-icons/fa";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#caf300]/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: .9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="relative z-10 w-full max-w-xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(202,243,0,.12)]"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#caf300]/10 border border-[#caf300]/20 flex items-center justify-center"
        >
          <FaExclamationTriangle className="text-5xl text-[#caf300]" />
        </motion.div>

        <h1
          className="text-5xl font-black uppercase text-white tracking-tight"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          Something Went Wrong
        </h1>

        <p className="mt-5 text-white/55 leading-7">
          The requested operation couldn't be completed.
          An unexpected system error occurred.
        </p>

        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-left">
            <p className="text-xs font-mono text-red-300 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#caf300] text-black font-bold uppercase tracking-wider hover:scale-105 transition"
          >
            <FaRedoAlt />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white hover:border-[#caf300] hover:text-[#caf300] transition"
          >
            <FaHome />
            Back Home
          </Link>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-[#caf300]/70 animate-pulse delay-150" />
          <span className="w-2 h-2 rounded-full bg-[#caf300]/40 animate-pulse delay-300" />
        </div>
      </motion.div>
    </div>
  );
}