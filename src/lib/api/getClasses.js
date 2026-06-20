import { ServerFetch } from "../core/serverMutation";

export const GetClasses = async (params) => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page) {
        queryParams.append("page", params.page);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.search) {
        queryParams.append("search", params.search);
      }
      if (params.category && params.category !== "All") {
        queryParams.append("category", params.category);
      }
      if (params.difficulty && params.difficulty !== "All") {
        queryParams.append("difficulty", params.difficulty);
      }
      if (params.sortPrice && params.sortPrice !== "All") {
        queryParams.append("sortPrice", params.sortPrice);
      }
    }
    const data = await ServerFetch(`classes?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error("Failed syncing infrastructure matrix from backend:", error);
    return { success: false, data: [], pagination: null };
  }
};
export const GetClassById = async (id) => {
  try {
    const data = await ServerFetch(`classes/${id}`);
    return data;
  } catch (error) {
    console.error("Failed syncing infrastructure matrix from backend:", error);
    return { success: false, data: [], pagination: null };
  }
};