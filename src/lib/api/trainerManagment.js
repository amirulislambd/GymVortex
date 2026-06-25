import { ServerFetch } from "../core/serverMutation";

export const  GetPendingTrainers = async()=>{
    try {
        const res = await ServerFetch(`approved/trainers`); 
        return res.data;
    } catch (error) {
        console.error("Failed syncing infrastructure matrix from backend:", error);
    }
}