export default function MassAndAuditCards() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Mass Modification */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-sm flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-rose-400 uppercase tracking-wider">
              Mass Modification
            </h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Apply restricted status or role upgrades to multiple users simultaneously based on tags or membership tiers.
            </p>
          </div>
          <button className="w-fit border border-rose-900/40 hover:border-rose-500 text-rose-400 font-bold uppercase text-[10px] tracking-widest px-4 py-2.5 bg-rose-950/10 hover:bg-rose-950/30 transition-all">
            Open Bulk Editor
          </button>
        </div>
  
        {/* Audit Logs */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-sm flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-zinc-300 uppercase tracking-wider">
              Audit Logs
            </h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Review recent administrative actions, login attempts, and permission changes across the global database.
            </p>
          </div>
          <button className="w-fit bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-bold uppercase text-[10px] tracking-widest px-4 py-2.5 transition-colors">
            View System Logs
          </button>
        </div>
      </div>
    );
  }