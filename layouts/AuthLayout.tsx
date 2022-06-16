import { AuthNav, AuthNavProps } from "@components/Navbar/AuthNav";
import React, { FC, PropsWithChildren } from "react";

export const AuthLayout: FC<PropsWithChildren<AuthNavProps>> = ({
  type,
  children,
}) => {
  return (
    <div className="px-4 pt-2">
      <AuthNav type={type} />
      {children}
    </div>
  );
};
