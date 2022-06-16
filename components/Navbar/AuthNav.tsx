import { LightningBoltIcon } from "@heroicons/react/solid";
import { RegisterPage, LoginPage } from "@lib/constants";
import Link from "next/link";
import React, { FC } from "react";

export interface AuthNavProps {
  type: "signin" | "register";
}

export const AuthNav: FC<AuthNavProps> = ({ type }) => {
  return (
    <div className="container md:px-12 lg:px-20 flex flex-row justify-between items-center pt-2 pb-6 m-auto">
      <Link href={"/"} passHref>
        <LightningBoltIcon className="w-[40px] hover:cursor-pointer" />
      </Link>
      {type === "signin" ? (
        <Link href={RegisterPage}>Register</Link>
      ) : (
        <Link href={LoginPage}>Sign In</Link>
      )}
    </div>
  );
};
