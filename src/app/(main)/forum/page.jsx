import ForumPostCard from "@/components/forum/ForumPostCard";
import ForumSearch from "@/components/forum/ForumSearch";
import Pagination from "@/components/forum/Pagination";
import { GetAllPosts } from "@/lib/api/forumPostActions";
import { GetUserSession } from "@/lib/core/session";
import React from "react";

export const metadata = {
  title: "Community Forum | GymVortex",
  description: "Join the conversation. Discuss training strategies, ask questions to coaches, and connect with other athletes at GymVortex.",
};

const CommunityForum = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const page = parseInt(resolvedParams.page) || 1;
  const search = resolvedParams.search || "";
  const role = resolvedParams.role || "";

  const user = await GetUserSession();

  const response = await GetAllPosts(page, 10, search);
  const posts = response?.data || [];
  const pagination = response?.pagination;

  return (
    <div className="p-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl text-white uppercase font-black mb-8 tracking-widest">
        Community Forum
      </h1>
      <ForumSearch />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <ForumPostCard key={post._id} post={post} user={user} />
        ))}
      </div>
      <Pagination pagination={pagination} />
    </div>
  );
};
export default CommunityForum;
