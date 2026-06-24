import { ServerUpdate } from "../core/serverMutation";

// Block/Unblock user
export const UpdateUserBlockStatus = async (userId, isBanned) => {
  try {
    const res = await ServerUpdate(`admin/user/block/${userId}`, {
      banned: isBanned, // ← isBanned → banned (server match)
    });
    return res?.success ? res : null;
  } catch (error) {
    console.error("Error in UpdateUserBlockStatus:", error);
    return null;
  }
};

// Make Admin
export const UpdateUserRoleToAdmin = async (userId) => {
  try {
    const res = await ServerUpdate(`admin/user/make-admin/${userId}`, {
      role: "admin", // ← correct payload
    });
    return res?.success ? res : null;
  } catch (error) {
    console.error("Error in UpdateUserRoleToAdmin:", error);
    return null;
  }
};