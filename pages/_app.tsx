import Head from "next/head";
import FullLayout from "layouts/Full";

import AuthProvider from "context/auth";
import PromptProvider from "context/prompt";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps<{ user: { id: string } | null }> {
  Component: NextPageWithLayout<{ user: { id: string } | null }>;
}

export default function Application({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <FullLayout>{page}</FullLayout>);
  return (
    <>
      <Head>
        <title>Davinci</title>
        <meta name="description" content="Davinci" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider user={pageProps.user || null}>
        <PromptProvider>
          {getLayout(<Component {...pageProps} />)}
        </PromptProvider>
      </AuthProvider>
    </>
  );
}
