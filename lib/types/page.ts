import { NextPage } from "next";

export type CustomNextPage = NextPage & {
  layout?: "main";
};
