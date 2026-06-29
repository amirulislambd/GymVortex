import OverviewHeader from "@/components/dashboard/user/OverviewHeader";
import WorkoutProgress from "@/components/dashboard/user/WorkoutProgress";
import UpcomingSessions from "@/components/dashboard/user/UpcomingSessions";
import TrainerApplicationStatus from "@/components/dashboard/user/TrainerApplicationStatus";
import FavoriteRegimes from "@/components/dashboard/user/FavoriteRegimes";
import ForgeCommunity from "@/components/dashboard/user/ForgeCommunity";
import { GetApplicationById } from "@/lib/api/applications";
import { GetUserSession } from "@/lib/core/session";
import UserStatsCards from "@/components/dashboard/user/UserStatsCards";
import UserProfileStatus from "@/components/dashboard/user/UserProfileStatus";
import { GetUserMetrics, UpdateUserActivity } from "@/lib/api/dashboard";
import { GetMyFavorites } from "@/lib/api/favorite";

export const metadata = { title: "Dashboard — GymVortex" };

export default async function UserOverviewPage() {
  const user = await GetUserSession();


  // 1. First, update the user's daily activity, streak, and rank in the database
  const userActivity = await UpdateUserActivity(user.email);

  // 2. Then, fetch the fresh, newly updated metrics from the database
  const userMetrics = await GetUserMetrics(user.email);
  console.log("userMetrics:", userMetrics);
  const favoriteClasses = await GetMyFavorites(user.email);
  // 3. Extract banner data safely from the fresh metrics response
  const userMetricsData = userMetrics?.banner;
  console.log("userMetricsData to be passed:", userMetricsData);

  // Fetch trainer application status
  const applicationStatus = await GetApplicationById(user.id);
  const application = applicationStatus?.data;
  console.log("application:", application);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {/* OverviewHeader will now receive 100% updated real-time data */}
      <OverviewHeader userMetricsData={userActivity} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4 flex flex-col">
          <div className="md:hidden">
            <UserProfileStatus userProfile={user} />
          </div>
          <UserStatsCards stats={userMetrics?.stats} />
          <WorkoutProgress />
        </div>
        <div className="space-y-4 flex flex-col">
          <div className="hidden md:block">
            <UserProfileStatus userProfile={user} />
          </div>
          <UpcomingSessions />
        </div>
      </div>

      {application && <TrainerApplicationStatus cardData={application} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FavoriteRegimes favoriteClasses={favoriteClasses} />
        <ForgeCommunity />
      </div>
    </div>
  );
}