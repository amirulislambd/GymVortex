"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquareBars, 
  Calendar, 
  Heart, 
  Persons, 
  GraduationCap, 
  CircleQuestionDot, // Fixed from HelpCircle
  ArrowRightFromLine // Fixed from XmarkSignal
} from "@gravity-ui/icons";

const SIDEBAR_ROUTES = [
  { href: "/dashboard/user", label: "Dashboard", icon: SquareBars },
  { href: "/dashboard/booked", label: "Booked Classes", icon: Calendar },
  { href: "/dashboard/favorites", label: "Favorite Classes", icon: Heart },
  { href: "/dashboard/community", label: "Community", icon: Persons },
  { href: "/dashboard/apply", label: "Apply as Trainer", icon: GraduationCap },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-[280px] bg-[#0a0a0a] border-r border-neutral-900/80 min-h-[calc(100vh-73px)] flex flex-col justify-between p-4 font-sans select-none">
      
      {/* Top Block: Profile Card and Navigation Links */}
      <div className="flex flex-col gap-6">
        
        {/* User Profile Card (Alex Vane) */}
        <div className="flex items-center gap-3.5 bg-[#111111]/60 border border-neutral-900/40 p-3 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
          <div className="w-11 h-11 bg-neutral-900 border border-[#caf300]/40 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] font-mono font-black text-[#caf300] tracking-tighter">AV</span>
            <div className="absolute top-0 left-0 w-1 h-1 bg-[#caf300]" />
          </div>
          
          <div className="flex flex-col text-left">
            <h3 className="font-sans font-black text-sm text-[#caf300] tracking-wider uppercase leading-tight">
              ALEX VANE
            </h3>
            <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
              Elite Member
            </span>
          </div>
        </div>

        {/* Industrial Sidebar Link Grid */}
        <nav className="flex flex-col gap-1.5 font-sans">
          {SIDEBAR_ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-4 px-4 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-200 border-l-2 ${
                  isActive
                    ? "bg-[#caf300] text-[#0a0a0a] border-[#caf300] font-black shadow-[0_0_15px_rgba(202,243,0,0.15)]"
                    : "text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/40 hover:border-neutral-700"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Block: System Control Utilities */}
      <div className="flex flex-col gap-1 pt-4 border-t border-neutral-900/60 font-sans">
        {/* Support Gateway */}
        <Link
          href="/dashboard/support"
          className="flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <CircleQuestionDot className="size-4 text-neutral-500" />
          <span>Support</span>
        </Link>

        {/* System Termination (Log Out) */}
        <button
          type="button"
          className="flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-[#ff3b30] transition-colors duration-200 text-left w-full"
        >
          <ArrowRightFromLine className="size-4" />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  );
}