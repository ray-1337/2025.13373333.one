import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import Script from "next/script";
import { MantineProvider, createTheme } from "@mantine/core";

import "normalize.css";

import "@mantine/core/styles.css";

import "@/styles/main.css";

const mantineTheme = createTheme({
  fontFamily: "var(--authenticFontFamily)"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>ray personal website (2025 edition)</title>

        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0" />

        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701&display=swap" rel="preload stylesheet" as={"style"} />
      </Head>

      <MantineProvider theme={mantineTheme} forceColorScheme={"dark"}>
        <Component {...pageProps} />
      </MantineProvider>

      {/* cloudflare analytics */}
      {
        process.env.NODE_ENV !== "development" && (
          <Script defer={true} strategy={"afterInteractive"} src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon={JSON.stringify({token: "7e8406bcdb5c4f43a725b71411e17820"})}/>
        )
      }
    </Fragment>
  );
};