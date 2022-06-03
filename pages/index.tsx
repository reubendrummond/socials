import type { NextPage } from "next";
import { TestComponent } from "@components/TestComponent";
import MainLayout from "layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <h1>My Next template</h1>
      <TestComponent />
    </MainLayout>
  );
};

export default Home;
