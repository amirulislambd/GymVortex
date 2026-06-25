"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { TrashBin, TrashCan } from "@gravity-ui/icons";

export default function ForumPostManage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/forum/all-posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      toast.error("Failed to load forum matrix.");
    } finally {
      setLoading(false);
    }
  };

  // পোস্ট ডিলিট করার হ্যান্ডলার
  const handleDelete = async (postId) => {
    if (
      !confirm(
        "Are you sure? This action will purge the post from the platform.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/forum/delete/${postId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Post neutralized successfully.");
        setPosts(posts.filter((p) => p._id !== postId));
      }
    } catch (err) {
      toast.error("Deletion protocol failed.");
    }
  };

  return (
    <div className="w-full p-6 bg-[#131313] text-[#e5e2e1] font-mono">
      <div className="mb-8 border-b border-[#444932] pb-6">
        <h1 className="text-2xl font-bold uppercase text-white">
          Forum Moderation Matrix
        </h1>
        <p className="text-[11px] text-[#caf300]">
          Total Active Records: {posts.length}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <ImSpinner9 className="animate-spin text-[#caf300] size-10" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#c5c9ac] text-[10px] uppercase border-b border-[#444932]">
                <th className="py-4">Author Info</th>
                <th className="py-4">Title / Context</th>
                <th className="py-4">Created</th>
                <th className="py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b border-[#201f1f] hover:bg-[#1c1b1b] transition-colors"
                >
                  <td className="py-4">
                    <p className="font-bold">{post.authorName}</p>
                    <p className="text-[#8f9378] text-[10px]">
                      {post.authorEmail}
                    </p>
                  </td>
                  <td className="py-4 max-w-xs truncate">{post.title}</td>
                  <td className="py-4 text-[#8f9378]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-[#f34500] hover:text-white transition-colors p-2"
                      title="Delete Post"
                    >
                      <TrashBin size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
