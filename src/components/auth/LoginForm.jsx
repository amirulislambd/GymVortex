"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";

// Strategic authentication complexity matrices
const PASSWORD_REQUIREMENTS = [
  { label: "6+ CHARACTERS", test: (v) => v.length >= 6 },
  { label: "UPPERCASE LETTER", test: (v) => /[A-Z]/.test(v) },
  { label: "LOWERCASE LETTER", test: (v) => /[a-z]/.test(v) },
];

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Initialize react-hook-form modules
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch the password state for real-time terminal diagnostics
  const watchPassword = watch("password");

  // Handle standard Email & Password credentials authentication using React Hook Form data
  const handleCredentialsLogin = async (data) => {
    setIsLoading(true);
    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Access authorized. Welcome back, operative.");
            router.push(redirectTo);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Authentication protocols failed.",
            );
          },
        },
      });
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Critical system error during initialization.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OAuth provider login via Google
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      console.error("Google Auth error:", error);
      toast.error("Google synchronization protocol failed.");
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center md:bg-right xl:bg-[center_right_15%] bg-no-repeat px-4 font-mono select-none bg-blend-overlay bg-[#0a0a0a]/40 transition-all duration-300"
      style={{
        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA97eZ_BU6JR68dnq3GwlZ23wG62C2m5fw8_fr6lIOVodqTfG3D9hbLIVdpGU5JsHsUbF7gMBitlh4c-abrk5sUkyxXBvZyieZpw_9d_I-Y6-91tqs-66VCR4AtXYGO7F5aZDx3bvRTZEHNoyviWqMwxw1tjpJwXE9UHZn4-z2-sowfzKOeFDzXrSe58LVdaAaG5uWYQekdKcvNDiq5TyZpcQFO-09DH3JtcFqQaPUtyDkBlwzkDEd0JSo9_0vGVIsLXV515SVd_Ys')`
      }}
    >
      {/* Top Header branding section */}
      <div className="text-center mb-8 tracking-[0.2em] z-10">
        <h2 className="text-[#caf300] text-xs font-black uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          GYMVORTEX
        </h2>
        <h1 className="text-neutral-300 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          INDUSTRIAL ATHLETICS ENGINEERING
        </h1>
      </div>

      {/* Main Tactical Command Box Container */}
      <div className="relative w-full max-w-[440px] bg-[#0c0c0c]/95 border border-[#caf300]/20 p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] backdrop-blur-sm z-10 before:absolute before:inset-0 before:border-[1px] before:border-neutral-800/60 before:m-[2px] before:pointer-events-none">
        
        {/* Decorative Sci-Fi Corner Bracket Trims */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#caf300]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#caf300]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#caf300]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#caf300]" />

        {/* Command Box Sub-Header Info */}
        <div className="mb-6">
          <h3 className="text-white text-xs font-black tracking-widest uppercase mb-1">
            COMMAND CENTER
          </h3>
          <p className="text-neutral-400 text-[11px] tracking-wide font-sans">
            Authorize access to your training architecture.
          </p>
        </div>

        {/* Credentials Authentication Form */}
        <form onSubmit={handleSubmit(handleCredentialsLogin)} className="space-y-5">
          {/* Email Terminal Input Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                <span>@</span> IDENTITY (EMAIL)
              </label>
              <span className="text-neutral-600 text-[9px]">DB:MN</span>
            </div>
            <input
              type="email"
              placeholder="OPERATOR@GYMVORTEX.IO"
              {...register("email", { required: "Identity email parameter is required." })}
              className={`w-full bg-[#111111]/90 border px-4 py-3 text-xs text-white uppercase placeholder-neutral-700 tracking-wider focus:outline-none transition-colors ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-[#caf300]/50"
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-[9px] mt-1 tracking-wide uppercase">{errors.email.message}</p>
            )}
          </div>

          {/* Password Terminal Input Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                <span>⚿</span> ACCESS KEY
              </label>
              <button 
                type="button"
                className="text-[#caf300]/80 hover:text-[#caf300] text-[9px] font-bold tracking-wider transition-colors focus:outline-none"
              >
                RESET
              </button>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password", { 
                  required: "Access key parameter is required.",
                  validate: {
                    meetsRequirements: (value) => 
                      PASSWORD_REQUIREMENTS.every((req) => req.test(value)) || 
                      "Security key fails to meet required encryption profile standards."
                  }
                })}
                className={`w-full bg-[#111111]/90 border pl-4 pr-10 py-3 text-xs text-white placeholder-neutral-700 tracking-widest focus:outline-none transition-colors ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-[#caf300]/50"
                }`}
                disabled={isLoading}
              />
              {/* Password Visibility Toggle Feature */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-neutral-500 hover:text-[#caf300] transition-colors focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? <EyeSlash className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Live Password Diagnostics Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-neutral-900/60">
              {PASSWORD_REQUIREMENTS.map((req, idx) => {
                const isValid = req.test(watchPassword || "");
                return (
                  <div 
                    key={idx}
                    className={`flex items-center gap-1.5 text-[9px] tracking-widest font-mono uppercase transition-colors duration-300 ${
                      isValid ? "text-[#caf300]" : "text-neutral-600"
                    }`}
                  >
                    <span>{isValid ? "[✔]" : "[ ]"}</span>
                    <span>{req.label}</span>
                  </div>
                );
              })}
            </div>

            {errors.password && (
              <p className="text-red-500 text-[9px] mt-2 tracking-wide uppercase">{errors.password.message}</p>
            )}
          </div>

          {/* Live Diagnostics Indicator Line */}
          <div className="flex items-center gap-2 text-[9px] text-neutral-400 tracking-wider pt-1">
            <span className="w-1 h-1 rounded-full bg-[#caf300] animate-pulse" />
            <span>SYSTEM READY // AWAITING AUTH</span>
          </div>

          {/* Core Initialization Form Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#caf300] hover:bg-white text-black font-black text-xs tracking-[0.2em] uppercase py-3.5 flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              "INITIALIZING..."
            ) : (
              <>
                INITIALIZE LOGIN <span>⚡</span>
              </>
            )}
          </button>
        </form>

        {/* Tactical Separation Grid Line Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full h-[1px] bg-neutral-800/80" />
          <span className="absolute bg-[#0c0c0c] px-3 text-[9px] text-neutral-500 tracking-[0.25em] uppercase font-bold">
            AUTHENTICATION PROTOCOLS
          </span>
        </div>

        {/* OAuth Integration Section */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full bg-transparent hover:bg-white/5 border border-neutral-700 text-white font-bold text-xs tracking-[0.18em] uppercase py-3 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <FcGoogle className="size-4" />
            SYNC WITH GOOGLE
          </button>

          {/* Registration Redirect Anchor Option */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-neutral-400 tracking-wide font-sans">
              New operative?{" "}
              <Link 
                href="/register" 
                className="text-[#caf300] hover:underline font-mono font-bold uppercase tracking-wider"
              >
                Register for GymVortex
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Cyberpunk Diagnostics Footer Status bar metadata elements */}
      <div className="w-full max-w-[440px] flex justify-between items-center mt-6 text-[9px] text-neutral-400 tracking-widest uppercase px-1 z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-neutral-300">
            <span className="w-1 h-1 bg-[#caf300] rounded-full" />
            SYSTEM STATUS: ACTIVE
          </div>
          <div>LAT. 23.8103° N | LON. 90.4125° E</div>
        </div>
        <div className="text-right space-y-0.5">
          <div className="font-bold text-neutral-300">© 2026 GV INDUSTRIAL</div>
          <div>V 4.0.2 / ALPHA CORE</div>
        </div>
      </div>
    </div>
  );
}