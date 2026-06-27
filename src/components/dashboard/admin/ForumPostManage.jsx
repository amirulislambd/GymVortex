"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import {
  TrashBin,
  Magnifier,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import DynamicDeleteModal from "@/components/shared/DynamicDeleteModal";
import Image from "next/image";

export default function ForumPostManage({ initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const posts = initialData?.data || [];
  const { totalPages, currentPage } = initialData?.pagination || {
    totalPages: 1,
    currentPage: 1,
  };

  // ✅ Fix 1 — Debounce: টাইপ করার সাথে সাথে search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  const handleDeleteConfirm = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumPost/${selectedPost._id}`,
        { method: "DELETE" },
      );
      const result = await res.json();
      if (result.success) {
        toast.success("Post deleted successfully.");
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to delete post.");
      }
    } catch {
      toast.error("Deletion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="w-full p-4 sm:p-6 bg-[#0a0a0a] text-[#e5e2e1] min-h-screen"
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      {/* Search */}
      <div className="mb-6 relative w-full md:w-2/3 lg:w-1/2">
        <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8f9378]" />
        <input
          type="text"
          placeholder="SEARCH BY TITLE..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ onChange — real-time
          className="w-full bg-[#121212] border border-zinc-800 p-3 pl-10 text-xs outline-none focus:border-[#caf300] transition-colors uppercase tracking-widest placeholder:text-zinc-700"
        />
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 border border-dashed border-zinc-800">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            [ NO POSTS FOUND ]
          </p>
        </div>
      )}

      {/* ✅ Fix 2 — Desktop: Table */}
      {posts.length > 0 && (
        <div className="hidden md:block overflow-x-auto border border-zinc-900">
          <table className="w-full text-left border-collapse bg-[#0a0a0a]">
            <thead>
              <tr className="text-[#c5c9ac] text-[10px] uppercase border-b border-zinc-900 bg-[#121212]">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Author</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-[#121212] transition-colors"
                >
                  {/* Image */}
                  <td className="p-4">
                    <div className="relative w-12 h-12 overflow-hidden border border-zinc-800">
                      <Image
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>

                  {/* Title */}
                  <td className="p-4">
                    <p className="text-xs font-bold text-white truncate max-w-[200px]">
                      {post.title}
                    </p>
                  </td>

                  {/* Author */}
                  <td className="p-4">
                    <p className="text-[10px] text-[#8f9378] truncate max-w-[180px]">
                      {post.authorEmail || post.authorName}
                    </p>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-1 border ${
                        post.authorRole === "admin"
                          ? "border-red-500/40 text-red-400 bg-red-500/10"
                          : "border-[#caf300]/40 text-[#caf300] bg-[#caf300]/10"
                      }`}
                    >
                      {post.authorRole || "trainer"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setIsModalOpen(true);
                      }}
                      className="p-2 border border-red-900/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 transition-all"
                    >
                      <TrashBin size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Fix 2 — Mobile: Cards */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-zinc-800 bg-[#0f0f0f] overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
                  }
                  alt={post.title}
                  fill
                  className="object-cover brightness-75"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Role badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-1 ${
                      post.authorRole === "admin"
                        ? "bg-red-500 text-white"
                        : "bg-[#caf300] text-[#0a0a0a]"
                    }`}
                  >
                    {post.authorRole || "trainer"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-bold text-white line-clamp-2 uppercase">
                  {post.title}
                </h3>

                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">
                    Author
                  </p>
                  <p className="text-[10px] text-[#8f9378] truncate">
                    {post.authorEmail || post.authorName}
                  </p>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-[9px] text-[#caf300] uppercase tracking-widest">
                    Forum Post
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 border border-red-900/40 text-red-400 px-3 py-1.5 text-[9px] uppercase tracking-wider hover:bg-red-500/10 transition-all"
                  >
                    <TrashBin size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 border border-zinc-800 text-zinc-400 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="text-[10px] tracking-widest text-[#8f9378]">
            PAGE {currentPage} OF {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 border border-zinc-800 text-zinc-400 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      <DynamicDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isProcessing}
        itemTitle={selectedPost?.title}
      />
    </div>
  );
}