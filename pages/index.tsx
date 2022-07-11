import MainLayout from "layouts/MainLayout";
import { CustomNextPage } from "@lib/types/page";
import { useSession } from "next-auth/react";

const Home: CustomNextPage = () => {
  const { data: session } = useSession();

  return (
    <MainLayout className="flex flex-col items-center">
      <h1>Lightning Socials</h1>
      <div>Some featured posts</div>
      {!session && <div>Sign in to see more ...</div>}
    </MainLayout>
  );
};

Home.title = "Home";

export default Home;
