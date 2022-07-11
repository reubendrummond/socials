import SubmitPost from "@components/Feed/SubmitPost";
import PostItem from "@components/Feed/PostItem";
import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/getServerSidePropsWrappers";
import MainLayout from "layouts/MainLayout";
import useSWR from "swr";

const Feed: CustomNextPage = () => {
  const fetcher = (...args: any) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => res.data.posts);
  const { data: posts, error } = useSWR("/api/posts", fetcher);

  return (
    <MainLayout className="flex flex-col items-center w-full max-w-md mx-auto text-left">
      <h3 className="w-full">What&apos;s on your mind?</h3>
      <SubmitPost />
      <div className="flex flex-col w-full my-4 gap-y-2">
        {posts?.map((post: any) => (
          <PostItem key={post.createdAt + post.user.username} post={post} />
        ))}
      </div>
    </MainLayout>
  );
};

Feed.title = "Feed";
Feed.authRequired = "USER";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "USER");

export default Feed;
