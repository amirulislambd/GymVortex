import { ServerFetch } from "../core/serverMutation";

export const GetManagedUser = async (email, targetPage, searchQuery) => {
  const res = await ServerFetch(
    `admin/user?email=${email}&page=${targetPage}&search=${searchQuery}`,
  );
 return res.success? res : null;
};
