"use client";

import { useState } from "react";
import {
  FaShieldAlt,
  FaFileAlt,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import { getSystemReport, runSecurityScan } from "@/lib/api/adminOverview";
import { toast } from "react-hot-toast";
import ReportModal from "./ReportModal";

export default function AdminCommandCenter() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await runSecurityScan();
      if (res && res.success) {
        toast.success(`${res.message || "Scan complete"} • ${res.risks || 0} risks detected.`);
      } else {
        toast.error("Scan returned an unexpected response.");
      }
    } catch (error) {
      console.error("Scan Error:", error); 
      toast.error("Security scan failed. Check console.");
    } finally {
      setLoading(false);
    }
  };
  const handleViewReport = async () => {
    const id = toast.loading("Loading system report...");

    try {
      const res = await getSystemReport();

      toast.dismiss(id);

      if (res.success) {
        setReportData(res.data);
        setIsModalOpen(true);
      } else {
        toast.error("Unable to load report.");
      }
    } catch (error) {
      toast.dismiss(id);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        {/* Security Scan */}
        <button
          onClick={handleScan}
          disabled={loading}
          className="group relative overflow-hidden rounded-xl border border-[#caf300]/20 bg-[#111] p-6 text-left transition-all duration-300 hover:border-[#caf300] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(202,243,0,.15)] disabled:opacity-60"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#caf300]/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                {loading ? (
                  <FaSpinner className="text-[#caf300] text-xl animate-spin" />
                ) : (
                  <FaShieldAlt className="text-[#caf300] text-xl" />
                )}

                <h3 className="text-white font-bold uppercase tracking-wider">
                  Security Scan
                </h3>
              </div>

              <p className="mt-2 text-xs text-neutral-400">
                Scan the entire system for vulnerabilities.
              </p>
            </div>

            <FaArrowRight className="text-[#caf300] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="mt-5 text-[#caf300] text-sm font-semibold">
            {loading ? "Scanning..." : "Run Scan"}
          </div>
        </button>

        {/* Live Report */}
        <button
          onClick={handleViewReport}
          className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-[#111] p-6 text-left transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-cyan-400 text-xl" />

                <h3 className="text-white font-bold uppercase tracking-wider">
                  Live Report
                </h3>
              </div>

              <p className="mt-2 text-xs text-neutral-400">
                View analytics, users, bookings and platform status.
              </p>
            </div>

            <FaArrowRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="mt-5 text-cyan-400 text-sm font-semibold">
            View Report
          </div>
        </button>
      </div>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={reportData}
      />
    </>
  );
}