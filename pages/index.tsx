import MainLayout from "layouts/MainLayout";
import { CustomNextPage } from "@lib/types/page";
import { useAuth } from "@lib/hooks/useAuth";

const Home: CustomNextPage = () => {
  const { user } = useAuth();
  return (
    <MainLayout className="flex flex-col items-center">
      <h1>Lightning Socials</h1>
      <div>Some featured posts</div>
      {!user && <div>Sign in to see more ...</div>}
    </MainLayout>
  );
};

Home.title = "Home";

export default Home;
