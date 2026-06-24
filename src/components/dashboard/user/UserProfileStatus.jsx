"use client";
import React from "react";
// react-icons/fa থেকে আইকনগুলো ইম্পোর্ট করা হয়েছে
import { FaCheckCircle, FaClock, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

export default function UserProfileStatus({ userProfile }) {
  const {
    name = "User Name",
    email = "user@example.com",
    image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    trainerStatus = "none",
    adminFeedback = ""
  } = userProfile || {};

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          bg: "bg-yellow-500/10 border-yellow-500/30",
          text: "text-yellow-500",
          label: "PENDING REVIEW",
          icon: <FaClock className="w-4 h-4 text-yellow-500" />
        };
      case "rejected":
        return {
          bg: "bg-red-500/10 border-red-500/30",
          text: "text-red-500",
          label: "APPLICATION REJECTED",
          icon: <FaTimesCircle className="w-4 h-4 text-red-500" />
        };
      case "approved":
        return {
          bg: "bg-green-500/10 border-green-500/30",
          text: "text-green-500",
          label: "APPROVED TRAINER",
          icon: <FaCheckCircle className="w-4 h-4 text-green-500" />
        };
      default:
        return {
          bg: "bg-neutral-800/20 border-neutral-800/40",
          text: "text-neutral-400",
          label: "NOT APPLIED YET",
          icon: <FaExclamationCircle className="w-4 h-4 text-neutral-400" />
        };
    }
  };

  const statusConfig = getStatusConfig(trainerStatus);

  return (
    <div className="bg-[#161616] border border-neutral-800/30 rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-xs font-mono font-bold tracking-widest text-[#caf300] uppercase mb-5">
        // ACCOUNT OVERVIEW & STATUS
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-[#caf300] rounded-md blur opacity-20 group-hover:opacity-40 transition duration-300" />
          <img
            src={image}
            alt={name}
            className="relative w-24 h-24 object-cover rounded-md border border-neutral-800"
          />
        </div>

        <div className="flex-1 w-full text-center sm:text-left space-y-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-mono">
              {name}
            </h1>
            <p className="text-xs text-[#8e8f85] font-mono mt-0.5">{email}</p>
          </div>

          {/* এখানে className-এ ব্যাকটিক্স (``) দিয়ে ফিক্স করা হয়েছে */}
          <div className={`border p-4 rounded-md ${statusConfig.bg} text-left transition-all duration-300`}>
            <div className="flex items-center gap-2">
              {statusConfig.icon}
              <span className={`text-xs font-mono font-black tracking-wider ${statusConfig.text}`}>
                {statusConfig.label}
              </span>
            </div>

            {trainerStatus?.toLowerCase() === "rejected" && adminFeedback && (
              <div className="mt-3 pt-3 border-t border-red-500/20">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Admin Feedback:
                </p>
                <p className="text-xs text-neutral-200 bg-[#121212] p-2.5 rounded border border-neutral-800/60 leading-relaxed">
                  "{adminFeedback}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}