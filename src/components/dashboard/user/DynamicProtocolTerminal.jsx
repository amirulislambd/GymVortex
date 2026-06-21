"use client";

import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaArrowRight, FaRegHourglass } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { FiUploadCloud } from "react-icons/fi";
import { Select, ListBox } from "@heroui/react";
import toast from "react-hot-toast";
import { TrainerApplication } from "@/lib/action/application";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// ─── 🖥️ DYNAMIC PROTOCOL TERMINAL UI (আপনার HTML থিম ডিজাইন) ───
function DynamicProtocolTerminal({ application }) {
  const currentStatus = application?.status || "pending";
  
  // আপনার HTML এর ৩টি স্ট্যাটাস কনফিগারেশন ম্যাট্রিক্স
  const config = {
    pending: {
      title: "PROTOCOL INDUCTION",
      badgeText: "PENDING",
      badgeClass: "bg-[#caf300] text-[#171e00]",
      subText: "Authentication in progress. Secure nodes are processing your submission for Command Center review. Waiting for clearance matrix confirmation.",
      dotColor: "bg-[#caf300] animate-pulse",
      etaLabel: "Buffer ETA",
      etaValue: "47:58:12",
      showBuffer: true
    },
    approved: {
      title: "ACCESS GRANTED",
      badgeText: "APPROVED",
      badgeClass: "bg-emerald-500 text-white",
      subText: "Operational clearance granted. Biometric matching successful. Welcome to the elite ranks of GYMVORTEX leaders.",
      dotColor: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
      etaLabel: "CLEARANCE ID",
      etaValue: `SEC-${application?._id?.slice(-4).toUpperCase() || "9921"}`,
      showBuffer: false
    },
    rejected: {
      title: "PROTOCOL TERMINATED",
      badgeText: "REJECTED",
      badgeClass: "bg-red-600 text-white",
      subText: "Application denied. Security matrix protocols not satisfied or background authentication mismatch detected.",
      dotColor: "bg-red-600",
      etaLabel: "SECURITY CODE",
      etaValue: "ERR-403",
      showBuffer: false
    }
  };

  const currentConfig = config[currentStatus] || config.pending;

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 min-h-[75vh] w-full max-w-2xl mx-auto">
      
      {/* CSS গ্লোবাল অ্যানিমেশন ইনজেকশন */}
      <style dangerouslySetInnerHTML={{__html: `
        .terminal-shell {
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(202, 243, 0, 0.2);
          box-shadow: 0 0 40px rgba(0,0,0,0.8);
        }
        .status-badge {
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline-anim {
          animation: scanline 8s linear infinite;
        }
        .buffer-segment {
          height: 12px;
          width: 10%;
          background: rgba(202, 243, 0, 0.1);
          border: 1px solid rgba(202, 243, 0, 0.05);
        }
        .buffer-segment.active {
          background: #caf300;
          box-shadow: 0 0 10px #caf300;
        }
      `}} />

      {/* Terminal Shell Container */}
      <div className="w-full terminal-shell p-6 md:p-8 relative overflow-hidden flex flex-col gap-6 font-sans">
        
        {/* Scanline Visual Effect */}
        <div className="absolute inset-0 scanline-anim bg-gradient-to-b from-transparent via-[#caf300]/5 to-transparent h-20 w-full pointer-events-none"></div>
        
        {/* Top Header UI Bar */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-[#caf300]"></div>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              ID: APPL-{application?._id?.slice(-6).toUpperCase() || "8829-X"}
            </span>
          </div>
          <div>
            <span className="px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider border border-neutral-800 bg-neutral-900 text-neutral-400">
              STATUS LAYER
            </span>
          </div>
        </div>

        {/* Dynamic Header Content */}
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic" style={{ fontFamily: "Archivo Narrow, sans-serif" }}>
            {currentConfig.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${currentConfig.dotColor}`}></span>
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              Validating biometric and professional clearance...
            </p>
          </div>
        </div>

        {/* Dynamic Layout Content */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#caf300] uppercase font-bold tracking-widest block">
                SYSTEM STATUS
              </span>
              <div className={`status-badge ${currentConfig.badgeClass} px-8 py-2 w-fit`}>
                <span className="text-lg font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Archivo Narrow, sans-serif" }}>
                  {currentConfig.badgeText}
                </span>
              </div>
            </div>
            
            <div className="sm:text-right font-mono">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{currentConfig.etaLabel}</div>
              <div className="text-xl font-bold text-[#caf300] tracking-wide uppercase tabular-nums">
                {currentConfig.etaValue}
              </div>
            </div>
          </div>

          {/* Description Message Box */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#caf300]/40 to-transparent" />
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {currentConfig.subText}
            </p>
          </div>

          {/* Segmented Progress Bar (Only shown for pending state) */}
          {currentConfig.showBuffer && (
            <div className="space-y-2 pt-2">
              <div className="flex gap-1 w-full">
                <div className="buffer-segment active"></div>
                <div className="buffer-segment active"></div>
                <div className="buffer-segment active"></div>
                <div className="buffer-segment active"></div>
                <div className="buffer-segment"></div>
                <div className="buffer-segment"></div>
                <div className="buffer-segment"></div>
                <div className="buffer-segment"></div>
                <div className="buffer-segment"></div>
                <div className="buffer-segment"></div>
              </div>
              <div className="flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                <span>Core Nodes [04/10]</span>
                <span>Buffer Cascade: Active</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}