import { ServerDelete, ServerMutation } from "../core/serverMutation";

export const TrainerApplication = async (data) => {
  return ServerMutation("applyToTrainer", data);
};

export const DeleteTrainerApplication = async (id) => {
  try {
    return await ServerDelete(`applyToTrainer/${id}`);
  } catch (error) {
    console.error("Delete application error:", error);
    throw error;
  }
};
