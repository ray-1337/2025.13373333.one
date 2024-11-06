import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel={"preconnect"} href={"https://api.fontshare.com"} />
        <link rel={"preconnect"} href={"https://cdn.fontshare.com"} />

      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
