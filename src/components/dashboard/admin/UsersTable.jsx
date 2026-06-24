"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  UpdateUserBlockStatus,
  UpdateUserRoleToAdmin,
} from "@/lib/action/userManagement";
import DynamicDeleteModal from "@/components/shared/DynamicDeleteModal";

const listAnimation = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 30 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

export default function UsersTable({ users, currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // মডাল কন্ট্রোল করার জন্য স্টেটস
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    itemTitle: "",
    isProcessing: false,
    type: "", // "block", "unblock", "admin"
    userId: "",
    userName: "",
    currentBannedStatus: false,
  });

  const currentSearch = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  const handlePageChange = (targetPage) => {
    router.push(
      `/dashboard/admin/manage-users?search=${currentSearch}&page=${targetPage}`,
    );
  };

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const openBlockModal = (userId, userName, currentBannedStatus) => {
    const actionText = currentBannedStatus ? "UNBLOCK" : "BLOCK";
    setModalConfig({
      isOpen: true,
      type: currentBannedStatus ? "unblock" : "block",
      itemTitle: `PROTOCOL: ${actionText} USER [${userName.toUpperCase()}]`,
      userId,
      userName,
      currentBannedStatus,
      isProcessing: false,
    });
  };

  const openAdminModal = (userId, userName) => {
    setModalConfig({
      isOpen: true,
      type: "admin",
      itemTitle: `PROTOCOL: PROMOTE [${userName.toUpperCase()}] TO ADMIN MATRIX`,
      userId,
      userName,
      currentBannedStatus: false,
      isProcessing: false,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirmAction = async () => {
    setModalConfig((prev) => ({ ...prev, isProcessing: true }));
    const { type, userId, userName, currentBannedStatus } = modalConfig;

    try {
      if (type === "block" || type === "unblock") {
        const res = await UpdateUserBlockStatus(userId, !currentBannedStatus);
        if (res?.success) {
          router.refresh();
        } else {
          alert(res?.message || "Operation failed.");
        }
      } else if (type === "admin") {
        const res = await UpdateUserRoleToAdmin(userId);
        if (res?.success) {
          router.refresh();
        } else {
          alert(res?.message || "Operation failed.");
        }
      }
    } catch (error) {
      console.error("Matrix Operation Error:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-4 mt-6">
      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900 text-sm">
            <AnimatePresence mode="popLayout">
              {users?.map((user) => (
                <motion.tr
                  variants={listAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={user._id}
                  className={`hover:bg-zinc-900/40 transition-colors ${user.banned ? "bg-zinc-900/20" : ""}`}
                >
                  <td className="py-4 px-4">
                    <div className="h-9 w-9 relative rounded-xs overflow-hidden border border-zinc-800 bg-zinc-900">
                      <img
                        src={
                          user.image || "https://i.ibb.co/Dgk5gHTF/images.jpg"
                        }
                        alt={user.name}
                        className={`h-full w-full object-cover ${user.banned ? "grayscale opacity-40" : ""}`}
                      />
                    </div>
                  </td>
                  <td
                    className={`py-4 px-4 font-medium ${user.banned ? "text-zinc-600 line-through" : "text-zinc-200"}`}
                  >
                    {user.name}
                  </td>
                  <td
                    className={`py-4 px-4 ${user.banned ? "text-zinc-600" : "text-zinc-400"}`}
                  >
                    {user.email}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-xs uppercase tracking-wide ${
                        user.role === "admin"
                          ? "bg-red-950 text-red-400 border border-red-900"
                          : user.role === "trainer"
                            ? "bg-lime-950 text-lime-400 border border-lime-800"
                            : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-xs uppercase tracking-wider">
                    {user.banned ? (
                      <span className="text-rose-500 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>{" "}
                        Blocked
                      </span>
                    ) : (
                      <span className="text-lime-500 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse"></span>{" "}
                        Active
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    {user.role === "user" && !user.banned && (
                      <button
                        onClick={() => openAdminModal(user._id, user.name)}
                        className="border border-lime-500/30 hover:border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-xs transition-all cursor-pointer"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() =>
                        openBlockModal(user._id, user.name, user.banned)
                      }
                      className={`font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-xs border transition-all cursor-pointer ${
                        user.banned
                          ? "bg-lime-500 border-lime-500 text-black hover:bg-lime-600"
                          : "border-rose-900 text-rose-400 hover:bg-rose-950 hover:border-rose-500"
                      }`}
                    >
                      {user.banned ? "Unblock" : "Block"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="block md:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {users?.map((user) => (
            <motion.div
              variants={listAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={user._id}
              className={`p-4 rounded-sm border bg-zinc-950/60 transition-all flex flex-col gap-4 ${
                user.banned
                  ? "border-rose-950/40 bg-rose-950/5"
                  : "border-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 relative rounded-xs overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                  <img
                    src={user.image || "https://i.ibb.co/Dgk5gHTF/images.jpg"}
                    alt={user.name}
                    className={`h-full w-full object-cover ${user.banned ? "grayscale opacity-40" : ""}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-sm font-bold truncate ${user.banned ? "text-zinc-600 line-through" : "text-zinc-200"}`}
                  >
                    {user.name}
                  </h4>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-900 pt-3 gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-xs uppercase tracking-wide border ${
                      user.role === "admin"
                        ? "bg-red-950 text-red-400 border-red-900"
                        : user.role === "trainer"
                          ? "bg-lime-950 text-lime-400 border-lime-800"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800"
                    }`}
                  >
                    {user.role}
                  </span>
                  {user.banned ? (
                    <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-rose-500 animate-pulse"></span>{" "}
                      Blocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-lime-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-lime-500 animate-pulse"></span>{" "}
                      Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {user.role === "user" && !user.banned && (
                    <button
                      onClick={() => openAdminModal(user._id, user.name)}
                      className="flex-1 sm:flex-initial text-center border border-lime-500/30 text-lime-400 font-extrabold text-[10px] uppercase tracking-wider px-3 py-2 rounded-xs transition-all cursor-pointer hover:bg-lime-500/10"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() =>
                      openBlockModal(user._id, user.name, user.banned)
                    }
                    className={`flex-1 sm:flex-initial text-center font-extrabold text-[10px] uppercase tracking-wider px-3 py-2 rounded-xs border transition-all cursor-pointer ${
                      user.banned
                        ? "bg-lime-500 border-lime-500 text-black hover:bg-lime-600"
                        : "border-rose-900 text-rose-400 hover:bg-rose-950/40"
                    }`}
                  >
                    {user.banned ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 mt-4 pt-4 gap-3 text-xs text-zinc-500">
        <div>
          Showing{" "}
          <span className="text-zinc-300">
            {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, totalPages * 10)}
          </span>{" "}
          of <span className="text-zinc-300">{totalPages * 10}</span> Athletes
        </div>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-800 cursor-pointer flex items-center justify-center"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 rounded-sm font-bold border transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-zinc-900 border-lime-500 text-lime-400"
                  : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-800 cursor-pointer flex items-center justify-center"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 🖥️ DYNAMIC PROTOCOL MODAL INTEGRATION */}
      <DynamicDeleteModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        itemTitle={modalConfig.itemTitle}
        isProcessing={modalConfig.isProcessing}
        type={modalConfig.type}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}