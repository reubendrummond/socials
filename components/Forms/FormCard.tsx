import { FC, PropsWithChildren } from "react";

const FormCard: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="relative w-full min-w-fit px-8 md:px-12 py-8 rounded-xl bg-white dark:bg-gray-800 opacity-90 flex flex-col gap-y-4 justify-center shadow-lg">
      {children}
    </div>
  );
};

export default FormCard;
