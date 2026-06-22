import { GetMyFavorites } from "@/lib/api/favorite";
import { GetUserSession } from "@/lib/core/session";
import React from "react";
import MyFavoritesClasses from "@/components/dashboard/user/MyFavoriteClasses";
import { GetMyBookings } from "@/lib/api/booking";

const FavoriteClasses = async () => {
  const user = await GetUserSession();
  const favoriteClasses = await GetMyFavorites(user.email);
  const bookingClasses = await GetMyBookings(user.email);
  console.log("bookingClasses:", bookingClasses);
  console.log("favoriteClasses:", favoriteClasses);
  return (
    <MyFavoritesClasses
      getMyFavorites={favoriteClasses}
      getMyBookings={bookingClasses}
    />
  );
};

export default FavoriteClasses;
