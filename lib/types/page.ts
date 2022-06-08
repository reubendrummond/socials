import { AuthRequiredOptions } from "@lib/constants";
import { NextPage } from "next";

export type CustomNextPage = NextPage & {
  layout?: "main";
  title?: string;
  authRequired?: AuthRequiredOptions;
};
