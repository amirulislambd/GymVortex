import Image from "next/image";
import Link from "next/link";

const regimes = [
  {
    id: 1,
    title: "POWER PLATEAU",
    duration: "45 MIN",
    category: "STRENGTH",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    id: 2,
    title: "VELOCITY CORE",
    duration: "30 MIN",
    category: "CARDIO",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  },
];

export default function FavoriteRegimes() {
  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          FAVORITE REGIMES
        </h2>
        <Link
          href="/dashboard/user/favorites"
          className="text-[10px] font-black uppercase tracking-widest text-[#caf300] hover:underline"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          CUSTOMIZE
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3">
        {regimes.map((r) => (
          <div
            key={r.id}
            className="relative overflow-hidden group cursor-pointer border border-neutral-900 hover:border-[#caf300]/30 transition-all"
          >
            {/* Image */}
            <div className="relative h-28 sm:h-32 w-full overflow-hidden">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-full object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
              <p
                className="text-xs sm:text-sm font-black uppercase text-white leading-tight"
                style={{ fontFamily: "Archivo Narrow, sans-serif" }}
              >
                {r.title}
              </p>
              <p
                className="text-[9px] font-bold uppercase tracking-widest text-[#caf300] mt-0.5"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {r.duration} • {r.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}