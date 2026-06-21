import { ServerFetch } from "../core/serverMutation"

export const GetApplicationById = async (id) => {
  try {
    
    const res = await ServerFetch(`applyToTrainer/${id}`); 
    return res;
  } catch (error) {
    console.log("Failed syncing infrastructure matrix from backend:", error);
    throw error; 
  }
}