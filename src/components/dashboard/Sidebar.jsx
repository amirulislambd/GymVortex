"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import {
  CircleQuestionDot,
  ArrowRightFromLine,
} from "@gravity-ui/icons";
import { DASHBOARD_ROUTES } from "@/config/dashboardRoutes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Sidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "user";

  const routes = DASHBOARD_ROUTES[role] || DASHBOARD_ROUTES.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh('/login');
  };

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 bg-[#0a0a0a] border-r border-neutral-900/80 sticky top-[73px] h-[calc(100vh-73px)]">
        <SidebarContent
          pathname={pathname}
          onClose={onClose}
          routes={routes}
          role={role}
          user={user}
          isPending={isPending}
          handleSignOut={handleSignOut}
        />
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0a0a0a] border-r border-neutral-900/80 z-40 flex flex-col transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-900/80">
          <h1
            className="font-black text-lg tracking-widest text-[#caf300]"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            GYMVORTEX
          </h1>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <SidebarContent
          pathname={pathname}
          onClose={onClose}
          routes={routes}
          role={role}
          user={user}
          isPending={isPending}
          handleSignOut={handleSignOut}
        />
      </aside>
    </>
  );
}

const ROLE_BADGE = {
  user: { label: "Elite Member", color: "text-neutral-400" },
  trainer: { label: "Certified Trainer", color: "text-[#caf300]" },
  admin: { label: "Administrator", color: "text-orange-400" },
};

function SidebarContent({ pathname, onClose, routes, role, user, isPending, handleSignOut }) {
  const badge = ROLE_BADGE[role] || ROLE_BADGE.user;

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "GV";

  return (
    <div className="flex flex-col justify-between h-full p-4 overflow-y-auto">
      <div className="flex flex-col gap-6">

        {/* User Profile */}
        <div className="flex items-center gap-3.5 bg-[#111111] border border-neutral-900/40 p-3">

          {/* Avatar */}
          <div className="w-11 h-11 shrink-0 bg-neutral-900 border border-[#caf300]/40 flex items-center justify-center relative overflow-hidden">
            {isPending ? (
              <div className="w-full h-full animate-pulse bg-neutral-800" />
            ) : user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-[10px] font-black text-[#caf300]"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {initials}
              </span>
            )}
            {/* corner dot */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-[#caf300]" />
          </div>

          {/* Name + Role */}
          <div className="overflow-hidden">
            {isPending ? (
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-neutral-800 animate-pulse rounded" />
                <div className="h-2 w-16 bg-neutral-800 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <h3
                  className="font-black text-sm text-[#caf300] tracking-wider uppercase truncate"
                  style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                >
                  {user?.name || "GymVortex User"}
                </h3>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${badge.color}`}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {badge.label}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Role Panel Label */}
        <div
          className="px-4  text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-l-2 border-neutral-800"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          // {role} panel
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-200 border-l-2 ${isActive
                  ? "bg-[#caf300] text-[#0a0a0a] border-[#caf300] shadow-[0_0_15px_rgba(202,243,0,0.15)]"
                  : "text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/40 hover:border-neutral-700"
                  }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <Icon className="size-4 shrink-0" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-1 pt-4 border-t border-neutral-900/60">
        <Link
          href="/support"
          className="flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <CircleQuestionDot className="size-4 text-neutral-500" />
          <span>Support</span>
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-red-500 transition-colors text-left w-full"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <ArrowRightFromLine className="size-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}