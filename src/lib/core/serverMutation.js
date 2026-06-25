import { redirect } from "next/navigation";
import { GetUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ServerFetch = async (url) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    cache: "no-cache",
  });
  return await res.json();
};

export const authHeader = async () => {
  const token = await GetUserToken();
  const header = token ? { authorization: `Bearer ${token}` } : {};
  return header;
};

export const ServerMutation = async (url, data, method = "POST") => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  //   handle error
  return handleStatusCode(res);
};

export const ServerUpdate = async (url, data, method = "PATCH") => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  //   handle error
  return handleStatusCode(res);
};

export const ServerDelete = async (url) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return await res.json();
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
