import { BACKUP_PROFILE_IMAGE } from "@lib/constants";
import Image from "next/image";
import { FC } from "react";
import { PostForm } from "@components/Forms/PostForm";
import { useSession } from "next-auth/react";

const UserPost: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-y-2 items-center w-full">
      <div className="flex items-center gap-x-3 w-full">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-clip">
          {session?.user ? (
            <Image
              src={session.user.image || BACKUP_PROFILE_IMAGE}
              width="32px"
              height="32px"
              layout="responsive"
              alt={BACKUP_PROFILE_IMAGE}
            />
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full" />
          )}
        </div>
        <p>{session?.user?.username || session?.user?.name}</p>
      </div>
      <PostForm />
    </div>
  );
};

export default UserPost;
