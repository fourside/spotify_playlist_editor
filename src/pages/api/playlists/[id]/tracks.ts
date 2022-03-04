import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { addTrackToPlaylist } from "../../../../spotify/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<undefined>) {
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
    const { id } = req.query;
    const playlistId = Array.isArray(id) ? id[0] : id;

    const body = JSON.parse(req.body);
    const { trackUri, position } = body;
    if (typeof trackUri !== "string") {
      console.log("trackUri is required");
      res.status(400).send(undefined);
      return;
    }
    if (typeof position !== "number") {
      console.log("position is required");
      res.status(400).send(undefined);
      return;
    }

    try {
      const result = await addTrackToPlaylist(playlistId, trackUri, position, accessToken);
      console.log({ result });

      res.status(201).json(undefined);
    } catch (error) {
      console.error(error);
      res.status(500).send(undefined);
    }
  }

  if (req.method !== "GET") {
    res.status(405).send(undefined);
  }
}
