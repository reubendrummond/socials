import { LightningBoltIcon } from "@heroicons/react/solid";
import { RegisterPage, LoginPage } from "@lib/constants";
import Link from "next/link";
import React, { FC } from "react";
import ThemeToggle from "@components/ThemeToggle";

export interface AuthNavProps {
  type?: "signin" | "register" | "reset";
}

export const AuthNav: FC<AuthNavProps> = ({ type }) => {
  return (
    <div className="container md:px-12 lg:px-20 flex flex-row justify-between items-center pt-4 pb-6 m-auto">
      <Link href={"/"} passHref>
        <LightningBoltIcon className="w-[40px] hover:cursor-pointer" />
      </Link>
      <div className="flex gap-x-4 items-center">
        {type === "signin" ? (
          <Link href={RegisterPage}>Register</Link>
        ) : type === "register" || type === "reset" ? (
          <Link href={LoginPage}>Sign In</Link>
        ) : (
          <></>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};
