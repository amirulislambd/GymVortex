import Navbar from "@/components/dashboard/user/Navbar";
import React from "react";

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default SidebarLayout;
