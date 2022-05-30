import { useReq } from "@lib/hooks/useReq";
import React from "react";

const Test = () => {
  const { data, isLoading } = useReq("/customers");

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 4)}</pre>
      )}
    </>
  );
};

export default Test;
