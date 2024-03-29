import Link from "next/link";
import React, { useMemo } from "react";
import ThemeToggle from "@components/ThemeToggle";
import { LightningBoltIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="container w-full flex flex-row justify-between items-center pt-4 pb-6 m-auto">
      <div className="flex gap-x-4 items-center">
        <Link href={"/"}>
          <LightningBoltIcon className="w-[40px] hover:cursor-pointer" />
        </Link>
        <Link href="/themes">Themes</Link>
      </div>

      <RightNav />
    </div>
  );
};

const RightNav = () => {
  const { data: session, status } = useSession();
  const user = session ? session.user : null;

  return (
    <>
      {
        <Transition
          show={Boolean(session)}
          className="flex flex-row items-center gap-x-4 z-10"
          enter="transition-opacity duration-800"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          {status === "authenticated" && user ? (
            <Menu as="div" className="relative h-[40px]">
              <Menu.Button className="hover:cursor-pointer h-full">
                {user.image ? (
                  <Image
                    src={user.image || "/"}
                    alt="photo"
                    width="40px"
                    height="40px"
                    className="rounded-full"
                  />
                ) : (
                  <UserCircleIcon
                    className="w-[40px] h-[40px]"
                    strokeWidth="1.5px"
                  />
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2 flex flex-col items-end">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <Link href="/auth/signin">Sign In</Link>
              {/* <Link href="/auth/register">Register</Link> */}
            </>
          )}
          <ThemeToggle />
        </Transition>
      }
    </>
  );
};

export default Navbar;
