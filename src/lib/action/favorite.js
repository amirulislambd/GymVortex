import { ServerMutation } from "../core/serverMutation";

export const AddFavoriteClass = async (data) => {
  return ServerMutation("favoriteClasses", data);
};