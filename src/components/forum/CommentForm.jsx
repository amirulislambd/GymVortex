"use client";

import { useForm } from "react-hook-form";

export default function CommentForm({
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-[#111111] border border-white/10 rounded-2xl p-5 mb-8"
    >
      <textarea
        rows={4}
        placeholder="Share your thoughts..."
        {...register("content", {
          required:
            "Comment is required",
          minLength: {
            value: 3,
            message:
              "Comment must be at least 3 characters",
          },
        })}
        className="w-full bg-[#090909] border border-white/10 rounded-xl p-4 text-white"
      />

      {errors.content && (
        <p className="text-red-400 text-sm mt-2">
          {errors.content.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-6 py-3 bg-[#caf300] text-black font-bold rounded-xl"
      >
        {isSubmitting
          ? "Posting..."
          : "Post Comment"}
      </button>
    </form>
  );
}