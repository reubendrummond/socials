import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { LightningBoltIcon } from "@heroicons/react/solid";

const Navbar = () => {
  return (
    <div className="container w-full flex flex-row justify-between items-center pt-2 pb-6">
      <Link href={"/"}>
        <LightningBoltIcon className="w-[40px] hover:cursor-pointer" />
      </Link>

      <div className="flex flex-row gap-x-4">
        <Link href={"/display"}>Display</Link>
        <Link href={"/register"}>Register</Link>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default Navbar;
