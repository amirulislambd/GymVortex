import { ServerFetch } from "../core/serverMutation";

export const GetMetricsTrainerDashboard = async (email) => {
  const res = await ServerFetch(`trainer/dashboard-metrics?email=${email}`);
  return res?.success
    ? res.data
    : {
        totalStudents: 0,
        totalClasses: 0,
        totalEnrolled: 0,
        bookingsTodayCount: 0,
      };
};

export const GetUserMetrics = async (email) => {
  const res = await ServerFetch(`user/overview-metrics?email=${email}`);
  return res?.success ? res.data : null;
};

// Function to update daily activity, streak, and rank
export const UpdateUserActivity = async (email) => {
  try {
    const res = await fetch("/api/user/update-activity", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data?.success ? data : null;
  } catch (error) {
    console.error("Error in UpdateUserActivity:", error);
    return null;
  }
};