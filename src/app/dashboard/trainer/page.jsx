import MetricsGrid from "@/components/dashboard/trainer/MetricsGrid";
import PerformanceFeed from "@/components/dashboard/trainer/PerformanceFeed";
import RightSidebar from "@/components/dashboard/trainer/RightSidebar";
import React from "react";

const TrainerOverview = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gym-bg text-gym-text min-h-screen">
      <MetricsGrid />

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
