import { ServerMutation } from "../core/serverMutation";

export const AddFavorite = async (data) => {
    return ServerMutation("favorite", data);
};