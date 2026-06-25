"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClassTable = ({
  currentItems = [],
  currentPage,
  totalPages,
  setCurrentPage,
  totalRecords,
  indexOfFirstItem,
  indexOfLastItem,
  handleAction,
  handleDelete,

}) => {

 
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
  };

  return (
    <div className="w-full space-y-4 font-mono">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={
            currentPage +
            (currentItems.length > 0 ? currentItems[0]._id : "empty")
          }
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
         
          <div className="hidden md:block overflow-x-auto border border-[#444932] bg-[#0e0e0e]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#444932] bg-[#141414] text-[12px] text-[#c5c9ac] uppercase tracking-wider">
                  <th className="p-4">Class Preview</th>
                  <th className="p-4">Class Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#e5e2e1] divide-y divide-[#444932]/30">
                {currentItems.map((cls) => (
                  <motion.tr
                    key={cls._id}
                    layout
                    variants={itemVariants}
                    className="hover:bg-[#161616] transition-colors"
                  >
                 
                    <td className="p-4 w-24">
                      <div className="w-16 h-16 rounded-sm overflow-hidden border border-[#444932] bg-[#201f1f] flex items-center justify-center flex-shrink-0">
                        {cls.classImage || cls.image ? (
                          <img
                            src={cls.classImage || cls.image}
                            alt={cls.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-center text-neutral-600 uppercase p-1">
                            NO_IMG
                          </span>
                        )}
                      </div>
                    </td>

                   
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase text-[#caf300]/80 tracking-widest font-semibold">
                          BY:{" "}
                          {cls.trainerName ||
                            cls.authorName ||
                            "UNKNOWN_TRAINER"}
                        </span>
                        <span className="font-bold uppercase text-base text-white tracking-tight">
                          {cls.title || "UNTITLED_CLASS"}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold border uppercase ${
                          cls.status?.toLowerCase() === "approved"
                            ? "bg-[#caf300]/10 border-[#caf300] text-[#caf300]"
                            : cls.status?.toLowerCase() === "rejected"
                              ? "bg-red-950/40 border-red-500 text-red-400"
                              : "bg-[#caf300]/5 border-[#caf300]/40 text-[#caf300]/70 animate-pulse"
                        }`}
                      >
                        {cls.status || "PENDING"}
                      </span>
                    </td>

                    <td className="p-4 text-xs text-gray-400">
                      {cls.createdAt
                        ? new Date(cls.createdAt)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")
                        : "2026-06-25 12:00"}
                    </td>

                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/*  APPROVE BUTTON */}
                        <button
                          onClick={() =>
                            handleAction(cls._id, "approved", cls.title)
                          }
                          disabled={cls.status?.toLowerCase() === "approved"}
                          className={`px-3 py-1 text-[11px] font-bold uppercase tracking-tighter border transition-all ${
                            cls.status?.toLowerCase() === "approved"
                              ? "border-neutral-800 text-neutral-600 cursor-not-allowed bg-transparent"
                              : "border-[#caf300] bg-[#caf300] text-black hover:bg-transparent hover:text-[#caf300]"
                          }`}
                        >
                          Approve
                        </button>

                        {/* 👎 REJECT BUTTON */}
                        <button
                          onClick={() =>
                            handleAction(cls._id, "rejected", cls.title)
                          }
                          disabled={cls.status?.toLowerCase() === "rejected"}
                          className={`px-3 py-1 text-[11px] font-bold uppercase tracking-tighter border transition-all ${
                            cls.status?.toLowerCase() === "rejected"
                              ? "border-neutral-800 text-neutral-600 cursor-not-allowed bg-transparent"
                              : "border-[#f34500]/40 text-[#f34500] hover:bg-[#f34500] hover:text-black"
                          }`}
                        >
                          Reject
                        </button>

                        {/* 🗑️ PERMANENT DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(cls._id, cls.title)}
                          className="p-1 border border-neutral-700 text-neutral-400 hover:text-red-500 hover:border-red-500 transition-colors"
                          title="Delete Permanently"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE DEVICE */}
          <div className="block md:hidden space-y-3">
            {currentItems.map((cls) => (
              <motion.div
                key={cls._id}
                layout
                variants={itemVariants}
                className="bg-[#141414] border border-[#444932] p-4 space-y-3"
              >
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-sm overflow-hidden border border-[#444932] bg-[#201f1f] flex-shrink-0">
                    <img
                      src={cls.classImage || cls.image}
                      alt={cls.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block text-[9px] uppercase text-[#caf300]/80 tracking-wider">
                      BY: {cls.trainerName || cls.authorName || "UNKNOWN"}
                    </span>
                    <h4 className="font-bold text-[#e5e2e1] uppercase truncate text-sm">
                      {cls.title || "UNTITLED_CLASS"}
                    </h4>
                    <span
                      className={`inline-block mt-1 px-1.5 py-0.5 text-[8px] font-bold border uppercase ${
                        cls.status?.toLowerCase() === "approved"
                          ? "bg-[#caf300]/10 border-[#caf300] text-[#caf300]"
                          : "bg-[#444932]/20 text-[#c5c9ac]"
                      }`}
                    >
                      {cls.status || "PENDING"}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 pt-1">
                  SUBMITTED:{" "}
                  {cls.createdAt
                    ? new Date(cls.createdAt)
                        .toISOString()
                        .slice(0, 16)
                        .replace("T", " ")
                    : "2026-06-25 12:00"}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#444932]/40">
                  <button
                    onClick={() => onApproveHandler(cls._id)}
                    className="w-full py-1.5 text-[10px] font-bold uppercase text-center border border-[#caf300] bg-[#caf300] text-black"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onRejectHandler(cls._id)}
                    className="w-full py-1.5 text-[10px] font-bold uppercase text-center border border-[#f34500]/40 text-[#f34500]"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => onDeleteHandler(cls._id)}
                    className="w-full py-1.5 text-[10px] font-bold uppercase text-center border border-neutral-700 text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#141414] border border-[#444932] p-4 gap-4 text-xs text-[#c5c9ac]">
        <div>
          SHOWING {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, totalRecords)} OF {totalRecords} RECORDS
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-[#201f1f] border border-[#444932] disabled:opacity-30 disabled:cursor-not-allowed text-[#caf300]"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 font-bold transition-all ${
                currentPage === idx + 1
                  ? "bg-[#caf300] text-black border border-[#caf300]"
                  : "bg-[#201f1f] border border-[#444932] hover:border-[#caf300] text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-[#201f1f] border border-[#444932] disabled:opacity-30 disabled:cursor-not-allowed text-[#caf300]"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassTable;
