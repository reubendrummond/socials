import { BACKUP_PROFILE_IMAGE } from "@lib/constants";
import Image from "next/image";
import { FC } from "react";
import { PostForm } from "@components/Forms/PostForm";
import { useSession } from "next-auth/react";

const UserPost: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-y-2 items-center w-full px-4">
      <div className="flex items-center gap-x-3">
        <div className="w-12 rounded-full overflow-clip">
          {session?.user && (
            <Image
              src={session.user.image || BACKUP_PROFILE_IMAGE}
              width="32px"
              height="32px"
              layout="responsive"
              alt={BACKUP_PROFILE_IMAGE}
            />
          )}
        </div>
        <p>{session?.user?.username}</p>
      </div>
      <PostForm />
    </div>
  );
};

export default UserPost;
