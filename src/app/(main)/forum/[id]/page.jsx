import ForumPostDetails from "@/components/forum/ForumPostDetails";
import {
  GetCommentsAction,
  GetForumPostsById,
} from "@/lib/api/forumPostActions";
import { GetUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

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
