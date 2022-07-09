import { BACKUP_PROFILE_IMAGE } from "@lib/constants";
import { useAuth } from "@lib/hooks/useAuth";
import Image from "next/image";
import { FC } from "react";
import { PostForm } from "@components/Forms/PostForm";

const UserPost: FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-y-2 items-center w-full max-w-sm px-4 justify-end">
      <div className="flex items-center gap-x-3">
        <div className="w-12 rounded-full overflow-clip">
          {user && (
            <Image
              src={user?.photoURL || BACKUP_PROFILE_IMAGE}
              width="32px"
              height="32px"
              layout="responsive"
              alt={BACKUP_PROFILE_IMAGE}
            />
          )}
        </div>
        <p>{user?.displayName}</p>
      </div>
      <PostForm />
    </div>
  );
};

export default UserPost;
