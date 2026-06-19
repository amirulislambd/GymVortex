"use client";
import { useState } from "react";
import { FiHeart, FiSend } from "react-icons/fi";

const posts = [
  {
    id: 1,
    user: "Iron_Mike",
    avatar: "IM",
    content: "just hit a 405lb Deadlift!",
    time: "2 MINUTES AGO",
    liked: false,
  },
  {
    id: 2,
    user: "Yoga_Queen",
    avatar: "YQ",
    content: "posted a new Recovery Guide.",
    time: "15 MINUTES AGO",
    liked: false,
  },
];

export default function ForgeCommunity() {
  const [liked, setLiked] = useState({});
  const [input, setInput] = useState("");

  const toggleLike = (id) =>
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5 flex flex-col gap-4">
      {/* Header */}
      <h2
        className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
        style={{ fontFamily: "Archivo Narrow, sans-serif" }}
      >
        FORGE COMMUNITY
      </h2>

      {/* Posts */}
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-3 p-3 border border-neutral-900 hover:border-neutral-800 transition-all"
          >
            {/* Avatar */}
            <div className="w-9 h-9 shrink-0 bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <span
                className="text-[9px] font-black text-[#caf300]"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {post.avatar}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white leading-snug">
                <span
                  className="font-black text-[#caf300]"
                  style={{ fontFamily: "Archivo Narrow, sans-serif" }}
                >
                  {post.user}
                </span>{" "}
                <span className="text-neutral-300 font-medium">
                  {post.content}
                </span>
              </p>
              <p
                className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest mt-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {post.time}
              </p>
            </div>

            {/* Like */}
            <button
              onClick={() => toggleLike(post.id)}
              className={`shrink-0 p-1 transition-colors ${
                liked[post.id]
                  ? "text-[#caf300]"
                  : "text-neutral-700 hover:text-neutral-400"
              }`}
            >
              <FiHeart
                size={14}
                fill={liked[post.id] ? "#caf300" : "none"}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Share Input */}
      <div className="flex items-center gap-2 border border-neutral-800 bg-[#0a0a0a] px-3 py-2.5 focus-within:border-[#caf300]/30 transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SHARE YOUR PROGRESS..."
          className="flex-1 bg-transparent text-[11px] text-neutral-400 placeholder:text-neutral-700 outline-none uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        />
        <button
          className={`transition-colors ${
            input.trim()
              ? "text-[#caf300] hover:text-white"
              : "text-neutral-700"
          }`}
        >
          <FiSend size={13} />
        </button>
      </div>
    </div>
  );
}