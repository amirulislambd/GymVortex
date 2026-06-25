"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClassCard from "./ClassCard";
import { GetClasses } from "@/lib/api/getClasses";
import VortexSpinner from "@/app/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, ListBox } from "@heroui/react";

export default function AllClasses() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //  Active parameter synchronizers from URL query params
  const currentSearchUrl = searchParams.get("search") || "";
  const currentStatusUrl = searchParams.get("status") || "ALL";
  const currentCategoryUrl = searchParams.get("category") || "";
  const currentPageUrl = parseInt(searchParams.get("page")) || 1;
  const currentDifficultyUrl = searchParams.get("difficulty") || "All";
  const currentSortPriceUrl = searchParams.get("sortPrice") || "All";

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search local tracking input box state
  const [search, setSearch] = useState(currentSearchUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);

  const categories = [
    "All",
    "Powerlifting",
    "Metabolic Conditioning",
    "Industrial Yoga",
    "Mobility Repair",
  ];
  const limitPerPage = 12;

  // Evaluates if any explicit filtering matrix state is active
  const isFilterActive =
    currentSearchUrl !== "" ||
    (currentStatusUrl !== "ALL" && currentStatusUrl !== "") ||
    (currentCategoryUrl !== "" && currentCategoryUrl !== "All") ||
    currentDifficultyUrl !== "All" ||
    currentSortPriceUrl !== "All";

  // Core synchronization route engine mapping
  const updateUrlParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "All" && value !== "") {
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

  // Clear system parameters handler
  const handleResetFilters = () => {
    setSearch("");
    router.push("?", { scroll: false });
  };

  // Search optimization text buffer debounce (400ms lag window)
  useEffect(() => {
    if (search === currentSearchUrl) return;

    const t = setTimeout(() => {
      updateUrlParams({ search: search });
    }, 400);

    return () => clearTimeout(t);
  }, [search, currentSearchUrl, updateUrlParams]);

  // Sync internal state with external URL direct routing overrides
  useEffect(() => {
    setSearch(currentSearchUrl);
  }, [currentSearchUrl]);

  // Unified pipeline fetch mechanism
  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const loadClassesData = async () => {
      try {
        const res = await GetClasses({
          page: 1,
          limit: 12,
          category: "All",
          status: "approved",
          search: currentSearchUrl,
          category: currentCategoryUrl,
          difficulty: currentDifficultyUrl,
          sortPrice: currentSortPriceUrl,
        });

        if (ignore) return;

        if (res?.success) {
          setClasses(Array.isArray(res.data) ? res.data : []);
          setTotalPages(res.pagination?.totalPages || 1);
          setTotalClasses(res.pagination?.totalItems || 0);
        } else {
          setClasses([]);
        }
      } catch (error) {
        console.log("Error syncing infrastructure network stream:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadClassesData();
    return () => {
      ignore = true;
    };
  }, [
    currentSearchUrl,
    currentStatusUrl,
    currentCategoryUrl,
    currentPageUrl,
    currentDifficultyUrl,
    currentSortPriceUrl,
  ]);
  return (
    <div className="bg-transparent text-[#e5e2e1] font-sans min-h-screen relative">
      <VortexSpinner loading={loading} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
        {/* Responsive Single-Row Master Command Filtering Pipeline */}
        <section className="mb-12">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 font-mono">
            {/* 1. Dynamic Search Core */}
            <div className="relative flex-grow h-[44px]">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f9378] w-4 h-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH FOR A CLASS OR TRAINER..."
                className="w-full h-full bg-[#1c1b1b] border border-[#444932]/30 text-white pl-11 pr-4 text-[11px] tracking-wider focus:border-[#caf300] focus:ring-0 transition-all outline-none rounded-sm uppercase placeholder-[#8f9378]/60"
              />
            </div>

            {/* Side-by-Side Dual Select Matrix Wrapper (Mobile Responsive Optimized) */}
            <div className="grid grid-cols-2 xl:flex gap-3 xl:w-auto">
              {/* 2. HeroUI Custom Selection Core: Difficulty Profile */}
              <div className="w-full xl:w-[200px]">
                <Select className="w-full">
                  <Select.Trigger className="w-full h-[44px] bg-[#1c1b1b] border border-[#444932]/30 text-[#e5e2e1] px-3 text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-between focus:border-[#caf300]">
                    <Select.Value
                      placeholder={
                        currentDifficultyUrl === "All"
                          ? "ALL LEVELS"
                          : currentDifficultyUrl.replace("Level ", "Lv ")
                      }
                    />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1b1b] border border-[#444932]/50 rounded-sm mt-1 shadow-xl z-50">
                    <ListBox className="p-1 font-mono text-[11px] text-[#e5e2e1]">
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() => updateUrlParams({ difficulty: "All" })}
                      >
                        ALL LEVELS
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({
                            difficulty: "Level 1 - Foundational",
                          })
                        }
                      >
                        Lv 1 - Foundational
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({
                            difficulty: "Level 2 - Progressive",
                          })
                        }
                      >
                        Lv 2 - Progressive
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({
                            difficulty: "Level 3 - High Output",
                          })
                        }
                      >
                        Lv 3 - High Output
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({
                            difficulty: "Level 4 - Elite Protocol",
                          })
                        }
                      >
                        Lv 4 - Elite Protocol
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* 3. HeroUI Custom Selection Core: Pricing Escalation Sorting Pipeline */}
              <div className="w-full xl:w-[200px]">
                <Select className="w-full">
                  <Select.Trigger className="w-full h-[44px] bg-[#1c1b1b] border border-[#444932]/30 text-[#e5e2e1] px-3 text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-between focus:border-[#caf300]">
                    <Select.Value
                      placeholder={
                        currentSortPriceUrl === "low-to-high"
                          ? "PRICE: LOW TO HIGH"
                          : currentSortPriceUrl === "high-to-low"
                            ? "PRICE: HIGH TO LOW"
                            : "SORT BY PRICE"
                      }
                    />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1b1b] border border-[#444932]/50 rounded-sm mt-1 shadow-xl z-50">
                    <ListBox className="p-1 font-mono text-[11px] text-[#e5e2e1]">
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() => updateUrlParams({ sortPrice: "All" })}
                      >
                        DEFAULT SORT
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({ sortPrice: "low-to-high" })
                        }
                      >
                        PRICE: LOW TO HIGH
                      </ListBox.Item>
                      <ListBox.Item
                        className="p-2 cursor-pointer hover:bg-[#caf300] hover:text-black rounded-sm uppercase"
                        onClick={() =>
                          updateUrlParams({ sortPrice: "high-to-low" })
                        }
                      >
                        PRICE: HIGH TO LOW
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* 4. Horizontal Navigation Categories Segment */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none h-[44px] items-center bg-[#141414] p-1 border border-[#444932]/10 rounded-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateUrlParams({ category: cat })}
                  className={`h-full px-4 uppercase font-bold text-[10px] tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer border ${
                    currentCategoryUrl === cat ||
                    (cat === "All" && currentCategoryUrl === "")
                      ? "bg-[#caf300] text-[#171e00] border-[#caf300]"
                      : "bg-transparent border-transparent text-[#c5c9ac] hover:border-[#caf300]/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 5. Conditional Infrastructure Reset Controller */}
            <AnimatePresence>
              {isFilterActive && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={handleResetFilters}
                  className="h-[44px] px-5 bg-red-950/20 hover:bg-red-900/40 border border-red-500/40 text-red-400 font-bold text-[11px] tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  <span className="material-symbols-outlined text-sm">
                    restart_alt
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Content Header Grid Metric Segment */}
        <div className="flex justify-between items-end mb-8 border-l-4 border-[#caf300] pl-6">
          <div>
            <span className="font-mono text-xs text-[#caf300] uppercase tracking-widest block mb-1">
              Available Sessions
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl uppercase italic tracking-tight text-white">
              Train Without Limits
            </h2>
          </div>
          <p className="hidden md:block font-mono text-xs text-[#c5c9ac]">
            Showing {classes.length} of {totalClasses} Classes
          </p>
        </div>

        {/* Rendering Content Matrices Grid */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {!loading && classes.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-32 border border-dashed border-[#444932]/30 rounded-sm w-full"
              >
                <span className="material-symbols-outlined text-4xl text-[#8f9378] mb-2">
                  database_off
                </span>
                <p className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
                  No active matrices found matching search parameters.
                </p>
              </motion.div>
            ) : (
              !loading && (
                <motion.div
                  key={
                    currentPageUrl +
                    currentCategoryUrl +
                    currentSearchUrl +
                    currentDifficultyUrl +
                    currentSortPriceUrl
                  }
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {classes.map((item) => (
                    <ClassCard key={item._id} item={item} />
                  ))}
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Modular Footprint Pagination Block */}
        {!loading && totalPages > 1 && (
          <section className="mt-16 flex justify-center">
            <div className="flex items-center gap-4 font-mono text-sm select-none">
              <button
                disabled={currentPageUrl === 1}
                onClick={() =>
                  updateUrlParams({ page: Math.max(currentPageUrl - 1, 1) })
                }
                className="text-[#8f9378] hover:text-[#caf300] disabled:opacity-20 disabled:hover:text-[#8f9378] transition-all p-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_left
                </span>
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                if (
                  totalPages > 5 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages &&
                  Math.abs(currentPageUrl - pageNum) > 1
                ) {
                  if (pageNum === 2 && currentPageUrl > 3)
                    return (
                      <span key="dots-1" className="text-[#444932] px-1">
                        ...
                      </span>
                    );
                  if (
                    pageNum === totalPages - 1 &&
                    currentPageUrl < totalPages - 2
                  )
                    return (
                      <span key="dots-2" className="text-[#444932] px-1">
                        ...
                      </span>
                    );
                  return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateUrlParams({ page: pageNum })}
                    className={`w-8 h-8 flex items-center justify-center transition-all font-bold rounded-sm cursor-pointer ${
                      currentPageUrl === pageNum
                        ? "bg-[#caf300] text-[#171e00]"
                        : "text-[#8f9378] hover:text-[#caf300]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPageUrl === totalPages}
                onClick={() =>
                  updateUrlParams({
                    page: Math.min(currentPageUrl + 1, totalPages),
                  })
                }
                className="text-[#8f9378] hover:text-[#caf300] disabled:opacity-20 disabled:hover:text-[#8f9378] transition-all p-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}