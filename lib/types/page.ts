import { AuthRequiredOptions } from "@lib/constants";
import { NextPage } from "next";

export type CustomNextPage<P = {}> = NextPage<P> & {
  layout?: "main";
  title?: string;
  authRequired?: AuthRequiredOptions;
};
