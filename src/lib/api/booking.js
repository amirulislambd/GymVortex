import { ServerFetch } from "../core/serverMutation";
export const CheckBooking = async ({ userEmail, classId }) => {
  if (!userEmail || !classId) return;
  try {
    return ServerFetch(
      `bookings/check?userEmail=${userEmail}&classId=${classId}`,
    );
  } catch (error) {
    console.error("Express API Call Error:", error);
  }
};

export const GetMyBookings = async (email) => {
  if (!email) return [];
  try {
    const result = await ServerFetch(`bookings?email=${email}`);

    return result?.success ? result.data : [];
  } catch (error) {
    console.error("Express API Call Error:", error);
    return [];
  }
};