import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { BACKUP_PROFILE_IMAGE } from "@lib/constants";

interface PostItemProps {
  post: any;
}

interface UserHeadingProps {
  post: any;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-y-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-clip flex-start">
      <UserHeading post={post} />
      <p>{post.body}</p>
    </div>
  );
};

export const PlaceholderPostItem = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-clip flex-start">
      <div className="animate-pulse flex flex-col gap-y-2 ">
        <div className="w-full flex flex-row gap-x-2 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
          <div className="w-full flex justify-between">
            <div className="text-transparent rounded-md bg-gray-200 dark:bg-gray-700">
              some username
            </div>
            <div className="text-transparent rounded-md bg-gray-200 dark:bg-gray-700 w-[]">
              some time
            </div>
          </div>
        </div>
        <div className="text-transparent rounded-md bg-gray-200 dark:bg-gray-700 w-full">
          body
        </div>
        <div className="text-transparent rounded-md bg-gray-200 dark:bg-gray-700 w-[80%]">
          body
        </div>
      </div>
    </div>
  );
};

const UserHeading: FC<UserHeadingProps> = ({ post }) => {
  const user = post.user;

  return (
    <div className="w-full flex flex-row gap-x-2 items-center">
      <div className="w-10 h-10 shrink-0">
        <Image
          src={user?.image || BACKUP_PROFILE_IMAGE}
          alt={user?.username || "username"}
          width="32px"
          height="32px"
          layout="responsive"
          className="rounded-full"
        />
      </div>
      <div className="w-full flex justify-between">
        <Link href={`/${user?.username}`}>{user?.username || "username"}</Link>
        <p className="text-gray-400 dark:text-gray-500">
          {getTimeString(post.createdAt || Date.now())}
        </p>
      </div>
    </div>
  );
};

const getTimeString = (dateString: string | number): string => {
  const d = new Date(dateString);
  const diff = Date.now() - d.getTime();

  const days = Math.floor(diff / (60 * 60 * 24 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const mins = Math.floor(diff / (60 * 1000));

  if (days) return `${days} days`;
  else if (hours) return `${hours} hours`;
  else if (mins) return `${mins} mins`;

  return "now";
};

export default PostItem;
