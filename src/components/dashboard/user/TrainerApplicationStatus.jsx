import { FiCheckCircle, FiClock, FiUser } from "react-icons/fi";

const steps = [
  { label: "Physical Assessment Verified", done: true },
  { label: "Log Analysis In Progress", done: false },
];

export default function TrainerApplicationStatus() {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">

        {/* Left — Icon + Badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-16 bg-[#1a1a00] border-2 border-[#caf300]/30 flex items-center justify-center">
            <FiUser className="text-[#caf300]" size={28} />
            <span
              className="absolute -top-2 -right-2 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#caf300] text-[#0a0a0a]"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              IN REVIEW
            </span>
          </div>
        </div>

        {/* Center — Text */}
        <div className="flex flex-col gap-3">
          <div>
            <h2
              className="text-lg sm:text-xl font-black uppercase text-white leading-tight"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              TRAINER APPLICATION STATUS
            </h2>
            <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
              Your request to join the{" "}
              <span className="text-[#caf300] font-bold">Elite Performance Mentorship</span>{" "}
              with Head Coach Sarah is currently being processed. Expect feedback within 48 hours.
            </p>
          </div>

          {/* Coach Quote */}
          <div className="border-l-2 border-[#caf300]/40 pl-4 py-1 bg-[#0a0a0a]">
            <p
              className="text-xs text-neutral-400 italic"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              "Impressive squat volume, Alex. Let's look at your recovery metrics next."
            </p>
            <p
              className="text-[10px] text-[#caf300] font-bold mt-1 uppercase tracking-wider"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              — Coach Sarah
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2">
            {steps.map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                {step.done ? (
                  <FiCheckCircle className="text-[#caf300] shrink-0" size={14} />
                ) : (
                  <FiClock className="text-neutral-600 shrink-0" size={14} />
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
    </div>
  );
}