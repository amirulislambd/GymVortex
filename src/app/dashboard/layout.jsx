import Navbar from "@/components/dashboard/user/Navbar";
import Sidebar from "@/components/dashboard/user/Sidebar";
import React from "react";

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default SidebarLayout;
