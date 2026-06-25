import { ServerMutation, ServerUpdate } from "../core/serverMutation";

export const UpdateTrainerAction = async (
  applicationId,
  status,
  adminFeedback,
  userEmail,
) => {
  try {
    return ServerMutation(
      `admin/update/trainer/action/${applicationId}`,
      { status, adminFeedback, userEmail },
      "PATCH",
    );
  } catch (error) {
    console.error("Error in UpdateTrainerAction:", error);
    return null;
  }
};

export const DemoteTrainerAction = async (email) => {
  try {
    const res = await ServerUpdate("admin/demote/trainer", { email }, "PATCH");
    return res?.success ? res : null;
  } catch (error) {
    console.error("Error in DemoteTrainerAction:", error);
    return null;
  }
};
