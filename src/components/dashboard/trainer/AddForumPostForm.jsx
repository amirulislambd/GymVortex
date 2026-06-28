"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CloudArrowUpIn, Thunderbolt } from "@gravity-ui/icons";
import { ImSpinner9 } from "react-icons/im";
import { RiDraftLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { PostForumAction } from "@/lib/action/forumAction";

export default function AddForumPostForm({ postData }) {
  const { data: session } = authClient.useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const user = session?.user;
  const router = useRouter();
  const isEditMode = !!postData?._id;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      description: postData?.description || "",
      image: postData?.image || "",
    },
  });

  useEffect(() => {
    if (isEditMode && postData?.image) {
      setPreviewImage(postData.image);
    }
  }, [postData, isEditMode]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await response.json();
      if (result.success) {
        setValue("image", result.data.url, { shouldValidate: true });
        toast.success("Visual asset uploaded successfully.");
      }
    } catch (error) {
      toast.error("Network error.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      authorId: user?.id || user?._id || "",
      authorName: user?.name || postData?.authorName || " ",
      authorEmail: user?.email || "",
      authorImage: user?.image || "",
      authorRole: user?.role || "trainer",
    };

    if (isEditMode) payload._id = postData._id;

    try {
      const res = await PostForumAction(payload, isEditMode ? "PUT" : "POST");
      if (res) {
        toast.success(
          isEditMode
            ? "Post updated successfully."
            : "Post published successfully.",
        );
        reset();
        setPreviewImage("");
        router.refresh();
        const path =
          user?.role === "admin"
            ? "/dashboard/admin/my-posts"
            : "/dashboard/trainer/my-posts";
        router.push(path);
      }
    } catch (error) {
      toast.error("Failed to execute database transaction.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 bg-[#131313] text-[#e5e2e1] font-sans">
      <div className="mb-12">
        <p className="font-mono text-xs text-[#caf300] mb-2 uppercase tracking-[0.2em]">
          SECURE ACCESS // {user?.role?.toUpperCase() || "PORTAL"}
        </p>
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase mb-4 italic tracking-tight text-white border-l-4 border-[#caf300] pl-4">
          {!isEditMode ? "CREATE POST" : "UPDATE POST"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#1c1b1b] border border-[#caf300]/10 p-6 md:p-8 rounded-sm space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Post Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Required" })}
              className={`bg-[#201f1f] border p-4 font-sans text-[#caf300] focus:outline-none rounded-sm transition-all uppercase tracking-wide ${errors.title ? "border-red-500" : "border-[#444932]/50"}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Attach Visual Asset
            </label>
            <label className="bg-[#201f1f] border-2 border-dashed border-[#444932]/40 flex flex-col items-center justify-center p-8 cursor-pointer rounded-sm min-h-[220px] relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              ) : (
                <CloudArrowUpIn className="size-10 text-[#caf300]" />
              )}
              {isUploading && (
                <ImSpinner9 className="size-8 text-[#caf300] animate-spin" />
              )}
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Content / Description
            </label>
            <textarea
              rows="8"
              {...register("description", { required: "Required" })}
              className={`bg-[#201f1f] border p-4 font-sans text-white focus:outline-none rounded-sm ${errors.description ? "border-red-500" : "border-[#444932]/50"}`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-[#444932]/20">
          <div className="flex items-center gap-2 text-[#8f9378] font-mono text-[10px] uppercase tracking-wider">
            <span className="size-2 rounded-full bg-[#caf300] animate-pulse" />
            {user?.role?.toUpperCase()} Authenticated // System Ready
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3.5 border border-[#444932] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#131313] transition-all flex items-center justify-center gap-2 rounded-sm"
            >
              <RiDraftLine /> Save Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-[#caf300] text-[#131313] font-mono text-xs font-black uppercase tracking-widest hover:bg-[#b0d500] transition-all flex items-center justify-center gap-2 rounded-sm"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Thunderbolt />{" "}
                  {isEditMode ? "Update Matrix" : "Publish to Community"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}