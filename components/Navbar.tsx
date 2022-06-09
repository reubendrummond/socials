import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useAuth } from "@lib/hooks/useAuth";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const onSignout = () => {
    router.replace("/auth/signin");
  };

  return (
    <div className="container w-full flex flex-row justify-between items-center pt-2 pb-6 m-auto">
      <Link href={"/"}>
        <LightningBoltIcon className="w-[40px] hover:cursor-pointer" />
      </Link>

      {/* {user && (
        <div className="flex flex-row gap-x-4">
          <Link href={"/display"}>Display</Link>
        </div>
      )} */}

      <div className="flex flex-row items-center gap-x-4">
        {user ? (
          <Menu as="div" className="relative h-[40px]">
            <Menu.Button className="hover:cursor-pointer h-full">
              <Image
                src={user.photoURL ?? "/defaultPhoto"}
                alt="photo"
                width="40px"
                height="40px"
                className="rounded-full"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2 flex flex-col items-end">
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <button onClick={() => signOut(onSignout)}>Sign out</button>
            </Menu.Items>
          </Menu>
        ) : (
          <>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
