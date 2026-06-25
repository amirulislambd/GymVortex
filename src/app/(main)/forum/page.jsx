import ForumPostCard from "@/components/forum/ForumPostCard";
import { GetMyForumPosts } from "@/lib/api/forumPostActions";
import React from "react";

const CommunityForum = async ({ searchParams }) => {
  // Parsing pagination params from URL
  const page = searchParams.page || 1;
  const search = searchParams.search || "";

  // Fetching the response
  const response = await GetMyForumPosts(undefined, page, 9, search);
  const posts = response?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white uppercase font-black mb-8 tracking-widest">
        Community Forum
      </h1>

      {/* Grid Layout to match your design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ForumPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
