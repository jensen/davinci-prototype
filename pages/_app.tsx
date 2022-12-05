import Head from "next/head";
import FullLayout from "layouts/Full";

import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps<{}> {
  Component: NextPageWithLayout<{}>;
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
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
