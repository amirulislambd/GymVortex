"use server";

import { ServerMutation } from "../core/serverMutation";

export const PostClass = async (data, method = "POST") => {
  const urlPath = data._id ? `classes/${data._id}` : "classes";
  return ServerMutation(urlPath, data, method);
};
