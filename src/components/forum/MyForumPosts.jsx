"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, Heart, Comment, Trash, Pencil, Magnifier, ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { ImSpinner9 } from "react-icons/im";

import toast from "react-hot-toast";
import { GetMyForumPosts } from "@/lib/api/forumPostActions";

export default function MyForumPosts({trainerEmail}) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1, totalPosts: 0 });
  const limit = 9; 


  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await GetMyForumPosts(trainerEmail, page, limit, search);
      console.log("res:", res);
      if (res && res.success) {
        setPosts(res.posts||[]);
        setMeta(res.meta || { totalPages: 1, totalPosts: 0 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quantum protocols.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page, search]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-[#131313] text-[#e5e2e1]">
      
      {/* TOP CONTROL PANEL (SESSION INFOS) */}
      <div className="bg-[#1c1b1b] border border-[#caf300]/10 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="font-mono text-xs tracking-wider space-y-1">
          <p className="text-[#caf300] font-bold">&gt; SESSION_ID: FORUM_MGR_7749</p>
          <p className="text-[#8f9378]">TOTAL FOUND: {meta.totalPosts} | PAGE: {page} OF {meta.totalPages}</p>
        </div>
        
        <button
          onClick={() => router.push("/dashboard/trainer/add-forum-post")}
          className="bg-[#caf300] text-[#131313] font-mono text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-sm flex items-center gap-2"
        >
          <Plus className="size-4 stroke-[3]" /> New Protocol
        </button>
      </div>

      {/* SEARCH BAR PANEL */}
      <div className="mb-6 relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-[#8f9378]">
          <Magnifier className="size-4" />
        </span>
        <input
          type="text"
          placeholder="SEARCH PROTOCOL BY TITLE..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }}
          className="w-full bg-[#1c1b1b] border border-[#444932]/30 focus:border-[#caf300]/50 outline-none pl-10 pr-4 py-2.5 font-mono text-xs text-white placeholder-[#8f9378] tracking-wider rounded-sm transition-all"
        />
      </div>

      {/* MATRIX POST LIST */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <ImSpinner9 className="size-8 text-[#caf300] animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[#444932]/30 font-mono text-xs text-[#8f9378]">
          NO SEARCH MATCHES FOUND IN PROTOCOL CORE
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-[#1c1b1b] border border-[#444932]/20 p-4 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-44 h-26 bg-[#201f1f] relative rounded-sm overflow-hidden flex-shrink-0">
                  <img src={post.image} alt="" className="w-full h-full object-cover opacity-80" />
                  <span className="absolute top-2 left-2 font-mono text-[9px] bg-[#caf300] text-[#131313] px-1.5 py-0.5 rounded-[2px] uppercase font-bold">{post.status}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-lg uppercase tracking-tight text-white">{post.title}</h3>
                  <p className="text-xs text-[#c5c9ac] line-clamp-2 max-w-2xl font-light">{post.description}</p>
                  <div className="flex items-center gap-6 pt-2 font-mono text-xs text-[#8f9378]">
                    <span className="flex items-center gap-1"><Heart className="size-4" /> {post.likes?.length || 0}</span>
                    <span className="flex items-center gap-1"><Comment className="size-4" /> {post.commentsCount || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex md:flex-col gap-2 justify-center">
                <button className="w-full md:px-3 py-1.5 border border-[#caf300] text-[#caf300] font-mono text-[10px] font-bold uppercase rounded-sm">Edit</button>
                <button className="w-full md:px-3 py-1.5 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold uppercase rounded-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🏁 PAGINATION CONTROLS */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4 border-t border-[#444932]/20 font-mono text-xs">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="p-2 border border-[#444932]/30 text-[#8f9378] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#caf300] hover:text-white transition-all rounded-sm"
          >
            <ChevronLeft className="size-4" />
          </button>
          
          <span className="text-white tracking-widest">
            PAGE <span className="text-[#caf300] font-bold">{page}</span> OF {meta.totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
            disabled={page === meta.totalPages}
            className="p-2 border border-[#444932]/30 text-[#8f9378] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#caf300] hover:text-white transition-all rounded-sm"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

    </div>
  );
}