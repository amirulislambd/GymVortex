import React from "react";
import { getAdminStats, getSystemLogs } from "@/lib/api/adminOverview";
import AdminHeader from "@/components/dashboard/admin/Adminhead";
import AdminStatCards from "@/components/dashboard/admin/Adminstatcards";
import AdminPerformance from "@/components/dashboard/admin/AdbminPerformance";
import AdminCommandCenter from "@/components/dashboard/admin/AdminCommandCenter";

const AdminOverview = async () => {
  const [statsData, logsData] = await Promise.all([
    getAdminStats(),
    getSystemLogs(),
  ]);
  console.log(logsData?.logs);
  return (
    <div className="space-y-6">
      <AdminHeader />

      <AdminStatCards stats={statsData?.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-7">
          <AdminPerformance logs={logsData?.logs} />
        </div>

        <div className="lg:col-span-2">
          <AdminCommandCenter />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
