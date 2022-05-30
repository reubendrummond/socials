import type { NextPage } from "next";
import { TestComponent } from "@components/TestComponent";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>My Next template</h1>
      <TestComponent />
    </>
  );
};

export default Home;
