"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiZap } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/classes", label: "ALL CLASSES" },
  { href: "/forum", label: "COMMUNITY FORUM" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
navLinks.map((link) => (
    console.log(link.href)
))
  // পরে এখানে auth থেকে user আসবে
  const user = null;

  return (
    <header
      style={{
        background: "rgba(13, 13, 13, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(202, 243, 0, 0.1)",
      }}
      className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            style={{ background: "#caf300", color: "#131313" }}
            className="w-8 h-8 flex items-center justify-center font-black text-sm"
          >
            GV
          </div>
          <span
            className="font-black text-lg tracking-widest uppercase"
            style={{ fontFamily: "Archivo Narrow, sans-serif", color: "#fff" }}
          >
            GYM<span style={{ color: "#caf300" }}>VORTEX</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#8f9378",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#caf300")}
              onMouseLeave={(e) => (e.target.style.color = "#8f9378")}
            >
              {link.label}
            </Link>
          ))}

          {/* Dashboard only for logged in users */}
          {user && (
            <Link
              href="/dashboard"
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#caf300" }}
            >
              DASHBOARD
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full border-2 overflow-hidden"
                style={{ borderColor: "#caf300" }}
              >
                <img
                  src={user.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 border transition-all duration-200"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  borderColor: "#caf300",
                  color: "#caf300",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#caf300";
                  e.currentTarget.style.color = "#131313";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#caf300";
                }}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 border transition-all duration-200"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  borderColor: "rgba(143,147,120,0.3)",
                  color: "#8f9378",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#caf300";
                  e.currentTarget.style.color = "#caf300";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(143,147,120,0.3)";
                  e.currentTarget.style.color = "#8f9378";
                }}
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "#caf300",
                  color: "#131313",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#caf300";
                }}
              >
                JOIN NOW
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 px-4 py-6 flex flex-col gap-5 border-t"
          style={{
            background: "#0e0e0e",
            borderColor: "rgba(202,243,0,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#8f9378" }}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" onClick={() => setIsOpen(false)}
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#caf300", fontFamily: "JetBrains Mono, monospace" }}
            >
              DASHBOARD
            </Link>
          )}
          <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: "rgba(202,243,0,0.1)" }}>
            <Link href="/login" onClick={() => setIsOpen(false)}
              className="text-center text-xs font-bold tracking-widest uppercase py-3 border"
              style={{ borderColor: "rgba(143,147,120,0.3)", color: "#8f9378", fontFamily: "JetBrains Mono, monospace" }}
            >
              LOGIN
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}
              className="text-center text-xs font-bold tracking-widest uppercase py-3"
              style={{ background: "#caf300", color: "#131313", fontFamily: "JetBrains Mono, monospace" }}
            >
              JOIN NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}