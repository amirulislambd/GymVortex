import AdminPerformance from "@/components/dashboard/admin/AdbminPerformance";
import AdminHeader from "@/components/dashboard/admin/Adminhead";
import AdminStatCards from "@/components/dashboard/admin/Adminstatcards";
import React from "react";

const AdminOverview = () => {
  return (
    <div>
      <AdminHeader />
      <AdminStatCards />
      <div>
        <AdminPerformance />
      </div>
    </div>
  );
};

export default AdminOverview;
