import MetricsGrid from "@/components/dashboard/trainer/MetricsGrid";
import PerformanceFeed from "@/components/dashboard/trainer/PerformanceFeed";
import RightSidebar from "@/components/dashboard/trainer/RightSidebar";
import { GetMetricsTrainerDashboard } from "@/lib/api/dashboard";
import { GetClassById } from "@/lib/api/getClasses";
import { GetUserSession } from "@/lib/core/session";
import React from "react";

const TrainerOverview = async () => {
  const user = await GetUserSession();
  console.log("user:", user);
  const metrics = await GetMetricsTrainerDashboard(user.email);
  console.log(metrics);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gym-bg text-gym-text min-h-screen">
      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8">
          <PerformanceFeed />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default TrainerOverview;
