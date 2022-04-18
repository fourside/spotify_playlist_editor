import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, FC } from "react";

export const Index: FC = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const handleSignInClick = useCallback(() => {
    signIn();
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/editor");
    }
  }, [router, sessionStatus]);

  if (sessionStatus === "loading") {
    return <div>loading...</div>;
  }

  if (sessionStatus === "authenticated") {
    return <div>redirecting...</div>;
  }

  return (
    <div>
      <h1>login</h1>
      <button onClick={handleSignInClick}>sign in by spotify</button>
    </div>
  );
};
