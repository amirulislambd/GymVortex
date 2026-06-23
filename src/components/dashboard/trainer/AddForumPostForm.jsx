"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CloudArrowUpIn, FileText, Thunderbolt } from "@gravity-ui/icons";
import { ImSpinner9 } from "react-icons/im";
import { RiDraftLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { PostForumAction } from "@/lib/action/forumAction"; 

export default function AddForumPostForm({ postData }) {
  const { data: session } = authClient.useSession();
  const [isUploading, setIsUploading] = useState(false);
  const user = session?.user;
  const router = useRouter();
  const params = usePathname();

  const isEditMode = params !== "/dashboard/trainer/add-post";

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (isEditMode && postData?.image) {
      setPreviewImage(postData.image);
    }
  }, [postData, isEditMode]);

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    values:
      isEditMode && postData
        ? {
            title: postData.title || "",
            description: postData.description || "",
            image: postData.image || "",
          }
        : {
            title: "",
            description: "",
            image: "",
          },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await response.json();

      if (result.success) {
        setValue("image", result.data.url, { shouldValidate: true });
        toast.success("Visual asset uploaded successfully.");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Network error during image deployment.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        authorId: user?.id ||user?._id || "",
        authorName: user?.name || postData?.authorName || " ",
        authorEmail: user?.email || "",
        authorImage: user?.image || "",
        authorRole: user?.role || "",
      };

      if (isEditMode && postData?._id) {
        payload._id = postData._id;
      }
      
      const methodType = isEditMode ? "PUT" : "POST";
      const res = await PostForumAction(payload, methodType);

      if (res) {
        toast.success(
          isEditMode
            ? "Post updated successfully."
            : "Post successfully published to community.",
        );
        reset();
        setPreviewImage("");
        router.push("/dashboard/trainer/my-posts");
      }
    } catch (error) {
      toast.error("Failed to execute database transaction.");
      console.log("Error connecting to backend:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 bg-[#131313] text-[#e5e2e1] font-sans">
      {/* SECTION HEADER */}
      <div className="mb-12">
        <p className="font-mono text-xs text-[#caf300] mb-2 uppercase tracking-[0.2em]">
          SECURE ACCESS // TRAINER PORTAL
        </p>
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase mb-4 italic tracking-tight text-white border-l-4 border-[#caf300] pl-4">
          {!isEditMode ? "CREATE POST" : "UPDATE POST"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* MAIN BENTO CONTAINER */}
        <div className="bg-[#1c1b1b] border border-[#caf300]/10 p-6 md:p-8 rounded-sm space-y-6">
          
          {/* Post Title Input */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Post Title
            </label>
            <input
              type="text"
              placeholder="e.g. HYPERTROPHY VOLUME RATIOS"
              {...register("title", {
                required: "Post title is a required protocol",
              })}
              className={`bg-[#201f1f] border p-4 font-sans text-[#caf300] placeholder-[#8f9378]/40 focus:outline-none focus:ring-1 rounded-sm transition-all uppercase tracking-wide ${
                errors.title
                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500"
                  : "border-[#444932]/50 focus:border-[#caf300] focus:ring-[#caf300]"
              }`}
            />
            {errors.title && (
              <span className="text-red-400 text-xs mt-1 italic">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Attach Visual Asset (Image Upload) */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Attach Visual Asset
            </label>
            <label className="bg-[#201f1f] border-2 border-dashed border-[#444932]/40 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-[#caf300]/60 transition-colors rounded-sm min-h-[220px] relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  {isUploading ? (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                      <ImSpinner9 className="size-8 text-[#caf300] animate-spin" />
                      <p className="font-mono text-[10px] text-[#caf300] tracking-widest">
                        UPLOADING PROTOCOL...
                      </p>
                    </div>
                  ) : (
                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-[2px] border border-[#caf300]/30">
                      <p className="font-mono text-[10px] text-[#caf300] tracking-wider">
                        CHANGE ASSET
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <CloudArrowUpIn className="size-10 text-[#caf300] mb-3 transition-transform group-hover:scale-110" />
                  <p className="font-mono text-sm text-white font-bold tracking-widest uppercase">
                    Upload Image
                  </p>
                  <p className="text-[10px] text-[#8f9378] mt-2 font-mono uppercase tracking-wider">
                    Supported Formats: JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>
              )}
            </label>
            <input
              type="hidden"
              {...register("image", {
                required: "Community intelligence requires a visual component.",
              })}
            />
            {errors.image && (
              <span className="text-red-400 text-xs mt-1 italic text-center block">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Content / Description Textarea */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
              Content / Description
            </label>
            <textarea
              rows="8"
              placeholder="Initialize content sequence..."
              {...register("description", {
                required: "Core content matrix cannot be empty",
              })}
              className={`bg-[#201f1f] border p-4 font-sans text-white placeholder-[#8f9378]/40 focus:outline-none focus:ring-1 rounded-sm transition-all resize-none ${
                errors.description
                  ? "border-red-500/60 focus:border-red-500 focus:ring-red-500"
                  : "border-[#444932]/50 focus:border-[#caf300] focus:ring-[#caf300]"
              }`}
            />
            {errors.description && (
              <span className="text-red-400 text-xs mt-1 italic">
                {errors.description.message}
              </span>
            )}
          </div>

        </div>

        {/* FOOTER METADATA AND CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-[#444932]/20">
          {/* Status Sub-text */}
          <div className="flex items-center gap-2 text-[#8f9378] font-mono text-[10px] uppercase tracking-wider self-start sm:self-center">
            <span className="size-2 rounded-full bg-[#caf300] animate-pulse" />
            Trainer Authenticated // System Ready
          </div>

          {/* Form Action Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                toast.success("Draft cache synchronized successfully.");
                router.push("/dashboard/trainer/my-forum-posts");
              }}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#444932] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#131313] hover:border-white transition-all flex items-center justify-center gap-2 rounded-sm"
            >
              <RiDraftLine className="size-4" /> Save Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#caf300] text-[#131313] font-mono text-xs font-black uppercase tracking-widest hover:bg-[#b0d500] transition-all flex items-center justify-center gap-2 rounded-sm shadow-[0_4px_20px_rgba(202,243,0,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Processing Protocol...{" "}
                  <ImSpinner9 className="size-4 animate-spin" />
                </>
              ) : (
                <>
                  <Thunderbolt className="size-4 font-bold" />{" "}
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