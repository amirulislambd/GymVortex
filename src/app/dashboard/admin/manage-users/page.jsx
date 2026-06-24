import ManageUsersHeader from "@/components/dashboard/admin/ManageUsersHeader";
import MassAndAuditCards from "@/components/dashboard/admin/MassAndAuditCards";
import UsersTable from "@/components/dashboard/admin/UsersTable";
import { GetManagedUser } from "@/lib/api/userManagement";
import { GetUserSession } from "@/lib/core/session";
import React from "react";

export const metadata = { title: "Manage Users — GymVortex" };
export const dynamic = "force-dynamic";

const ManageUsers = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;
  const searchQuery = params?.search || "";

  const session = await GetUserSession();
  const adminEmail = session?.email || "";
  const usersData = await GetManagedUser(adminEmail, currentPage, searchQuery);

  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;

  return (
    <div className="p-4 md:p-6 min-h-screen bg-black text-zinc-100 flex flex-col gap-2">
      <ManageUsersHeader currentSearch={searchQuery} />

      <UsersTable
        users={users}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <MassAndAuditCards />
    </div>
  );
};

export default ManageUsers;
