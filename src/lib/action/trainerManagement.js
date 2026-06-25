import { ServerMutation, ServerUpdate } from "../core/serverMutation";

export const DemoteTrainerAction = async (
  applicationId,
  status,
  adminFeedback,
  userEmail,
) => {
  try {
    return ServerMutation(
      `admin/demote/trainer/${applicationId}`,
      { status, adminFeedback, userEmail },
      "PATCH",
    );
  } catch (error) {
    console.error("Error in DemoteTrainerAction:", error);
    return null;
  }
};

export const UpdateTrainerAction = async (
  applicationId,
  status,
  adminFeedback,
  userEmail,
) => {
  try {
    const res = await ServerUpdate(
      `admin/update/trainer/action/${applicationId}`,
      { status, adminFeedback, userEmail },
      "PATCH",
    );
    return res;
  } catch (error) {
    console.error("Error in UpdateTrainerAction:", error);
    return null;
  }
};