import { ServerFetch } from "../core/serverMutation";
export const CheckFavorite = async ({ userEmail, classId }) => {
  return ServerFetch(
    `favoriteClasses/check?userEmail=${userEmail}&classId=${classId}`,
  );
};