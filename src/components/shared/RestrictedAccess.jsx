"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

const RestrictedAccess = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/your-gym-background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#93000a,#93000a_10px,#131313_10px,#131313_20px)]"></div>
        
        <div className="bg-[#131313]/90 border border-[#caf300]/10 p-8 md:p-12 shadow-2xl">
          <div className="flex justify-between items-center mb-6 font-mono text-xs uppercase tracking-wider text-neutral-500">
            <div className="text-red-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              CRITICAL_SYSTEM_ERROR
            </div>
            <div>LOC: 40.7128° N, 74.0060° W</div>
          </div>

          <div className="text-center mb-10">
            <motion.div 
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiAlertTriangle className="text-[64px] text-red-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-red-500 uppercase tracking-widest">
              Action restricted by Admin
            </h2>
            <div className="h-px w-full bg-red-900/50 mt-6"></div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="font-mono text-sm text-lime-400 border-l-2 border-lime-400 pl-4 py-2 bg-lime-900/10">
              SYSTEM PROTOCOL: ACCOUNT RESTRICTED.
            </p>
            <p className="text-lg text-neutral-200 leading-relaxed">
              Your access has been limited to <span className="text-lime-400 font-bold">read-only</span> due to an administrative block. State-change operations (<em>Booking, Applications, Forum Posting</em>) are currently suspended.
            </p>
            
            <div className="font-mono text-xs text-neutral-500/60 space-y-1 mt-8">
              <p>{">"} CHECKING_USER_PERMISSIONS... [FAILED]</p>
              <p>{">"} ADMIN_FLAG_DETECTED: 0x8842-RESTRICT</p>
              <p>{">"} ENFORCING_READ_ONLY_MODE_INITIATED</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button className="flex-1 bg-[#caf300] text-black font-bold py-4 uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2">
              CONTACT COMMAND CENTER <FiArrowRight />
            </button>
            <button className="flex-1 border-2 border-white text-white font-bold py-4 uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              RETURN TO TERMINAL
            </button>
          </div>
        </div>
        
        <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#93000a,#93000a_10px,#131313_10px,#131313_20px)]"></div>
        
        <div className="mt-4 flex justify-between text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            <span>© VORTEX_OPERATIONS // 2024</span>
            <span>STATUS: SEVERELY_THROTTLED</span>
        </div>
      </motion.div>
    </section>
  );
};

export default RestrictedAccess;