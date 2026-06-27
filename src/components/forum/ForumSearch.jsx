"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Magnifier } from "@gravity-ui/icons";

export default function ForumSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#8f9378]">
        <Magnifier className="size-5" />
      </div>
      <input
        type="text"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e)}
        placeholder="SEARCH FORUM TOPICS..."
        className="w-full bg-[#1c1b1b] border border-[#444932]/30 text-[#e5e2e1] pl-12 pr-4 py-3 rounded-sm outline-none focus:border-[#caf300] transition-all font-mono text-sm placeholder-[#444932]"
      />
    </div>
  );
}