import { RequireRole } from '@/lib/core/session';
import React from 'react';

const UserLayout =async ({ children }) => {

    await RequireRole("user");

    return children
};

export default UserLayout;