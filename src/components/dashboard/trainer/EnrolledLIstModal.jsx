"use client";

import { Popover, Button } from "@heroui/react";
import Image from "next/image";
import { FiUsers, FiAlertTriangle } from "react-icons/fi";

export default function EnrolledListPopover({
  isOpen,
  onClose,
  selectedClass,
  attendees = [],
  isLoading,
}) {
  return (
    <Popover 
      isOpen={isOpen} 
      onOpenChange={onClose} 
      radius="none"
    >
      <Popover.Content 
        className="!fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 z-[9999] border border-zinc-800 bg-[#0a0a0a] text-zinc-100 rounded-none w-full max-w-md sm:max-w-lg shadow-[0_10px_40px_rgba(0,0,0,0.9)] font-mono p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-zinc-900 flex flex-col gap-1 p-4 bg-[#0d0d0d] relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer text-[10px] font-mono"
          >
            [ X ]
          </button>
          <h3
            className="text-xs tracking-widest uppercase text-[#caf300] font-bold"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Active Class Attendees
          </h3>
          <p
            className="text-[10px] tracking-wider text-zinc-500 uppercase mt-0.5"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Protocol: <span className="text-zinc-300">{selectedClass?.title || "Slot"}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#0a0a0a]">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-8 gap-2">
              <span className="w-6 h-6 border-2 border-t-transparent border-[#caf300] rounded-full animate-spin" />
              <p className="text-[9px] text-zinc-500 tracking-widest uppercase font-mono">
                Syncing Matrix...
              </p>
            </div>
          ) : attendees.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-dashed border-zinc-900 bg-[#0c0c0c]/50 font-mono gap-3">
              <div className="w-10 h-10 rounded-none border border-zinc-800 bg-[#121212] flex items-center justify-center text-zinc-500 animate-pulse">
                <FiAlertTriangle size={18} className="text-[#caf300]" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                  [ Empty Database Link ]
                </p>
                <p className="text-[9px] text-zinc-600 uppercase tracking-wider max-w-[240px]">
                  No active students are currently synchronized with this protocol matrix.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-60 border border-zinc-900 bg-[#0c0c0c]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-900 text-[9px] tracking-widest text-zinc-500 uppercase bg-[#0f0f0f] font-mono">
                    <th className="p-2.5 font-medium">Student</th>
                    <th className="p-2.5 font-medium">Email</th>
                    <th className="p-2.5 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40 text-zinc-300">
                  {attendees.map((student, index) => (
                    <tr key={student._id || index} className="hover:bg-zinc-950/40 transition-colors">
                      <td className="p-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 border border-zinc-800 bg-zinc-900 overflow-hidden flex items-center justify-center relative shrink-0">
                            {student.userImage ? (
                              <Image
                                src={student.userImage}
                                alt={student.userName}
                                fill
                                className="object-cover grayscale"
                                sizes="24px"
                              />
                            ) : (
                              <span className="text-zinc-500 font-bold text-[9px] font-mono">
                                {student.userName?.charAt(0) || "S"}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold tracking-wide text-zinc-200 capitalize text-[11px] font-mono">
                              {student.userName || "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 text-[11px] text-zinc-400 font-mono">
                        {student.userEmail || "N/A"}
                      </td>
                      <td className="p-2.5 text-right">
                        <span className="inline-block bg-green-950/20 border border-emerald-500/50 text-emerald-400 px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase font-mono">
                          ● ENROLLED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-900 p-3 bg-[#0d0d0d] flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <FiUsers size={11} className="text-zinc-600" />
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono">
              {attendees.length} ATTENDEE{attendees.length !== 1 ? "S" : ""}
            </span>
          </div>
          <Button
            radius="none"
            variant="bordered"
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/60 h-7 px-3 uppercase text-[9px] tracking-widest cursor-pointer font-mono"
            onPress={onClose}
          >
            CLOSE
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}