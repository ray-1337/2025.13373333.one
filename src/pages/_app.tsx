import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";

import "normalize.css";

import "@mantine/core/styles.css";


const mantineTheme = createTheme({
  fontFamily: "var(--authenticFontFamily)"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701&display=swap" rel="preload stylesheet" as={"style"} />
      </Head>

      <MantineProvider theme={mantineTheme} forceColorScheme={"dark"}>
        <Component {...pageProps} />
      </MantineProvider>
    </Fragment>
  );
};