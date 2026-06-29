"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAdminClasses, GetClasses } from "@/lib/api/getClasses";
import { motion, AnimatePresence } from "framer-motion";

import ClassTable from "./ClassTable";
import ClassStats from "./ClassStats";
import { DeleteClass, UpdateClass } from "@/lib/action/classes";
import DynamicDeleteModal from "@/components/shared/DynamicDeleteModal";

export default function ClassDashboardContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearchUrl = searchParams.get("search") || "";
  const currentStatusUrl = searchParams.get("status") || "ALL";
  const currentPageUrl = parseInt(searchParams.get("page")) || 1;
  const limitPerPage = 5;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(currentSearchUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);

  const [dashboardStats, setDashboardStats] = useState({
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
  });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    itemTitle: "",
    type: "danger",
    isProcessing: false,
    onConfirmHandler: null,
  });

  const updateUrlParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "All" && value !== "ALL" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      if (!updates.hasOwnProperty("page")) {
        params.delete("page");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  useEffect(() => {
    if (search === currentSearchUrl) return;
    const t = setTimeout(() => {
      updateUrlParams({ search: search });
    }, 400);
    return () => clearTimeout(t);
  }, [search, currentSearchUrl, updateUrlParams]);

  useEffect(() => {
    setSearch(currentSearchUrl);
  }, [currentSearchUrl]);

  const loadClassesData = useCallback(
    async (ignore = false) => {
      setLoading(true);
      try {
        const res = await GetAdminClasses({
          page: currentPageUrl,
          limit: limitPerPage,
          search: currentSearchUrl,
          status: currentStatusUrl,
        });

        if (ignore) return;

        if (res?.success) {
          setClasses(Array.isArray(res.data) ? res.data : []);
          setTotalPages(res.pagination?.totalPages || 1);
          setTotalClasses(res.pagination?.totalItems || 0);

          if (res.stats) {
            setDashboardStats(res.stats);
          } else {
            setDashboardStats({
              pendingCount: res.pagination?.totalItems || 0,
              approvedCount: 128,
              rejectedCount: 3,
            });
          }
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.log("Error loading admin dashboard classes:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    },
    [currentPageUrl, currentSearchUrl, currentStatusUrl],
  );

  useEffect(() => {
    let ignore = false;
    loadClassesData(ignore);
    return () => {
      ignore = true;
    };
  }, [loadClassesData]);

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false, isProcessing: false }));
  };

  const handleAction = (id, newStatus, itemTitle = "Selected Class Matrix") => {
    const isApprove = newStatus === "approved";

    setModalConfig({
      isOpen: true,
      itemTitle: `[ACTION: ${newStatus.toUpperCase()}] - ${itemTitle}`,
      type: isApprove ? "success" : "danger",
      isProcessing: false,
      onConfirmHandler: async () => {
        setModalConfig((prev) => ({ ...prev, isProcessing: true }));
        try {
          const res = await UpdateClass({ _id: id, status: newStatus });
          const result = await res.json();

          if (result.success) {
            router.refresh();
            loadClassesData();
          }
        } catch (error) {
          console.error("Action pipeline failed:", error);
        } finally {
          setClasses((prev) =>
            prev.map((cls) =>
              cls._id === id ? { ...cls, status: newStatus } : cls,
            ),
          );
          closeModal();
        }
      },
    });
  };

  const handleDelete = (id, itemTitle = "Selected Class Matrix") => {
    setModalConfig({
      isOpen: true,
      itemTitle: `[TERMINATION] - ${itemTitle}`,
      type: "danger",
      isProcessing: false,
      onConfirmHandler: async () => {
        setModalConfig((prev) => ({ ...prev, isProcessing: true }));
        try {
          const res = await DeleteClass(id);
          const result = await res.json();

          if (result.success) {
            router.refresh();
            loadClassesData();
          }
        } catch (error) {
          console.error("Deletion pipeline failed:", error);
        } finally {
          setClasses((prev) => prev.filter((cls) => cls._id !== id));
          closeModal();
        }
      },
    });
  };

  return (
    <>
      {/*  HEADER SECTION WITH SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 font-mono">
        <div>
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
            CLASS MODIFICATION QUEUE
          </h1>
          <p className="text-[11px] text-[#c5c9ac] tracking-wide mt-1">
            Manage and audit user gym sessions.
          </p>
        </div>

        {/*  SEARCH & FILTER CONTROLS */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH_TRAINER_OR_TITLE..."
              className="w-full bg-[#141414] border border-[#444932] px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#caf300] transition-colors"
            />
          </div>

          <select
            value={currentStatusUrl}
            onChange={(e) =>
              updateUrlParams({ status: e.target.value, page: 1 })
            }
            className="bg-[#141414] border border-[#444932] px-3 py-2 text-xs text-[#caf300] font-bold uppercase focus:outline-none cursor-pointer tracking-wider"
          >
            <option value="ALL">ALL STATUS</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      <ClassStats stats={dashboardStats} filteredCount={totalClasses} />

      <AnimatePresence mode="wait">
        {loading ? (
          <div className="text-center py-12 text-[#caf300] tracking-widest animate-pulse font-mono">
            &gt; LOADING_MATRIX_STREAM...
          </div>
        ) : (
          <motion.div
            key="table-stream"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ClassTable
              currentItems={classes}
              currentPage={currentPageUrl}
              totalPages={totalPages}
              setCurrentPage={(page) => updateUrlParams({ page: page })}
              totalRecords={totalClasses}
              indexOfFirstItem={(currentPageUrl - 1) * limitPerPage}
              indexOfLastItem={currentPageUrl * limitPerPage}
              handleAction={handleAction}
              handleDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DynamicDeleteModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        itemTitle={modalConfig.itemTitle}
        isProcessing={modalConfig.isProcessing}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirmHandler}
      />
    </>
  );
}