import React, { ReactNode } from "react";
import Navbar from "@components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 pt-2">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
