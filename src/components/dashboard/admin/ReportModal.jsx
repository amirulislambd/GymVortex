"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChartBar, FaTimes } from "react-icons/fa";
import ReportTable from "./ReportTable";

export default function ReportModal({ isOpen, onClose, data }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#caf300]/20 bg-[#111] shadow-[0_0_60px_rgba(202,243,0,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#caf300]/10 border border-[#caf300]/20">
                  <FaChartBar className="text-[#caf300] text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase tracking-wider text-white">
                    System Report
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Live Analytics & Platform Overview
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/30 text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6 custom-scrollbar">
              {data?.length ? (
                <ReportTable data={data} />
              ) : (
                <div className="flex h-80 flex-col items-center justify-center text-center">
                  <FaChartBar className="mb-5 text-6xl text-[#caf300]/40" />

                  <h3 className="text-2xl font-bold text-white">
                    No Report Found
                  </h3>

                  <p className="mt-2 text-neutral-500">
                    There is currently no report available.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}