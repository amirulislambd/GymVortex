"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

export default function Pagination({ pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { totalPages, currentPage } = pagination;

  const handlePageChange = (newPage) => {

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 font-mono text-xs">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-[#444932]/30 text-[#8f9378] disabled:opacity-30 hover:border-[#caf300] hover:text-white transition-all rounded-sm"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Page Numbers */}
      <span className="text-[#8f9378] mx-2">
        PAGE <span className="text-[#caf300] font-bold">{currentPage}</span> OF {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-[#444932]/30 text-[#8f9378] disabled:opacity-30 hover:border-[#caf300] hover:text-white transition-all rounded-sm"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}