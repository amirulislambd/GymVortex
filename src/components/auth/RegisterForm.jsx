"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddAPhoto, MdOutlineBarChart } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";
import { FiZap, FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

// Password requirements matching the specified rules
const PASSWORD_REQUIREMENTS = [
  { label: "6+ CHARACTERS", test: (v) => v.length >= 6 },
  { label: "UPPERCASE LETTER", test: (v) => /[A-Z]/.test(v) },
  { label: "LOWERCASE LETTER", test: (v) => /[a-z]/.test(v) },
];

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const passwordValue = watch("password", "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
  }

  // Handle form submission with ImgBB and Better-Auth integrations
  async function onSubmit(data) {
    let uploadedImageUrl = "";

    if (avatarFile) {
      try {
        // --- IMGBB IMAGE UPLOAD INTEGRATION ---
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!apiKey) {
          console.error("ImgBB API key is missing in environment variables.");
          toast.error("Image upload configuration missing.");
          return;
        }

        const formData = new FormData();
        formData.append("image", avatarFile);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const imgbbData = await imgbbResponse.json();

        if (imgbbData.success) {
          uploadedImageUrl = imgbbData.data.url;
          console.log(
            "Image successfully uploaded to ImgBB:",
            uploadedImageUrl,
          );
        } else {
          console.error("ImgBB upload failed:", imgbbData.error);
          toast.error("Failed to upload identity image.");
          return;
        }
      } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
        toast.error("Image upload service encountered an error.");
        return;
      }
    }

    try {
      // --- BETTER-AUTH SIGN UP INTEGRATION ---
      // Note: Ensure your backend schema supports 'role' and 'plan' if using them directly here
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        image: uploadedImageUrl,
        plan: "free_user",
      });

      // Better-Auth returns an standard object structure containing { data, error }
      if (res?.error) {
        throw new Error(
          res.error.message || "Authentication protocol rejected registration.",
        );
      }

      if (res?.data) {
        toast.success("Registration successful!");
        console.log("User successfully registered:", res.data);
        router.push(redirectTo);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      console.error("Registration failed via Better-Auth:", error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#131313] text-[#e5e2e1] font-sans flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:items-stretch">
        {/* ================= LEFT SIDE: BRANDING / HERO SECTION ================= */}
        <div className="hidden md:flex lg:col-span-5 flex-col justify-between py-6 space-y-10">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-[#caf300] leading-none mb-4">
              FORGE<span className="text-white">FIT</span>
            </h1>
            <p className="text-base text-neutral-400 max-w-sm font-medium leading-relaxed">
              Industrial-grade training for those who demand absolute
              performance.
            </p>
          </div>

          <div className="space-y-5">
            {/* Feature 1: Power First */}
            <div className="flex items-start gap-4">
              <div className="text-[#caf300] bg-[#1c1b1b] p-3 rounded-lg border border-neutral-800">
                <FiZap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Power First
                </h3>
                <p className="text-sm text-neutral-400 mt-0.5">
                  Built for athletes, not spectators.
                </p>
              </div>
            </div>

            {/* Feature 2: Data Driven */}
            <div className="flex items-start gap-4">
              <div className="text-[#caf300] bg-[#1c1b1b] p-3 rounded-lg border border-neutral-800">
                <MdOutlineBarChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Data Driven
                </h3>
                <p className="text-sm text-neutral-400 mt-0.5">
                  Track metrics with mechanical precision.
                </p>
              </div>
            </div>
          </div>

          {/* Cinematic Live Banner Image */}
          <div className="hidden lg:block relative group h-44 rounded-xl overflow-hidden border border-neutral-800/80">
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent z-10"></div>
            <Image
              className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
              alt="Industrial Gym"
              width={600}
              height={176}
              priority
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#caf300] border border-[#caf300] px-2 py-0.5 uppercase rounded-sm">
                Live Now
              </span>
              <p className="text-white font-black tracking-tight mt-1.5 text-xs">
                INDUSTRIAL OPEN 2024
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: REGISTRATION FORM SECTION ================= */}
        <div className="col-span-1 lg:col-span-7">
          <div className="w-full rounded-md border-t border-l border-white/5 bg-[#1c1b1b] p-8 md:p-10 relative overflow-hidden shadow-2xl">
            {/* Card Header */}
            <div className="flex items-end justify-between border-b border-neutral-800/60 pb-6">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white uppercase">
                  RECRUITMENT
                </h2>
                <p className="mt-1 font-mono text-[10px] tracking-widest text-[#caf300] uppercase">
                  PHASE 01: IDENTIFICATION
                </p>
              </div>
              <a
                href="#"
                className="font-mono text-[10px] tracking-widest text-neutral-400 transition-colors hover:text-[#caf300] uppercase border-b border-transparent hover:border-[#caf300] pb-0.5"
              >
                ALREADY MEMBER? LOGIN
              </a>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* Identity image upload widget */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#161515] border border-neutral-800 rounded-sm">
                <label
                  htmlFor="identity-image"
                  className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-neutral-700 bg-[#242323] transition-colors hover:border-[#caf300] flex items-center justify-center"
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Athlete identity preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <MdAddAPhoto className="h-6 w-6 text-neutral-400 transition-colors group-hover:text-[#caf300]" />
                  )}
                  <input
                    id="identity-image"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </label>
                <div className="space-y-0.5 text-center sm:text-left">
                  <p className="text-sm font-bold text-white uppercase tracking-wide">
                    IDENTITY IMAGE
                  </p>
                  <p className="text-xs text-neutral-400 max-w-xs leading-normal">
                    Upload a clear headshot for your athlete profile. JPG/PNG.
                    Max 5MB.
                  </p>
                </div>
              </div>

              {/* Full name + Email inputs group */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase"
                  >
                    FULL NAME
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="ALEX STEFANO"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className="w-full border border-neutral-800 bg-[#161515] px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:border-[#caf300] focus:outline-none focus:ring-0 uppercase transition-all rounded-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400 font-mono">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="STEFANO@FORGEFIT.CO"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full border border-neutral-800 bg-[#161515] px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:border-[#caf300] focus:outline-none focus:ring-0 uppercase transition-all rounded-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 font-mono">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password input with validation */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase"
                >
                  SECURITY PROTOCOL (PASSWORD)
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        minLength: (v) =>
                          v.length >= 6 || "Minimum 6 characters",
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) ||
                          "Must contain at least one uppercase letter",
                        hasLower: (v) =>
                          /[a-z]/.test(v) ||
                          "Must contain at least one lowercase letter",
                      },
                    })}
                    className="w-full border border-neutral-800 bg-[#161515] px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:border-[#caf300] focus:outline-none focus:ring-0 transition-all rounded-none tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-400 font-mono">
                    {errors.password.message}
                  </p>
                )}

                {/* Password Live Validation Badges */}
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {PASSWORD_REQUIREMENTS.map(({ label, test }) => {
                    const met = passwordValue ? test(passwordValue) : false;
                    return (
                      <span
                        key={label}
                        className={`border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase transition-colors rounded-none ${
                          met
                            ? "border-[#caf300] text-[#caf300]"
                            : "border-neutral-800 text-neutral-600"
                        }`}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-2 bg-[#caf300] py-4 font-black tracking-tight text-lg text-black transition-all hover:bg-[#b5da00] hover:shadow-[0_0_25px_rgba(202,243,0,0.25)] active:scale-[0.99] disabled:opacity-60 uppercase rounded-none"
                >
                  <span>
                    {isSubmitting ? "PROCESSING..." : "JOIN THE ELITE"}
                  </span>
                  <HiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center font-mono text-[9px] text-neutral-500 mt-5 tracking-widest uppercase opacity-50">
                  BY JOINING, YOU ACCEPT THE PROTOCOL TERMS & CONDITION.
                </p>
              </div>
            </form>

            {/* Technical corner accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#caf300]/20"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#caf300]/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;