import OverviewHeader from "@/components/dashboard/user/OverviewHeader";
import WorkoutProgress from "@/components/dashboard/user/WorkoutProgress";
import UpcomingSessions from "@/components/dashboard/user/UpcomingSessions";
import TrainerApplicationStatus from "@/components/dashboard/user/TrainerApplicationStatus";
import FavoriteRegimes from "@/components/dashboard/user/FavoriteRegimes";
import ForgeCommunity from "@/components/dashboard/user/ForgeCommunity";
import { GetApplicationById } from "@/lib/api/applications";
import { GetUserSession } from "@/lib/core/session";

export const metadata = { title: "Dashboard — GymVortex" };

export default async function UserOverviewPage() {
  const user = await GetUserSession();
  const applicationStatus = await GetApplicationById(user.id);
  const application = applicationStatus?.data;
  console.log("application:", application);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <OverviewHeader rank="TITAN II" streak={12} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <WorkoutProgress />
        <UpcomingSessions />
      </div>

      {application?.status === "pending" && (
        <TrainerApplicationStatus cardData={application} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FavoriteRegimes />
        <ForgeCommunity />
      </div>
    </div>
  );
}