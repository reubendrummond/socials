import UserPost from "@components/Feed/Post";
import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import MainLayout from "layouts/MainLayout";

const Feed: CustomNextPage = () => {
  return (
    <MainLayout className="flex flex-col items-center">
      <UserPost />
    </MainLayout>
  );
};

Feed.title = "Feed";
Feed.authRequired = "USER";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "USER");

export default Feed;
