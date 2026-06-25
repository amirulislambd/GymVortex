"use client";
import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  DemoteTrainerAction,
  UpdateTrainerAction,
} from "@/lib/action/trainerManagement";
import DynamicDeleteModal from "@/components/shared/DynamicDeleteModal";

const TrainerRegistry = ({ initialTrainers }) => {
  const [trainers, setTrainers] = useState(initialTrainers || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isDemoting, setIsDemoting] = useState(false);

  const filteredTrainers = useMemo(() => {
    if (!searchQuery.trim()) return trainers;
    return trainers.filter((t) => {
      const name = t.name || t.userName || "";
      const email = t.email || t.userEmail || "";
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, trainers]);

  const handleDemoteConfirm = async () => {
    if (!selectedTrainer) return;

    setIsDemoting(true);
    try {
      const data = await UpdateTrainerAction(
        selectedTrainer._id,
        "user",
        "Demoted by admin",
        selectedTrainer.email || selectedTrainer.userEmail,
      );

      if (data?.success) {
        setTrainers((prev) =>
          prev.filter((t) => t._id !== selectedTrainer._id),
        );
        toast.success("Trainer has been demoted successfully.");
        setSelectedTrainer(null);
      } else {
        toast.error(data?.message || "Failed to demote.");
      }
    } catch (e) {
      toast.error("Error occurred while demoting.");
    } finally {
      setIsDemoting(false);
    }
  };
  return (
    <div className="w-full text-[#e5e2e1]">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          className="w-full bg-[#1a1a1a] border border-[#444932] text-[#e5e2e1] pl-4 py-3 text-xs outline-none focus:border-[#d4ff00]/50"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full bg-[#131313] border border-[#444932]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#444932] text-[#d4ff00] text-[11px] uppercase">
              <th className="px-6 py-4">Trainer</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444932]">
            {filteredTrainers.map((t) => (
              <tr key={t._id} className="hover:bg-[#d4ff00]/5">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={t.image || t.userImage || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="avatar"
                  />
                  <span>{t.name || t.userName}</span>
                </td>
                <td className="px-6 py-4 text-[#c5c9ac] font-mono text-xs">
                  {t.email || t.userEmail}
                </td>
                <td className="px-6 py-4 text-[10px] uppercase">
                  {t.plan || "Free"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedTrainer(t)}
                    className="border border-red-500/60 text-red-400 px-4 py-1 text-[10px] hover:bg-red-600 hover:text-white transition-all"
                  >
                    Demote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DynamicDeleteModal
        isOpen={!!selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        itemTitle={`Demote trainer ${selectedTrainer?.name || selectedTrainer?.userName || ""} to user status?`}
        isProcessing={isDemoting}
        type="danger"
        onConfirm={handleDemoteConfirm}
      />
    </div>
  );
};

export default TrainerRegistry;