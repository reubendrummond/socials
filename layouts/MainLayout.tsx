import React, { ReactNode } from "react";
import Navbar from "@components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 pb-4">
      <nav>
        <Navbar />
      </nav>
      {children}
    </div>
  );
};

export default MainLayout;
