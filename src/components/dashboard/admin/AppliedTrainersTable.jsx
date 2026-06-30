"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UpdateTrainerAction } from "@/lib/action/trainerManagement";

export default function AppliedTrainersTable({ pendingTrainers }) {
  const [trainers, setTrainers] = useState(pendingTrainers || []);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (id, status, email, userFeedback) => {
    setIsLoading(true);
    const loadingToast = toast.loading(`Processing ${status}...`);

    try {
      const res = await UpdateTrainerAction(id, status, userFeedback || "", email);

      toast.dismiss(loadingToast);

      if (res?.success) {
        toast.success(
          status === "approved"
            ? "Trainer approved successfully!"
            : "Trainer rejected successfully."
        );

        // Remove the acted-upon row from local state immediately
        setTrainers((prev) => prev.filter((t) => t._id !== id));
        setSelectedApplicant(null);
        setIsRejecting(false);
        setFeedback("");
        router.refresh();
      } else {
        toast.error("Failed to update status. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      console.error("HandleAction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // No <Toaster /> here — keep only one <Toaster /> in your root layout
    <div className="w-full bg-[#131313] md:border border-[#444932] overflow-hidden">
      {trainers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          {/* Icon */}
          <div className="w-16 h-16 border border-[#444932] flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444932"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <p className="text-white font-mono text-sm uppercase tracking-widest">
              No Pending Applications
            </p>
            <p className="text-[#444932] font-mono text-[11px] uppercase tracking-wider">
              All trainer applications have been reviewed
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center gap-3 w-48">
            <div className="flex-1 h-px bg-[#444932]" />
            <div className="w-1.5 h-1.5 bg-[#444932]" />
            <div className="flex-1 h-px bg-[#444932]" />
          </div>

          {/* Status badge */}
          <div className="border border-[#d4ff00]/30 px-4 py-1.5">
            <span className="text-[#d4ff00]/60 font-mono text-[10px] uppercase tracking-widest">
              Queue Empty // System Idle
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2a2a2a]/80 border-b border-[#444932]">
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Specialty
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-[#d4ff00] font-mono text-[11px] uppercase text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#444932]">
                <AnimatePresence>
                  {trainers.map((item) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-[#d4ff00]/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white">{item.fullName}</td>

                      <td className="px-6 py-4 text-[#c5c9ac]">
                        {item.specialty}
                      </td>

                      <td className="px-6 py-4 text-[#c5c9ac]">
                        {item.experience} Years
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedApplicant(item);
                            setIsRejecting(false);
                            setFeedback("");
                          }}
                          className="border border-[#d4ff00] text-[#d4ff00] px-4 py-1 text-xs uppercase hover:bg-[#d4ff00] hover:text-black transition"
                        >
                          Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden  space-y-4">
            <AnimatePresence>
              {trainers.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1a1a1a] border border-[#444932] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg">
                      {item.fullName}
                    </h3>

                    <span className="text-[10px] uppercase bg-[#d4ff00]/10 text-[#d4ff00] px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#777] text-sm">Specialty</span>
                      <span className="text-[#d4ff00] font-medium">
                        {item.specialty}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#777] text-sm">Experience</span>
                      <span className="text-white">
                        {item.experience} Years
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedApplicant(item);
                      setIsRejecting(false);
                      setFeedback("");
                    }}
                    className="w-full mt-5 bg-[#d4ff00] text-black py-2.5 rounded-lg font-semibold hover:bg-[#b5e000] transition"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApplicant && (
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
              className="bg-[#1a1a1a] border border-[#d4ff00] p-8 w-[500px] shadow-[0_0_20px_rgba(212,255,0,0.2)]"
            >
              <h3 className="text-[#d4ff00] font-mono text-xl uppercase mb-6">
                Application Details
              </h3>

              <div className="grid grid-cols-2 gap-4 text-white text-sm font-mono mb-6">
                <p>
                  Name:{" "}
                  <span className="text-[#c5c9ac]">
                    {selectedApplicant.fullName}
                  </span>
                </p>
                <p>
                  Email:{" "}
                  <span className="text-[#c5c9ac]">
                    {selectedApplicant.userEmail}
                  </span>
                </p>
                <p>
                  Specialty:{" "}
                  <span className="text-[#c5c9ac]">
                    {selectedApplicant.specialty}
                  </span>
                </p>
                <p>
                  Experience:{" "}
                  <span className="text-[#c5c9ac]">
                    {selectedApplicant.experience} Years
                  </span>
                </p>
              </div>

              <p className="text-white mb-4 text-sm font-mono border-l-2 border-[#d4ff00] pl-3">
                Bio: {selectedApplicant.motivation}
              </p>

              <AnimatePresence>
                {isRejecting && (
                  <motion.textarea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="w-full bg-[#2a2a2a] text-white p-3 border border-red-500 mb-4 outline-none font-mono resize-none"
                    rows={3}
                    placeholder="WRITE_REJECTION_FEEDBACK..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                )}
              </AnimatePresence>

              <div className="flex gap-4">
                {!isRejecting ? (
                  <>
                    <button
                      disabled={isLoading}
                      onClick={() =>
                        handleAction(
                          selectedApplicant._id,
                          "approved",
                          selectedApplicant.userEmail,
                          "",
                        )
                      }
                      className="flex-1 bg-[#d4ff00] text-black font-bold uppercase py-2 hover:bg-[#b5e000] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isLoading ? "Processing..." : "Approve"}
                    </button>
                    <button
                      disabled={isLoading}
                      onClick={() => setIsRejecting(true)}
                      className="flex-1 border border-red-500 text-red-500 uppercase py-2 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    disabled={isLoading || !feedback.trim()}
                    onClick={() =>
                      handleAction(
                        selectedApplicant._id,
                        "rejected",
                        selectedApplicant.userEmail,
                        feedback,
                      )
                    }
                    className="flex-1 bg-red-600 text-white font-bold uppercase py-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? "Processing..." : "Confirm Reject"}
                  </button>
                )}
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setSelectedApplicant(null);
                    setIsRejecting(false);
                    setFeedback("");
                  }}
                  className="px-4 border border-[#444932] text-white uppercase hover:border-white transition-all disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}