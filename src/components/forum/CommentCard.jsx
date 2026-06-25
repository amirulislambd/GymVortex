"use client";

import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCornerDownRight,
  FiCheck,
  FiX,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { ReplyCommentAction } from "@/lib/action/forumAction";
import { useRouter } from "next/navigation";

export default function CommentCard({
  comment,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const router = useRouter();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const isOwner = String(currentUser?.id) === String(comment?.userId);

  const handleDelete = () => {
    onDelete(comment._id);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      setReplyLoading(true);

      const result = await ReplyCommentAction(comment._id, {
        content: replyText,
        authorName: currentUser?.name,
        authorImage: currentUser?.image,
        userEmail: currentUser?.email,
      });

      if (result?.success) {
        toast.success("Reply posted");
        setReplyText("");
        setShowReply(false);
        router.refresh();
      }
    } catch {
      toast.error("Failed to post reply");
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
      {/* Author */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <img
            src={comment.authorImage || "/default-avatar.png"}
            alt={comment.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h4 className="text-white font-semibold">
              {comment.authorName}
            </h4>

            <p className="text-xs text-neutral-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingId(comment._id);
                setEditText(comment.content);
              }}
              className="p-2 rounded-lg bg-[#caf300]/10 text-[#caf300] hover:bg-[#caf300]/20"
            >
              <FiEdit2 size={14} />
            </button>

            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Comment Body */}
      {editingId === comment._id ? (
        <div className="mt-4">
          <textarea
            rows={3}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-[#090909] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#caf300]"
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={async () => {
                await onUpdate(comment._id, editText);
                setEditingId(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#caf300] text-black rounded-xl"
            >
              <FiCheck size={14} />
              Save
            </button>

            <button
              onClick={() => {
                setEditingId(null);
                setEditText("");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl"
            >
              <FiX size={14} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-neutral-300 leading-7">
          {comment.content}
        </p>
      )}

      {/* Reply Button */}
      {currentUser && (
        <button
          onClick={() => setShowReply(!showReply)}
          className="flex items-center gap-1.5 mt-4 text-xs text-neutral-500 hover:text-[#caf300]"
        >
          <FiCornerDownRight size={12} />
          Reply
        </button>
      )}

      {/* Reply Form */}
      {showReply && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 bg-[#090909] border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#caf300]"
          />

          <button
            onClick={handleReplySubmit}
            disabled={replyLoading}
            className="px-4 py-2 bg-[#caf300] text-black rounded-xl disabled:opacity-50"
          >
            <FiSend size={14} />
          </button>
        </div>
      )}

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-5 pl-4 border-l-2 border-[#caf300]/20 space-y-3">
          {comment.replies.map((reply, i) => (
            <div key={i} className="flex items-start gap-3">
              <img
                src={reply.authorImage || "/default-avatar.png"}
                alt={reply.authorName}
                className="w-7 h-7 rounded-full object-cover"
              />

              <div>
                <p className="text-white text-sm font-semibold">
                  {reply.authorName}
                </p>

                <p className="text-neutral-400 text-sm">
                  {reply.content}
                </p>

                <p className="text-neutral-600 text-xs mt-1">
                  {new Date(reply.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}