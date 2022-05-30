import { NextPage, NextPageContext } from "next";
import React, { useEffect } from "react";

type CustomErrorProps = ReturnType<typeof getInitialProps>;

const CustomError: NextPage<CustomErrorProps> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      {Object.entries(props).map(([key, val], index) => (
        <p key={index}>
          {key}: {val}
        </p>
      ))}
    </>
  );
};

const getInitialProps = (ctx: NextPageContext) => {
  return {
    status: ctx.err?.statusCode ?? 500,
    from: ctx.pathname,
  };
};

CustomError.getInitialProps = getInitialProps;

export default CustomError;
