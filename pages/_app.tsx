import "styles/globals.css";
import "@fontsource/poppins/latin-ext.css";
import type AppProps from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";
import { useEffect, useState } from "react";
import Router from "next/router";
import PageLoader from "@components/Loaders/Page";
import { RouteGuard } from "@components/RouteGuard";
import { AppName } from "@lib/constants";
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  return (
    <>
      <Head>
        <title>{Component.title || AppName}</title>
      </Head>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },
})(MyApp);
