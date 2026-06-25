import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { GetMyForumPosts } from "@/lib/api/forumPostActions";
import ForumPostCard from "../forum/ForumPostCard";

const CommunityFed = async () => {
  const response = await GetMyForumPosts(undefined, undefined, 4, undefined);
  const posts = response?.data || [];

  return (
    <section className="px-4 md:px-8 lg:px-12 md:py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-[#caf300] uppercase tracking-[0.35em] text-xs font-semibold">
            // Current Discussions
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-black uppercase italic leading-tight">
            <span className="text-white">Community</span>{" "}
            <span className="text-[#caf300]">Forum</span>
          </h2>

          <p className="mt-4 max-w-2xl text-neutral-400 text-sm md:text-base leading-7">
            Join the GymVortex community to ask questions, share your fitness
            journey, exchange knowledge, and connect with members, trainers, and
            admins from around the world.
          </p>
        </div>

        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-[#caf300] uppercase text-sm font-semibold hover:gap-3 transition-all duration-300"
        >
          View All Discussions
          <FiArrowRight />
        </Link>
      </div>

      {/* Forum Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <ForumPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default CommunityFed;