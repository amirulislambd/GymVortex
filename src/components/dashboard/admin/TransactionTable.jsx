"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiRefreshCw,
  FiDownload,
  FiZap,
  FiCopy,
  FiEye,
  FiX,
  FiCheck,
  FiCalendar,
  FiMail,
  FiHash,
  FiDollarSign,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_COLORS = {
  captured: "text-[#caf300] border-[#caf300]/40 bg-[#caf300]/10",
  pending: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  refunded: "text-red-400 border-red-400/40 bg-red-400/10",
};

export default function TransactionsTable({
  transactions,
  pagination,
  stats,
  currentPage,
}) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);

  const handlePageChange = (page) => {
    router.push(`/dashboard/admin/transactions?page=${page}`);
  };

  const handleRefresh = () => router.refresh();

  const handleCopy = (sessionId) => {
    navigator.clipboard.writeText(sessionId);
    setCopiedId(sessionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return (
      new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " // " +
      new Date(dateStr).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* ── Stats Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f0f0f] border border-neutral-900 p-5">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] uppercase tracking-widest text-neutral-500"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Total Revenue (M-T-D)
            </p>
            <span
              className="text-[#caf300] text-[10px] font-bold"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              +12.4%
            </span>
          </div>
          <p
            className="text-3xl font-black text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            ${parseFloat(stats.totalRevenue || 0).toLocaleString()}
          </p>
          <p
            className="text-[10px] text-neutral-600 mt-1 uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Burn Rate: 3.3%
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-900 p-5">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] uppercase tracking-widest text-neutral-500"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Active Subscriptions
            </p>
            <span
              className="text-[10px] text-neutral-600 uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Units
            </span>
          </div>
          <p
            className="text-3xl font-black text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {(stats.totalTransactions || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-900 p-5">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] uppercase tracking-widest text-neutral-500"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Growth Velocity
            </p>
            <FiZap size={14} className="text-[#caf300]" />
          </div>
          <p
            className="text-3xl font-black text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            4.8
            <span className="text-sm text-neutral-500 ml-2 font-normal">
              Index
            </span>
          </p>
          <div className="flex gap-1 mt-2">
            {[3, 4, 3, 5, 4, 6, 8].map((h, i) => (
              <div
                key={i}
                className="w-4 bg-[#caf300]/60"
                style={{ height: `${h * 3}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Section Header ───────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#caf300]" />
          <h2
            className="text-sm font-black uppercase tracking-widest text-white"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Financial Ledger // Stripe_Core
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 border border-neutral-800 text-neutral-400 hover:text-white px-3 py-2 text-[10px] uppercase tracking-widest transition-all"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <FiDownload size={11} /> Export_CSV
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 border border-[#caf300]/30 text-[#caf300] hover:bg-[#caf300]/10 px-3 py-2 text-[10px] uppercase tracking-widest transition-all"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <FiRefreshCw size={11} /> Refresh_Sync
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Table (md and above) ────────────────────── */}
      <div className="hidden md:block bg-[#0f0f0f] border border-neutral-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b border-neutral-900 text-[10px] uppercase tracking-widest text-neutral-600"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">User Email</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date / Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <p
                      className="text-neutral-600 text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      [ No Transactions Found ]
                    </p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx._id?.toString() || tx.stripeSessionId}
                    className="hover:bg-neutral-900/30 transition-colors"
                  >
                    {/* Transaction ID + Copy */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {tx.stripeSessionId
                            ? `${tx.stripeSessionId.slice(0, 18)}...`
                            : "N/A"}
                        </span>
                        {tx.stripeSessionId && (
                          <button
                            onClick={() => handleCopy(tx.stripeSessionId)}
                            title="Copy Transaction ID"
                            className={`shrink-0 border px-1.5 py-1 transition-all ${
                              copiedId === tx.stripeSessionId
                                ? "border-[#caf300]/50 text-[#caf300]"
                                : "border-neutral-800 text-neutral-600 hover:border-neutral-600 hover:text-neutral-400"
                            }`}
                          >
                            {copiedId === tx.stripeSessionId ? (
                              <FiCheck size={10} />
                            ) : (
                              <FiCopy size={10} />
                            )}
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className="text-[11px] text-neutral-300"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {tx.userEmail}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-black text-[#caf300]"
                        style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                      >
                        ${parseFloat(tx.priceAmount || 0).toFixed(2)}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className="text-[11px] text-neutral-500"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {formatDate(tx.createdAt)}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${STATUS_COLORS["captured"]}`}
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        CAPTURED
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="flex items-center gap-1.5 border border-neutral-800 text-neutral-400 hover:border-[#caf300]/40 hover:text-[#caf300] px-2.5 py-1.5 text-[9px] uppercase tracking-widest transition-all ml-auto"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        <FiEye size={10} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="border-t border-neutral-900 px-4 py-3 flex items-center justify-between">
          <p
            className="text-[10px] text-neutral-600 uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Showing {(currentPage - 1) * 10 + 1}–
            {Math.min(currentPage * 10, pagination.totalItems || 0)} of{" "}
            {pagination.totalItems || 0} Transactions
          </p>
          <div className="flex items-center gap-1">
            {Array.from(
              { length: pagination.totalPages || 1 },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 text-[10px] font-bold border transition-all ${
                  currentPage === page
                    ? "bg-[#caf300] text-[#0a0a0a] border-[#caf300]"
                    : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600"
                }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Cards (below md) ─────────────────────────── */}
      <div className="md:hidden space-y-3">
        {transactions.length === 0 ? (
          <div className="bg-[#0f0f0f] border border-neutral-900 px-4 py-16 text-center">
            <p
              className="text-neutral-600 text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              [ No Transactions Found ]
            </p>
          </div>
        ) : (
          transactions.map((tx, idx) => (
            <motion.div
              key={tx._id?.toString() || tx.stripeSessionId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-[#0f0f0f] border border-neutral-900 border-l-2 border-l-[#caf300] overflow-hidden"
            >
              {/* Card Header — amount + status badge */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-neutral-900/80">
                <div className="flex items-center gap-2">
                  <FiDollarSign size={13} className="text-[#caf300]" />
                  <span
                    className="text-2xl font-black text-[#caf300]"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    ${parseFloat(tx.priceAmount || 0).toFixed(2)}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border ${STATUS_COLORS["captured"]}`}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  ● CAPTURED
                </span>
              </div>

              {/* Card Body — rows */}
              <div className="px-4 py-3 space-y-2.5">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <FiMail
                    size={11}
                    className="text-neutral-600 mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      User
                    </span>
                    <span
                      className="text-[11px] text-neutral-300 truncate"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {tx.userEmail}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <FiCalendar
                    size={11}
                    className="text-neutral-600 mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Date
                    </span>
                    <span
                      className="text-[11px] text-neutral-500"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {formatDate(tx.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Session ID + copy */}
                <div className="flex items-start gap-3">
                  <FiHash
                    size={11}
                    className="text-neutral-600 mt-0.5 shrink-0"
                  />
                  <div className="flex items-center justify-between gap-2 w-full min-w-0">
                    <div className="flex flex-col min-w-0">
                      <span
                        className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        TX ID
                      </span>
                      <span
                        className="text-[11px] text-neutral-500 truncate"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {tx.stripeSessionId
                          ? `${tx.stripeSessionId.slice(0, 20)}...`
                          : "N/A"}
                      </span>
                    </div>
                    {tx.stripeSessionId && (
                      <button
                        onClick={() => handleCopy(tx.stripeSessionId)}
                        className={`shrink-0 flex items-center gap-1.5 border px-2.5 py-1.5 text-[9px] uppercase tracking-widest transition-all ${
                          copiedId === tx.stripeSessionId
                            ? "border-[#caf300]/50 text-[#caf300] bg-[#caf300]/5"
                            : "border-neutral-800 text-neutral-600 hover:border-neutral-600 hover:text-neutral-400"
                        }`}
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {copiedId === tx.stripeSessionId ? (
                          <>
                            <FiCheck size={10} /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy size={10} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer — view button */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => setSelectedTx(tx)}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-[#caf300]/40 text-neutral-400 hover:text-[#caf300] py-2.5 text-[10px] uppercase tracking-widest transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <FiEye size={11} />
                  View Full Details
                </button>
              </div>
            </motion.div>
          ))
        )}

        {/* Mobile Pagination */}
        {transactions.length > 0 && (
          <div className="flex items-center justify-between pt-3 px-1">
            <p
              className="text-[10px] text-neutral-600 uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Page {currentPage} / {pagination.totalPages || 1}
            </p>
            <div className="flex items-center gap-1">
              {Array.from(
                { length: pagination.totalPages || 1 },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 text-[10px] font-bold border transition-all ${
                    currentPage === page
                      ? "bg-[#caf300] text-[#0a0a0a] border-[#caf300]"
                      : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-neutral-400"
                  }`}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedTx && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className="bg-[#0f0f0f] border border-neutral-800 w-full max-w-md overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#caf300]" />
                  <h3
                    className="text-xs font-black uppercase tracking-widest text-white"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Transaction Detail
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="text-neutral-600 hover:text-white transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* User Info */}
              <div className="px-6 py-5 flex items-center gap-4 border-b border-neutral-900">
                {selectedTx.userImage ? (
                  <img
                    src={selectedTx.userImage}
                    alt={selectedTx.userName}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <span
                      className="text-[#caf300] text-sm font-bold"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {selectedTx.userName?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
                <div>
                  <p
                    className="text-white text-sm font-bold uppercase"
                    style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                  >
                    {selectedTx.userName || "Unknown"}
                  </p>
                  <p
                    className="text-neutral-500 text-[10px]"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {selectedTx.userEmail}
                  </p>
                </div>
              </div>

              {/* Class Image */}
              {selectedTx.classImage && (
                <div className="w-full h-32 overflow-hidden">
                  <img
                    src={selectedTx.classImage}
                    alt={selectedTx.className}
                    className="w-full h-full object-cover brightness-50"
                  />
                </div>
              )}

              {/* Details */}
              <div className="px-6 py-5 space-y-3">
                {[
                  { label: "Class", value: selectedTx.className },
                  {
                    label: "Amount",
                    value: `$${parseFloat(selectedTx.priceAmount || 0).toFixed(2)}`,
                    highlight: true,
                  },
                  {
                    label: "Date",
                    value: selectedTx.createdAt
                      ? new Date(selectedTx.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "N/A",
                  },
                  { label: "Status", value: "CAPTURED", badge: true },
                ].map(({ label, value, highlight, badge }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-neutral-900/60"
                  >
                    <span
                      className="text-[10px] text-neutral-600 uppercase tracking-widest"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {label}
                    </span>
                    {badge ? (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${STATUS_COLORS["captured"]}`}
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {value}
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-bold ${highlight ? "text-[#caf300]" : "text-neutral-300"}`}
                        style={{
                          fontFamily: highlight
                            ? "Archivo Narrow, sans-serif"
                            : "JetBrains Mono, monospace",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                ))}

                {/* Session ID row */}
                <div className="flex items-center justify-between py-2">
                  <span
                    className="text-[10px] text-neutral-600 uppercase tracking-widest"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Session ID
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[160px]">
                      {selectedTx.stripeSessionId?.slice(0, 22)}...
                    </span>
                    <button
                      onClick={() => handleCopy(selectedTx.stripeSessionId)}
                      className={`border px-1.5 py-1 transition-all ${
                        copiedId === selectedTx.stripeSessionId
                          ? "border-[#caf300]/50 text-[#caf300]"
                          : "border-neutral-800 text-neutral-600 hover:border-neutral-600 hover:text-neutral-400"
                      }`}
                    >
                      {copiedId === selectedTx.stripeSessionId ? (
                        <FiCheck size={10} />
                      ) : (
                        <FiCopy size={10} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 pb-5">
                <button
                  onClick={() => setSelectedTx(null)}
                  className="w-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 py-2.5 text-[10px] uppercase tracking-widest transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
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