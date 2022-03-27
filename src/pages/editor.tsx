import { NextPage } from "next";
import Head from "next/head";
import { Editor } from "../components/page/editor";

const EditorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Playlist Editor</title>
      </Head>
      <Editor />
    </>
  );
};

export default EditorPage;
