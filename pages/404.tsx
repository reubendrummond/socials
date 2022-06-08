import { CustomNextPage } from "@lib/types/page";
import { NextPage, NextPageContext } from "next";
import React from "react";

const Custom404: CustomNextPage = () => {
  return (
    <>
      <h1>404</h1>
      <p>Oh no!</p>
    </>
  );
};

Custom404.layout = "main";

export default Custom404;
