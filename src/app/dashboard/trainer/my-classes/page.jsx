import MyClasses from "@/components/dashboard/trainer/MyClasess";
import { GetTrainerClasses } from "@/lib/api/getClasses";
import { GetUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Active Training Roster | GymVortex Dashboard",
  description:
    "Manage your professional training schedules, track student capacity, and update active tactical fitness protocols.",
  keywords: [
    "GymVortex",
    "Trainer Dashboard",
    "Fitness Protocols",
    "Training Roster",
    "Active Classes",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TrainerClasses({ searchParams }) {
  const resolvedSearchParam = await searchParams;
  const searchString = resolvedSearchParam?.search || "";
  const user = await GetUserSession();
  console.log("user:", user);

  const resData = await GetTrainerClasses(user.email, searchString);
  const classData = resData?.data;
  console.log("classData:", classData);

  return (
    <div className="min-h-screen bg-[#0c0c0c] p-4 sm:p-8">
      <MyClasses initialClasses={classData} />
    </div>
  );
}
