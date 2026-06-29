"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaFire,
  FaUsers,
  FaDumbbell,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stats = [
  {
    icon: FaUsers,
    value: "20K+",
    label: "Active Members",
  },
  {
    icon: FaDumbbell,
    value: "150+",
    label: "Expert Trainers",
  },
  {
    icon: FaChartLine,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: FaClock,
    value: "24/7",
    label: "Gym Access",
  },
];

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] py-24 md:py-32">
      <motion.div
        animate={{ opacity: [0.12, 0.2, 0.12] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#caf300] blur-[170px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-16"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#caf300]/30 bg-[#caf300]/10 px-5 py-2"
          >
            <FaFire className="text-[#caf300]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#caf300]">
              LIMITED MEMBERSHIP
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="mt-8 text-4xl font-black uppercase leading-tight text-white md:text-6xl"
          >
            THE TERMINAL IS
            <br />
            <span className="italic text-[#caf300]">OPEN.</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-400 md:text-lg"
          >
            Join <span className="font-semibold text-white">GymVortex</span>{" "}
            and unlock elite coaching, personalized workout plans, progress
            tracking and an unforgettable fitness experience.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/register"
                className="group inline-flex items-center rounded-full bg-[#caf300] px-10 py-5 text-sm font-black uppercase tracking-wider text-black transition-all duration-300 hover:shadow-[0_0_35px_rgba(202,243,0,.35)]"
              >
                Register Now

                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/classes"
                className="rounded-full border border-white/20 px-10 py-5 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 hover:border-[#caf300] hover:text-[#caf300]"
              >
                Explore Classes
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={container}
            className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4"
          >            {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-[#caf300]/40 hover:bg-white/[0.07]"
            >
              <Icon className="mx-auto mb-4 text-3xl text-[#caf300]" />

              <h3 className="text-3xl font-black text-white">
                {value}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-500">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <p className="text-center text-xs uppercase tracking-[0.35em] text-gray-500">
            LIMITED INTAKE • ELITE TRAINING • REAL RESULTS • START TODAY
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
}