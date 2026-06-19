"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";





export default function DashboardShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  console.log("mobileOpen:", mobileOpen); // debug করো

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">

      <Navbar onMenuToggle={() => setMobileOpen((prev) => !prev)} />

      <div className="w-full max-w-[1440px] mx-auto flex flex-1 relative">

        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <main className="flex-1 bg-[#0d0d0d] p-6 min-h-screen">
          {children}
        </main>

      </div>
    </div>
  );
}