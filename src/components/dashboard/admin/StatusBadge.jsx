export default function StatusBadge({ status }) {
    const isCaptured = status?.toLowerCase() === "captured";
    const isPending = status?.toLowerCase() === "pending";
    
    const baseClasses = "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border status-badge";
    const capturedClasses = "bg-primary-fixed/20 text-primary-fixed border-primary-fixed/30";
    const pendingClasses = "bg-tertiary-container text-on-tertiary-container border-outline";
    const errorClasses = "bg-error-container text-on-error-container border-error";
  
    return (
      <div className="flex justify-center">
        <span className={`${baseClasses} ${isCaptured ? capturedClasses : isPending ? pendingClasses : errorClasses}`}>
          {status || "N/A"}
        </span>
      </div>
    );
  }