import { ServerFetch } from "../core/serverMutation";
export const CheckFavorite = async ({ userEmail, classId }) => {
  return ServerFetch(
    `favoriteClasses/check?userEmail=${userEmail}&classId=${classId}`,
  );
};

export const GetMyFavorites = async (email) => {
  if (!email) return [];
  try {
    const result = await ServerFetch(`favoriteClasses?email=${email}`);

    return result?.success ? result.data : [];
  } catch (error) {
    console.error("Express API Call Error:", error);
    return [];
  }
};