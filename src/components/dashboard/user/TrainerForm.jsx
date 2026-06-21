"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaArrowRight, FaCheckCircle, FaRegHourglass } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { FiUploadCloud } from "react-icons/fi";
import { Select, ListBox } from "@heroui/react";

import toast from "react-hot-toast";
import { TrainerApplication } from "@/lib/action/application";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// ─── Pending State UI ─────────────────────────────────────────────────────────
function PendingState() {
  return (
    <main className="py-16 px-4 max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full text-center">
        <div className="mb-6 flex justify-center relative">
          <div className="absolute inset-0 bg-[#caf300]/10 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-20 h-20 border-2 border-[#caf300] flex items-center justify-center bg-[#0e0e0e]">
            <FaRegHourglass className="text-4xl text-[#caf300] animate-pulse" />
          </div>
        </div>

        <h1
          className="text-3xl md:text-4xl font-black tracking-tight uppercase text-[#caf300] italic mb-6"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          APPLICATION TRANSMITTED
        </h1>

        <div className="bg-[#141414] border border-[#caf300]/10 p-6 text-left relative overflow-hidden mb-8">
          <div
            className="absolute top-0 left-0 w-full h-1 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(45deg,#caf300,#caf300 10px,#171e00 10px,#171e00 20px)",
            }}
          />
          <p className="text-sm text-[#e5e2e1] leading-relaxed mb-4">
            Your profile and credentials have been routed to the{" "}
            <span className="text-[#caf300] font-bold">
              GymVortex Command Center
            </span>
            .
          </p>
          <div className="flex items-center gap-4 p-4 bg-[#1c1b1b] border border-[#444932]/30">
            <div className="w-2.5 h-2.5 bg-[#caf300] rounded-full animate-ping shrink-0" />
            <div className="flex-1">
              <span
                className="text-[10px] text-[#c5c9ac] uppercase block tracking-wider mb-0.5"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Queue Placement
              </span>
              <span
                className="text-base font-black text-white uppercase tracking-wide"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                PENDING CLEARANCE
              </span>
            </div>
            <FaRegHourglass className="text-xl text-[#444932] animate-pulse shrink-0" />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function TrainerForm({ initialUser, }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: initialUser?.name || "",
      experience: "",
      specialty: "weights",
      motivation: "",
      certificationImage: "",
    },
  });

  // ── Check if already applied ──────────────────────────────────────
  useEffect(() => {
    const checkApplication = async () => {
      if (!initialUser?.email) {
        setCheckingStatus(false);
        return;
      }
      try {
        const res = await getMyApplication(initialUser.email);
        if (res?.status === "pending" || res?.status === "approved") {
          setAlreadyApplied(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkApplication();
  }, [initialUser?.email]);

  // ── Image upload ──────────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const result = await response.json();
      if (result.success) {
        setValue("certificationImage", result.data.url, {
          shouldValidate: true,
        });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      console.error("ImgBB upload failed:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ── Submit ────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    const toastId = toast.loading("Submitting application...");
    try {
      const result = await TrainerApplication({
        fullName: data.fullName,
        experience: parseInt(data.experience),
        specialty: data.specialty,
        motivation: data.motivation,
        certificationImage: data.certificationImage || "",
        userName: initialUser?.name || "",
        userEmail: initialUser?.email || "",
        userImage: initialUser?.image || "",
        applicantId: initialUser?.id || "",
       
      });

      if (result?.success) {
        toast.success("Application submitted successfully!", { id: toastId });
        setIsSuccess(true);
        setAlreadyApplied(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (result?.message === "You already have a pending application") {
        toast.error("You already have a pending application!", { id: toastId });
        setAlreadyApplied(true);
      } else {
        toast.error(result?.message || "Submission failed. Try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      console.error("Submission failed:", error);
    }
  };

  // ── Loading ───────────────────────────────────────────────────────
  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ImSpinner9 className="text-3xl text-[#caf300] animate-spin" />
      </div>
    );
  }

  // ── Already applied / Success ─────────────────────────────────────
  if (alreadyApplied || isSuccess) {
    return <PendingState />;
  }

  // ── Form ──────────────────────────────────────────────────────────
  return (
    <main className="py-8 sm:py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Info Panel */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-center sticky top-24 h-fit pr-6">
        <h2
          className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6 italic"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          JOIN THE
          <br />
          <span className="text-[#caf300]">VORTEX ENGINE</span>
        </h2>
        <p className="text-base text-[#c5c9ac] mb-8 leading-relaxed">
          We don't hire trainers. We recruit leaders. Join the elite ranks of
          GYMVORTEX Industrial Athletics and push the boundaries of human
          performance.
        </p>

        {[
          {
            icon: "⚡",
            title: "PERFORMANCE PAY",
            desc: "Industry-leading compensation packages.",
          },
          {
            icon: "🏭",
            title: "ELITE FACILITY",
            desc: "Access to world-class industrial equipment.",
          },
          {
            icon: "📈",
            title: "CAREER GROWTH",
            desc: "Build your brand within the Vortex ecosystem.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 p-4 border border-[#444932]/30 bg-[#141414] mb-3"
          >
            <div className="w-10 h-10 bg-[#caf300]/10 border border-[#caf300]/20 flex items-center justify-center text-lg shrink-0">
              {item.icon}
            </div>
            <div>
              <p
                className="text-[11px] font-bold text-[#caf300] uppercase tracking-widest mb-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {item.title}
              </p>
              <p className="text-sm text-[#c5c9ac]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Form Panel */}
      <div className="lg:col-span-7 w-full">
        <div className="bg-[#141414] border border-[#caf300]/10 p-5 sm:p-8 md:p-10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(45deg,#caf300,#caf300 10px,#171e00 10px,#171e00 20px)",
            }}
          />

          <div className="mb-6 sm:mb-8">
            <span
              className="text-[10px] sm:text-[11px] text-[#caf300] uppercase tracking-widest block mb-1"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              INITIALIZE TRAINER PROTOCOL
            </span>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              Trainer Application
            </h3>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Full Name */}
            <div>
              <label
                className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase mb-2 block tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Full Name
              </label>
              <input
                type="text"
                readOnly
                {...register("fullName")}
                className="w-full bg-[#1c1b1b] border border-[#444932]/40 text-[#e5e2e1]/60 p-3 sm:p-4 text-sm cursor-not-allowed outline-none"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              />
              <p
                className="text-[10px] text-[#444932] mt-1 uppercase tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Pre-filled from profile
              </p>
            </div>

            {/* Experience + Specialty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase mb-2 block tracking-wider"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Experience (Years)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  {...register("experience", {
                    required: "Experience is required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className={`w-full bg-[#1c1b1b] border text-white p-3 sm:p-4 text-sm outline-none focus:border-[#caf300] transition-all ${errors.experience ? "border-red-500" : "border-[#444932]/40"}`}
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                />
                {errors.experience && (
                  <p
                    className="text-red-500 text-[10px] mt-1 uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase mb-2 block tracking-wider"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Primary Specialty
                </label>
                <Controller
                  name="specialty"
                  control={control}
                  rules={{ required: "Specialty is required" }}
                  render={({ field }) => (
                    <Select
                      selectedKey={field.value}
                      onSelectionChange={(key) => field.onChange(key)}
                      placeholder="Select Discipline"
                      className="w-full"
                    >
                      <Select.Trigger
                        className="w-full bg-[#1c1b1b] border border-[#444932]/40 text-white p-3 sm:p-4 text-sm flex justify-between items-center outline-none hover:border-[#caf300] transition-all"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover
                        style={{
                          background: "#1c1b1b",
                          border: "1px solid rgba(202,243,0,0.2)",
                          zIndex: 9999,
                        }}
                      >
                        <ListBox style={{ padding: "4px 0" }}>
                          {[
                            "Yoga Protocol",
                            "Heavy Iron / Weights",
                            "High Velocity Cardio",
                            "Industrial Strength",
                            "CrossFit",
                            "Boxing",
                            "Mobility & Recovery",
                          ].map((label) => (
                            <ListBox.Item
                              key={label}
                              textValue={label}
                              style={{
                                padding: "12px 16px",
                                color: "#e5e2e1",
                                background: "transparent",
                                cursor: "pointer",
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: "13px",
                                outline: "none",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#caf300";
                                e.currentTarget.style.color = "#171e00";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color = "#e5e2e1";
                              }}
                            >
                              {label}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  )}
                />
                {errors.specialty && (
                  <p
                    className="text-red-500 text-[10px] mt-1 uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {errors.specialty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label
                className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase mb-2 block tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Why should you be a trainer?
              </label>
              <textarea
                rows={4}
                placeholder="Detail your operational philosophy..."
                {...register("motivation", {
                  required: "This field is required",
                  minLength: { value: 30, message: "Minimum 30 characters" },
                })}
                className={`w-full bg-[#1c1b1b] border text-white p-3 sm:p-4 text-sm resize-none outline-none focus:border-[#caf300] transition-all ${errors.motivation ? "border-red-500" : "border-[#444932]/40"}`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              />
              {errors.motivation && (
                <p
                  className="text-red-500 text-[10px] mt-1 uppercase"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {errors.motivation.message}
                </p>
              )}
            </div>

            {/* Certification Image */}
            <div>
              <label
                className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase mb-2 block tracking-wider"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Certifications
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#444932]/40 hover:border-[#caf300] transition-colors cursor-pointer bg-[#1c1b1b]/50 flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px] p-4 sm:p-6 group"
              >
                {isUploadingImage ? (
                  <ImSpinner9 className="text-2xl text-[#caf300] animate-spin mb-2" />
                ) : previewImage ? (
                  <div className="relative w-full max-w-[140px] h-20 border border-[#444932]/40 overflow-hidden mb-2">
                    <img
                      src={previewImage}
                      alt="Certification Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FiUploadCloud className="text-3xl text-[#c5c9ac] group-hover:text-[#caf300] transition-colors mb-2" />
                )}
                <p
                  className="text-[10px] sm:text-xs text-[#c5c9ac] uppercase tracking-wide group-hover:text-white transition-colors text-center"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {isUploadingImage
                    ? "Uploading to ImgBB..."
                    : previewImage
                      ? "Change Selected Image"
                      : "Upload Certification Image"}
                </p>
                {watch("certificationImage") && !isUploadingImage && (
                  <span
                    className="text-[10px] text-[#caf300] block mt-1"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    ✓ IMAGE READY
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="w-full bg-[#caf300] text-[#171e00] font-bold text-sm sm:text-base uppercase py-3.5 sm:py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-wider"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <ImSpinner9 className="w-4 h-4 animate-spin" />{" "}
                    Transmitting...
                  </>
                ) : (
                  <>
                    Submit Application <FaArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
