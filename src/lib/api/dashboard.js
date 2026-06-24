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