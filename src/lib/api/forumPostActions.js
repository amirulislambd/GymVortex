import { ServerFetch } from "../core/serverMutation";

export const GetMyForumPosts = async (
  email,
  page = 1,
  limit = 9,
  search = "",
) => {
  const response = await ServerFetch(
    `forumPost?email=${email}&page=${page}&limit=${limit}&search=${search}`,
  );
  return response;
};
export const GetForumPostsById = async (id) => {
  const data = await ServerFetch(`forumPost/${id}`);
  return data;
};

export const GetCommentsAction = async (postId) => {
  return ServerFetch(`comments/${postId}`);
};