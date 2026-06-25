import ApplicationStatus from "@/components/dashboard/user/ApplicationStatus";
import TrainerForm from "@/components/dashboard/user/TrainerForm";
import RestrictedAccess from "@/components/shared/RestrictedAccess";
import { GetApplicationById } from "@/lib/api/applications";

import { GetUserSession } from "@/lib/core/session";

export default async function TrainerApplicationPage() {
  const userInfo = await GetUserSession();
  const isBanned = userInfo?.banned;

  const userProfile = {
    id: userInfo?.id || "",
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    image: userInfo?.image || "",
  };

  const res = await GetApplicationById(userInfo.id);
  const application = res?.data;

  console.log("application:", application);
  console.log("userInfo:", userInfo.banned);

  return (
    <>
      {isBanned ? (
        <RestrictedAccess />
      ) : (
        // এখানে overflow-hidden যোগ করা হয়েছে যাতে স্ক্রলবার না আসে
        <div className="bg-[#131313] text-[#e5e2e1] h-screen overflow-hidden font-sans">
          {application ? (
            <ApplicationStatus
              status={application.status}
              userImage={userProfile.image}
            />
          ) : (
            <TrainerForm initialUser={userProfile} />
          )}
        </div>
      )}
    </>
  );
}
