import { ServerMutation } from "../core/serverMutation";

export const BookingClass = async (data) => {
    return ServerMutation("bookings", data);
};