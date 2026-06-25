"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const GetUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const GetUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const RequireRole = async (role) => {
  const user = await GetUserSession();
  if (!user) {
    return redirect("/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};