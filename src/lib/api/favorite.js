import { ServerFetch } from "../core/serverMutation";

export const GetMyFavorite = async (id) => {
  try {
    return await ServerFetch(`favoriteClasses/${id}`);
  } catch (error) {
    console.error("Failed syncing infrastructure matrix from backend:", error);
    return { success: false, data: []};
  }
};