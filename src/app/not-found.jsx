import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#131313] px-4 pt-24 text-[#e5e2e1]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#caf300]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col items-center justify-center">
        {/* Image Card */}
        <div className="group relative mb-12">
          {/* Top Neon Glow */}

          <div className="relative overflow-hidden rounded-md  bg-[#1d1d1d] shadow-[0_25px_60px_rgba(0,0,0,.6)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcM7tSSp91M1NJ06mJ5NA5UN7MNA0buP8zOGzlu1w4LnvajOA9SbKwEJBArP4vnTul8koCJfKkDg3kXY7qzhfer9rX-V2N1UZOYznYkWGdEOPAu0Iloor1lMGb8k4E3JnesvXBKcSNdxhzkLWYbwbfB-9C4FRrgDWeedljw6d9uEw1QGnZgny2AsIka9eTLwg3VbRUmBxN3E_JDeZQ3fQLlGGwGq6GxCPibiqrVaX_6YMIKZcDrSoUDGkLi4OztVNSM7f-zioI-2o"
              alt="404 Illustration"
              width={900}
              height={520}
              priority
              className="h-auto w-full max-w-[700px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Shadow Overlay */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Industrial Strip */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-[repeating-linear-gradient(45deg,#caf300,#caf300_12px,#131313_12px,#131313_24px)]" />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-5 right-5 bg-[#caf300] px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-[#171e00] shadow-[0_10px_30px_rgba(202,243,0,.35)]">
            System Failure
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-black uppercase tracking-tight text-white md:text-8xl">
            404 <span className="text-[#caf300]">Error</span>
          </h1>

          <div className="mx-auto my-6 h-[2px] w-24 bg-[#caf300]" />

          <p className="mx-auto max-w-xl text-base leading-8 text-[#bdbdbd] md:text-lg">
            The destination you are seeking has been decommissioned or moved to
            a restricted sector. Your current path has reached a{" "}
            <span className="font-bold uppercase text-white">dead end</span>.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/"
              className="w-full rounded-sm bg-[#caf300] px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-[#171e00] transition hover:brightness-110 sm:w-auto"
            >
              Back to Base
            </Link>

            <Link
              href="/support"
              className="w-full rounded-sm border-2 border-white px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black sm:w-auto"
            >
              Report Issue
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
