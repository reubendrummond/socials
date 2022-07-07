import React, { FC, PropsWithChildren, ReactNode } from "react";
import Navbar from "@components/Navbar";

const MainLayout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className={`px-4 md:px-12 py-4 ${className || ""}`}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
