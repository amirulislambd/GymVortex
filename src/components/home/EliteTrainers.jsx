"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TRAINER_FEATURES = [
  "BIOMETRIC PERFORMANCE TRACKING",
  "INDUSTRIAL STRENGTH PROGRAMMING",
  "NUTRITIONAL VELOCITY MANAGEMENT",
];

export default function EliteTrainers() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0d0d0d] border-t border-neutral-900/40">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #caf300 0px, #caf300 10px, transparent 10px, transparent 20px)",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* ===================== TEXT SECTION ===================== */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2 text-left lg:pl-6"
        >
          <span className="block font-mono text-[11px] md:text-xs font-bold text-[#caf300] uppercase mb-4 tracking-[0.3em]">
            TRAIN WITH THE ELITE
          </span>

          <h2 className="font-sans text-2xl md:text-4xl lg:text-[42px] font-black uppercase italic mb-6 leading-tight tracking-tight text-white">
            PRECISION COACHING BY{" "}
            <span className="text-[#caf300] block sm:inline drop-shadow-[0_0_15px_rgba(202,243,0,0.15)]">
              INDUSTRY ARCHITECTS
            </span>
          </h2>

          <p className="text-neutral-400 font-sans text-sm md:text-base mb-8 leading-relaxed max-w-[560px]">
            Access the same methodology used by tactical units and professional
            competitors. Every program is built on verifiable biomechanical
            principles, ensuring you forge a body that is as resilient as it is
            powerful.
          </p>

          {/* Features */}
          <ul className="space-y-4 mb-10 font-mono">
            {TRAINER_FEATURES.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                }}
                className="flex items-center gap-3.5 group"
              >
                <span className="w-1.5 h-1.5 bg-[#caf300] rounded-full shadow-[0_0_8px_#caf300]" />

                <span className="text-xs md:text-[13px] font-bold tracking-widest text-neutral-200 group-hover:text-[#caf300] transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(202,243,0,.3)",
            }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#caf300] text-[#0d0d0d] px-10 py-4 font-mono text-xs md:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            MEET THE SQUAD
          </motion.button>
        </motion.div>

        {/* ===================== IMAGE SECTION ===================== */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-2 lg:order-1 w-full max-w-[480px] mx-auto lg:mx-0"
        >
          <div className="relative bg-[#121212] p-2.5 border border-neutral-900/60 shadow-[0_0_30px_rgba(0,0,0,.5)] group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLNxOT4M2W0ShHK4HGNN8wYlFLiLnJt3HcnQduSiL_9oA5MvDlrOihGDcfI3VarpgSmk0NG4XhFOM1vaOCmmYXvyifRZH2pLRf8ySBFMYbyMfReYqYH8NgZ6ZbA1rwMS58K2phA-hreH20VnxOfk6v59Gu-lDC4uh1y1Mw63AmG2X5TchLaS5OF6kxKSZxVpEwzrSe_5VqrPjq-2htUNgDTma2_IpMmy92teStMN0lz4wE0mB0ezeVWIpClQAdJUGkDoFkusrrt8w"
              alt="Elite Trainers"
              width={480}
              height={600}
              priority
              className="w-full aspect-[4/5] object-cover brightness-[0.65] contrast-110 transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="absolute bottom-4 -right-2 md:bottom-6 md:-right-16 lg:-right-24 w-[220px] md:w-64 p-5 bg-[#0e0e0e]/95 backdrop-blur-md border border-[#caf300]/40 shadow-[5px_5px_25px_rgba(0,0,0,.8)]"
            >
              <p className="font-mono text-[10px] md:text-xs font-black tracking-[0.2em] text-[#caf300] uppercase italic">
                // SYSTEM OVERRIDE
              </p>

              <p className="text-neutral-300 text-xs md:text-[13px] leading-relaxed mt-2">
                Our trainers aren't coaches; they are structural engineers for
                your biology.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
