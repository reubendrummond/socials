import React, { ReactNode } from "react";
import Navbar from "@components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-4 mt-2">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
