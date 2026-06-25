import { GetUserSession } from "@/lib/core/session";
import Link from "next/link";

export default async function ForbiddenPage() {
const user = await GetUserSession();
const role = user?.role;
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#131313] px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#caf300]/10 blur-[140px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#caf300 1px,transparent 1px),
            linear-gradient(to bottom,#caf300 1px,transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#caf300]/20 bg-white/5 p-10 text-center backdrop-blur-lg">

        {/* Error Code */}
        <h1 className="text-8xl font-black tracking-widest text-[#caf300] drop-shadow-lg">
          403
        </h1>

        {/* Badge */}
        <div className="mx-auto mt-6 inline-flex rounded-full border border-red-500/30 bg-red-500/15 px-5 py-2">
          <span className="font-semibold uppercase tracking-[0.3em] text-red-400">
            Access Denied
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-4xl font-bold text-white">
          Forbidden Access
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-400">
          You are successfully authenticated, but your account doesn't have
          permission to access this page.
        </p>

        {/* Warning Box */}
        <div className="mt-10 rounded-2xl border border-[#caf300]/20 bg-[#caf300]/5 p-6">
          <p className="text-[#caf300] font-semibold uppercase tracking-widest">
            Permission Required
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            If you believe this is a mistake, please contact an administrator or
            return to your dashboard.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-[#caf300] px-8 py-4 font-bold uppercase tracking-widest text-black transition hover:scale-105 hover:shadow-[0_0_30px_rgba(202,243,0,0.4)]"
          >
            Go Home
          </Link>

          <Link
            href={`/dashboard/${role}`}
            className="rounded-xl border border-[#caf300]/40 px-8 py-4 font-bold uppercase tracking-widest text-[#caf300] transition hover:bg-[#caf300] hover:text-black"
          >
            Dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm uppercase tracking-[0.3em] text-gray-600">
          Error Code • 403 Forbidden
        </p>
      </div>
    </main>
  );
}