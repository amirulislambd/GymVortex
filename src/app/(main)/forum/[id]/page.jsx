import ForumPostDetails from "@/components/forum/ForumPostDetails";
import {
  GetCommentsAction,
  GetForumPostsById,
} from "@/lib/api/forumPostActions";
import { GetUserSession } from "@/lib/core/session";
import React from "react";

const PostDetails = async ({ params }) => {
  const user = await GetUserSession();
  const { id } = await params;
  const post = await GetForumPostsById(id);
  console.log("id:", id);
  const comments = await GetCommentsAction(id);
  console.log("comments:", comments);
  console.log("user:", user);

  return (
    <ForumPostDetails post={post.data} user={user} comments={comments.data} />
  );
};

export default PostDetails;
