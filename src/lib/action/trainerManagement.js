import { ServerMutation } from "../core/serverMutation";

export const UpdateTrainerAction = async (applicationId, status, adminFeedback, userEmail) => {
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
