import Link from "next/link";

export const metadata = {
  title: "Unauthorized | GymVortex",
};

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#131313] px-6">
      {/* Background Glow */}
      <div className="absolute h-[600px] w-[600px] rounded-full bg-[#caf300]/10 blur-[180px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#caf300]/20 bg-white/5 p-10 text-center backdrop-blur-md">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#caf300] bg-[#caf300]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#caf300]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m0-8h.01M6 10V8a6 6 0 1112 0v2m-9 0h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2z"
            />
          </svg>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#caf300]">
          Error 401
        </p>

        <h1 className="mb-5 text-5xl font-black uppercase text-white">
          Unauthorized
        </h1>

        <p className="mx-auto mb-10 max-w-md text-base leading-7 text-gray-300">
          Sorry, you don't have permission to access this page. Please log in
          with an authorized account or contact the administrator if you think
          this is a mistake.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-[#caf300] px-8 py-4 font-bold uppercase tracking-wider text-black transition hover:scale-105 hover:bg-[#d9ff2d]"
          >
            Login
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/20 px-8 py-4 font-bold uppercase tracking-wider text-white transition hover:border-[#caf300] hover:text-[#caf300]"
          >
            Back Home
          </Link>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-gray-500">
            GymVortex Security System • Access Restricted
          </p>
        </div>
      </div>
    </main>
  );
}