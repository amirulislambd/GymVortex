"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClassCard from "./ClassCard";
import { GetClasses } from "@/lib/api/getClasses";
import VortexSpinner from "@/app/loading";

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);

  const categories = [
    "All",
    "Yoga",
    "Cardio",
    "Weights",
    "HIIT",
    "Powerlifting",
  ];
  const limitPerPage = 12;

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const loadClassesData = async () => {
      try {
        const res = await GetClasses({
          page: currentPage,
          limit: limitPerPage,
          search: debouncedSearch,
          category: activeCategory,
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
        console.log("Error connecting to backend:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadClassesData();
    return () => {
      ignore = true;
    };
  }, [debouncedSearch, activeCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-sans min-h-screen relative">
      {/* Premium Sci-Fi Initializing Spinner Overlap */}
      <VortexSpinner loading={loading} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
        {/* Filters and Search Bar Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input Field with Conditional Placeholder */}
            <div className="relative flex-grow w-full md:w-auto h-[46px]">
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
                onChange={handleSearchChange}
                placeholder={search ? "" : "SEARCH FOR A CLASS OR TRAINER..."}
                className="w-full h-full bg-[#1c1b1b] border border-[#444932]/30 text-white pl-12 pr-4 font-mono text-[11px] tracking-wider focus:border-[#caf300] focus:ring-0 transition-all outline-none rounded-sm uppercase placeholder-[#8f9378]/60"
              />
            </div>

            {/* Category Navigation System */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto h-[46px] items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`h-full px-5 uppercase font-mono text-[11px] font-bold tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer border ${
                    activeCategory === cat
                      ? "bg-[#caf300] text-[#171e00] border-[#caf300]"
                      : "bg-transparent border-[#caf300]/30 text-[#e5e2e1] hover:border-[#caf300]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Page Header and Metric Counter */}
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

        {/* Grid Animation Container */}
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
                  key={currentPage + activeCategory + debouncedSearch}
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

        {/* Minimalist Pagination System */}
        {!loading && totalPages > 1 && (
          <section className="mt-16 flex justify-center">
            <div className="flex items-center gap-4 font-mono text-sm select-none">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-[#8f9378] hover:text-[#caf300] disabled:opacity-20 disabled:hover:text-[#8f9378] transition-all p-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base">
                  chevron_left
                </span>
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;

                {
                  /* Intelligent Ellipsis Logic */
                }
                if (
                  totalPages > 5 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages &&
                  Math.abs(currentPage - pageNum) > 1
                ) {
                  if (pageNum === 2 && currentPage > 3) {
                    return (
                      <span key="dots-1" className="text-[#444932] px-1">
                        ...
                      </span>
                    );
                  }
                  if (
                    pageNum === totalPages - 1 &&
                    currentPage < totalPages - 2
                  ) {
                    return (
                      <span key="dots-2" className="text-[#444932] px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center transition-all font-bold rounded-sm cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#caf300] text-[#171e00]"
                        : "text-[#8f9378] hover:text-[#caf300]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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