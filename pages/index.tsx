import type { NextPage } from "next";
import { TestComponent } from "@components/TestComponent";

const Home: NextPage = () => {
  return (
    <>
      <h1>My Next template</h1>
      <TestComponent />
    </>
  );
};

export default Home;
