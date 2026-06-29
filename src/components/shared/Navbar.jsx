"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bars,
  Xmark,
  House,
  BookOpen,
  Comments,
  LayoutCells,
  ArrowRightFromLine,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiSun, FiMoon } from "react-icons/fi";

// HeroUI Elements
import { Drawer } from "@heroui/react";

const NAV_LINKS = [
  { href: "/", label: "HOME", icon: House },
  { href: "/classes", label: "ALL CLASSES", icon: BookOpen },
  { href: "/forum", label: "COMMUNITY FORUM", icon: Comments },
];

// Fallback handles both your custom roles and potential database mappings safely
const DASHBOARD_LINKS = {
  seeker: "/dashboard/user",
  user: "/dashboard/user",
  recruiter: "/dashboard/trainer",
  trainer: "/dashboard/trainer",
  admin: "/dashboard/admin",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Better-Auth Session handling
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Safe check with fallback to prevent 'undefined' href error
  const dashboardHref = user?.role
    ? DASHBOARD_LINKS[user.role] || "/dashboard"
    : "/dashboard";

  const NAV_ITEMS = user?.email
    ? [
        ...NAV_LINKS,
        {
          href: dashboardHref,
          label: "DASHBOARD",
          icon: LayoutCells,
        },
      ]
    : NAV_LINKS;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/login");
            setIsOpen(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center bg-[#0d0d0d]/85 backdrop-blur-md border-b border-[#caf300]/10 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Left Side: Hamburger Menu & Logo Container */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu */}
          {!isOpen && (
            <button
              className="md:hidden text-white hover:text-[#caf300] transition-colors focus:outline-none z-50"
              onClick={() => setIsOpen(true)}
            >
              <Bars className="size-6" />
            </button>
          )}

          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center group">
            <div className="hidden sm:flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={38}
                height={38}
                priority
                className="w-auto h-auto"
              />
            </div>
            <span className="font-black text-base md:text-lg tracking-widest uppercase text-white font-sans">
              GYM<span className="text-[#caf300]">VORTEX</span>
            </span>
          </Link>
        </div>

        {/* Desktop & Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono h-full">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href || `nav-item-${index}`}
                href={item.href || "#"}
                className={`relative text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 py-5 ${
                  isActive
                    ? "text-[#caf300]"
                    : "text-[#8f9378] hover:text-[#caf300]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#caf300] shadow-[0_0_10px_#caf300]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Responsive Authentication Action Buttons */}
        <div className="flex items-center gap-3 font-mono">
          {isPending ? (
            <div className="text-xs text-[#8f9378] animate-pulse">
              LOADING...
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1a1a1a]/40 border border-neutral-800/60 p-1 md:pl-2 md:pr-3 md:py-1 rounded-full">
                <div className="w-8 h-8 rounded-full border-2 border-[#caf300] overflow-hidden">
                  <Image
                    width={32}
                    height={32}
                    src={user.image || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:block text-xs font-bold tracking-widest uppercase px-4 py-2 border-2 border-[#caf300] text-[#caf300] bg-transparent hover:bg-[#caf300] hover:text-[#131313] transition-all duration-200 rounded-md"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[11px] md:text-xs font-bold tracking-widest uppercase px-4 py-2 md:px-5 md:py-2.5 border-2 border-[#8f9378]/30 text-white md:text-[#8f9378] hover:border-[#caf300] hover:text-[#caf300] transition-all duration-200 bg-neutral-900/40 md:bg-transparent rounded-md"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="hidden md:block text-xs font-bold tracking-widest uppercase px-5 py-2.5 bg-[#caf300] text-[#131313] hover:bg-white transition-all duration-200 rounded-md"
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ================= HEROUI COMPOUND DRAWER SYSTEM ================= */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable={true}
        classNames={{
          base: "bg-[#0e0e0e] text-white",
          wrapper: "z-[150]",
        }}
      >
        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="bg-[#0e0e0e] text-white max-w-[290px] border-r border-[#caf300]/10 p-0 shadow-[2px_0_20px_rgba(0,0,0,0.8)]"
          >
            <Drawer.Dialog className="outline-none h-full flex flex-col justify-between m-0 bg-[#0e0e0e] text-white">
              <div className="bg-[#0e0e0e]">
                <div className="flex items-center justify-between border-b border-neutral-900/80 px-4 py-4 h-16 bg-[#0d0d0d]">
                  <button
                    className="text-[#caf300] hover:text-white transition-colors focus:outline-none"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <Xmark className="size-6" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 pr-2">
                  <Image
                    width={32}
                    height={32}
                    src={user?.image || "/default-avatar.png"}
                    alt="GymVortex Logo"
                    className="w-8 h-8 border-2 border-[#caf300] rounded-full"
                  />
                  <span className="font-black text-xs tracking-wider uppercase text-white">
                    {user?.name}
                  </span>
                </div>
                <Drawer.Body className="p-0 scrollbar-none overflow-y-auto bg-[#0e0e0e]">
                  <div className="flex flex-col gap-1.5 px-3 py-6 bg-[#0e0e0e]">
                    {NAV_ITEMS.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href || `drawer-item-${index}`}
                          href={item.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3.5 text-xs font-bold tracking-widest uppercase px-4 py-3.5 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-[#caf300]/10 text-[#caf300] border-l-4 border-[#caf300] pl-3 shadow-[inset_0_0_12px_rgba(202,243,0,0.05)]"
                              : "text-[#8f9378] hover:bg-neutral-900/60 hover:text-[#caf300]"
                          }`}
                        >
                          <item.icon
                            className={`size-4 ${isActive ? "text-[#caf300]" : "text-[#8f9378]"}`}
                          />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </Drawer.Body>
              </div>

              <div className="p-4 border-t border-neutral-900/80 bg-[#111111]/30 mb-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase py-3.5 border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-lg shadow-sm"
                  >
                    <ArrowRightFromLine className="size-4" />
                    LOGOUT
                  </button>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center text-xs font-bold tracking-widest uppercase px-4 py-3 border border border-[#8f9378]/20 text-[#8f9378] rounded-lg hover:border-[#caf300] hover:text-[#caf300] transition-colors bg-transparent"
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="text-center text-xs font-bold tracking-widest uppercase px-4 py-3 bg-[#caf300] text-[#131313] rounded-lg hover:bg-white font-black transition-colors"
                    >
                      JOIN NOW
                    </Link>
                  </div>
                )}
              </div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
