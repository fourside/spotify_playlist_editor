import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Playlist } from "../../../model";
import { createPlaylist } from "../../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Playlist | undefined>) {
  const session = await getSession({ req });
  if (session === null) {
    console.log("No session");
    res.status(403).send(undefined);
    return;
  }
  const accessToken = session.token?.accessToken;
  if (accessToken === undefined) {
    console.log("No access token");
    res.status(403).send(undefined);
    return;
  }
  if (req.method === "POST") {
    if (session.userId === undefined) {
      console.log("No userId in session");
      res.status(403).send(undefined);
      return;
    }

    const body = JSON.parse(req.body);
    const { name } = body;
    if (typeof name !== "string") {
      console.log("parameter name is required");
      res.status(400).send(undefined);
      return;
    }

    try {
      const json = await createPlaylist(name, session.userId, accessToken);
      res.status(201).json(json);
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
  }

  if (req.method !== "POST") {
    res.status(405).send(undefined);
  }
}
