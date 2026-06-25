import MyForumPosts from '@/components/forum/MyForumPosts';
import { GetUserSession } from '@/lib/core/session';
import React from 'react';

const AdminPosts = async() => {
    const trainerEmail = await GetUserSession();
    
      return (
        <div>
          <MyForumPosts trainerEmail={trainerEmail.email} />
        </div>
      );
};

export default AdminPosts;