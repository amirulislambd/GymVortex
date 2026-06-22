import MyBookings from "@/components/dashboard/user/MyBookings";
import { GetMyBookings } from "@/lib/api/booking";
import { GetUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Enrolled Classes | GymVortex Dashboard",
  description:
    "View and manage your active training sessions, elite schedules, and fitness protocols at GymVortex.",
  keywords: [
    "gym",
    "workout",
    "enrolled classes",
    "fitness protocol",
    "GymVortex Dashboard",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyBookingsPage() {
  const user = await GetUserSession();
  console.log("user:", user.email);
  const myBookings = await GetMyBookings(user.email);
  console.log("myBookings:", myBookings);
  return <MyBookings getMyBookings={myBookings} />;
}
