import type { GetStaticPropsResult, NextPage } from "next";
import { useCallback } from "react";

type Props = {
  loginPath: string;
};

const Index: NextPage<Props> = (props) => {
  const handleSignInClick = useCallback(() => {
    window.location.href = props.loginPath;
  }, [props.loginPath]);

  return (
    <div>
      <h1>login</h1>
      <button onClick={handleSignInClick}>sign in by spotify</button>
    </div>
  );
};

export default Index;

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-modify",
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];
  const params = new URLSearchParams();
  params.append("client_id", process.env.CLIENT_ID || "");
  params.append("response_type", "code");
  params.append("redirect_uri", process.env.REDIRECT_URI || "");
  params.append("scope", scopes.join(" "));
  params.append("state", "state");
  return {
    props: {
      loginPath: `https://accounts.spotify.com/authorize?${params.toString()}`,
    },
  };
}
