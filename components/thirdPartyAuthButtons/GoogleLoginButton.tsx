import React, { FC } from "react";
import Image from "next/image";
import { ThirdPartyButtonProps } from ".";

export const GoogleLoginButton: FC<ThirdPartyButtonProps> = ({
  onClick,
  disabled,
}) => {
  const googleLogo =
    "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA";
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className="flex px-4 h-[40px] bg-white items-center rounded-md shadow-md self-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="relative aspect-square h-[24px]">
        <Image className="" src={googleLogo} alt="Google logo" layout="fill" />
      </div>
      <span className="text-[14px] px-4 uppercase text-gray-700 font-medium">
        Sign in with Google
      </span>
    </button>
  );
};
