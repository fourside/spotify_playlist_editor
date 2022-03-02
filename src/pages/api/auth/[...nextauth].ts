import nextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

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

export default nextAuth({
  providers: [
    SpotifyProvider<{ redirectURI: string }>({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: {
        params: {
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          scope: scopes.join(" "),
          response_type: "code",
          state: "state",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.refreshToken = account.refresh_token;
        token.accessToken = account.access_token;
      }
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = {
        refreshToken: token.refreshToken,
        accessToken: token.accessToken,
      };
      session.userId = token.userId;
      return session;
    },
  },
});
