import { Customer } from "@prisma/client";
import prisma from "@prisma";
import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import { logError } from "lib/logError";

interface TestProps {
  customers: Customer[];
}

const Display = (props: TestProps) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      {props.customers.map(({ id, name, email }) => {
        return (
          <div key={id}>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{id}</p>
          </div>
        );
      })}
    </>
  );
};

export default Display;

export const getStaticProps: GetStaticProps<TestProps> = async (context) => {
  try {
    const customers = await prisma.customer.findMany();
    return {
      props: {
        customers,
      },
      revalidate: 10,
    };
  } catch (err) {
    if (err instanceof Error) logError(err);
    throw err;
  }
};
