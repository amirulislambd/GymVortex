import { ServerMutation } from "../core/serverMutation";

export const AddFavoriteClass = async (data) => {
  return ServerMutation("favoriteClasses", data);
};

export const RemoveFavoriteClass = async (id) => {
  return ServerMutation(`favoriteClasses/${id}`, {}, "DELETE");
};