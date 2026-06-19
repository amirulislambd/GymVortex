"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Gear, Plus } from "@gravity-ui/icons";

const NAV_ROUTES = [
  { href: "/dashboard/user", label: "Dashboard" },
  { href: "#", label: "Book Classes" },
  { href: "#", label: "Training" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-neutral-900/80 px-4 md:px-8 py-4 sticky top-0 z-50 select-none">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo and Navigation Routes */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/dashboard" className="block">
            <h1 className="font-sans font-black text-xl md:text-2xl tracking-widest text-[#caf300]">
              GYMVORTEX
            </h1>
          </Link>

          {/* Core Routes - Hidden on small mobile screens for dashboard layout */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] font-bold tracking-widest uppercase">
            {NAV_ROUTES.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`relative py-1.5 transition-colors duration-200 ${
                    isActive ? "text-[#caf300]" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {route.label}
                  {/* Active bottom accent bar from image_6729c7.png */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#caf300] shadow-[0_2px_8px_#caf300]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Telemetry Actions (Notifications, Settings, CTA) */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Notification Node */}
          <button 
            type="button"
            className="text-neutral-400 hover:text-white transition-colors duration-200 p-1 relative group"
          >
            <Bell className="size-4 md:size-[18px]" />
            {/* Live activity indicator ping */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#caf300] ring-1 ring-[#0a0a0a]" />
          </button>

          {/* System Control Settings Node */}
          <button 
            type="button"
            className="text-neutral-400 hover:text-white transition-colors duration-200 p-1"
          >
            <Gear className="size-4 md:size-[18px]" />
          </button>

          {/* Tactical CTA Action Button */}
          <button 
            type="button"
            className="bg-[#caf300] text-[#0a0a0a] font-mono text-[10px] md:text-xs font-black tracking-widest uppercase px-4 md:px-5 py-2 md:py-2.5 flex items-center gap-2 border border-transparent hover:bg-transparent hover:text-[#caf300] hover:border-[#caf300] transition-all duration-300 rounded-none active:scale-95"
          >
            <Plus className="size-3 md:size-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">CREATE WORKOUT</span>
            <span className="sm:hidden">CREATE</span>
          </button>
        </div>

      </div>
    </header>
  );
}