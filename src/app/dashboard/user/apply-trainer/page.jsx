import ApplicationStatus from "@/components/dashboard/user/ApplicationStatus";
import TrainerForm from "@/components/dashboard/user/TrainerForm";
import { GetApplicationById } from "@/lib/api/applications";
import { GetUserSession } from "@/lib/core/session";

export default async function TrainerApplicationPage() {
  const userInfo = await GetUserSession();

  const userProfile = {
    id: userInfo?.id || "",
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    image: userInfo?.image || "",
  };

  const res = await GetApplicationById(userProfile.id);
  const application = res?.data;

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#caf300] selection:text-[#171e00]">
      {application ? (
        <ApplicationStatus
          status={application.status}
          userImage={userProfile.image}
        />
      ) : (
        <TrainerForm initialUser={userProfile} />
      )}
    </div>
  );
}
