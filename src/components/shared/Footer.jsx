import React from "react";
import Link from "next/link";
import { EnvelopeOpen, Handset } from "@gravity-ui/icons";

const NAVIGATION_LINKS = [
  { href: "/dashboard", label: "Dashboard", isActive: true },
  { href: "/classes", label: "All Classes", isActive: false },
  { href: "/forum", label: "Community Forum", isActive: false },
  { href: "/analytics", label: "Analytics", isActive: false },
];

const SUPPORT_LINKS = [
  { href: "/privacy", label: "Privacy Policy", isActive: false },
  { href: "/terms", label: "Terms of Service", isActive: false },
  { href: "/support", label: "Contact Support", isActive: true },
  { href: "/affiliate", label: "Affiliate Program", isActive: false },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-900/60 pt-12 md:pt-20 pb-10 md:pb-12 select-none font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 items-start mb-10 md:mb-20 text-center md:text-left">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-sans font-black text-xl tracking-widest uppercase text-white mb-4 md:mb-6">
              GYM<span className="text-[#caf300]">VORTEX</span>
            </h2>
            {/* Hidden on mobile to reduce lengthy text clutter */}
            <p className="hidden md:block text-neutral-400 text-sm leading-relaxed max-w-[280px] mb-6">
              Industrial athletics engineered for results. Professional
              discipline, high-velocity motion, and raw power.
            </p>

            {/* Quick Action Contact Nodes - Always Visible */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:amirulislambd313@gmail.com"
                title="Send Email"
                className="w-10 h-10 flex items-center justify-center bg-neutral-900/40 border border-neutral-800/80 text-neutral-400 hover:border-[#caf300] hover:text-[#caf300] hover:bg-neutral-900 transition-all duration-200 rounded-sm"
              >
                <EnvelopeOpen className="size-4" />
              </a>
              <a
                href="https://wa.me/8801928570020"
                title="Call Mobile"
                className="w-10 h-10 flex items-center justify-center bg-neutral-900/40 border border-neutral-800/80 text-neutral-400 hover:border-[#caf300] hover:text-[#caf300] hover:bg-neutral-900 transition-all duration-200 rounded-sm"
              >
                <Handset className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column - Hidden on mobile, visible from medium screens (md) */}
          <div className="hidden md:flex flex-col items-start font-mono">
            <h4 className="text-[11px] font-black tracking-[0.25em] text-[#caf300] uppercase mb-6">
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-3.5 font-sans w-full">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 w-fit ${
                    link.isActive
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 opacity-40 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support Column - Hidden on mobile, visible from medium screens (md) */}
          <div className="hidden md:flex flex-col items-start font-mono">
            <h4 className="text-[11px] font-black tracking-[0.25em] text-[#caf300] uppercase mb-6">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-3.5 font-sans w-full">
              {SUPPORT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 w-fit ${
                    link.isActive
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 opacity-40 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* System Status Telemetry Column - Kept visible for tactical vibe */}
          <div className="flex flex-col items-center md:items-start font-mono">
            <h4 className="text-[11px] font-black tracking-[0.25em] text-[#caf300] uppercase mb-4 md:mb-6">
              SYSTEM STATUS
            </h4>
            <div className="bg-[#111111]/40 border border-neutral-900 p-5 w-full max-w-[280px] mx-auto md:mx-0">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#caf300] animate-pulse shadow-[0_0_8px_#caf300]" />
                <span className="text-[10px] font-black tracking-widest text-neutral-200 uppercase">
                  ALL NODES ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium">
                Version 2.4.1 (Alpha Release)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="border-t border-neutral-900/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-5 font-mono text-[10px] font-bold tracking-[0.15em] text-neutral-500 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} GYMVORTEX INDUSTRIAL ATHLETICS. ALL
            RIGHTS RESERVED.
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-neutral-400">
            <span>DESIGNED FOR PERFORMANCE</span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span>
              ENGINEERED BY <span className="text-[#caf300]">GYMVORTEX</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
