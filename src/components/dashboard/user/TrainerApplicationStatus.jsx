import { FiCheckCircle, FiClock, FiUser } from "react-icons/fi";

const steps = [
  { label: "Physical Assessment Verified", done: true },
  { label: "Log Analysis In Progress", done: false },
];

export default function TrainerApplicationStatus() {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-4">
      {/* Mobile: compact horizontal */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="relative w-12 h-12 shrink-0 bg-[#1a1a00] border border-[#caf300]/20 flex items-center justify-center">
          <FiUser className="text-[#caf300]" size={20} />
          <span
            className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[8px] font-black uppercase bg-[#caf300] text-[#0a0a0a]"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            IN REVIEW
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            className="text-xs font-black uppercase text-[#caf300] tracking-wider leading-tight"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            MENTORSHIP PROGRAM
          </p>
          <p
            className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            TRAINER APPLICATION
          </p>
        </div>
      </div>

      {/* Desktop: full detail — hidden on mobile */}
      <div className="hidden md:block mt-4">
        <p className="text-sm text-neutral-400 leading-relaxed mb-3">
          Your request to join the{" "}
          <span className="text-[#caf300] font-bold">
            Elite Performance Mentorship
          </span>{" "}
          with Head Coach Sarah is currently being processed. Expect feedback
          within 48 hours.
        </p>

        <div className="border-l-2 border-[#caf300]/40 pl-4 py-1 bg-[#0a0a0a] mb-3">
          <p
            className="text-xs text-neutral-400 italic"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            "Impressive squat volume, Alex. Let's look at your recovery metrics
            next."
          </p>
          <p
            className="text-[10px] text-[#caf300] font-bold mt-1 uppercase tracking-wider"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            — Coach Sarah
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              {step.done ? (
                <FiCheckCircle className="text-[#caf300] shrink-0" size={13} />
              ) : (
                <FiClock className="text-neutral-600 shrink-0" size={13} />
              )}
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  step.done ? "text-[#caf300]" : "text-neutral-600"
                }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}