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

export const GetBookingsByClassId = async (classId) => {
  if (!classId) return [];
  try {
    const result = await ServerFetch(`bookings/classId?classId=${classId}`);

    return result?.success ? result.data : [];
  } catch (error) {
    console.error("Express API Call Error:", error);
    return [];
  }
};

export const GetTransactions = async (page = 1, limit = 10) => {
  return ServerFetch(`transactions?page=${page}&limit=${limit}`);
};