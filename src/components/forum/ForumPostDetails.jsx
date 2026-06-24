"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  FiArrowLeft,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiCalendar,
} from "react-icons/fi";
import {
  PostCommentAction,
  UpdateCommentAction,
  LikePostAction,
  DislikePostAction,
  DeleteCommentAction,
  DeleteReplyAction,
  UpdateReplyAction,
} from "@/lib/action/forumAction";
import CommentList from "./CommentList";

export default function ForumPostDetails({ post, user, comments = [] }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log("user:", user);
  const [likes, setLikes] = useState(post.likes || []);
  const [dislikes, setDislikes] = useState(post.dislikes || []);

  const isBanned = user?.banned;
  console.log("isBanned:", isBanned);

  const hasLiked = likes?.some((item) => item.email === user?.email);

  const hasDisliked = dislikes?.some((item) => item.email === user?.email);

  const handleLike = async () => {
    if (!user) {
      toast.error("Login to like");
      return;
    }
    if (isBanned) {
      toast.error("Action restricted by Admin.");
      return;
    }

    const result = await LikePostAction(post._id, {
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    if (result?.success) {
      setLikes(result.likes || []);
      setDislikes(result.dislikes || []);
    } else {
      toast.error(result?.message || "Failed");
    }
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Login to dislike");
      return;
    }
    if (isBanned) {
      toast.error("Action restricted by Admin.");
      return;
    }

    const result = await DislikePostAction(post._id, {
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    if (result?.success) {
      setLikes(result.likes || []);
      setDislikes(result.dislikes || []);
    } else {
      toast.error(result?.message || "Failed");
    }
  };
  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Login to comment");
      return;
    }

    if (isBanned) {
      toast.error("Action restricted by Admin.");
      return;
    }

    try {
      const result = await PostCommentAction({
        content: data.content,
        postId: post._id,
        userId: user.id,
        userEmail: user.email,
        authorName: user.name,
        authorImage: user.image,
      });
      if (result?.success) {
        toast.success("Comment posted!");
        reset();
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to post");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateComment = async (commentId, editText) => {
    try {
      const result = await UpdateCommentAction(commentId, {
        content: editText,
      });
      if (result?.success) {
        toast.success("Comment updated");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update");
      }
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const result = await DeleteCommentAction(commentId);

      console.log(result);

      if (result?.success) {
        toast.success("Comment deleted");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleUpdateReply = async (commentId, replyId, content) => {
    if (isBanned) {
      toast.error("Action restricted by Admin.");
      return;
    }

    try {
      const result = await UpdateReplyAction(commentId, replyId, { content });

      if (result?.success) {
        toast.success("Reply updated");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update reply");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const result = await DeleteReplyAction(commentId, replyId);

      if (result?.success) {
        toast.success("Reply deleted");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to delete reply");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-[#090909]">
      {/* HERO */}
      <div className="relative h-[450px] md:h-[550px] overflow-hidden">
        <Image
          fill
          priority
          src={post.image}
          alt={post.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/50 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 md:px-8 pb-10">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-sm text-[#caf300] mb-6"
          >
            <FiArrowLeft /> Back To Forum
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                post.authorRole === "admin"
                  ? "bg-red-500 text-white"
                  : "bg-[#caf300] text-black"
              }`}
            >
              {post.authorRole}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 mt-6">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-12 h-12 rounded-full border border-[#caf300]/30"
              />
              <div>
                <p className="text-white font-semibold">{post.authorName}</p>
                <p className="text-neutral-500 text-sm capitalize">
                  {post.authorRole}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <FiCalendar />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            {/* Reaction Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#111111] border border-[#caf300]/10 rounded-2xl p-5 flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  hasLiked
                    ? "bg-[#caf300] text-black"
                    : "bg-white/5 text-white hover:bg-[#caf300]/20"
                }`}
              >
                <FiThumbsUp /> {likes.length}
              </button>

              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${
                  hasDisliked
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-white hover:bg-red-500/20"
                }`}
              >
                <FiThumbsDown /> {dislikes.length}
              </button>

              <div className="flex items-center gap-2 bg-white/5 text-white px-5 py-3 rounded-xl">
                <FiMessageSquare /> {comments?.length || 0}
              </div>
            </motion.div>

            {/* Description */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-[#caf300] text-sm uppercase tracking-widest mb-5">
                Discussion
              </h2>
              <p className="text-neutral-300 leading-8 whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-2xl font-black uppercase">
                  Comments
                </h3>
                <span className="text-[#caf300] font-bold">
                  {comments?.length || 0}
                </span>
              </div>

              {/* Comment Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#111111] border border-white/10 rounded-2xl p-5 mb-8"
              >
                <textarea
                  rows={4}
                  placeholder="Share your thoughts..."
                  {...register("content", {
                    required: "Comment is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  className="w-full bg-[#090909] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#caf300]"
                />
                {errors.content && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.content.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 px-6 py-3 bg-[#caf300] text-black font-bold rounded-xl disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </form>

              {/* Comment List */}
              <CommentList
                comments={comments}
                currentUser={user}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
                onReplyUpdate={handleUpdateReply}
                onReplyDelete={handleDeleteReply}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            <div className="sticky top-24 bg-[#111111] border border-white/10 rounded-2xl p-6">
              <h3 className="text-[#caf300] font-black uppercase mb-5">
                Post Information
              </h3>
              <div className="space-y-4 text-sm">
                {[
                  { label: "Author", value: post.authorName },
                  { label: "Role", value: post.authorRole },
                  { label: "Likes", value: likes.length },
                  { label: "Dislikes", value: dislikes.length },
                  { label: "Comments", value: comments?.length || 0 },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-neutral-500">{item.label}</span>
                    <span className="text-white uppercase">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
