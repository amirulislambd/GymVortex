"use client";

import {
  RiCheckboxCircleFill,
  RiBookOpenLine,
  RiGroupLine,
  RiShieldStarLine,
} from "react-icons/ri";

export default function TrainerHeader({ user }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
      {/* Background Glow */}
      <div className="absolute -top-20 right-0 h-60 w-60 rounded-full bg-[#caf300]/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#caf300]/30 bg-[#caf300]/10">
              <RiShieldStarLine className="text-3xl text-[#caf300]" />
            </div>

            <div>
              <h1
                className="text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                <span className="text-[#caf300]">TRAINER</span> CENTER
              </h1>

              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/40">
                TRAINER DASHBOARD
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#caf300]/20 bg-[#caf300]/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#caf300]" />

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#caf300]">
                TRAINING ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
              <RiBookOpenLine className="text-[#caf300]" />

              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                LIVE CLASSES
              </span>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
  {/* Left Side Content */}
  <div className="flex-1">
    <h2
      className="text-2xl font-black uppercase text-white"
      style={{ fontFamily: "Archivo Narrow, sans-serif" }}
    >
      {user?.name}
    </h2>

    <p className="mt-1 text-[11px] font-mono text-white/50">
      {user?.email}
    </p>

    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-[#caf300]/30 bg-[#caf300]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#caf300]">
        TRAINER
      </span>

      {user?.emailVerified && (
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-400">
          VERIFIED
        </span>
      )}

      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/60">
        {user?.plan?.replace("_", " ")}
      </span>
    </div>

    <p className="mt-4 text-[10px] font-mono uppercase tracking-widest text-white/35">
      Joined{" "}
      {new Date(user?.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>
  </div>

  {/* Right Side Image */}
  <div className="relative shrink-0">
    <img
      src={user?.image}
      alt={user?.name}
      className="h-20 w-20 rounded-2xl border-2 border-[#caf300] object-cover"
    />

    <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0d0d0d] bg-[#caf300]">
      <RiCheckboxCircleFill className="text-sm text-black" />
    </div>
  </div>
</div>
      </div>
    </header>
  );
}