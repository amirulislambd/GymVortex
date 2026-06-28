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

  const hasData = data && Object.keys(data).length > 0;

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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#111] border border-[#caf300]/20 shadow-[0_0_40px_rgba(202,243,0,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#caf300]/10 border border-[#caf300]/20 flex items-center justify-center">
                  <FaChartBar className="text-[#caf300] text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white uppercase">
                    System Report
                  </h2>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">
                    Live Analytics Overview
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-90px)] p-6 custom-scrollbar">
              {hasData ? (
                <ReportTable data={data} />
              ) : (
                <div className="h-[350px] flex flex-col items-center justify-center">
                  <FaChartBar className="text-6xl text-[#caf300]/30 mb-4" />
                  <h3 className="text-white text-2xl font-bold">
                    No Report Available
                  </h3>
                  <p className="text-neutral-500 mt-2">
                    System analytics data could not be found.
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