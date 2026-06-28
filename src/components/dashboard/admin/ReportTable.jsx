export default function ReportTable({ data = [] }) {
    const reports = Array.isArray(data) ? data : [];
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="border-b border-[#caf300]/20 text-[10px] uppercase tracking-wider text-[#caf300]">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
  
          <tbody>
            {reports.map((item, idx) => (
              <tr
                key={item._id || idx}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {/* Name */}
                <td className="p-3 font-semibold text-white">
                  {item.userName ||
                    item.authorName ||
                    "Unknown User"}
                </td>
  
                {/* Email */}
                <td className="p-3 text-white/60">
                  {item.userEmail ||
                    item.authorEmail ||
                    "No Email"}
                </td>
  
                {/* Status */}
                <td className="p-3">
                  <span className="inline-flex rounded-full border border-[#caf300]/30 bg-[#caf300]/10 px-3 py-1 text-[10px] font-bold text-[#caf300]">
                    {item.status || "Completed"}
                  </span>
                </td>
  
                {/* Date */}
                <td className="p-3 text-white/50">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }