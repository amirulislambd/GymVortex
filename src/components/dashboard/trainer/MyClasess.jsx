"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ServerDelete } from "@/lib/core/serverMutation";
import { FiUsers, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import DynamicDeleteModal from "../../shared/DynamicDeleteModal";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MyClasses({ initialClasses = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({ id: "", title: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Live search handler utilizing URL query parameters
  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const triggerDeleteModal = (id, title) => {
    setSelectedItem({ id, title });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem({ id: "", title: "" });
  };

  const handleFinalDelete = async () => {
    if (!selectedItem.id) {
      toast.error("CRITICAL: VALID TARGET PROTOCOL ID REQUIRED");
      return;
    }

    const toastId = toast.loading("PROCESSING DELETION PROTOCOL...");

    try {
      setIsDeleting(true);

      const data = await ServerDelete(`trainer/class/${selectedItem.id}`);

      if (data?.success) {
        toast.success("PROTOCOL TERMINATED SUCCESSFULLY", { id: toastId });
        handleCloseModal();

        router.replace(pathname + "?" + searchParams.toString());
        router.refresh();
      } else {
        toast.error(data?.message || "TERMINATION REFUSED BY SERVER", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast.error("INFRASTRUCTURE ERROR: UNABLE TO REACH API", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleUpdateRedirect = (classId) => {
    router.replace(`/dashboard/trainer/my-classes/${classId}`);
  };

  const handleViewAttendees = (classId) => {
    alert(`Syncing attendee matrix for protocol ID: ${classId}`);
  };

  return (
    <div className="w-full space-y-6 text-zinc-100">
      {/* ─── HEADER & SEARCH BAR SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-zinc-900 bg-[#0a0a0a] p-4 font-mono">
        <div>
          <h1 className="text-xs tracking-widest uppercase text-zinc-400">
            Active Training Roster (Database Synced)
          </h1>
        </div>

        {/* Real-time API search filter input */}
        <div className="relative flex items-center max-w-md w-full">
          <FiSearch className="absolute left-3 text-zinc-500 text-sm" />
          <input
            type="text"
            placeholder="SEARCH CLASSES..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 py-2 pl-9 pr-4 text-xs tracking-wider text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-mono uppercase"
          />
        </div>
      </div>

      {/* ─── DATA RENDERING CONDITIONS ─── */}
      {initialClasses.length === 0 ? (
        <div className="border border-dashed border-zinc-900 py-16 text-center font-mono text-xs tracking-widest text-zinc-600">
          [ NO ACTIVE TRAINING PROTOCOLS FOUND IN CORE DATABASE ]
        </div>
      ) : (
        <>
          {/* ─── DESKTOP VIEW: TABLE LAYOUT ─── */}
          <div className="hidden md:block w-full border border-zinc-900 bg-[#0a0a0a] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  <th className="p-4 font-medium">Class Name & Focus</th>
                  <th className="p-4 font-medium">Schedule</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 font-sans text-sm">
                {initialClasses.map((item) => {
                  const currentBookings = item.bookingCount || 0;
                  const maxCapacity = item.capacity || 10;
                  const percentFilled = Math.min(
                    (currentBookings / maxCapacity) * 100,
                    100,
                  );

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-zinc-950/40 transition-colors"
                    >
                      {/* Class Metadata and Cover Art */}
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                          }
                          alt={item.title}
                          className="w-10 h-10 object-cover border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <div>
                          <div className="font-mono font-bold tracking-wide uppercase text-zinc-200">
                            {item.title}
                          </div>
                          <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">
                            Specialty: {item.category || "General"}
                          </div>
                        </div>
                      </td>

                      {/* Class Slots Scheduling */}
                      <td className="p-4 font-mono text-xs text-zinc-400">
                        <div className="uppercase tracking-wide">
                          {Array.isArray(item.slots)
                            ? item.slots.join(", ")
                            : "Flexible Slots"}
                        </div>
                        <div className="text-[10px] text-zinc-600 mt-0.5">
                          {item.duration || "60 Min Sessions"}
                        </div>
                      </td>

                      {/* Capacity Matrix & Visual Progress Bar */}
                      <td className="p-4 w-48">
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-zinc-300 font-bold">
                            {currentBookings}/{maxCapacity}
                          </span>
                          <div className="w-24 bg-zinc-900 h-1.5 rounded-none overflow-hidden relative border border-zinc-800">
                            <div
                              className="bg-[#caf300] h-full transition-all duration-500 shadow-[0_0_8px_#caf300]"
                              style={{ width: `${percentFilled}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-xs">
                        {item.status === "approved" && (
                          <span className="inline-flex items-center bg-green-950/20 border border-emerald-500 text-emerald-400 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            ● APPROVED
                          </span>
                        )}

                        {item.status === "pending" && (
                          <span className="inline-flex items-center bg-amber-950/20 border border-amber-500 text-amber-400 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(245,158,11,0.1)] animate-pulse">
                            ○ PENDING
                          </span>
                        )}

                        {item.status === "rejected" && (
                          <span className="inline-flex items-center bg-red-950/20 border border-red-600 text-red-500 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                            ✕ REJECTED
                          </span>
                        )}

                        {!item.status && (
                          <span className="inline-flex items-center bg-zinc-900 border border-zinc-700 text-zinc-500 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                            UNKNOWN
                          </span>
                        )}
                      </td>
                      {/* Tactical Colorful Action Triggers */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 font-mono text-[9px] font-bold">
                          <button
                            onClick={() => handleViewAttendees(item._id)}
                            className="bg-transparent border border-[#caf300] text-[#caf300] hover:bg-[#caf300] hover:text-black px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200"
                          >
                            <FiUsers className="text-[11px]" /> ATTENDEES
                          </button>

                          <button
                            onClick={() => handleUpdateRedirect(item._id)}
                            className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200"
                          >
                            <FiEdit2 className="text-[11px]" /> UPDATE
                          </button>

                          <button
                            onClick={() =>
                              triggerDeleteModal(item._id, item.title)
                            }
                            className="bg-transparent border border-red-900/60 text-red-500 hover:bg-red-500 hover:text-white px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200"
                          >
                            <FiTrash2 className="text-[11px]" /> DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* ─── MOBILE VIEW: COMPACT CARD LAYOUT ─── */}
          <div className="block md:hidden space-y-4">
            {initialClasses.map((item) => {
              const currentBookings = item.bookingCount || 0;
              const maxCapacity = item.capacity || 10;
              const percentFilled = Math.min(
                (currentBookings / maxCapacity) * 100,
                100,
              );

              return (
                <div
                  key={item._id}
                  className="border border-zinc-900 bg-[#0a0a0a] p-4 space-y-3"
                >
                  <div className="flx justify-baseline">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover border border-zinc-800 grayscale"
                      />
                      <div>
                        <h3 className="font-mono font-bold tracking-wide uppercase text-zinc-200 text-xs">
                          {item.title}
                        </h3>
                        <p className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                          {item.category || "General"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>VERIFICATION:</span>
                      <span
                        className={`font-bold tracking-widest uppercase text-[9px] ${
                          item.status === "approved"
                            ? "text-emerald-400"
                            : item.status === "pending"
                              ? "text-amber-400 animate-pulse"
                              : "text-red-500"
                        }`}
                      >
                        {item.status || "UNKNOWN"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b border-zinc-900 py-2 space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between text-zinc-400">
                      <span>SCHEDULE:</span>
                      <span className="text-zinc-200 text-right uppercase">
                        {Array.isArray(item.slots)
                          ? item.slots.join(", ")
                          : "Flexible"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>SLOTS:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-200 font-bold">
                          {currentBookings}/{maxCapacity}
                        </span>
                        <div className="w-16 bg-zinc-900 h-1 relative border border-zinc-800">
                          <div
                            className="bg-[#caf300] h-full shadow-[0_0_6px_#caf300]"
                            style={{ width: `${percentFilled}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Compact Grid Button Menu */}
                  <div className="grid grid-cols-3 gap-2 font-mono text-[9px] font-bold pt-1">
                    <button
                      onClick={() => handleViewAttendees(item._id)}
                      className="bg-transparent border border-[#caf300] text-[#caf300] hover:bg-[#caf300] hover:text-black py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                    >
                      <FiUsers className="text-[11px]" /> ATTEND
                    </button>

                    <button
                      onClick={() => handleUpdateRedirect(item._id)}
                      className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                    >
                      <FiEdit2 className="text-[11px]" /> EDIT
                    </button>

                    <button
                      onClick={() => triggerDeleteModal(item._id, item.title)}
                      className="bg-transparent border border-red-900/60 text-red-500 hover:bg-red-500 hover:text-white py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                    >
                      <FiTrash2 className="text-[11px]" /> DEL
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ─── CENTRALIZED DISCLOSURE DYNAMIC GLOBAL DELETE MODAL ─── */}
      <DynamicDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        itemTitle={selectedItem.title}
        isDeleting={isDeleting}
        onConfirm={handleFinalDelete}
      />
    </div>
  );
}
