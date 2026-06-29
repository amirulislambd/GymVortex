import React from "react";
import { getAdminStats, getSystemLogs } from "@/lib/api/adminOverview";
import AdminHeader from "@/components/dashboard/admin/Adminhead";
import AdminStatCards from "@/components/dashboard/admin/Adminstatcards";
import AdminPerformance from "@/components/dashboard/admin/AdbminPerformance";
import AdminCommandCenter from "@/components/dashboard/admin/AdminCommandCenter";
import SystemMonitor from "@/components/dashboard/admin/SystemMonitor";
import UserStatsChart from "@/components/dashboard/admin/UserStatsChart";
import { GetUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Admin Dashboard | GymVortex",
  description: "GymVortex Admin Control Panel - Manage users, classes, logs, and perform administrative operations.",
};

const AdminOverview = async () => {
  const [user, statsData, logsData] = await Promise.all([
    GetUserSession(),
    getAdminStats(),
    getSystemLogs(),
  ]);
  console.log("user:", user);
  return (
    <div className="space-y-6">
      <AdminHeader user={user} />

      <AdminStatCards stats={statsData?.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <div className="lg:col-span-7">
          <AdminPerformance logs={logsData?.logs} />
        </div>

        <div className="lg:col-span-2">
          <AdminCommandCenter />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserStatsChart />
        <SystemMonitor />
      </div>
    </div>
  );
};

export default AdminOverview;
