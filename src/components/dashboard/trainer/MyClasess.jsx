"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FiSearch, FiSliders, FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function MyClasses({ initialClasses = [] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // ── 🎯 Reading the 'search' parameter from URL ──
  const searchTerm = searchParams.get("search") || "";

  // Function to update the URL parameters whenever typing in the input field
  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term); // Sets ?search=your_text in the URL
    } else {
      params.delete("search"); // Removes the search parameter if the input is empty
    }
    // Updates the URL seamlessly, triggering the Server Component to re-fetch from DB
    replace(`${pathname}?${params.toString()}`);
  };

  // Helper function to map days array from [1, 3] to readable string format like MON, WED
  const getDaysName = (daysArr) => {
    const daysMap = { 0: "SUN", 1: "MON", 2: "TUE", 3: "WED", 4: "THU", 5: "FRI", 6: "SAT" };
    if (!daysArr || !Array.isArray(daysArr)) return "SPECIAL";
    return daysArr.map(d => daysMap[d]).join(", ");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-white font-sans selection:bg-[#caf300] selection:text-black">
      
      {/* ── Section 1: Search and Filter Bar ── */}
      <div className="bg-[#141414] border border-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xs font-mono font-black tracking-widest text-zinc-400 uppercase">
          ACTIVE TRAINING ROSTER (DATABASE SYNCED)
        </h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search classes..."
              defaultValue={searchTerm} // Using defaultValue to preserve input focus
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-[#1c1c1c] border border-zinc-800 text-zinc-300 pl-10 pr-4 py-2 font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-zinc-600 transition-colors placeholder-zinc-600"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
          </div>
          <button className="bg-transparent hover:bg-[#caf300] text-[#caf300] hover:text-black border border-[#caf300] px-4 py-2 font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shrink-0">
            <FiSliders /> FILTER
          </button>
        </div>
      </div>

      {/* ── Section 2: Data Table / Card Grid ── */}
      {initialClasses.length === 0 ? (
        <div className="bg-[#141414] border border-zinc-900 p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
          [ NO MATCHING DATABASE PROTOCOLS FOUND ]
        </div>
      ) : (
        <>
          {/* 🖥️ Desktop View: Clean Tactical Table */}
          <div className="hidden md:block bg-[#141414] border border-zinc-900 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-[#111] font-mono text-[11px] font-black tracking-widest text-zinc-500 uppercase">
                  <th className="py-4 px-6 w-[35%]">CLASS NAME & FOCUS</th>
                  <th className="py-4 px-6 w-[25%]">SCHEDULE</th>
                  <th className="py-4 px-6 w-[20%]">STATUS</th>
                  <th className="py-4 px-6 text-right w-[20%]">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60">
                {initialClasses.map((item) => {
                  const currentBookings = item.bookingCount || 0;
                  const maxCapacity = item.capacity || 10;
                  const percentFilled = Math.min((currentBookings / maxCapacity) * 100, 100);

                  return (
                    <tr key={item._id} className="hover:bg-[#181818] transition-colors group">
                      <td className="py-5 px-6 flex items-center gap-4 relative">
                        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#caf300] scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover filter grayscale group-hover:grayscale-0 transition-all border border-zinc-800"
                        />
                        <div>
                          <div className="font-black text-sm uppercase tracking-tight text-white group-hover:text-[#caf300] transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">
                            Specialty: {item.category}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-mono">
                        <div className="text-xs font-black uppercase text-zinc-300">{getDaysName(item.days)}</div>
                        <div className="text-[10px] text-zinc-500 font-medium mt-1">{item.time} - ({item.duration})</div>
                      </td>
                      <td className="py-5 px-6 font-mono">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-zinc-300">{currentBookings}/{maxCapacity}</span>
                          <div className="w-24 bg-zinc-900 h-1.5 border border-zinc-800 relative">
                            <div className="bg-[#caf300] h-full" style={{ width: `${percentFilled}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 font-mono text-[9px] font-bold">

  <button className="bg-transparent border border-[#caf300] text-[#caf300] hover:bg-[#caf300] hover:text-black px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200">
    <FiUsers className="text-[11px]" /> ATTENDEES
  </button>

  <button className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200">
    <FiEdit2 className="text-[11px]" /> UPDATE
  </button>

  <button className="bg-transparent border border-red-900/60 text-red-500 hover:bg-red-500 hover:text-white px-2.5 py-1.5 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all duration-200">
    <FiTrash2 className="text-[11px]" /> DELETE
  </button>
</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 📱 Mobile View: Responsive Card Grid Layout */}
          <div className="block md:hidden space-y-4">
            {initialClasses.map((item) => {
              const currentBookings = item.bookingCount || 0;
              const maxCapacity = item.capacity || 10;
              const percentFilled = Math.min((currentBookings / maxCapacity) * 100, 100);

              return (
                <div key={item._id} className="bg-[#141414] border border-zinc-900 p-5 space-y-4 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#caf300]" />
                  <div className="flex items-start gap-4">
                    <img src={item.image} alt={item.title} className="w-14 h-14 object-cover filter grayscale border border-zinc-800 shrink-0" />
                    <div>
                      <h3 className="font-black text-base uppercase tracking-tight text-white">{item.title}</h3>
                      <p className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">Specialty: {item.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-y border-zinc-900 py-3 font-mono text-xs">
                    <div>
                      <div className="text-zinc-600 font-bold uppercase tracking-widest text-[9px]">SCHEDULE</div>
                      <div className="text-zinc-300 font-black uppercase mt-0.5">{getDaysName(item.days)}</div>
                    </div>
                    <div>
                      <div className="text-zinc-600 font-bold uppercase tracking-widest text-[9px]">CAPACITY</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-zinc-300 font-black">{currentBookings}/{maxCapacity}</span>
                        <div className="flex-1 bg-zinc-900 h-1.5 border border-zinc-800"><div className="bg-[#caf300] h-full" style={{ width: `${percentFilled}%` }} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[9px] font-bold pt-1">
  {/* ATTEND / ATTENDEES */}
  <button className="bg-transparent border border-[#caf300] text-[#caf300] hover:bg-[#caf300] hover:text-black py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200">
    <FiUsers className="text-[11px]" /> ATTEND
  </button>

  {/* EDIT / UPDATE */}
  <button className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200">
    <FiEdit2 className="text-[11px]" /> EDIT
  </button>

  {/* DEL / DELETE */}
  <button className="bg-transparent border border-red-900/60 text-red-500 hover:bg-red-500 hover:text-white py-2.5 uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer transition-all duration-200">
    <FiTrash2 className="text-[11px]" /> DEL
  </button>
</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Section 3: Minimalist Counter Bar ── */}
      <div className="bg-[#141414] border border-zinc-900 px-6 py-4 flex justify-between items-center font-mono text-xs uppercase tracking-wider">
        <div className="text-zinc-500 font-medium">
          Total Retrieved Protocols: <span className="text-[#caf300] font-black">{initialClasses.length}</span>
        </div>
        <div className="text-zinc-600 text-[10px]">
          [ SERVER-SIDE DIRECT PIPELINE ACTIVE ]
        </div>
      </div>

    </div>
  );
}