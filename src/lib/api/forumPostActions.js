import { ServerFetch } from "../core/serverMutation";

export const GetAllPosts = async (page, limit = 10, search = "") => {
  const res = await ServerFetch(
    `forumPost?page=${page}&limit=${limit}&search=${search}`,
  );
  return res;
};

export const GetMyForumPosts = async (
  email,
  page = 1,
  limit = 9,
  search = "",
) => {
  const response = await ServerFetch(
    `myForumPosts?email=${email}&page=${page}&limit=${limit}&search=${search}`,
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
