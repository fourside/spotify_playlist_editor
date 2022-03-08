import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    );
  }
}

export default Document;
