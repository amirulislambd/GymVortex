"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Magnifier,
  ChevronLeft,
  ChevronRight,
  Heart,
  Comment,
} from "@gravity-ui/icons";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { ServerDelete } from "@/lib/core/serverMutation";
import ForumPostCard from "./ForumPostCard";

export default function MyForumPosts({
  initialData,
  trainerEmail,
  initialPage,
  initialSearch,
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialData?.posts || []);
  const [meta, setMeta] = useState(initialData?.meta || {});
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleQueryChange = (newPage, newSearch) => {
    setPage(newPage);
    router.push(
      `/dashboard/trainer/my-posts?page=${newPage}&search=${newSearch}`,
    );
  };

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure?")) return;
    setIsDeleting(true);
    try {
      const res = await ServerDelete(`forumPost/${postId}`);
      if (res?.success) {
        toast.success("Post deleted successfully.");
        router.refresh();
      }
    } catch (e) {
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-[#131313] text-[#e5e2e1]">
      {/* SEARCH BAR */}
      <div className="mb-6 relative">
        <Magnifier className="absolute left-3 top-3 size-4 text-[#8f9378]" />
        <input
          type="text"
          placeholder="SEARCH PROTOCOL..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleQueryChange(1, e.target.value);
          }}
          className="w-full bg-[#1c1b1b] border border-[#444932]/30 pl-10 py-2.5 outline-none rounded-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {posts.map((post) => (
          <ForumPostCard post={post} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          disabled={page <= 1}
          onClick={() => handleQueryChange(page - 1, search)}
          className="p-2 border"
        >
          <ChevronLeft />
        </button>
        <span className="self-center">
          PAGE {page} OF {meta.totalPages}
        </span>
        <button
          disabled={page >= meta.totalPages}
          onClick={() => handleQueryChange(page + 1, search)}
          className="p-2 border"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}