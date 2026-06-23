import { ServerMutation } from "../core/serverMutation";

export const PostForumAction = async (data, method = "POST") => {
    const urlPath = data._id ? `forum/${data._id}` : "forumPost";
    return ServerMutation(urlPath, data, method);
};