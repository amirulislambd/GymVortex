"use client";

import React from "react";
import { motion } from "framer-motion";

const ClassStats = ({ stats, filteredCount = 0 }) => {

  const pendingCount = stats?.pendingCount ?? 0;
  const approvedCount = stats?.approvedCount ?? 0;
  const rejectedCount = stats?.rejectedCount ?? 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-mono">
      {/*  PENDING APPROVALS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-[#444932] bg-[#141414] p-4 border-l-4 border-l-[#caf300]"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-wider">Pending Approvals</p>
        <p className="text-3xl font-bold text-[#caf300] mt-1">{pendingCount}</p>
      </motion.div>
      
      {/*  TOTAL LIVE CLASSES */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="border border-[#444932] bg-[#141414] p-4"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-wider">Total Live Classes</p>
        <p className="text-3xl font-bold text-white mt-1">{approvedCount}</p>
      </motion.div>

      {/*  REJECTED REQUESTS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="border border-[#444932] bg-[#141414] p-4"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-wider">Rejected Requests</p>
        <p className="text-3xl font-bold text-red-500 mt-1">{rejectedCount}</p>
      </motion.div>

      {/*  FILTERED RESULTS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="border border-[#444932] bg-[#141414] p-4 bg-gradient-to-br from-[#caf300]/5 to-transparent"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-wider">Filtered Results</p>
        <p className="text-3xl font-bold text-white mt-1">{filteredCount}</p>
      </motion.div>
    </div>
  );
};

export default ClassStats;