import { ServerMutation } from "../core/serverMutation";

export const TrainerApplication = async (data) => {
    return ServerMutation("applyToTrainer", data);
};