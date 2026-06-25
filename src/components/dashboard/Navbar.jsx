"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Gear, Bars } from "@gravity-ui/icons";
import { FiPlus } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const NAV_ROUTES = [
  { href: "/dashboard/user", label: "" },
  { href: "/dashboard/user/booked-classes", label: "" },
  { href: "/dashboard/user/favorites", label: "" },
];

export default function Navbar({ onMenuToggle }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log("user:", user);

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-neutral-900/80 sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left */}
        <div className="flex items-center gap-3 md:gap-10">
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden text-neutral-400 hover:text-white p-1 transition-colors"
          >
            <Bars className="size-5" />
          </button>

          <Link href="/">
            <h1
              className="font-bold md:font-extrabold text-lg md:text-4xl tracking-widest text-[#caf300] "
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              GYMVORTEX
            </h1>
          </Link>

          <nav
            className="hidden md:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {NAV_ROUTES.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`relative py-1.5 transition-colors ${
                    isActive
                      ? "text-[#caf300]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {route.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#caf300]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 md:gap-5">
          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 relative"
          >
            <Bell className="size-4 md:size-[18px]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#caf300]" />
          </button>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1"
          >
            <Gear className="size-4 hidden md:flex md:size-[18px]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 bg-[#caf300] text-[#0a0a0a] text-[10px] md:text-xs font-black tracking-widest uppercase px-3.5 md:px-5 py-2 md:py-2.5 hover:bg-white transition-colors"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <FiPlus className="size-3 md:size-3.5" strokeWidth={3} />
            <span className="hidden sm:inline">CREATE WORKOUT</span>
          </button>
        </div>
      </div>
    </header>
  );
}
