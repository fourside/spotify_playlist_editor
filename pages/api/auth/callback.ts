import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code as string);
  params.append("redirect_uri", process.env.REDIRECT_URI as string);

  const basicAuth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, "utf-8").toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: params.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
  });
  const body = await response.json();
  console.log(body);

  res
    .setHeader("set-cookie", `access_token=${body.access_token}; path=/; SameSite=Strict`)
    .status(301)
    .redirect("/editor");
}
type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};
