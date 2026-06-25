import { ServerMutation } from "../core/serverMutation";

export const BookingClass = async (data) => {
  return ServerMutation("bookings", data);
};

export const GetTransactions = async (page = 1, limit = 10) => {
  return ServerFetch(`transactions?page=${page}&limit=${limit}`);
};