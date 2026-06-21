import { ServerFetch } from "../core/serverMutation";
export const getMyBooking = async ({ userEmail, classId }) => {
  return ServerFetch(`bookings/check?userEmail=${userEmail}&classId=${classId}`);
};