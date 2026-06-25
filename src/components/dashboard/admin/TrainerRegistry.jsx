"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { DemoteTrainerAction } from "@/lib/action/trainerManagement";


const TrainerRegistry = ({ initialTrainers }) => {
  const [trainers, setTrainers] = useState(initialTrainers || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isDemoting, setIsDemoting] = useState(false);

  const filteredTrainers = useMemo(() => {
    if (!searchQuery.trim()) return trainers;
    return trainers.filter((trainer) =>
      trainer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, trainers]);

  const handleDemoteConfirm = async () => {
    if (!selectedTrainer) return;
    setIsDemoting(true);
  
    try {
      const data = await DemoteTrainerAction(selectedTrainer.email); // ← rename res to data
      // ← remove res.json() line
  
      if (data?.success) {
        setTrainers((prev) => prev.filter((t) => t._id !== selectedTrainer._id));
        toast.success(`${selectedTrainer.name} has been demoted to user.`);
        setSelectedTrainer(null);
      } else {
        toast.error("Failed to demote trainer. Please try again.");
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.error("Demote error:", e);
    } finally {
      setIsDemoting(false);
    }
  };

  return (
    // No <Toaster /> here — it lives in the root layout
    <div className="w-full text-[#e5e2e1]">

      {/* Search Bar */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#444932" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          className="w-full bg-[#1a1a1a] border border-[#444932] text-[#e5e2e1] pl-10 pr-4 py-3 text-xs uppercase tracking-widest placeholder:text-[#444932] outline-none focus:border-[#d4ff00]/50 transition-colors"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
          placeholder="Search trainer name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444932] hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[#444932] text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}>
          {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full animate-pulse" />
          <span className="text-[#444932] text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Live Registry
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="w-full bg-[#131313] border border-[#444932] overflow-hidden">
        {filteredTrainers.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-16 h-16 border border-[#444932] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#444932" strokeWidth="1.5" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-mono text-sm uppercase tracking-widest">
                {searchQuery ? "No Trainers Found" : "No Trainers Registered"}
              </p>
              <p className="text-[#444932] font-mono text-[11px] uppercase tracking-wider">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "Approved trainers will appear here"}
              </p>
            </div>
            <div className="flex items-center gap-3 w-48">
              <div className="flex-1 h-px bg-[#444932]" />
              <div className="w-1.5 h-1.5 bg-[#444932]" />
              <div className="flex-1 h-px bg-[#444932]" />
            </div>
            <div className="border border-[#d4ff00]/30 px-4 py-1.5">
              <span className="text-[#d4ff00]/60 font-mono text-[10px] uppercase tracking-widest">
                {searchQuery ? "Try a different query" : "Registry Empty // System Idle"}
              </span>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2a2a2a]/80 border-b border-[#444932]">
                <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">Trainer</th>
                <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">Email</th>
                <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">Plan</th>
                <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#444932]">
              <AnimatePresence>
                {filteredTrainers.map((trainer, index) => (
                 <motion.tr
                 key={trainer._id ? `${trainer._id}-${index}` : `trainer-${index}`}
                 initial={{ opacity: 1 }}
                 exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                 transition={{ duration: 0.3 }}
                 className="hover:bg-[#d4ff00]/5 transition-colors"
               >
                    {/* Trainer name + avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {trainer.image ? (
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#444932]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] border border-[#444932] flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-[#d4ff00]"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}>
                              {trainer.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="text-white text-sm font-semibold">
                          {trainer.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#c5c9ac] font-mono text-xs">
                      {trainer.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-[#444932] text-[#c5c9ac]"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {trainer.plan || "free_user"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedTrainer(trainer)}
                        className="border border-red-500/60 text-red-400 px-4 py-1 text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        Demote
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      {/* Demote Confirm Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] border border-red-500/40 p-8 w-[420px] shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            >
              {/* Warning icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-red-500/40 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="text-red-400 font-mono text-sm uppercase tracking-widest">
                  Confirm Demotion
                </h3>
              </div>

              {/* Trainer info */}
              <div className="bg-[#111] border border-[#2a2a2a] p-4 mb-6 space-y-1">
                <p className="text-white font-mono text-xs uppercase tracking-wider">
                  {selectedTrainer.name}
                </p>
                <p className="text-[#444932] font-mono text-[10px]">
                  {selectedTrainer.email}
                </p>
              </div>

              <p className="text-[#c5c9ac] font-mono text-xs leading-relaxed mb-6 border-l-2 border-red-500/40 pl-3">
                This trainer will lose all trainer privileges and be
                downgraded to a regular user. This action can be reversed
                by re-approving their application.
              </p>

              <div className="flex gap-3">
                <button
                  disabled={isDemoting}
                  onClick={handleDemoteConfirm}
                  className="flex-1 bg-red-600 text-white font-bold uppercase py-2.5 text-xs tracking-widest hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {isDemoting ? "Processing..." : "Confirm Demote"}
                </button>
                <button
                  disabled={isDemoting}
                  onClick={() => setSelectedTrainer(null)}
                  className="px-5 border border-[#444932] text-white uppercase text-xs tracking-widest hover:border-white transition-all disabled:opacity-50"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainerRegistry;
