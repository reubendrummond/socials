import "styles/globals.css";
import "@fontsource/poppins/latin-ext.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import PageLoader from "@components/Loaders/Page";
import { RouteGuard } from "@components/RouteGuard";
import { AppName } from "@lib/constants";
import { SessionProvider } from "next-auth/react";

type ExtendedAppProps = AppProps & {
  Component: CustomNextPage;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => setLoading(true);

    const end = () => setLoading(false);
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{Component.title || AppName}</title>
      </Head>
      <ThemeProvider attribute="class">
        {/* <AuthProvider> */}
        <SessionProvider session={session}>
          <RouteGuard authRequired={Component.authRequired} strict={false}>
            {Component.layout ? (
              Component.layout === "main" ? (
                <MainLayout>
                  {loading ? <PageLoader /> : <Component {...pageProps} />}
                </MainLayout>
              ) : (
                <MainLayout>
                  {loading ? <PageLoader /> : <Component {...pageProps} />}
                </MainLayout>
              )
            ) : (
              <Component {...pageProps} />
            )}
          </RouteGuard>
        </SessionProvider>
        {/* </AuthProvider> */}
      </ThemeProvider>
    </>
  );
};

export default MyApp;
