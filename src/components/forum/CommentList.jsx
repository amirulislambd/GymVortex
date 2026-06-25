"use client";

import CommentCard from "./CommentCard";

export default function CommentList({
  comments,
  currentUser,
  onUpdate,
  onDelete,
}) {
  if (!comments?.length) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-neutral-500">
          No comments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          currentUser={currentUser}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}