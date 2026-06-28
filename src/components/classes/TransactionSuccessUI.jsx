'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaCheck, FaRegCopy, FaCheckCircle, FaDownload } from 'react-icons/fa'; 
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

export default function TransactionSuccessUI({ securityHash, className, priceAmount, userEmail, createdAt }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [copied, setCopied] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const qrRef = useRef(null);

  const handleGoDashboard = () => {
    if (user?.role === 'trainer') {
      router.push('/dashboard/trainer');
    } else if (user?.role === 'admin') {
      router.push('/dashboard/admin');
    } else {
      router.push('/dashboard/user'); 
    }
  };

  const handleHomePage = () => {
    router.push("/");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(securityHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const downloadQRCode = () => {
    if (typeof window === "undefined") return;
    const svgElement = qrRef.current.querySelector("svg");
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, 300, 300);

      const pngURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngURL;
      downloadLink.download = `Receipt-QR-${className || "Class"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    image.src = blobURL;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.96) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 70);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 mb-20 relative min-h-[calc(100vh-4rem)] select-none bg-[#131313]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#caf300] font-black italic tracking-tighter leading-none mb-3 uppercase">
          TRANSACTION SECURED
        </h1>
        <p className="font-mono text-xs text-[#c6c6c7] tracking-[0.3em] uppercase opacity-80">
          Access Protocol Initialized
        </p>
      </div>

      {/* Bento Grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        {/* Status Card */}
        <div className="md:col-span-1 bg-neutral-900/75 backdrop-blur-xl border border-[#caf300]/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden rounded-xs min-h-[220px]">
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#caf300]/40 animate-[spin_12s_linear_infinite]"></div>
            <div className="w-16 h-16 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center shadow-[0_0_25px_rgba(202,243,0,0.45)] z-10">
              <FaCheckCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="font-mono text-[11px] text-[#caf300] uppercase mb-1 tracking-widest font-bold">
            Status
          </div>
          <div className="font-sans text-xl font-black text-[#e5e2e1] tracking-wide uppercase">
            CONFIRMED
          </div>
        </div>

        {/* Info Card */}
        <div className="md:col-span-2 bg-neutral-900/75 backdrop-blur-xl border border-[#caf300]/20 p-6 relative rounded-xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="font-mono text-[10px] text-[#c6c6c7] uppercase mb-1 tracking-wider opacity-75">
                Enrolled Program
              </div>
              <h2 className="font-sans text-xl md:text-2xl font-extrabold text-[#e5e2e1] tracking-tight uppercase">
                {className}
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#c6c6c7] uppercase mb-1 tracking-wider opacity-75">
                Fee
              </div>
              <div className="font-sans text-xl md:text-2xl font-black text-[#caf300] tracking-tight">
                ${parseFloat(priceAmount || 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-[#444932]/60">
            <div className="flex justify-between items-center text-sm">
              <span className="font-mono text-xs text-[#c6c6c7] uppercase opacity-70">
                Athlete Email
              </span>
              <span className="font-sans font-semibold text-[#e5e2e1]">
                {userEmail}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-mono text-xs text-[#c6c6c7] uppercase opacity-70">
                Initiated
              </span>
              <span className="font-sans font-semibold text-[#e5e2e1]">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Hash Display Area */}
            <div className="pt-1.5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[11px] text-[#c6c6c7] uppercase opacity-70">
                  Security Hash
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[#caf300] hover:text-white transition-colors duration-200 active:scale-95"
                >
                  {copied ? (
                    <FaCheck className="w-3 h-3" />
                  ) : (
                    <FaRegCopy className="w-3 h-3" />
                  )}
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                    {copied ? "Copied" : "Copy ID"}
                  </span>
                </button>
              </div>
              <span
                className="font-mono text-[11px] text-[#c6c6c7] bg-[#1c1b1b] p-2.5 break-all block border border-[#444932]/30 rounded-xs transition-opacity duration-70 select-all"
                style={{ opacity: flicker ? 0.35 : 1 }}
              >
                {securityHash}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="md:col-span-3 bg-neutral-900/75 backdrop-blur-xl border border-[#caf300]/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative rounded-xs">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div
              ref={qrRef}
              className="relative w-48 h-48 bg-white p-4 border-4 border-[#caf300] shadow-[0_0_20px_rgba(202,243,0,0.15)] overflow-hidden flex items-center justify-center rounded-xs"
            >
              <QRCodeSVG
                value={securityHash}
                size={160}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
              />
              <div className="w-full h-[2px] bg-[#caf300] absolute left-0 opacity-80 shadow-[0_0_10px_#caf300] animate-[pulse_1.5s_infinite]" />
            </div>

            <div className="flex w-full gap-2">
              <button
                onClick={downloadQRCode}
                className="flex w-full items-center justify-center gap-2 bg-[#252525] hover:bg-[#caf300] hover:text-[#171e00] text-[#caf300] border border-[#caf300]/30 font-mono text-[11px] py-2 px-3 rounded-xs font-bold transition-all duration-300 uppercase shadow-md hover:shadow-[0_0_15px_rgba(202,243,0,0.3)]"
              >
                <FaDownload className="text-xs" /> Save QR Code
              </button>
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h3 className="font-sans text-lg font-black text-[#e5e2e1] mb-2 uppercase tracking-wide">
              Entry Protocol
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#c6c6c7] mb-6 max-w-sm leading-relaxed opacity-90">
              Scan this digital signature at the facility terminal to bypass
              manual check-in. Your biometric profile is now active for the
              session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoDashboard}
                className="flex-1 bg-[#caf300] text-[#171e00] font-mono text-xs font-black py-4 px-6 transition-all duration-300 active:scale-[0.98] uppercase tracking-widest rounded-xs border border-transparent
                           hover:bg-black hover:text-[#caf300] hover:border-[#caf300] hover:shadow-[0_0_25px_rgba(202,243,0,0.45)]"
              >
                GO TO DASHBOARD
              </button>
              <button
                onClick={handleHomePage}
                className="flex-1 border-2 border-[#e5e2e1]/80 text-[#e5e2e1] font-mono text-xs font-black py-4 px-6 transition-all duration-300 active:scale-[0.98] uppercase tracking-widest rounded-xs
                           hover:bg-[#caf300] hover:border-[#caf300] hover:text-[#171e00] hover:shadow-[0_0_25px_rgba(202,243,0,0.5)]"
              >
                GO TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}