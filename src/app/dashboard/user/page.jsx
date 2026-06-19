import OverviewHeader from "@/components/dashboard/user/OverviewHeader";
import WorkoutProgress from "@/components/dashboard/user/WorkoutProgress";
import UpcomingSessions from "@/components/dashboard/user/UpcomingSessions";
import TrainerApplicationStatus from "@/components/dashboard/user/TrainerApplicationStatus";

export const metadata = { title: "Dashboard — GymVortex" };

export default function UserOverviewPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <OverviewHeader rank="TITAN II" streak={12} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <WorkoutProgress />
        <UpcomingSessions />
      </div>
      <TrainerApplicationStatus />
    </div>
  );
}
