"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Magnifier, ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import {
  FiTrash2,
  FiEdit2,
  FiMessageSquare,
  FiThumbsUp,
  FiEye,
} from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { ServerDelete } from "@/lib/core/serverMutation";

export default function MyForumPosts({
  initialData,
  trainerEmail,
  initialPage,
  initialSearch,
  role,
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialData?.posts || []);
  const [meta, setMeta] = useState(initialData?.meta || {});
  const [search, setSearch] = useState(initialSearch || "");
  const [page, setPage] = useState(initialPage || 1);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/dashboard/trainer/my-posts?page=1&search=${search}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/dashboard/trainer/my-posts?page=${newPage}&search=${search}`);
  };

  const handleDelete = async (postId) => {
    setDeletingId(postId);
    try {
      const res = await ServerDelete(`forumPost/${postId}`);
      if (res?.success) {
        toast.success("Post deleted successfully.");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        setConfirmId(null);
      } else {
        toast.error("Failed to delete.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (postId) => {
    router.push(
      `${role === "trainer" ? "/dashboard/trainer/my-posts" : "/dashboard/admin/my-posts"}/${postId}`,
    );
  };

  if (posts.length === 0) {
    return (
      <div className="p-6">
        {/* Search */}
        <div className="mb-6 relative w-full md:w-96">
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-neutral-900 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#caf300] transition-colors uppercase tracking-wider placeholder:text-neutral-700"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-900 gap-3">
          <p
            className="text-neutral-600 text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            [ NO POSTS FOUND ]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p
            className="text-[10px] text-[#caf300] uppercase tracking-widest mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // MY POSTS
          </p>
          <h2
            className="text-xl sm:text-2xl font-black uppercase text-white"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            Forum Posts
          </h2>
        </div>

        <div className="relative w-full sm:w-72">
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-neutral-900 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#caf300] transition-colors uppercase tracking-wider placeholder:text-neutral-700"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          />
        </div>
      </div>

      {/* ── Desktop: Table ── */}
      <div className="hidden md:block border border-neutral-900 overflow-hidden">
        <table className="w-full text-left border-collapse bg-[#0f0f0f]">
          <thead>
            <tr
              className="border-b border-neutral-900 bg-[#0a0a0a] text-[10px] uppercase tracking-widest text-neutral-600"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <th className="p-4 font-medium">Post</th>
              <th className="p-4 font-medium">Stats</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900/60">
            {posts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-neutral-900/20 transition-colors"
              >
                {/* Post info */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-neutral-800">
                      <Image
                        src={
                          post.image ||
                          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-bold text-white uppercase truncate max-w-[260px]"
                        style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                      >
                        {post.title}
                      </p>
                      <p
                        className="text-[10px] text-neutral-600 truncate max-w-[260px] mt-0.5"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {post.description?.slice(0, 80)}...
                      </p>
                    </div>
                  </div>
                </td>

                {/* Stats */}
                <td className="p-4">
                  <div
                    className="flex items-center gap-4 text-[10px] text-neutral-500"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    <div className="flex items-center gap-1">
                      <FiThumbsUp size={11} className="text-[#caf300]" />
                      {post.likes?.length || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMessageSquare size={11} className="text-blue-400" />
                      {post.commentsCount || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiEye size={11} className="text-neutral-500" />
                      {post.views || 0}
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="p-4">
                  <span
                    className="text-[10px] text-neutral-500"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(post._id)}
                      className="flex items-center gap-1.5 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 px-3 py-1.5 text-[9px] uppercase tracking-wider transition-all"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <FiEdit2 size={11} /> Edit
                    </button>
                    <button
                      onClick={() => setConfirmId(post._id)}
                      className="flex items-center gap-1.5 border border-red-900/40 text-red-400 hover:bg-red-500/10 px-3 py-1.5 text-[9px] uppercase tracking-wider transition-all"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <FiTrash2 size={11} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile: Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-[#0f0f0f] border border-neutral-900 overflow-hidden"
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
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3
                className="text-sm font-black uppercase text-white line-clamp-2 leading-tight"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                {post.title}
              </h3>

              <p
                className="text-[10px] text-neutral-600 line-clamp-2"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {post.description?.slice(0, 100)}...
              </p>

              {/* Stats */}
              <div
                className="flex items-center gap-4 text-[10px] text-neutral-500"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <div className="flex items-center gap-1">
                  <FiThumbsUp size={10} className="text-[#caf300]" />
                  {post.likes?.length || 0}
                </div>
                <div className="flex items-center gap-1">
                  <FiMessageSquare size={10} className="text-blue-400" />
                  {post.commentsCount || 0}
                </div>
                <div className="flex items-center gap-1">
                  <FiEye size={10} />
                  {post.views || 0}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-neutral-900">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-cyan-500/40 text-cyan-400 py-2 text-[9px] uppercase tracking-wider hover:bg-cyan-500/10 transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <FiEdit2 size={11} /> Edit
                </button>
                <button
                  onClick={() => setConfirmId(post._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-red-900/40 text-red-400 py-2 text-[9px] uppercase tracking-wider hover:bg-red-500/10 transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <FiTrash2 size={11} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-2">
          <button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className="p-2 border border-neutral-800 text-neutral-400 hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <span
            className="text-[10px] text-neutral-500 uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Page {page} of {meta.totalPages}
          </span>
          <button
            disabled={page >= meta.totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="p-2 border border-neutral-800 text-neutral-400 hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-red-500/30 p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-red-500/40 flex items-center justify-center shrink-0">
                <FiTrash2 size={16} className="text-red-400" />
              </div>
              <h3
                className="text-sm font-black uppercase text-red-400"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                Confirm Delete
              </h3>
            </div>

            <div className="bg-[#0a0a0a] border border-neutral-900 p-3">
              <p
                className="text-xs text-white font-bold uppercase truncate"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {posts.find((p) => p._id === confirmId)?.title}
              </p>
            </div>

            <p
              className="text-xs text-neutral-500 leading-relaxed border-l-2 border-red-500/30 pl-3"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              This post will be permanently deleted and cannot be recovered.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                className="flex-1 bg-red-600 text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-red-700 disabled:opacity-50 transition-all"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {deletingId === confirmId ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => setConfirmId(null)}
                disabled={!!deletingId}
                className="px-4 border border-neutral-800 text-white text-xs uppercase tracking-widest hover:border-neutral-600 disabled:opacity-50 transition-all"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}