import ForumPostDetails from "@/components/forum/ForumPostDetails";
import {
  GetCommentsAction,
  GetForumPostsById,
} from "@/lib/api/forumPostActions";
import { GetUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const post = await GetForumPostsById(id);
    return {
      title: post?.data?.title ? `${post.data.title} | Forum` : "Forum Post | GymVortex",
      description: post?.data?.description?.slice(0, 155) || "Read discussion on GymVortex forum.",
    };
  } catch (error) {
    return {
      title: "Forum Post | GymVortex",
      description: "Read discussion on GymVortex forum.",
    };
  }
}

const PostDetails = async ({ params }) => {
  const user = await GetUserSession();
  const { id } = await params;
  const post = await GetForumPostsById(id);
  const comments = await GetCommentsAction(id);
  if (!user) {
    redirect(`/login?redirect=/forum/${id}`);
  }

  return (
    <ForumPostDetails post={post.data} user={user} comments={comments.data} />
  );
};

export default PostDetails;
