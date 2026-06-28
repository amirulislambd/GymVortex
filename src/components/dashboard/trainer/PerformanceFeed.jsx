"use client";

import { motion } from "framer-motion";
import { FaUser, FaUserGraduate } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function PerformanceFeed({ students = [] }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-3 md:pt-6 mt-6 md:mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white uppercase">
          <FaUser className="text-[#caf300]" />
          Active Student
        </h2>

        <span className="px-3 py-1 text-xs bg-[#caf300]/10 border border-[#caf300]/30 text-[#caf300] rounded-full">
          {students.length} Active Student
        </span>
      </div>

      {students.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-white/10 bg-[#151515]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center w-24 h-24 rounded-full bg-[#caf300]/10 border border-[#caf300]/20"
          >
            <FaUserGraduate className="text-5xl text-[#caf300]" />
          </motion.div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            No Active Students
          </h3>

          <p className="mt-2 max-w-md text-center text-sm text-white/50">
            There are currently no active students available. Once students join
            the platform, they will automatically appear here.
          </p>
        </motion.div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto border border-white/10 rounded-xl md:block">
            <table className="w-full text-left">
              <thead className="bg-[#151515] text-white/60 text-xs uppercase">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Streak</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>

              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {students.map((s) => (
                  <motion.tr
                    key={s._id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255,255,255,0.03)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-white/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />

                        <span className="font-semibold text-white">
                          {s.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-white/60">{s.email}</td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#caf300]/10 border border-[#caf300]/20 text-[#caf300]">
                        {s.rank}
                      </span>
                    </td>

                    <td className="p-4 text-white">🔥 {s.streak} Days</td>

                    <td className="p-4 text-white/50">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 md:hidden"
          >
            {students.map((s) => (
              <motion.div
                key={s._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-white/10 bg-[#151515] p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/10"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-white">{s.name}</h3>

                    <p className="text-xs text-white/50 break-all">{s.email}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full border border-[#caf300]/20 bg-[#caf300]/10 px-3 py-1 text-xs text-[#caf300]">
                        {s.rank}
                      </span>

                      <span className="text-sm text-white">
                        🔥 {s.streak} Days
                      </span>
                    </div>

                    <p className="mt-3 text-[11px] text-white/40">
                      Joined: {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
