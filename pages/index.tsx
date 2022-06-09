import type { NextPage } from "next";
import { TestComponent } from "@components/TestComponent";
import MainLayout from "layouts/MainLayout";
import { CustomNextPage } from "@lib/types/page";

const Home: CustomNextPage = () => {
  return (
    <MainLayout>
      <h1>My Next template</h1>
      <TestComponent />
    </MainLayout>
  );
};

Home.title = "Home";

export default Home;
