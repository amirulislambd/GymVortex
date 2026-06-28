"use client";

import Link from "next/link";
import { EnvelopeOpen, Handset } from "@gravity-ui/icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const NAVIGATION_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/classes", label: "All Classes" },
  { href: "/forum", label: "Community Forum" },
];

const SUPPORT_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Contact Support" },
  { href: "#", label: "Affiliate Program" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* ================= MOBILE ================= */}
        <div className="md:hidden py-10">
          <div className="text-center select-none">
            <Link
              href="/"
              className="text-2xl font-black tracking-widest text-white"
            >
              GYM<span className="text-[#caf300]">VORTEX</span>
            </Link>

            <p className="mt-3 text-neutral-500 text-sm">
              Train. Grow. Dominate.
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <a
                href="mailto:amirulislambd313@gmail.com"
                className="w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <EnvelopeOpen className="size-4" />
              </a>

              <a
                href="https://wa.me/8801928570020"
                className="w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <Handset className="size-4" />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                className="w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                className="w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <div className="border-t border-neutral-900 mt-8 pt-6">
              <p className="text-xs text-neutral-500">
                © {new Date().getFullYear()} GymVortex
              </p>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}

        <div className="hidden md:grid grid-cols-4 gap-10 py-16">
          {/* Brand */}

          <div>
            <h2 className="text-3xl font-black tracking-widest text-white">
              GYM<span className="text-[#caf300]">VORTEX</span>
            </h2>

            <p className="mt-5 text-neutral-400 leading-7">
              Industrial athletics engineered for results. Professional
              discipline, elite performance, and powerful community training.
            </p>

            <div className="flex gap-3 mt-7">
              <a
                href="mailto:amirulislambd313@gmail.com"
                className="w-11 h-11 border border-neutral-800 rounded flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <EnvelopeOpen className="size-4" />
              </a>

              <a
                href="https://wa.me/8801928570020"
                className="w-11 h-11 border border-neutral-800 rounded flex items-center justify-center text-neutral-400 hover:text-[#caf300] hover:border-[#caf300] transition"
              >
                <Handset className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}

          <div>
            <h3 className="uppercase tracking-widest text-[#caf300] text-sm font-bold mb-6">
              Navigation
            </h3>

            <div className="space-y-4">
              {NAVIGATION_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-neutral-400 hover:text-[#caf300] transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}

          <div>
            <h3 className="uppercase tracking-widest text-[#caf300] text-sm font-bold mb-6">
              Support
            </h3>

            <div className="space-y-4">
              {SUPPORT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-neutral-400 hover:text-[#caf300] transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Status */}

          <div>
            <h3 className="uppercase tracking-widest text-[#caf300] text-sm font-bold mb-6">
              System Status
            </h3>

            <div className="border border-neutral-800 bg-[#111] rounded-lg p-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse"></span>

                <span className="text-sm text-white">ALL NODES ACTIVE</span>
              </div>

              <p className="text-neutral-500 mt-3 text-sm">
                Version 2.4.1 (Alpha Release)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="hidden md:flex border-t border-neutral-900 py-6 justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} GymVortex. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <span className="text-neutral-500">Designed for Performance</span>

            <span className="text-[#caf300] font-semibold">
              Engineered by GymVortex
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
