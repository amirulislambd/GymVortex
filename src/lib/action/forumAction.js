import {
  ServerDelete,
  ServerMutation,
  ServerUpdate,
} from "../core/serverMutation";

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
export const UpdateReplyAction = async (commentId, replyId, data) => {
  return ServerMutation(`comments/${commentId}/reply/${replyId}`, data, "PUT");
};

export const DeleteReplyAction = async (commentId, replyId) => {
  return ServerDelete(`comments/${commentId}/reply/${replyId}`);
};

export const LikePostAction = async (id, data) => {
  return ServerUpdate(`forumPost/${id}/like`, data);
};

export const DislikePostAction = async (id, data) => {
  return ServerUpdate(`forumPost/${id}/dislike`, data);
};
