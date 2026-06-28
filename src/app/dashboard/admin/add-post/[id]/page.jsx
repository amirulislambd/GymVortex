import AddForumPostForm from '@/components/dashboard/trainer/AddForumPostForm';
import { GetForumPostsById } from '@/lib/api/forumPostActions';
import React from 'react';

const UpdatePost = async({params}) => {
    const {id} =await params
    const postData = await GetForumPostsById(id);
    console.log("postData:", postData);
    return (
        <div>
            <AddForumPostForm postData={postData.data} />
        </div>
    );
};

export default UpdatePost;