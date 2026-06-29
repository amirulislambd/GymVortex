import MetricsGrid from "@/components/dashboard/trainer/MetricsGrid";
import PerformanceFeed from "@/components/dashboard/trainer/PerformanceFeed";
import TrainerHeader from "@/components/dashboard/trainer/TrainerHeader";
import { GetMetricsTrainerDashboard } from "@/lib/api/dashboard";
import { GetUserSession } from "@/lib/core/session";
import React from "react";

export const metadata = {
  title: "Trainer Dashboard | GymVortex",
  description: "GymVortex Trainer Panel - View metrics, students, and manage your schedules and classes.",
};

const TrainerOverview = async () => {
  const user = await GetUserSession();
  console.log("user:", user);
  const metrics = await GetMetricsTrainerDashboard(user.email);
  const totalEnrolledStudents = metrics.students;
  console.log("totalEnrolledStudents:", totalEnrolledStudents);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gym-bg text-gym-text min-h-screen">
      <TrainerHeader user={user} />
      <MetricsGrid metrics={metrics} />

      <PerformanceFeed students={totalEnrolledStudents} />
    </div>
  );
};

export default TrainerOverview;
