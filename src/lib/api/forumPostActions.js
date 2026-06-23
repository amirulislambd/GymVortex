import { ServerFetch } from "../core/serverMutation";

export const GetMyForumPosts= async(email, page=1, limit=9, search="")=>{
    const data = await ServerFetch(`myForumPosts?email=${email}&page=${page}&limit=${limit}&search=${search}`);
    return data;
    
}