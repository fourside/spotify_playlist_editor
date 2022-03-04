import type { NextPage } from "next";
import Head from "next/head";
import { Index } from "../components/page/index/index";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | Spotify Playlist Editor</title>
      </Head>
      <Index />
    </>
  );
};

export default IndexPage;
