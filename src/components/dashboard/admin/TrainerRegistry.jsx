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
    return trainers.filter(
      (trainer) =>
        trainer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, trainers]);

  const handleDemoteConfirm = async () => {
    if (!selectedTrainer) return;
    setIsDemoting(true);

    try {
      const data = await DemoteTrainerAction(selectedTrainer.email);

      if (data?.success) {
        setTrainers((prev) =>
          prev.filter((t) => t._id !== selectedTrainer._id),
        );
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
    <div className="w-full text-[#e5e2e1]">
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#444932"
            strokeWidth="2"
            strokeLinecap="round"
          >
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p
          className="text-[#444932] text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {filteredTrainers.length} trainer
          {filteredTrainers.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full animate-pulse" />
          <span
            className="text-[#444932] text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Live Registry
          </span>
        </div>
      </div>

      <div className="w-full bg-[#131313] border border-[#444932] overflow-hidden">
        {filteredTrainers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-16 h-16 border border-[#444932] flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#444932"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
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
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <table className="hidden md:table w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2a2a2a]/80 border-b border-[#444932]">
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Trainer
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#444932]">
                {filteredTrainers.map((trainer) => (
                  <tr
                    key={trainer._id}
                    className="hover:bg-[#d4ff00]/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {trainer.image ? (
                          <img
                            src={trainer.image}
                            className="w-8 h-8 rounded-full object-cover border border-[#444932]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] border border-[#444932] flex items-center justify-center shrink-0">
                            <span className="text-[10px] text-[#d4ff00]">
                              {trainer.name?.charAt(0)}
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
                      <span className="text-[9px] font-bold uppercase px-2 py-1 border border-[#444932] text-[#c5c9ac]">
                        {trainer.plan || "free_user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedTrainer(trainer)}
                        className="border border-red-500/60 text-red-400 px-4 py-1 text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all"
                      >
                        Demote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {filteredTrainers.map((trainer) => (
                <div
                  key={trainer._id}
                  className="p-4 border-b border-[#444932] space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {trainer.image ? (
                        <img
                          src={trainer.image}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#444932] flex items-center justify-center">
                          <span className="text-xs text-[#d4ff00]">
                            {trainer.name?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-white text-sm font-bold">
                          {trainer.name}
                        </p>
                        <p className="text-[#c5c9ac] text-[10px] font-mono">
                          {trainer.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] uppercase border border-[#444932] px-2 py-1 text-[#c5c9ac]">
                      {trainer.plan || "free"}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="w-full border border-red-500/60 text-red-400 py-2 text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all"
                  >
                    Demote
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedTrainer && (
          <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div className="bg-[#1a1a1a] border border-red-500/40 p-8 w-[420px]">
              <h3 className="text-red-400 font-mono text-sm uppercase mb-6">
                Confirm Demotion
              </h3>
              <p className="text-[#c5c9ac] font-mono text-xs mb-6">
                This trainer will lose all trainer privileges. This action is
                reversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDemoteConfirm}
                  className="flex-1 bg-red-600 text-white font-bold uppercase py-2.5 text-xs hover:bg-red-700 transition-all"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="px-5 border border-[#444932] text-white uppercase text-xs hover:border-white transition-all"
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