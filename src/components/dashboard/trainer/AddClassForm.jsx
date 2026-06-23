"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  CloudArrowUpIn,
  Thunderbolt,
  Calendar,
  Clock,
  Persons,
  FileText,
  GraduationCap,
  CircleDollar,
} from "@gravity-ui/icons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
  Label,
} from "@heroui/react";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { PostClass } from "@/lib/action/classes";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

export default function AddClassForm({ classData }) {
  const { data: session } = authClient.useSession();
  const [isUploading, setIsUploading] = useState(false);
  const user = session?.user;
  const router = useRouter();
  const params = usePathname();

  const isEditMode = params !== "/dashboard/trainer/add-class";

  // 1. Core visual synchronization for existing images
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (isEditMode && classData?.image) {
      setPreviewImage(classData.image);
    }
  }, [classData, isEditMode]);

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // 2. Continuous Reactive Value Syncing via RHF 'values' property
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // 'values' reacts dynamically to incoming async data updates, ideal for Edit contexts
    values:
      isEditMode && classData
        ? {
            title: classData.title || "",
            description: classData.description || "",
            category: classData.category || "Powerlifting",
            difficulty: classData.difficulty || "Level 1 - Foundational",
            price: classData.price || "",
            days: classData.days || [],
            time: classData.time || "",
            duration: classData.duration || "45 MIN",
            capacity: classData.capacity || "",
            image: classData.image || "",
          }
        : {
            title: "",
            description: "",
            category: "Powerlifting",
            difficulty: "Level 1 - Foundational",
            price: "",
            days: [],
            time: "",
            duration: "45 MIN",
            capacity: "",
            image: "",
          },
  });

  const availableDays = ["M", "T", "W", "T", "F", "S", "S"];
  const selectedDays = watch("days") || [];

  const handleDayToggle = (dayIndex) => {
    const currentDays = [...selectedDays];
    if (currentDays.includes(dayIndex)) {
      const updatedDays = currentDays.filter((d) => d !== dayIndex);
      setValue("days", updatedDays, { shouldValidate: true });
    } else {
      const updatedDays = [...currentDays, dayIndex];
      setValue("days", updatedDays, { shouldValidate: true });
    }
  };

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
        console.log("Uploaded Image URL:", result.data.url);
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
      // Merge updating payload or creation payloads cleanly
      const payload = {
        ...data,
        trainerName: user?.name || classData?.trainerName || "",
        trainerEmail: user?.email || classData?.trainerEmail || "",
        trainerImage: user?.image || classData?.trainerImage || "",
      };

      if (isEditMode && classData?._id) {
        payload._id = classData._id;
      }
      const methodType = isEditMode ? "PUT" : "POST";
      const res = await PostClass(payload, methodType);

      if (res) {
        toast.success(
          isEditMode
            ? "Class updated successfully."
            : "Class successfully deployed.",
        );
        reset();
        setPreviewImage("");
        router.push(`${isEditMode ? "/dashboard/trainer/my-classes" : "/"}`);
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
          Deployment Console
        </p>
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase mb-4 italic tracking-tight text-white">
          {!isEditMode ? "Forging Performance" : "Updating Performance"}
        </h2>
        <div className="h-1 w-24 bg-[#caf300]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* BENTO GRID LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT COLUMN: CORE SPECIFICATIONS CARD (8 SPAN) */}
          <div className="md:col-span-8 bg-[#201f1f]/70 backdrop-blur-md border border-[#caf300]/10 p-6 md:p-8 rounded-sm">
            <h3 className="font-sans font-bold text-lg md:text-xl mb-6 border-b border-[#444932]/30 pb-2 uppercase italic text-white flex items-center gap-2">
              <FileText className="size-5 text-[#caf300]" /> Core Specifications
            </h3>

            <div className="space-y-6">
              {/* Class Identity Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
                  Class Identity (Title)
                </label>
                <input
                  type="text"
                  placeholder="e.g. INDUSTRIAL STRENGTH LVL 4"
                  {...register("title", {
                    required: "Class title is required protocol",
                  })}
                  className={`bg-[#353534]/50 border p-4 font-sans text-[#caf300] placeholder-[#8f9378]/60 focus:outline-none focus:ring-1 rounded-sm transition-all ${
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

              {/* Mission Briefing Textarea */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider">
                  Mission Briefing (Description)
                </label>
                <textarea
                  rows="4"
                  placeholder="Define the load parameters and expected outcomes..."
                  {...register("description", {
                    required: "Briefing parameters are required",
                  })}
                  className={`bg-[#353534]/50 border p-4 font-sans text-white placeholder-[#8f9378]/60 focus:outline-none focus:ring-1 rounded-sm transition-all resize-none ${
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

              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Category Selector */}
                <div className="flex flex-col gap-2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0];
                          field.onChange(value);
                        }}
                        className="w-full"
                      >
                        <Label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <Persons className="size-3.5" /> Category
                        </Label>
                        <SelectTrigger className="bg-[#353534]/50 border border-[#444932]/50 p-4 font-sans text-white focus:outline-none data-[hover=true]:border-[#caf300] rounded-sm flex justify-between items-center w-full min-h-[58px]">
                          <SelectValue className="text-white font-sans text-sm" />
                          <SelectIndicator className="text-white" />
                        </SelectTrigger>
                        <SelectPopover className="bg-[#1c1b1b] border border-[#444932]/50 rounded-sm shadow-xl mt-1">
                          <ListBox className="p-1">
                            {[
                              "Powerlifting",
                              "Metabolic Conditioning",
                              "Industrial Yoga",
                              "Mobility Repair",
                            ].map((cat) => (
                              <ListBoxItem
                                key={cat}
                                textValue={cat}
                                className="p-3 text-sm text-white rounded-sm cursor-pointer transition-colors block w-full data-[hover=true]:bg-[#caf300] data-[hover=true]:text-black"
                              >
                                <span className="text-inherit block w-full">
                                  {cat}
                                </span>
                              </ListBoxItem>
                            ))}
                          </ListBox>
                        </SelectPopover>
                      </Select>
                    )}
                  />
                </div>

                {/* Difficulty Selector */}
                <div className="flex flex-col gap-2">
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <Select
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0];
                          field.onChange(value);
                        }}
                        className="w-full"
                      >
                        <Label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <GraduationCap className="size-3.5" /> Difficulty
                        </Label>
                        <SelectTrigger className="bg-[#353534]/50 border border-[#444932]/50 p-4 font-sans text-white focus:outline-none data-[hover=true]:border-[#caf300] rounded-sm flex justify-between items-center w-full min-h-[58px]">
                          <SelectValue className="text-white font-sans text-sm" />
                          <SelectIndicator className="text-white" />
                        </SelectTrigger>
                        <SelectPopover className="bg-[#1c1b1b] border border-[#444932]/50 rounded-sm shadow-xl mt-1">
                          <ListBox className="p-1">
                            {[
                              "Level 1 - Foundational",
                              "Level 2 - Progressive",
                              "Level 3 - High Output",
                              "Level 4 - Elite Protocol",
                            ].map((lvl) => (
                              <ListBoxItem
                                key={lvl}
                                textValue={lvl}
                                className="p-3 text-sm text-white rounded-sm cursor-pointer transition-colors block w-full data-[hover=true]:bg-[#caf300] data-[hover=true]:text-black"
                              >
                                <span className="text-inherit block w-full">
                                  {lvl}
                                </span>
                              </ListBoxItem>
                            ))}
                          </ListBox>
                        </SelectPopover>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MEDIA & PRICING CARDS */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Image Upload Card */}
            <div className="bg-[#201f1f]/70 backdrop-blur-md border border-[#caf300]/10 p-6 flex-1 flex flex-col rounded-sm">
              <h3 className="font-sans font-bold text-lg mb-4 border-b border-[#444932]/30 pb-2 uppercase italic text-white">
                Visual Asset
              </h3>
              <label className="flex-1 bg-[#353534]/30 border-2 border-dashed border-[#444932]/40 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:border-[#caf300]/60 transition-colors rounded-sm min-h-[160px] relative overflow-hidden">
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
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                        <ImSpinner9 className="size-6 text-[#caf300] animate-spin" />
                        <p className="font-mono text-[10px] text-[#caf300]">
                          UPLOADING PROTOCOL...
                        </p>
                      </div>
                    )}
                    {!isUploading && (
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-[2px]">
                        <p className="font-mono text-[9px] text-[#caf300]">
                          CHANGE IMAGE
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <CloudArrowUpIn className="size-8 text-[#8f9378] mb-2 group-hover:text-[#caf300] transition-colors" />
                    <p className="font-mono text-xs text-[#c5c9ac] font-bold tracking-wider">
                      UPLOAD HERO IMAGE
                    </p>
                    <p className="text-[10px] text-[#8f9378] mt-1 italic">
                      JPG/PNG MAX 5MB
                    </p>
                  </>
                )}
              </label>
              <input
                type="hidden"
                {...register("image", {
                  required: "Class asset deployment required",
                })}
              />
              {errors.image && (
                <span className="text-red-400 text-xs mt-2 italic text-center block">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* Price Input Card */}
            <div className="bg-[#201f1f]/70 backdrop-blur-md border border-[#caf300]/10 p-6 rounded-sm">
              <h3 className="font-sans font-bold text-lg mb-4 border-b border-[#444932]/30 pb-2 uppercase italic text-white flex items-center gap-2">
                <CircleDollar className="size-4 text-[#caf300]" /> Resource Cost
              </h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-xl text-[#caf300]">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price", {
                    required: "Cost scale required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className={`w-full bg-[#353534]/50 border p-4 pl-10 font-sans font-bold text-xl text-[#caf300] focus:outline-none rounded-sm transition-all ${
                    errors.price
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[#444932]/50 focus:border-[#caf300]"
                  }`}
                />
              </div>
              {errors.price && (
                <span className="text-red-400 text-xs mt-1 italic block">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          {/* LOWER SECTION: SCHEDULE & LOGISTICS */}
          <div className="md:col-span-12 bg-[#201f1f]/70 backdrop-blur-md border border-[#caf300]/10 p-6 md:p-8 rounded-sm">
            <h3 className="font-sans font-bold text-lg md:text-xl mb-6 border-b border-[#444932]/30 pb-2 uppercase italic text-white flex items-center gap-2">
              <Calendar className="size-5 text-[#caf300]" /> Schedule & Duration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Day Selection */}
              <div className="space-y-4">
                <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="size-4" /> Class Days
                </label>
                <Controller
                  name="days"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value?.length > 0 ||
                      "Select at least one active unit day",
                  }}
                  render={({ field }) => (
                    <div>
                      <div className="grid grid-cols-7 gap-2">
                        {availableDays.map((day, idx) => {
                          const isSelected = field.value?.includes(idx);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleDayToggle(idx)}
                              className={`aspect-square flex items-center justify-center border transition-all font-mono font-bold text-xs rounded-sm ${
                                isSelected
                                  ? "bg-[#caf300] border-[#caf300] text-[#131313] shadow-[0_0_10px_rgba(202,243,0,0.2)]"
                                  : "border-[#444932] text-[#e5e2e1] hover:bg-[#caf300] hover:text-black hover:border-[#caf300]"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                      {errors.days && (
                        <span className="text-red-400 text-xs mt-2 italic block">
                          {errors.days.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Time and Duration */}
              <div className="space-y-4">
                <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider flex items-center gap-2">
                  <Clock className="size-4" /> Time & Duration
                </label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    {...register("time", { required: "Time lock required" })}
                    className={`flex-1 bg-[#353534]/50 border p-3 text-sm text-[#e5e2e1] focus:outline-none rounded-sm transition-all ${
                      errors.time
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-[#444932]/50 focus:border-[#caf300]"
                    }`}
                  />
                  <select
                    {...register("duration")}
                    className="flex-1 bg-[#353534]/50 border border-[#444932]/50 p-3 text-sm text-[#e5e2e1] focus:outline-none focus:border-[#caf300] rounded-sm transition-all cursor-pointer appearance-none"
                  >
                    <option value="45 MIN" className="bg-[#1c1b1b]">
                      45 MIN
                    </option>
                    <option value="60 MIN" className="bg-[#1c1b1b]">
                      60 MIN
                    </option>
                    <option value="90 MIN" className="bg-[#1c1b1b]">
                      90 MIN
                    </option>
                  </select>
                </div>
                {errors.time && (
                  <span className="text-red-400 text-xs italic block">
                    {errors.time.message}
                  </span>
                )}
              </div>

              {/* Unit Capacity */}
              <div className="space-y-4">
                <label className="font-mono text-xs text-[#c5c9ac] uppercase tracking-wider flex items-center gap-2">
                  <Persons className="size-4" /> Unit Capacity
                </label>
                <input
                  type="number"
                  placeholder="24"
                  {...register("capacity", {
                    required: "Slot capacity matrix required",
                    min: { value: 1, message: "Minimum 1 slot" },
                  })}
                  className={`w-full bg-[#353534]/50 border p-3 text-sm text-white focus:outline-none rounded-sm transition-all ${
                    errors.capacity
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[#444932]/50 focus:border-[#caf300]"
                  }`}
                />
                {errors.capacity && (
                  <span className="text-red-400 text-xs italic block">
                    {errors.capacity.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TERMINAL ACTION CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 md:mt-12 md:pt-8 border-t border-[#444932]/20">
          <button
            type="button"
            onClick={() => router.push("/dashboard/trainer/my-classes")}
            className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#131313] transition-all active:scale-[0.98] rounded-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 bg-[#caf300] text-[#131313] font-mono text-xs font-black uppercase tracking-widest hover:bg-[#b0d500] transition-all active:scale-[0.98] flex items-center justify-center gap-2 rounded-sm shadow-[0_4px_20px_rgba(202,243,0,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                Processing Protocol...{" "}
                <ImSpinner9 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                {isEditMode ? "Update Class Matrix" : "Submit for Deployment"}{" "}
                <Thunderbolt className="size-4 font-bold" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
