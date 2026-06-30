/**
 * VortexSpinnerServer — Server Component Safe Loading UI
 *
 * এটা app/loading.jsx এবং যেকোনো জায়গায় ব্যবহার করা যাবে।
 * "use client" নেই, তাই server component-এ ও import করা যাবে।
 * Animation CSS-এ করা হয়েছে।
 */

export default function VortexSpinnerServer() {
  return (
    <div className="fixed inset-0 bg-[#131313] text-[#e5e2e1] z-50 flex flex-col items-center justify-center font-mono select-none overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #caf300 1px, transparent 1px),
            linear-gradient(to bottom, #caf300 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Deep Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_100%)] pointer-events-none" />

      {/* Scanning Sweep Line */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#caf300]/10 to-transparent pointer-events-none vortex-sweep" />

      {/* Top-Left Metadata */}
      <div className="absolute top-12 left-12 hidden md:block border-l-2 border-[#caf300]/20 pl-4">
        <p className="text-[10px] text-[#caf300]/40 uppercase tracking-widest">
          SYSTEM: FORGEFIT_CORE_V4
        </p>
        <p className="text-[10px] text-[#e5e2e1]/20 uppercase tracking-widest">
          KERNEL: VX-800-ALPHA
        </p>
      </div>

      {/* Bottom-Right Metadata */}
      <div className="absolute bottom-12 right-12 hidden md:block border-r-2 border-[#caf300]/20 pr-4 text-right">
        <p className="text-[10px] text-[#caf300]/40 uppercase tracking-widest">
          ENCRYPTION: ACTIVE
        </p>
        <p className="text-[10px] text-[#e5e2e1]/20 uppercase tracking-widest">
          PROTOCOL: VX-800
        </p>
      </div>

      {/* Circular HUD Spinner */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border border-[#caf300]/20 rounded-full vortex-spin-cw">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#caf300] rounded-full shadow-[0_0_12px_#caf300]" />
        </div>

        {/* Inner dashed ring */}
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-[#caf300]/10 rounded-full vortex-spin-ccw" />

        {/* Glassmorphic core */}
        <div className="absolute inset-8 sm:inset-10 bg-[#201f1f]/40 backdrop-blur-md border border-[#caf300]/5 rounded-full shadow-[inset_0_0_25px_rgba(202,243,0,0.03)]" />

        {/* Central Logo V */}
        <div className="relative z-10 vortex-pulse">
          <svg
            className="drop-shadow-[0_0_15px_#caf300]"
            fill="none"
            height="64"
            viewBox="0 0 64 64"
            width="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20L32 52L52 20"
              stroke="#caf300"
              strokeWidth="5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M22 20L32 36L42 20"
              stroke="#caf300"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-10 md:mt-12 text-center space-y-3 px-4 max-w-sm">
        <h1 className="text-[10px] sm:text-xs text-[#caf300] tracking-[0.5em] sm:tracking-[0.6em] font-bold uppercase">
          INITIALIZING VORTEX TERMINAL
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <p className="text-[10px] sm:text-[11px] text-[#c5c9ac]/40 tracking-widest lowercase font-medium">
            loading.vortex.dashboard
          </p>
          <div className="w-1.5 h-3 bg-[#caf300]/50 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Bottom Credentials */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-[#c5c9ac]">
          VERIFYING CREDENTIALS
        </p>
        <span className="material-symbols-outlined text-[#caf300] text-[14px] mt-1 animate-bounce">
          expand_more
        </span>
      </div>
    </div>
  );
}
