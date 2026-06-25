import { ServerDelete, ServerMutation } from "../core/serverMutation";

export const PostForumAction = async (data, method = "POST") => {
  const urlPath = data._id ? `forumPost/${data._id}` : "forumPost";
  return ServerMutation(urlPath, data, method);
};

export const PostCommentAction = async (data, method = "POST") => {
  const urlPath = data._id ? `comments/${data._id}` : "comments";

  return ServerMutation(urlPath, data, method);
};

export const UpdateCommentAction = async (id, data) => {
  return ServerMutation(`comments/${id}`, data, "PUT");
};

export const DeleteCommentAction = async (id) => {
  return ServerDelete(`comments/${id}`);
};

export const ReplyCommentAction = async (id, data) => {
  return ServerMutation(`comments/${id}/reply`, data);
};

export const LikePostAction = async (id, userEmail) => {
  return ServerUpdate(`forumPost/${id}/like`, { userEmail });
};

export const DislikePostAction = async (id, userEmail) => {
  return ServerUpdate(`forumPost/${id}/dislike`, { userEmail });
};
