import { AuthNav, AuthNavProps } from "@components/Navbar/AuthNav";
import React, { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren<AuthNavProps>> = ({
  type,
  children,
}) => {
  return (
    <div className="px-4 pb-20 h-full flex flex-col">
      <AuthNav type={type} />
      <div className="min-h-fit flex-grow flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
