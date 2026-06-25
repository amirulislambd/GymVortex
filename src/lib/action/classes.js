"use server";

import { ServerDelete, ServerMutation } from "../core/serverMutation";

export const PostClass = async (data, method = "POST") => {
  const urlPath = data._id ? `classes/${data._id}` : "classes";
  return ServerMutation(urlPath, data, method);
};

export const UpdateClass = async (data, method = "PATCH") => {
  const urlPath = data._id ? `classes/${data._id}` : "classes";
  return ServerMutation(urlPath, data, method);
};

export const DeleteClass = async (id) => {
  return ServerDelete(`classes/${id}`);
};